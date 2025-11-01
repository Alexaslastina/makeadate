# Base Href Configuration Guide

## Overview

This project is configured to automatically work both locally and when deployed to GitHub Pages. The base href (URL path) is dynamically configured based on the environment.

## How It Works

### Local Development
When running locally with `npm start` or `npm run dev`:
- Base path: `/`
- The app runs at `http://localhost:4200/`
- No environment variables needed

### GitHub Pages Deployment
When deployed via GitHub Actions to GitHub Pages:
- Base path: Automatically set to `/makeadate/` (repository name)
- The app is accessible at `https://Alexaslastina.github.io/makeadate/`
- Environment variable `VITE_BASE_PATH` is set automatically in the CI/CD workflow

## Configuration Files

### 1. `vite.config.ts`
```typescript
const base = process.env.VITE_BASE_PATH || '/';
```
- Uses the `VITE_BASE_PATH` environment variable if set
- Falls back to `/` for local development

### 2. `main.tsx`
```typescript
const basename = import.meta.env.BASE_URL;
```
- Uses Vite's `BASE_URL` which is automatically set from the `base` config
- React Router uses this for all routing

### 3. `.github/workflows/deploy.yml`
```yaml
- name: Build
  run: npm run build
  env:
    VITE_BASE_PATH: /${{ github.event.repository.name }}/
```
- Automatically extracts the repository name from GitHub context
- Sets `VITE_BASE_PATH` dynamically during build

## Testing Locally

### Default (Root Path)
```bash
npm run build
npm run preview
```
Visit: `http://localhost:4200/`

### Test with GitHub Pages Path
```bash
VITE_BASE_PATH=/makeadate/ npm run build
npm run preview
```
Visit: `http://localhost:4200/makeadate/`

## Customization

If you fork this repository or change the repo name, **no code changes are needed**. The GitHub Actions workflow will automatically detect the new repository name and configure the base path accordingly.

### Manual Override (Optional)
If you need to deploy to a custom path, create a `.env` or `.env.local` file:
```bash
VITE_BASE_PATH=/custom-path/
```

## Troubleshooting

### Issue: 404 errors on GitHub Pages
**Solution**: Ensure GitHub Pages is configured to deploy from GitHub Actions:
1. Go to repository Settings > Pages
2. Set Source to "GitHub Actions"

### Issue: Assets not loading on GitHub Pages
**Solution**: Check that the `VITE_BASE_PATH` in the workflow matches your repository name.

### Issue: Routing not working on page refresh
**Solution**: GitHub Pages doesn't support SPA routing by default. You may need to add a custom 404.html that redirects to index.html. This is handled automatically by the current configuration.

## Benefits of This Approach

✅ **Zero Configuration**: Works automatically for any repository name  
✅ **Local Development**: No setup needed, just run and develop  
✅ **CI/CD Ready**: GitHub Actions handles everything automatically  
✅ **Portable**: Fork or rename the repo without code changes  
✅ **Consistent**: Same base path logic throughout the app  

