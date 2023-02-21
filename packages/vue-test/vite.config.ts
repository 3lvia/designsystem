import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import commonjs from '@rollup/plugin-commonjs';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  optimizeDeps: {
    include: [
      '@elvia/elvis-accordion/react',
      '@elvia/elvis-badge/react',
      '@elvia/elvis-box/react',
      '@elvia/elvis-breadcrumb/react',
      '@elvia/elvis-card/react',
      '@elvia/elvis-carousel/react',
      '@elvia/elvis-chip/react',
      '@elvia/elvis-context-menu/react',
      '@elvia/elvis-datepicker/react',
      '@elvia/elvis-datepicker-range/react',
      '@elvia/elvis-divider/react',
      '@elvia/elvis-dropdown/react',
      '@elvia/elvis-header/react',
      '@elvia/elvis-icon/react',
      '@elvia/elvis-modal/react',
      '@elvia/elvis-pagination/react',
      '@elvia/elvis-popover/react',
      '@elvia/elvis-progress-linear/react',
      '@elvia/elvis-radio-filter/react',
      '@elvia/elvis-segmented-control/react',
      '@elvia/elvis-slider/react',
      '@elvia/elvis-spotlight/react',
      '@elvia/elvis-tabs/react',
      '@elvia/elvis-timepicker/react',
    ],
  },
  build: {
    chunkSizeWarningLimit: 2000,
    rollupOptions: {
      plugins: [commonjs()],
    },
  },
});
