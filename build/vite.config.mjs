import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  root: 'src',
  server: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve('src/index.html'),
        'kinderfoor-2028': resolve('src/kinderfoor-2028.html')
      }
    }
  }
});
