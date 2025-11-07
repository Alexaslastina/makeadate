/// <reference types='vitest' />
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(({ mode }) => {
  // For GitHub Pages, use the VITE_BASE_URL env var if set, otherwise use '/'
  // This allows dynamic configuration from GitHub Actions or local .env files
  const base = process.env.VITE_BASE_URL || '/';
  
  console.log('Building with base URL:', base);
  
  // Plugin to replace %VITE_BASE_URL% in HTML with the actual base URL
  const htmlBaseUrlPlugin = (): Plugin => ({
    name: 'html-base-url',
    transformIndexHtml(html) {
      return html.replace(/%VITE_BASE_URL%/g, base);
    },
  });
  
  return {
    root: __dirname,
    base: base,
    cacheDir: '../../node_modules/.vite/frontend',
    server:{
      port: 4200,
      host: 'localhost',
    },
    preview:{
      port: 4200,
      host: 'localhost',
    },
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md']), htmlBaseUrlPlugin()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
      outDir: '../../dist/frontend',
      emptyOutDir: true,
      reportCompressedSize: true,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
  };
});
