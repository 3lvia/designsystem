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
    include: [
      '@elvia/elvis-accordion',
      '@elvia/elvis-badge',
      '@elvia/elvis-box',
      '@elvia/elvis-breadcrumb',
      '@elvia/elvis-card',
      '@elvia/elvis-carousel',
      '@elvia/elvis-chip',
      '@elvia/elvis-context-menu',
      '@elvia/elvis-datepicker',
      '@elvia/elvis-datepicker-range',
      '@elvia/elvis-divider',
      '@elvia/elvis-dropdown',
      '@elvia/elvis-header',
      '@elvia/elvis-icon',
      '@elvia/elvis-modal',
      '@elvia/elvis-outline',
      '@elvia/elvis-pagination',
      '@elvia/elvis-popover',
      '@elvia/elvis-progress-linear',
      '@elvia/elvis-radio-filter',
      '@elvia/elvis-segmented-control',
      '@elvia/elvis-slider',
      '@elvia/elvis-spotlight',
      '@elvia/elvis-tabs',
      '@elvia/elvis-timepicker',
      '@elvia/elvis-toast',
      '@elvia/elvis-tooltip',
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
});
