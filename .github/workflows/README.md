# 🔄 GitHub Workflows

This directory contains automated workflows for the Make a Date project.

## 📋 Available Workflows

### 🔍 CI - Continuous Integration (`ci.yml`)

**Comprehensive code quality, testing, and build verification pipeline**

* **Triggers**: 
  - Push to `main`, `master`, or `develop` branches
  - Pull Requests to `main`, `master`, or `develop` branches
* **Purpose**: Ensure code quality, run tests, and verify builds before deployment
* **Jobs**:
  * 🧹 **Quality**: ESLint + TypeScript type checking across all projects
  * 🧪 **Test**: Unit tests with coverage reports on Node.js 18.x and 20.x
  * 🏗️ **Build**: Production build verification for frontend and API
  * 🔒 **Security**: npm audit security vulnerability scanning

**Features**:
- ✅ Parallel execution for faster feedback
- 🔄 Matrix strategy for multiple Node.js versions
- 📊 Code coverage reports via Codecov
- 🔒 Security vulnerability detection
- 💾 Build artifacts retention (7 days)
- 📈 Build size analysis and reporting

### 🚀 Deploy to GitHub Pages (`deploy.yml`)

**Automated deployment pipeline for the frontend application**

* **Triggers**: 
  - Push to `main` or `master` branch (after CI)
  - Manual dispatch via GitHub Actions UI
* **Purpose**: Deploy frontend to GitHub Pages
* **Jobs**:
  * 🏗️ **Build**: Production build with optimizations
  * 🚀 **Deploy**: Deployment to GitHub Pages

**Features**:
- ✅ Production-optimized builds
- 🔧 Automatic GitHub Pages configuration
- 🌐 Deployment verification and URL confirmation
- 📊 Detailed build size analysis
- 💾 Build artifacts for verification (7 days)
- 📢 Deployment summary in workflow output

**Environment Variables**:
```bash
NODE_ENV=production
VITE_BASE_URL=/makeadate/
VITE_API_BASE_URL=/makeadate/api/
VITE_ENVIRONMENT=production
```

## 🎯 Deployment Process

### Automatic Deployment

1. **Make changes** and commit to a feature branch
2. **Create Pull Request** to `main` branch
3. **CI workflow runs** automatically on PR:
   - Code quality checks
   - Tests execution
   - Build verification
   - Security audit
4. **Merge PR** to `main` once CI passes
5. **Deployment workflow triggers** automatically
6. Frontend is built and deployed to: `https://<username>.github.io/makeadate/`

### Manual Deployment

#### Via GitHub Actions UI

1. Go to repository **Actions** tab
2. Select "🚀 Deploy to GitHub Pages" workflow
3. Click "Run workflow" button
4. Select branch (usually `main`)
5. Click "Run workflow" to start

#### Via GitHub CLI

```bash
# Trigger deployment manually
gh workflow run deploy.yml

# Check workflow status
gh run list --workflow=deploy.yml

# View workflow run details
gh run view
```

## 🔧 Configuration

### GitHub Pages Setup

1. Go to repository **Settings** → **Pages**
2. Set **Source** to "GitHub Actions"
3. The workflow will handle deployment automatically
4. Custom domain configuration (optional):
   - Add `CNAME` file to `apps/frontend/public/`
   - Configure DNS records with your domain provider

### Environment Variables

