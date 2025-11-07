# GitHub Pages Setup with Base HREF

This document explains how the base href is configured for GitHub Pages deployment.

## Overview

The application is configured to work with GitHub Pages using the repository path `/makeadate/` as the base URL. This setup ensures all assets, routes, and API calls work correctly when deployed.

## Key Configuration Files

### 1. `index.html`
- Added `<base href="%VITE_BASE_URL%" />` tag in the `<head>` section
- The placeholder `%VITE_BASE_URL%` is replaced during build by Vite
- Added SPA routing script to handle GitHub Pages redirects

### 2. `vite.config.ts`
- Configured `base` property to use `VITE_BASE_URL` environment variable
- Created custom plugin `htmlBaseUrlPlugin` to replace `%VITE_BASE_URL%` in HTML
- Falls back to `/` for local development

### 3. `main.tsx`
- `BrowserRouter` uses `basename={import.meta.env.BASE_URL}`
- This ensures all React Router routes respect the base path

### 4. `public/404.html`
- Custom 404 page for GitHub Pages SPA routing
- Redirects to index.html while preserving the original URL
- Required for direct navigation to app routes (e.g., `/makeadate/about`)

### 5. `public/.nojekyll`
- Empty file that prevents GitHub Pages from processing with Jekyll
- Ensures files starting with `_` are not ignored

## Environment Variables

### Production (GitHub Pages)
Set in `.github/workflows/deploy.yml`:
```
VITE_BASE_URL=/makeadate/
VITE_API_BASE_URL=/makeadate/api/
VITE_ENVIRONMENT=production
GITHUB_PAGES=true
```

### Local Development
Default fallbacks in code:
```
VITE_BASE_URL=/
VITE_API_BASE_URL=http://localhost:3001/api/
```

## API Services

Updated API services to use `VITE_API_BASE_URL`:
- `authApi.ts` - Authentication endpoints
- `adminApi.ts` - Admin endpoints

## Navigation

### Header Component
- Uses `useNavigate()` from `react-router-dom` instead of `window.location.href`
- All navigation is handled by React Router, respecting the basename

### Links
- All `<Link>` components from `react-router-dom` automatically use the basename
- No hardcoded absolute paths in the application

## How It Works

### Local Development
1. Run `npx nx serve frontend`
2. App runs at `http://localhost:4200/` (root path)
3. All routes work normally: `/about`, `/gallery`, etc.

### GitHub Pages Deployment
1. GitHub Actions builds with `VITE_BASE_URL=/makeadate/`
2. All assets are prefixed with `/makeadate/`
3. App deploys to `https://alexaslastina.github.io/makeadate/`
4. Routes work correctly: `/makeadate/about`, `/makeadate/gallery`, etc.

### SPA Routing on GitHub Pages

GitHub Pages doesn't natively support SPAs. When a user navigates directly to a route like `/makeadate/about`, GitHub Pages returns a 404. Our solution:

1. **404.html**: Catches 404 errors and redirects to index.html with the path encoded in the query string
2. **index.html script**: Decodes the query string and restores the original URL using `history.replaceState`
3. **React Router**: Takes over and renders the correct route

Example flow:
```
User visits: /makeadate/about
↓
GitHub Pages: 404 Not Found
↓
404.html: Redirects to /makeadate/?/about
↓
index.html script: Restores URL to /makeadate/about
↓
React Router: Renders About page
```

## Testing

### Local Testing
```bash
# Development mode
npx nx serve frontend

# Production build test
VITE_BASE_URL=/makeadate/ npx nx build frontend --configuration=production
npx serve -s dist/frontend -l 4200
```

### Verify Build
After building, check that:
1. `dist/frontend/404.html` exists
2. `dist/frontend/.nojekyll` exists
3. `dist/frontend/index.html` has `<base href="/makeadate/" />`
4. All asset paths in HTML include `/makeadate/` prefix

## Common Issues and Solutions

### Issue: Routes return 404 on refresh
**Solution**: Ensure `404.html` and the redirect script in `index.html` are present

### Issue: Assets not loading
**Solution**: Check that `<base href>` tag is correctly set in `index.html`

### Issue: API calls failing
**Solution**: Verify `VITE_API_BASE_URL` is correctly set in the environment

### Issue: Links not working
**Solution**: Use `<Link>` from `react-router-dom`, not `<a href>`

## Deployment

The app automatically deploys to GitHub Pages when pushing to the `main` branch. The deployment workflow:

1. Installs dependencies (including devDependencies)
2. Verifies Nx installation
3. Builds frontend with production configuration
4. Uploads build artifacts to GitHub Pages
5. Deploys to `https://alexaslastina.github.io/makeadate/`

## References

- [Single Page Apps for GitHub Pages](https://github.com/rafgraph/spa-github-pages)
- [Vite Base URL Configuration](https://vitejs.dev/guide/build.html#public-base-path)
- [React Router Basename](https://reactrouter.com/web/api/BrowserRouter/basename-string)

