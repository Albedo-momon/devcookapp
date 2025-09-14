#!/usr/bin/env node

/**
 * Simple changelog update script
 * Usage: node scripts/update-changelog.js "feat: add new feature" "Added new user dashboard"
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const CHANGELOG_PATH = path.join(__dirname, '..', 'CHANGELOG.md');

function getCurrentCommitHash() {
  try {
    // Try to get the current commit hash, fallback to staged changes
    let hash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    
    // If we're in the middle of a commit, get the hash that will be created
    try {
      const staged = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
      if (staged) {
        // We have staged changes, so we'll get a new hash after commit
        hash = 'pending';
      }
    } catch (e) {
      // Ignore errors, use current hash
    }
    
    return hash;
  } catch (error) {
    return 'unknown';
  }
}

function getCurrentDate() {
  return new Date().toISOString().split('T')[0];
}

function categorizeChange(commitMessage) {
  const msg = commitMessage.toLowerCase();
  
  if (msg.startsWith('feat:') || msg.startsWith('add:')) return 'Added';
  if (msg.startsWith('fix:') || msg.startsWith('bugfix:')) return 'Fixed';
  if (msg.startsWith('change:') || msg.startsWith('update:')) return 'Changed';
  if (msg.startsWith('remove:') || msg.startsWith('delete:')) return 'Removed';
  if (msg.startsWith('security:')) return 'Security';
  if (msg.startsWith('deprecate:')) return 'Deprecated';
  
  return 'Changed'; // default category
}

function updateChangelog(commitMessage, description) {
  if (!fs.existsSync(CHANGELOG_PATH)) {
    console.error('CHANGELOG.md not found!');
    process.exit(1);
  }

  const changelog = fs.readFileSync(CHANGELOG_PATH, 'utf8');
  const commitHash = getCurrentCommitHash();
  const category = categorizeChange(commitMessage);
  const date = getCurrentDate();
  
  // Find the [Unreleased] section
  const unreleasedIndex = changelog.indexOf('## [Unreleased]');
  if (unreleasedIndex === -1) {
    console.error('[Unreleased] section not found in CHANGELOG.md');
    process.exit(1);
  }

  // Find where to insert the new entry
  const categoryPattern = new RegExp(`### ${category}`, 'i');
  const categoryMatch = changelog.match(categoryPattern);
  
  let newEntry = `- ${description} (${commitHash})`;
  let updatedChangelog;

  if (categoryMatch) {
    // Category exists, add to it
    const categoryIndex = changelog.indexOf(categoryMatch[0]);
    const nextLineIndex = changelog.indexOf('\n', categoryIndex) + 1;
    
    updatedChangelog = 
      changelog.slice(0, nextLineIndex) +
      newEntry + '\n' +
      changelog.slice(nextLineIndex);
  } else {
    // Category doesn't exist, create it
    const addedIndex = changelog.indexOf('### Added');
    if (addedIndex !== -1) {
      // Insert before ### Added
      updatedChangelog = 
        changelog.slice(0, addedIndex) +
        `### ${category}\n${newEntry}\n\n` +
        changelog.slice(addedIndex);
    } else {
      // Insert after [Unreleased]
      const nextSectionIndex = changelog.indexOf('\n\n', unreleasedIndex);
      updatedChangelog = 
        changelog.slice(0, nextSectionIndex) +
        `\n\n### ${category}\n${newEntry}` +
        changelog.slice(nextSectionIndex);
    }
  }

  fs.writeFileSync(CHANGELOG_PATH, updatedChangelog);
  console.log(`✅ Added to CHANGELOG.md under "${category}": ${description}`);
  console.log(`📝 Commit hash: ${commitHash}`);
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('Usage: node scripts/update-changelog.js "commit-message" "description"');
    console.log('Example: node scripts/update-changelog.js "feat: add login" "Added user authentication with Clerk"');
    process.exit(1);
  }

  const [commitMessage, description] = args;
  updateChangelog(commitMessage, description);
}

module.exports = { updateChangelog, categorizeChange };