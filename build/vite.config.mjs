import { defineConfig } from 'vite';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const calendarFile = resolve('src/Kinderfoor-Kuurne-2026.ics');

export default defineConfig({
  root: 'src',
  plugins: [
    {
      name: 'copy-calendar-file',
      generateBundle() {
        this.emitFile({
          type: 'asset',
          fileName: 'Kinderfoor-Kuurne-2026.ics',
          source: readFileSync(calendarFile)
        });
      }
    }
  ],
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
        'kinderfoor-2028': resolve('src/kinderfoor-2028.html'),
        'sponsors': resolve('src/sponsors.html')
      }
    }
  }
});
