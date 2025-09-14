# Automated Changelog System 🤖

This project now uses a fully automated changelog tracking system that generates entries based on conventional commit messages.

## How It Works

### 1. Conventional Commits
All commit messages must follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### 2. Automated Validation
- **Pre-commit**: Runs ESLint to ensure code quality
- **Commit-msg**: Validates commit message format and auto-updates changelog
- **Post-commit**: Generates changelog entries for significant changes

### 3. Changelog Generation
- Automatic categorization based on commit type
- Commit hash tracking for traceability
- Semantic versioning support

## Usage Guide

### Making Commits

#### Option 1: Interactive Commitizen (Recommended)
```bash
npm run commit
```
This opens an interactive prompt that guides you through creating a proper conventional commit.

#### Option 2: Manual Conventional Commits
```bash
git add .
git commit -m "feat: add user authentication"
git commit -m "fix: resolve canvas rendering issue"
git commit -m "docs: update README with setup instructions"
```

### Commit Types

| Type | Description | Changelog Section | Breaking |
|------|-------------|-------------------|----------|
| `feat` | New feature | Added | No |
| `fix` | Bug fix | Fixed | No |
| `docs` | Documentation | - | No |
| `style` | Code style changes | - | No |
| `refactor` | Code refactoring | Changed | No |
| `perf` | Performance improvements | Changed | No |
| `test` | Adding tests | - | No |
| `chore` | Maintenance tasks | - | No |
| `ci` | CI/CD changes | - | No |
| `build` | Build system changes | - | No |
| `revert` | Reverting changes | - | No |

### Examples

#### Feature Addition
```bash
git commit -m "feat(auth): add OAuth login with Google

Implemented Google OAuth integration using Clerk.
Users can now sign in with their Google accounts.

Closes #123"
```

#### Bug Fix
```bash
git commit -m "fix(canvas): resolve memory leak in particle animation

Fixed issue where particle objects were not being properly
cleaned up on component unmount, causing memory leaks.

Fixes #456"
```

#### Breaking Change
```bash
git commit -m "feat(api): redesign user authentication API

REAKING CHANGE: The authentication API has been completely
redesigned. The old `/auth/login` endpoint is now `/auth/signin`.
All client applications need to be updated."
```

## Automated Workflows

### Pre-commit Hook
- Runs ESLint on all staged files
- Prevents commits if linting fails
- Ensures code quality standards

### Commit Message Hook
- Validates commit message format
- Auto-updates CHANGELOG.md for significant commits (`feat`, `fix`, `perf`, `refactor`)
- Adds commit hash for traceability

### Changelog Generation
```bash
# Generate changelog from all commits
npm run changelog:generate

# View current changelog
npm run changelog:view
```

## Release Process

### Automated Release
```bash
# Bump version and generate changelog
npm version patch  # or minor, major

# This automatically:
# 1. Updates package.json version
# 2. Generates changelog entries
# 3. Creates a git tag
# 4. Commits the changes
```

### Manual Release
```bash
# 1. Generate changelog
npm run changelog:generate

# 2. Review and edit CHANGELOG.md if needed

# 3. Commit changelog
git add CHANGELOG.md
git commit -m "chore: update changelog for v1.0.0"

# 4. Create tag
git tag -a v1.0.0 -m "Release version 1.0.0"

# 5. Push changes and tags
git push origin main --tags
```

## Configuration Files

### commitlint.config.js
Defines commit message rules and validation:
- Enforces conventional commit format
- Sets maximum line lengths
- Defines allowed commit types

### .husky/commit-msg
Git hook that:
- Validates commit messages
- Auto-updates changelog
- Provides feedback on commit format

### .husky/pre-commit
Git hook that:
- Runs ESLint on staged files
- Prevents commits with linting errors
- Ensures code quality

## Troubleshooting

### Commit Message Rejected
```bash
❌ subject may not be empty [subject-empty]
❌ type may not be empty [type-empty]
```
**Solution**: Use proper conventional commit format:
```bash
git commit -m "feat: add new feature description"
```

### ESLint Errors Blocking Commit
```bash
❌ ESLint failed. Please fix the issues before committing.
```
**Solution**: Fix linting errors or run:
```bash
npm run lint
```

### Changelog Not Updating
1. Check if commit type is significant (`feat`, `fix`, `perf`, `refactor`)
2. Ensure `scripts/update-changelog.js` exists and is executable
3. Check git hooks are installed: `ls -la .husky/`

### Skip Hooks (Emergency)
```bash
# Skip pre-commit hook
git commit --no-verify -m "fix: emergency hotfix"

# Skip commit-msg hook
GIT_EDITOR=true git commit --no-verify
```

## Benefits

✅ **Consistent Format**: All commits follow the same standard
✅ **Automatic Documentation**: Changelog updates without manual work
✅ **Better Collaboration**: Clear commit history for team members
✅ **Semantic Versioning**: Automatic version bumping based on changes
✅ **Quality Assurance**: Pre-commit linting prevents bad code
✅ **Traceability**: Every changelog entry links to specific commits

## Migration from Manual System

The manual changelog system is still available as a fallback:
- `npm run changelog:add` - Manual entry addition
- Direct editing of CHANGELOG.md
- Custom scripts in `scripts/` directory

Both systems can coexist, but the automated system is recommended for consistency.

## Team Adoption

### For New Team Members
1. Clone the repository
2. Run `npm install` (installs husky hooks automatically)
3. Use `npm run commit` for guided commit creation
4. Follow conventional commit format

### For Existing Team Members
1. Learn conventional commit format
2. Use `npm run commit` for interactive commits
3. Let the system handle changelog updates
4. Focus on writing clear, descriptive commit messages

The automated system reduces manual work while improving consistency and traceability across the entire development process! 🚀