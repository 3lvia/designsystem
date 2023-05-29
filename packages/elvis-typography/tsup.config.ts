import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  name: '@elvia/elvis-typography',
  entry: ['src/elviaTypography.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  minify: !options.watch,
  dts: true,
}));
