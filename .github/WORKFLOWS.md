# 🔄 GitHub Workflows Documentation

This directory contains automated CI/CD workflows for the Make A Date project, inspired by best practices from modern React deployments.

## 📋 Available Workflows

### 🔍 CI - Continuous Integration (`ci.yml`)

**Triggers:** 
- Push to `main`, `master`, or `develop`
- Pull requests to `main`, `master`, or `develop`

**Purpose:** Comprehensive code quality checks and testing

**Jobs:**

#### 1. 🧹 Code Quality
- **TypeScript Check:** Validates type safety across the codebase
- **Build Check:** Ensures the application compiles successfully

#### 2. 🧪 Tests
- **Unit Tests:** Runs all frontend tests (currently configured with `--passWithNoTests`)
- **Dependencies:** Runs after code quality checks pass

#### 3. 🔒 Security Audit
- **npm Audit:** Scans for known vulnerabilities in dependencies
- **Security Report:** Displays any moderate or higher severity issues

**Badge:**
```markdown
![CI](https://github.com/Alexaslastina/makeadate/workflows/CI/badge.svg)
```

---

### 🚀 Deploy to GitHub Pages (`deploy.yml`)

**Triggers:**
- Push to `main` or `master` branch
- Manual workflow dispatch

**Purpose:** Automated deployment to GitHub Pages

**Jobs:**

#### 1. 🏗️ Build Frontend
- Installs dependencies with npm ci
- Builds for production with optimization
- Analyzes build size and largest files
- Verifies build output (checks for index.html)
- Uploads build artifact for deployment

#### 2. 🌐 Deploy to Pages
- Downloads the build artifact
- Configures GitHub Pages
- Uploads to GitHub Pages
- Deploys the application
- Reports deployment URL

**Deployment URL:** `https://alexaslastina.github.io/makeadate/`

**Badge:**
```markdown
![Deploy](https://github.com/Alexaslastina/makeadate/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)
```

---

### ✅ PR Check (`pr-check.yml`)

**Triggers:** Pull requests (opened, synchronized, reopened)

**Purpose:** Validate PRs before merging

**Jobs:**

#### Validate PR
- TypeScript type checking
- Build verification
- Test execution
- Build size analysis
- Automated PR comment with build status

**Features:**
- Posts build status and size to PR comments
- Provides feedback before merge
- Ensures deployment readiness

---

## 🔧 GitHub Pages Setup

### Required Configuration

1. **Enable GitHub Pages:**
   - Go to: `Settings` → `Pages`
   - **Source:** Select "**GitHub Actions**"
   - Save changes

2. **Verify Permissions:**
   - Go to: `Settings` → `Actions` → `General`
   - **Workflow permissions:** "Read and write permissions"
   - Enable: "Allow GitHub Actions to create and approve pull requests"

### Base Path Configuration

The application is configured for GitHub Pages subdirectory deployment:

```typescript
// apps/frontend/vite.config.ts
base: mode === 'production' ? '/makeadate/' : '/',
```

This ensures all assets (CSS, JS, images) load correctly at:
`https://alexaslastina.github.io/makeadate/`

---

## 📊 Deployment Process

### Automatic Deployment

```
Push to main
    ↓
├── CI Workflow (Quality + Tests + Security)
│   ├── TypeScript Check ✓
│   ├── Build Verification ✓
│   ├── Run Tests ✓
│   └── Security Audit ✓
    ↓
└── Deploy Workflow
    ├── Build for Production
    ├── Size Analysis
    ├── Verify Output
    ├── Upload Artifact
    └── Deploy to GitHub Pages
        ↓
    Live at: https://alexaslastina.github.io/makeadate/
```

### Manual Deployment

1. Go to **Actions** tab in GitHub
2. Select "**Deploy to GitHub Pages**" workflow
3. Click "**Run workflow**"
4. Select branch (usually `main`)
5. Click "**Run workflow**" button

---

## 🧪 Local Testing

### Test Production Build

```bash
# Build for production
npx nx build frontend --configuration=production

# Check build size
du -sh dist/frontend

# Preview production build locally
cd dist/frontend
npx serve -s . -p 3000
```

Visit: `http://localhost:3000/makeadate/`

### Test Development Build

```bash
# Start dev server
npx nx serve frontend
```

Visit: `http://localhost:4200`

### Run Quality Checks Locally

```bash
# TypeScript check
cd apps/frontend && npx tsc --noEmit

# Security audit
npm audit --audit-level=moderate

# Run tests
npx nx test frontend
```

---

## 📦 Build Artifacts

### CI Workflow Artifacts
- **Not stored** - Only runs checks

### Deploy Workflow Artifacts
- **Name:** `frontend-build`
- **Contents:** Complete production build
- **Retention:** 7 days
- **Download:** From workflow run page in Actions tab

### GitHub Pages Artifacts
- **Managed automatically** by GitHub Pages
- **Stored in:** GitHub Pages deployment history
- **Accessible at:** Repository Settings → Environments → github-pages

---

## 🔍 Monitoring Deployments

### Check Deployment Status

1. **Actions Tab:** `https://github.com/Alexaslastina/makeadate/actions`
   - View all workflow runs
   - Check build logs
   - Download artifacts

