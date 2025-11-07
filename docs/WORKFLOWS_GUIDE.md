# 🔄 Workflows & CI/CD Guide

Complete guide to understanding and using the CI/CD pipelines for Make a Date.

## Table of Contents

- [Overview](#overview)
- [Workflows Architecture](#workflows-architecture)
- [CI Pipeline](#ci-pipeline)
- [Deployment Pipeline](#deployment-pipeline)
- [Local Development](#local-development)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## Overview

Our project uses GitHub Actions for continuous integration and continuous deployment (CI/CD). This ensures code quality, runs automated tests, and deploys the application automatically.

### Key Benefits

- ✅ **Automated Quality Checks**: Catch issues before they reach production
- 🧪 **Automated Testing**: Run tests on every commit
- 🚀 **Automated Deployment**: Deploy to GitHub Pages automatically
- 🔒 **Security Scanning**: Identify vulnerabilities early
- 📊 **Build Verification**: Ensure builds work across Node.js versions

## Workflows Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Developer Workflow                       │
└─────────────────────────────────────────────────────────────┘
                              │
                    Push to develop/main
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      CI Pipeline (ci.yml)                    │
├─────────────────────────────────────────────────────────────┤
│  ┌───────────┐  ┌───────────┐  ┌───────────┐  ┌──────────┐ │
│  │  Quality  │  │   Tests   │  │   Build   │  │ Security │ │
│  │  Checks   │  │  (18,20)  │  │  (18,20)  │  │  Audit   │ │
│  └─────┬─────┘  └─────┬─────┘  └─────┬─────┘  └────┬─────┘ │
│        │              │              │              │        │
│        └──────────────┴──────────────┴──────────────┘        │
│                           │                                  │
│                    All Jobs Pass ✅                          │
└───────────────────────────┬─────────────────────────────────┘
                            │
                  Push to main/master
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                 Deployment Pipeline (deploy.yml)             │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────────┐       ┌──────────────────────┐     │
│  │   Production Build  │  ───▶ │  Deploy to GH Pages  │     │
│  │   + Size Analysis   │       │   + Verification     │     │
│  └─────────────────────┘       └──────────────────────┘     │
│                                           │                  │
│                                    Live at GitHub Pages      │
└─────────────────────────────────────────────────────────────┘
```

## CI Pipeline

The CI pipeline (`ci.yml`) runs on every push and pull request to ensure code quality.

### Jobs Overview

#### 1. 🧹 Quality Checks

**Purpose**: Ensure code meets quality standards

```bash
# What it runs:
npx nx run-many --target=lint --all --parallel=3
npx nx run-many --target=typecheck --all --parallel=3
```

**Checks**:
- ✅ ESLint rules compliance
- ✅ TypeScript type safety
- ✅ Code formatting (if configured)
- ✅ Import/export consistency

**Local Testing**:
```bash
# Run linting
npx nx run-many --target=lint --all

# Fix auto-fixable issues
npx nx run-many --target=lint --all --fix

# Type checking
npx nx run-many --target=typecheck --all
```

#### 2. 🧪 Unit Tests

**Purpose**: Verify code functionality

**Matrix Strategy**:
- Node.js 18.x
- Node.js 20.x

```bash
# What it runs:
npx nx run-many --target=test --all --parallel=3 --coverage
```

**Features**:
- ✅ Runs all unit tests
- ✅ Generates code coverage reports
- ✅ Uploads coverage to Codecov
- ✅ Tests on multiple Node.js versions

**Local Testing**:
```bash
# Run all tests
npx nx run-many --target=test --all

# Run with coverage
npx nx run-many --target=test --all --coverage

# Run specific project tests
npx nx test frontend
npx nx test api

# Watch mode
npx nx test frontend --watch
```

#### 3. 🏗️ Build Verification

**Purpose**: Ensure production builds work

**Dependencies**: Requires Quality and Tests to pass first

```bash
# What it runs:
npx nx build frontend --configuration=production
npx nx build api --configuration=production
```

**Features**:
- ✅ Production builds
- ✅ Build artifact generation
- ✅ Build size analysis
- ✅ Tests on multiple Node.js versions

**Artifacts Generated**:
- `dist-frontend` (7 days retention)
- `dist-api` (7 days retention)

**Local Testing**:
```bash
# Build frontend
npx nx build frontend --configuration=production

# Build API
npx nx build api --configuration=production

# Preview frontend build
cd dist/apps/frontend && npx serve -s .
```

#### 4. 🔒 Security Audit

**Purpose**: Identify security vulnerabilities

```bash
# What it runs:
npm audit --audit-level=moderate
```

**Features**:
- ✅ Scans npm dependencies
- ✅ Identifies known vulnerabilities
- ✅ Generates audit report
- ✅ Uploads results as artifact

**Severity Levels**:
- 🔴 Critical
- 🟠 High
- 🟡 Moderate
- ⚪ Low

**Local Testing**:
```bash
# Run audit
npm audit

# View only moderate and above
npm audit --audit-level=moderate

# Fix vulnerabilities
npm audit fix

# Fix including breaking changes (careful!)
npm audit fix --force
```

### CI Workflow Triggers

```yaml
on:
  push:
    branches: ['main', 'master', 'develop']
  pull_request:
    branches: ['main', 'master', 'develop']
```

**When it runs**:
- ✅ Push to main, master, or develop
- ✅ Pull requests to main, master, or develop
- ✅ Every commit in a PR (automatically)

### Concurrency Control

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

**Behavior**:
- Cancels previous runs when new commit is pushed
- Saves CI minutes
- Faster feedback on latest changes

## Deployment Pipeline

The deployment pipeline (`deploy.yml`) automatically deploys the frontend to GitHub Pages.

### Deployment Flow

```
Push to main/master
       │
       ▼
Build Production
       │
       ├─ Install dependencies
       ├─ Build with optimizations
       ├─ Analyze build size
       └─ Generate artifacts
       │
       ▼
Deploy to GitHub Pages
       │
       ├─ Upload to gh-pages
       ├─ Verify deployment
       └─ Create summary
       │
       ▼
   Live on GitHub Pages
```

### Environment Configuration

```yaml
env:
  NODE_ENV: production
  VITE_BASE_URL: /makeadate/
  VITE_API_BASE_URL: /makeadate/api/
  VITE_ENVIRONMENT: production
```

### Build Job

**Features**:
- ✅ Production-optimized build
- ✅ Asset minification
- ✅ Code splitting
- ✅ Size analysis
- ✅ Build verification

**Size Analysis Output**:
```
=== Build Size Analysis ===

Total build size:
2.4M    dist/apps/frontend

Top 10 largest files:
892K    dist/apps/frontend/assets/index-abc123.js
234K    dist/apps/frontend/assets/vendor-xyz789.js
156K    dist/apps/frontend/assets/images/hero.jpg
...

Asset breakdown:
JavaScript: 1.2M
CSS: 45K
Images: 1.1M
```

### Deploy Job

**Features**:
- ✅ Automatic deployment
- ✅ URL verification
- ✅ Deployment summary
- ✅ Rollback capability (via artifacts)

**Summary Output**:
```markdown
# 🚀 Deployment Summary

✅ **Status**: Successful
🌐 **URL**: https://username.github.io/makeadate/
📅 **Deployed**: Mon Jan 15 2024 10:30:00 GMT
🔖 **Commit**: abc123...
👤 **Author**: username
```

### Manual Deployment

#### Via GitHub Actions UI

1. Navigate to **Actions** tab
2. Click **🚀 Deploy to GitHub Pages**
3. Click **Run workflow**
4. Select branch (usually `main`)
5. Click **Run workflow** button

#### Via GitHub CLI

```bash
# Install GitHub CLI (if not installed)
brew install gh  # macOS
# or
sudo apt install gh  # Ubuntu/Debian

# Login
gh auth login

# Trigger deployment
gh workflow run deploy.yml

# Monitor progress
gh run watch

# List recent runs
gh run list --workflow=deploy.yml

# View specific run
gh run view <run-id>
```

## Local Development

### Setup

```bash
# Clone repository
git clone https://github.com/<username>/makeadate.git
cd makeadate

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration
```

### Development Commands

```bash
# Start frontend development server
npm run start:frontend
# or
npx nx serve frontend

# Start API development server
npm run start:api
# or
npx nx serve api

# Run both concurrently
npm run start:frontend & npm run start:api
```

### Testing Locally

```bash
# Run all tests
npx nx run-many --target=test --all

# Run tests with coverage
npx nx run-many --target=test --all --coverage

# Run linting
npx nx run-many --target=lint --all

# Run type checking
npx nx run-many --target=typecheck --all

# Run security audit
npm audit
```

### Building Locally

```bash
# Build frontend for production
npx nx build frontend --configuration=production

# Build API for production
npx nx build api --configuration=production

# Preview frontend build
cd dist/apps/frontend
npx serve -s .
# Visit http://localhost:3000/makeadate/
```

### Simulating CI Locally

Create a script to run all CI checks:

```bash
#!/bin/bash
# ci-local.sh

echo "🧹 Running quality checks..."
npx nx run-many --target=lint --all || exit 1
npx nx run-many --target=typecheck --all || exit 1

echo "🧪 Running tests..."
npx nx run-many --target=test --all --coverage || exit 1

echo "🏗️ Building applications..."
npx nx build frontend --configuration=production || exit 1
npx nx build api --configuration=production || exit 1

echo "🔒 Running security audit..."
npm audit --audit-level=moderate || exit 1

echo "✅ All checks passed!"
```

Usage:
```bash
chmod +x ci-local.sh
./ci-local.sh
```

## Best Practices

### For Developers

#### 1. Always Use Feature Branches

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes
git add .
git commit -m "feat: add new feature"

# Push to origin
git push origin feature/my-feature
```

#### 2. Wait for CI Before Merging

- ✅ Ensure all CI checks pass
- ✅ Review any warnings or errors
- ✅ Request reviews from team members
- ✅ Address feedback and re-run CI

#### 3. Write Good Commit Messages

```bash
# Good commit messages
git commit -m "feat: add user authentication"
git commit -m "fix: resolve null pointer in user service"
git commit -m "docs: update API documentation"
git commit -m "test: add unit tests for auth service"
git commit -m "refactor: simplify user validation logic"

# Bad commit messages
git commit -m "update"
git commit -m "fix stuff"
git commit -m "WIP"
```

#### 4. Keep Dependencies Updated

```bash
# Check for outdated packages
npm outdated

# Update dependencies
npm update

# Update to latest versions (careful!)
npx npm-check-updates -u
npm install
```

#### 5. Monitor Build Sizes

```bash
# Check bundle sizes locally
npx nx build frontend --configuration=production
du -sh dist/apps/frontend

# Analyze bundle composition
npx vite-bundle-visualizer
```

### For Maintainers

#### 1. Monitor Workflows Regularly

- Check Actions tab daily
- Review failed workflows immediately
- Investigate slow builds
- Monitor artifact sizes

#### 2. Keep Actions Up to Date

```yaml
# Check for action updates
- uses: actions/checkout@v4  # Keep version updated
- uses: actions/setup-node@v4
- uses: actions/upload-artifact@v4
```

#### 3. Manage Secrets Properly

```bash
# GitHub Secrets (Settings → Secrets and variables → Actions)
# Required secrets:
# - GITHUB_TOKEN (automatically provided)
# 
# Optional secrets:
# - CODECOV_TOKEN (for coverage reports)
# - NPM_TOKEN (for private packages)
```

#### 4. Review Security Audits

- Check security audit artifacts weekly
- Address high/critical vulnerabilities immediately
- Document accepted risks for unfixable issues
- Keep dependencies updated

#### 5. Optimize CI Performance

```yaml
# Use caching
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    cache: 'npm'  # Cache node_modules

# Run jobs in parallel
jobs:
  quality:
    # Independent job
  test:
    # Independent job
  build:
    needs: [quality, test]  # Depends on others
```

## Troubleshooting

### Common Issues and Solutions

#### Issue: CI Fails on Type Checking

**Symptoms**:
```
error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'
```

**Solutions**:
```bash
# Run type checking locally
npx nx run-many --target=typecheck --all

# Fix type errors
# Then commit and push
```

#### Issue: Tests Fail in CI but Pass Locally

**Possible Causes**:
- Environment differences
- Missing environment variables
- Race conditions
- Date/time dependencies

**Solutions**:
```bash
# Use same Node version as CI
nvm use 20

# Clear cache
rm -rf node_modules/.cache
npm ci

# Run tests in CI mode
CI=true npx nx test frontend
```

#### Issue: Build Size Too Large

**Symptoms**:
```
Warning: Build size exceeds recommended limit
dist/apps/frontend: 5.2M (recommended: < 3M)
```

**Solutions**:
```bash
# Analyze bundle
npx vite-bundle-visualizer

# Common optimizations:
# 1. Code splitting
# 2. Lazy loading routes
# 3. Optimize images
# 4. Remove unused dependencies

# Check for large dependencies
npx npx depsize

# Tree-shake unused code
# Enable in vite.config.ts:
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
      },
    },
  },
}
```

#### Issue: Deployment Fails

**Symptoms**:
```
Error: Failed to deploy to GitHub Pages
```

**Solutions**:
1. **Check GitHub Pages Settings**:
   - Go to Settings → Pages
   - Ensure "Source" is set to "GitHub Actions"

2. **Verify Permissions**:
   - Settings → Actions → General
   - Ensure "Read and write permissions" is enabled

3. **Check Base Path**:
   ```typescript
   // vite.config.ts
   base: mode === 'production' ? '/makeadate/' : '/',
   ```

4. **Verify Build Output**:
   ```bash
   # Build locally
   npx nx build frontend --configuration=production
   
   # Check output
   ls -la dist/apps/frontend
   ```

#### Issue: Security Audit Fails

**Symptoms**:
```
found 5 vulnerabilities (2 moderate, 3 high)
```

**Solutions**:
```bash
# View details
npm audit

# Fix automatically fixable issues
npm audit fix

# Fix including breaking changes (test thoroughly!)
npm audit fix --force

# If unfixable:
# 1. Check if update is available
npm outdated

# 2. Check for alternative packages
# 3. Document accepted risk
# 4. Consider --audit-level=high to ignore moderate
```

### Getting Help

1. **Check Workflow Logs**:
   - Go to Actions tab
   - Click on failed workflow
   - Review job logs for errors

2. **Search Issues**:
   - Check GitHub Issues
   - Search for similar problems

3. **Ask for Help**:
   - Open a new GitHub Issue
   - Include workflow run link
   - Provide error messages
   - Share relevant code

## Performance Optimization

### CI Performance

**Current Performance**:
- Quality: ~2-3 minutes
- Tests: ~3-5 minutes (per Node version)
- Build: ~4-6 minutes (per Node version)
- Security: ~2-3 minutes
- **Total: ~15-20 minutes**

**Optimization Tips**:

1. **Parallel Execution**:
   ```yaml
   run: npx nx run-many --target=test --all --parallel=3
   ```

2. **Caching**:
   ```yaml
   - uses: actions/setup-node@v4
     with:
       cache: 'npm'
   ```

3. **Skip Redundant Runs**:
   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```

4. **Conditional Steps**:
   ```yaml
   - name: Upload artifacts
     if: matrix.node-version == '20.x'
   ```

### Build Performance

```bash
# Measure build time
time npx nx build frontend --configuration=production

# Analyze what's slow
npx nx build frontend --configuration=production --verbose

# Optimize dependencies
npm prune
npm dedupe
```

## Related Documentation

- [GitHub Workflows README](../.github/workflows/README.md)
- [API Logger Documentation](./API_LOGGER.md)
- [Architecture Documentation](../ARCHITECTURE.md)
- [API Endpoints](../API_ENDPOINTS.md)

---

**Questions?** Open an issue or check the [main documentation](../README.md).

