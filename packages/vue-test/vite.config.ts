import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

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
  resolve: {
    preserveSymlinks: true,
  },
  build: {
    chunkSizeWarningLimit: 2000,
  },
});
