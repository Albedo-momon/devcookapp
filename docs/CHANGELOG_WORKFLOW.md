# Changelog Workflow Guide

This document explains how to maintain the project changelog and track changes effectively.

## Quick Start

### Adding a Change to Changelog

```bash
# Method 1: Using the helper script
npm run changelog:add "feat: add user profile" "Added user profile page with avatar upload"

# Method 2: Manual editing
# Edit CHANGELOG.md directly and add your changes under [Unreleased]
```

### Viewing the Changelog

```bash
npm run changelog:view
```

## Workflow for Developers

### 1. Before Starting Work
- Check the `[Unreleased]` section in CHANGELOG.md to see what others are working on
- This helps avoid duplicate work and conflicts

### 2. During Development
- Keep notes of significant changes you're making
- Think about how to describe the change from a user's perspective

### 3. Before Committing
- Add your changes to the changelog using one of these methods:

#### Option A: Automated Script
```bash
# The script will automatically categorize your change and add commit hash
npm run changelog:add "feat: add dark mode" "Added dark mode toggle in settings page"
npm run changelog:add "fix: canvas rendering" "Fixed null pointer exception in particle animation"
```

#### Option B: Manual Edit
Edit `CHANGELOG.md` and add under the appropriate category in `[Unreleased]`:

```markdown
## [Unreleased]

### Added
- Dark mode toggle in settings page (abc1234)

### Fixed
- Null pointer exception in particle animation (def5678)
```

### 4. Commit Message Convention

Use conventional commit format:
```
feat: add dark mode toggle
fix: resolve canvas rendering issue
docs: update README with setup instructions
style: format code with prettier
refactor: restructure auth components
test: add unit tests for user service
chore: update dependencies
```

## Change Categories

- **Added**: New features
- **Changed**: Changes in existing functionality  
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security improvements

## Git Hooks (Optional)

### Install the Prepare Commit Hook

To get automatic reminders to update the changelog:

```bash
# Copy the hook
cp .githooks/prepare-commit-msg .git/hooks/prepare-commit-msg

# Make it executable (on Unix systems)
chmod +x .git/hooks/prepare-commit-msg
```

This will remind you to update the changelog for significant commits.

### Skip Changelog Reminder

For minor commits that don't need changelog entries:

```bash
git commit -m "style: fix indentation skip-changelog"
```

## Release Process

When creating a new release:

1. **Move changes from Unreleased to versioned section**:
   ```markdown
   ## [1.0.0] - 2024-01-15
   
   ### Added
   - User authentication with Clerk
   - Dashboard with particle animations
   
   ### Fixed
   - Canvas rendering issues
   
   ## [Unreleased]
   (empty or new changes)
   ```

2. **Create git tag**:
   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   git push origin --tags
   ```

## Best Practices

### ✅ Good Changelog Entries

```markdown
### Added
- User profile page with avatar upload and bio editing
- Dark mode toggle in application settings
- Email notifications for password changes

### Fixed
- Canvas animation memory leak on component unmount
- Login form validation not showing error messages
- Mobile responsive layout breaking on iPhone SE
```

### ❌ Poor Changelog Entries

```markdown
### Changed
- Updated stuff
- Fixed bugs
- Made improvements
- Refactored code
```

### Writing Tips

1. **User-focused**: Write from the user's perspective, not the developer's
2. **Specific**: Include what was changed, not just that something changed
3. **Actionable**: Users should understand what they can now do differently
4. **Consistent**: Use similar language and format for similar types of changes

## Troubleshooting

### Script Not Working

```bash
# Check if Node.js is available
node --version

# Run script directly
node scripts/update-changelog.js "feat: test" "Test entry"
```

### Git Hooks Not Triggering

```bash
# Check if hook exists and is executable
ls -la .git/hooks/prepare-commit-msg

# Make executable if needed
chmod +x .git/hooks/prepare-commit-msg
```

### Merge Conflicts in Changelog

1. Open CHANGELOG.md
2. Manually merge the conflicting sections
3. Ensure proper markdown formatting
4. Test with `npm run changelog:view`

## Examples from This Project

Here are real examples from our recent work:

```markdown
### Fixed
- TypeScript compilation errors in ParticleText component (a1b2c3d)
- React hooks rules violations in authentication pages (e4f5g6h)
- ESLint errors for unescaped apostrophes in UI text (i7j8k9l)
- Build process failing due to missing Clerk configuration (m0n1o2p)

### Added
- Graceful handling of missing Clerk API keys during development (q3r4s5t)
- Environment configuration template with placeholder values (u6v7w8x)
```

These entries clearly describe what was fixed and why it matters to the project.