2. **Environments:** `Settings` → `Environments`
   - View deployment history
   - See active deployments
   - Check deployment protection rules

3. **Pages Settings:** `Settings` → `Pages`
   - View current deployment
   - See live URL
   - Configure custom domain (optional)

### Build Metrics

Each deployment reports:
- 📦 Total build size
- 📄 Top 10 largest files
- ⏱️ Build time
- ✅ Verification status

---

## ⚠️ Troubleshooting

### Build Fails

**Symptoms:** Red X on workflow run

**Common Causes:**
1. TypeScript errors in code
2. Missing dependencies
3. Build configuration issues

**Solutions:**
```bash
# Check TypeScript errors locally
cd apps/frontend && npx tsc --noEmit

# Clear cache and reinstall
rm -rf node_modules/.cache
npm ci

# Test build locally
npx nx build frontend --configuration=production
```

### Deployment Fails

**Symptoms:** Build succeeds but deployment fails

**Solutions:**
1. Verify GitHub Pages is enabled (Settings → Pages)
2. Check workflow permissions (Settings → Actions → General)
3. Ensure `GITHUB_TOKEN` has Pages write permissions
4. Review deployment logs in Actions tab

### Assets Not Loading

**Symptoms:** Site loads but images/CSS missing

**Solutions:**
1. Verify `base` path in `vite.config.ts` is `/makeadate/`
2. Check all asset imports use relative paths
3. Ensure images are in `apps/frontend/src/assets/` or `apps/frontend/public/`
4. Clear browser cache and reload

### Security Audit Warnings

**Symptoms:** Security job shows vulnerabilities

**Solutions:**
```bash
# View detailed audit report
npm audit

# Fix fixable issues
npm audit fix

# For breaking changes (careful!)
npm audit fix --force
```

---

## 🎯 Best Practices

### Before Pushing to Main

- ✅ Run tests locally: `npx nx test frontend`
- ✅ Check TypeScript: `cd apps/frontend && npx tsc --noEmit`
- ✅ Build locally: `npx nx build frontend --configuration=production`
- ✅ Preview build: Test with `npx serve` in dist/frontend

### Before Merging PRs

- ✅ Ensure all checks pass (green checkmarks)
- ✅ Review build size in PR comment
- ✅ Test changes in preview build (if available)
- ✅ Review code changes thoroughly

### After Deployment

- ✅ Visit deployed site: `https://alexaslastina.github.io/makeadate/`
- ✅ Test all routes: /, /about, /gallery, /faq, /contact, /rooftop, /amusement
- ✅ Verify images load correctly
- ✅ Test mobile responsiveness
- ✅ Check console for errors (F12)

---

## 🔐 Security

### Workflow Permissions

Workflows use minimal required permissions:

```yaml
permissions:
  contents: read      # Read repository code
  pages: write        # Deploy to GitHub Pages
  id-token: write     # OIDC authentication
```

### Secrets

No secrets are required for basic deployment. All configuration is public and version-controlled.

---

## 📈 Performance

### Build Optimization

- ✅ Vite automatically optimizes builds
- ✅ Tree-shaking removes unused code
- ✅ Code splitting for better loading
- ✅ Asset compression (gzip)
- ✅ Minification of JS and CSS

### Current Metrics

- **Build time:** ~4-5 seconds
- **JS Bundle:** ~282 KB (gzipped: ~92 KB)
- **CSS Bundle:** ~238 KB (gzipped: ~33 KB)
- **Total size:** ~8 MB (includes images)

---

## 🎨 Workflow Badges

Add these badges to your README.md:

```markdown
[![CI](https://github.com/Alexaslastina/makeadate/workflows/CI/badge.svg)](https://github.com/Alexaslastina/makeadate/actions/workflows/ci.yml)
[![Deploy](https://github.com/Alexaslastina/makeadate/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/Alexaslastina/makeadate/actions/workflows/deploy.yml)
```

---

## 🚀 Future Enhancements

Consider adding:

- [ ] E2E tests with Playwright or Cypress
- [ ] Visual regression testing
- [ ] Lighthouse CI for performance scoring
- [ ] Dependabot for automated dependency updates
- [ ] Preview deployments for PRs (using Vercel or Netlify)
- [ ] Build caching to speed up CI

---

## 📞 Support

### Resources

- **GitHub Actions Docs:** https://docs.github.com/en/actions
- **GitHub Pages Docs:** https://docs.github.com/en/pages
- **Nx Documentation:** https://nx.dev
- **Vite Documentation:** https://vitejs.dev

### Getting Help

1. Check workflow logs in the **Actions** tab
2. Review this documentation
3. Check GitHub Pages status page
4. Open an issue in the repository

---

## ✨ Summary

Your project now has:

- ✅ **Automated CI** with quality checks, tests, and security audits
- ✅ **Automated deployment** to GitHub Pages on every push to main
- ✅ **PR validation** with automated comments and build verification
- ✅ **Build artifacts** stored for 7 days
- ✅ **Comprehensive monitoring** and troubleshooting guides

All workflows are:
- 🎯 Simple and maintainable
- 📝 Well-documented
- 🚀 Production-ready
- 🔒 Secure by default

**Live URL:** https://alexaslastina.github.io/makeadate/