The workflows use these environment variables for GitHub Pages:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_BASE_URL` | `/makeadate/` | Base path for GitHub Pages subdirectory |
| `VITE_API_BASE_URL` | `/makeadate/api/` | API endpoint path |
| `VITE_ENVIRONMENT` | `production` | Environment identifier |
| `NODE_ENV` | `production` | Node.js environment |

To customize these:
1. Edit the `env` section in `deploy.yml`
2. Update `vite.config.ts` if changing base path
3. Commit and push changes

### Workflow Permissions

Ensure the following permissions are set in **Settings** → **Actions** → **General**:

- ✅ **Read and write permissions**
- ✅ **Allow GitHub Actions to create and approve pull requests**

## 📊 Workflow Status

Monitor workflow runs in the **Actions** tab:

| Status | Meaning |
|--------|---------|
| ✅ Green checkmark | All jobs passed successfully |
| ❌ Red X | One or more jobs failed |
| 🟡 Yellow dot | Workflow in progress |
| ⚪ Gray dot | Workflow not run yet |
| 🔵 Blue dot | Workflow queued |

### Status Badges

Add these to your README:

```markdown
[![CI](https://github.com/<username>/makeadate/workflows/CI/badge.svg)](https://github.com/<username>/makeadate/actions/workflows/ci.yml)
[![Deploy](https://github.com/<username>/makeadate/workflows/Deploy%20to%20GitHub%20Pages/badge.svg)](https://github.com/<username>/makeadate/actions/workflows/deploy.yml)
```

## 🆘 Troubleshooting

### Common Issues

#### ❌ Build Fails

**Problem**: TypeScript errors or build failures

**Solutions**:
1. Check TypeScript errors in CI logs
2. Run locally: `npx nx build frontend --configuration=production`
3. Ensure all dependencies are in `package.json`
4. Clear cache: `rm -rf node_modules/.cache`
5. Reinstall: `rm -rf node_modules && npm install`

#### ❌ Deployment Fails

**Problem**: GitHub Pages deployment errors

**Solutions**:
1. Verify GitHub Pages is enabled in repository settings
2. Check workflow permissions (Settings → Actions → General)
3. Ensure `GITHUB_TOKEN` has Pages write permissions
4. Review workflow logs for specific error messages
5. Verify base path in `vite.config.ts` matches repository name

#### ❌ Tests Fail

**Problem**: Unit tests failing in CI

**Solutions**:
1. Review test output in CI logs
2. Run tests locally: `npx nx test frontend`
3. Check if all test dependencies are installed
4. Verify test environment setup
5. Ensure test files have proper mocks for browser APIs

#### ❌ Assets Not Loading

**Problem**: Images, CSS, or JS not loading on GitHub Pages

**Solutions**:
1. Verify `base` path in `vite.config.ts`:
   ```typescript
   base: mode === 'production' ? '/makeadate/' : '/',
   ```
2. Check asset imports in React components use relative paths
3. Ensure assets are in `apps/frontend/src/assets/`
4. Clear browser cache and hard reload (Ctrl+Shift+R)

#### ❌ Security Audit Fails

**Problem**: npm audit finds vulnerabilities

**Solutions**:
1. Review audit results in workflow logs
2. Update dependencies: `npm update`
3. Fix specific vulnerabilities: `npm audit fix`
4. For unfixable issues, assess risk and document
5. Consider using `npm audit --audit-level=high` for critical only

## 📦 Build Artifacts

### CI Workflow Artifacts

**Frontend Build**:
- **Name**: `dist-frontend`
- **Contents**: Production-ready frontend application
- **Retention**: 7 days
- **Location**: `dist/apps/frontend/` or `dist/frontend/`

**API Build**:
- **Name**: `dist-api`
- **Contents**: Production-ready API application
- **Retention**: 7 days
- **Location**: `dist/apps/api/`

**Security Audit**:
- **Name**: `security-audit`
- **Contents**: npm audit results in JSON format
- **Retention**: 30 days

### Deploy Workflow Artifacts

**Production Build**:
- **Name**: `production-build`
- **Contents**: Deployed frontend build
- **Retention**: 7 days
- **Purpose**: Verification and rollback capability

### Downloading Artifacts

#### Via GitHub UI
1. Go to **Actions** tab
2. Click on a workflow run
3. Scroll to **Artifacts** section
4. Click artifact name to download

#### Via GitHub CLI
```bash
# List artifacts for latest run
gh run view --log

# Download artifacts
gh run download <run-id>
```

## 🔗 Useful Links

* [GitHub Actions Documentation](https://docs.github.com/en/actions)
* [GitHub Pages Documentation](https://docs.github.com/en/pages)
* [Nx Documentation](https://nx.dev/)
* [Vite Documentation](https://vitejs.dev/)
* [React Documentation](https://react.dev/)
* [NestJS Documentation](https://nestjs.com/)

## 📝 Workflow Best Practices

### For Developers

1. **Always create PRs**: Don't push directly to `main`
2. **Wait for CI**: Ensure all checks pass before merging
3. **Review logs**: Check workflow logs for warnings
4. **Keep dependencies updated**: Regular `npm update`
5. **Fix security issues**: Address audit findings promptly

### For Maintainers

1. **Monitor workflows**: Check Actions tab regularly
2. **Update actions**: Keep GitHub Actions up to date
3. **Review artifacts**: Verify build outputs periodically
4. **Manage secrets**: Rotate tokens and secrets regularly
5. **Document changes**: Update this README when changing workflows

## 🎨 Customization

### Adding New Jobs

To add a new job to the CI workflow:

```yaml
new-job:
  name: 🎨 New Job
  runs-on: ubuntu-latest
  needs: [quality, test]  # Optional dependencies
  
  steps:
    - name: 📥 Checkout code
      uses: actions/checkout@v4
    
    - name: 📦 Setup Node.js
      uses: actions/setup-node@v4
      with:
        node-version: '20.x'
        cache: 'npm'
    
    - name: 📚 Install dependencies
      run: npm ci
    
    - name: 🎨 Run custom task
      run: npm run custom-task
```

### Modifying Build Configuration

To change build settings:

1. **Update workflow**: Edit `deploy.yml` environment variables
2. **Update Vite config**: Modify `apps/frontend/vite.config.ts`
3. **Update Nx config**: Modify `apps/frontend/project.json`
4. **Test locally**: Run production build before pushing

### Adding Deployment Environments

To add staging environment:

1. Create new workflow file: `deploy-staging.yml`
2. Change branch trigger to `develop`
3. Update environment variables
4. Configure separate GitHub Pages or hosting

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure CI passes
5. Submit a Pull Request

---

**Need Help?** Open an issue or check the [main documentation](../../README.md).

