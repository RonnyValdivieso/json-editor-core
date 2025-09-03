# Publishing Guide - json-editor-core

## Steps to publish to npm

### 1. Initial setup (one-time only)

```bash
# Create npm account if you don't have one
# Go to: https://www.npmjs.com/signup

# Login to npm
npm login
# or
npm adduser

# Verify you're logged in
npm whoami
```

### 2. Before publishing

```bash
# Verify everything works
npm run lint
npm run test
npm run build

# Check package contents
npm run check-package
```

### 3. Automated publishing (recommended)

```bash
# Use the automated script
./publish.sh
```

### 4. Manual publishing

```bash
# Update version
npm version patch  # or minor, major

# Publish
npm publish
```

### 5. After publishing

- Check at: https://www.npmjs.com/package/json-editor-core
- README badge will update automatically
- Create a GitHub release with version notes

## Available scripts

- `npm run build` - Build the package
- `npm run test` - Run tests
- `npm run lint` - Check code quality
- `npm run check-package` - Simulate packaging
- `npm version [patch|minor|major]` - Update version
- `npm publish` - Publish the package

## Version configuration

- **patch** (0.1.0 → 0.1.1): Bug fixes
- **minor** (0.1.0 → 0.2.0): New features
- **major** (0.1.0 → 1.0.0): Breaking changes

## Pre-publication checklist

- [ ] Tests pass
- [ ] Lint passes
- [ ] Build successful
- [ ] README updated
- [ ] CHANGELOG updated (if applicable)
- [ ] Version incremented
- [ ] Logged into npm
- [ ] On main branch
- [ ] No uncommitted changes

## Troubleshooting

### Error: Package already exists
```bash
# Change name in package.json
# or increment version
npm version patch
```

### Error: Not logged in
```bash
npm login
```

### Error: Insufficient permissions
```bash
# Verify you're the package owner
npm owner ls json-editor-core
```
