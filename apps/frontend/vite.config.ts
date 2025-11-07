/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(({ mode }) => {
  // Determine base URL based on environment
  const isProduction = mode === 'production';
  const base = isProduction ? '/makeadate/' : '/';
  
  // Log environment variables for debugging
  console.log('Building with base URL:', base);
  console.log('VITE_API_BASE_URL:', process.env.VITE_API_BASE_URL);
  console.log('Mode:', mode);
  
  return {
    root: __dirname,
    base: base,
    cacheDir: '../../node_modules/.vite/frontend',
    
    // Explicitly define environment variables for the build
    define: {
      'import.meta.env.VITE_API_BASE_URL': JSON.stringify(
        process.env.VITE_API_BASE_URL || 'http://localhost:3001/api'
      ),
    },
    
    server:{
      port: 4200,
      host: 'localhost',
    },
    preview:{
      port: 4200,
      host: 'localhost',
    },
    plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
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
