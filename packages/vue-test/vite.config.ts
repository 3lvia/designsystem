import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('elvia-'),
        },
      },
    }),
  ],
  optimizeDeps: {
    force: true,
    include: ['@elvia/elvis-colors', '@elvia/elvis-typography', '@elvia/elvis-toolbox'],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
});
