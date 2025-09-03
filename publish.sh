#!/bin/bash

# Publishing script for json-editor-core
# This script performs all necessary checks before publishing

set -e  # Exit if any command fails

echo "🚀 Starting publication process for json-editor-core"
echo ""

# Check we're on the correct branch
echo "📋 Checking current branch..."
current_branch=$(git branch --show-current)
if [ "$current_branch" != "main" ]; then
    echo "❌ Error: You must be on 'main' branch to publish"
    echo "   Current branch: $current_branch"
    exit 1
fi
echo "✅ On main branch"

# Check for uncommitted changes
echo ""
echo "📋 Checking repository status..."
if [ -n "$(git status --porcelain)" ]; then
    echo "❌ Error: There are uncommitted changes"
    echo "   Commit all changes before publishing"
    git status --short
    exit 1
fi
echo "✅ Clean repository"

# Check we're up to date with origin
echo ""
echo "📋 Checking synchronization with origin..."
git fetch origin
if [ "$(git rev-parse HEAD)" != "$(git rev-parse origin/main)" ]; then
    echo "❌ Error: Local branch is not synchronized with origin/main"
    echo "   Run: git pull origin main"
    exit 1
fi
echo "✅ Synchronized with origin"

# Run tests
echo ""
echo "🧪 Running tests..."
npm test
echo "✅ Tests passed"

# Run linter
echo ""
echo "🔍 Running linter..."
npm run lint
echo "✅ Lint passed"

# Build the package
echo ""
echo "🔨 Building the package..."
npm run build
echo "✅ Build successful"

# Check package contents
echo ""
echo "📦 Checking package contents..."
npm run check-package

# Confirm publication
echo ""
echo "🤔 Are you ready to publish?"
echo "   Current version: $(node -p "require('./package.json').version")"
echo ""
read -p "Continue with publication? (y/N): " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Publication cancelled"
    exit 1
fi

# Publish
echo ""
echo "🚀 Publishing package..."
npm publish

echo ""
echo "🎉 Package published successfully!"
echo "📦 You can install it with: npm install json-editor-core"
echo "🔗 View on npm: https://www.npmjs.com/package/json-editor-core"
