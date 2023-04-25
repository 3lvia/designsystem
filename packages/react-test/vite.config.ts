import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/react-preview/',
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
