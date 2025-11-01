# CI/CD Documentation

## Overview

This project uses GitHub Actions for Continuous Integration and Continuous Deployment.

## Workflows

### 1. CI Workflow (`.github/workflows/ci.yml`)

**Trigger:** Push or PR to `main`, `master`, or `develop` branches

**Jobs:**
- **Build and Test**
  - Runs on Node.js 18.x and 20.x
  - Installs dependencies
  - Builds the frontend application
  - Uploads build artifacts
  - Reports build size and largest files

**Badge:** 
```markdown
![CI](https://github.com/Alexaslastina/makeadate/workflows/CI/badge.svg)
```

### 2. Deploy Workflow (`.github/workflows/deploy.yml`)

**Trigger:** Push to `main` or `master` branch, or manual dispatch

**Jobs:**
- **Build**
  - Builds the application for production
  - Configures GitHub Pages
  - Uploads artifacts for deployment
  
- **Deploy**
  - Deploys to GitHub Pages
  - Available at: https://alexaslastina.github.io/makeadate/

**Badge:**
```markdown
![Deploy](https://github.com/Alexaslastina/makeadate/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

### 3. PR Check Workflow (`.github/workflows/pr-check.yml`)

**Trigger:** Pull request opened, synchronized, or reopened

**Jobs:**
- **Validate PR**
  - Builds the application
  - Checks for TypeScript errors
  - Verifies build output
  - Analyzes bundle size
  - Comments on PR with build information

## GitHub Pages Setup

### Required Repository Settings

1. **Enable GitHub Pages:**
   - Go to: `Settings` → `Pages`
   - Source: `GitHub Actions`

2. **Branch Protection (Optional but Recommended):**
   - Go to: `Settings` → `Branches`
   - Add rule for `main` branch:
     - Require pull request reviews
     - Require status checks to pass (CI)
     - Require conversation resolution

### Base Path Configuration

The application is configured to work with GitHub Pages subdirectory:

```typescript
// apps/frontend/vite.config.ts
base: mode === 'production' ? '/makeadate/' : '/',
```

This ensures all asset paths are correctly resolved when deployed to GitHub Pages.

## Deployment Process

### Automatic Deployment

1. Merge PR to `main` branch
2. Deploy workflow automatically triggers
3. Build process runs
4. Application deploys to GitHub Pages
5. Live at: https://alexaslastina.github.io/makeadate/

### Manual Deployment

1. Go to `Actions` tab
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select branch (usually `main`)
5. Click "Run workflow" button

## Local Testing

### Test Production Build

```bash
# Build for production
npx nx build frontend --mode=production

# Preview production build locally
cd dist/frontend
npx serve -s . -p 3000
```

Visit: http://localhost:3000/makeadate/

### Test Development Build

```bash
# Start dev server
npx nx serve frontend
```

Visit: http://localhost:4200

## Build Artifacts

### CI Workflow Artifacts

- **Name:** `dist-frontend`
- **Contents:** Built application
- **Retention:** 7 days
- **Download:** From workflow run page

### Deploy Workflow Artifacts

- **Name:** Automatically managed by GitHub Pages
- **Location:** Deployed to `gh-pages` branch (automatic)

## Environment Variables

Currently, no environment variables are required. All configuration is handled through:

- `vite.config.ts` - Build configuration
- `package.json` - Dependencies
- Nx workspace configuration

## Troubleshooting

### Build Fails

1. Check Node.js version (18.x or 20.x required)
2. Verify all dependencies are in `package.json`
3. Clear cache: `rm -rf node_modules/.cache`
4. Reinstall: `rm -rf node_modules && npm install`

### Deployment Fails

1. Verify GitHub Pages is enabled
2. Check workflow permissions (Settings → Actions → General)
3. Ensure `GITHUB_TOKEN` has Pages permissions
4. Review workflow logs for specific errors

### Assets Not Loading

1. Verify `base` path in `vite.config.ts` matches repository name
2. Check that assets are properly imported in React components
3. Ensure images are in `src/assets/` directory

## Monitoring

### Check Deployment Status

1. **Actions Tab:** View all workflow runs
2. **Environments:** See deployment history (Settings → Environments)
3. **Pages:** View current deployment (Settings → Pages)

### Build Metrics

Each CI run reports:
- Total build size
- Largest files in build
- Build time
- Node.js version used

## Best Practices

### Before Merging

1. ✅ Ensure PR checks pass
2. ✅ Review build size report
3. ✅ Test locally with production build
4. ✅ Review TypeScript errors (if any)

### After Deployment

1. ✅ Visit deployed site
2. ✅ Test all routes
3. ✅ Verify images load correctly
4. ✅ Check responsive design
5. ✅ Test navigation and forms

## Security

### Permissions

Workflows have minimal required permissions:
- `contents: read` - Read repository contents
- `pages: write` - Deploy to GitHub Pages
- `id-token: write` - OIDC authentication

### Secrets

No secrets are required for basic deployment. All configuration is public.

## Performance

### Build Optimization

- Vite automatically optimizes builds
- Tree-shaking removes unused code
- Code splitting for better loading
- Asset compression (gzip)

### Current Metrics

- **Build time:** ~3-5 seconds
- **Bundle size:** ~280KB (gzipped: ~92KB)
- **Assets:** Images optimized, served as-is

## Future Improvements

Consider adding:
- [ ] E2E tests with Playwright/Cypress
- [ ] Visual regression testing
- [ ] Lighthouse CI for performance checks
- [ ] Automated dependency updates (Dependabot)
- [ ] Preview deployments for PRs
- [ ] Caching for faster builds

## Support

For issues with CI/CD:
1. Check workflow logs in Actions tab
2. Review this documentation
3. Check GitHub Pages status
4. Open an issue in the repository

