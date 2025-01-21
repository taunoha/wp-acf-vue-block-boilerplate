import { fileURLToPath, URL } from 'url';
import path from 'path';

import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import vue from '@vitejs/plugin-vue';
import gettextExtractorForWordpress from './vite-plugins/gettext-extractor-for-wordpress.js'

const filename = '{block-slug}';

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ['vue','@vueuse/core'],
      dirs: [
        './src/utils/**',
        './src/composables/**',
      ],
      vueTemplate: true,
    }),
    Components({
      deep: true,
      directoryAsNamespace: true,
    }),
    gettextExtractorForWordpress({
      path: path.resolve(__dirname, 'languages/'),
      domain: '{block-text-domain}'
    })
  ],
  server: {
    hmr: false
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      name: '{block-library-name}',
      entry: path.resolve(__dirname, `src/main.js`),
      formats: ['iife'],
      fileName: () => `${filename}.js`
    },
    rollupOptions: {
      output: {
        extend: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') {
            return `${filename}.css`;
          }
          return assetInfo.name;
        },
      }
    }
  }
});
