import { defineConfig } from 'tsup';

export default defineConfig((options) => ({
  name: '@elvia/elvis-colors',
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  sourcemap: true,
  minify: !options.watch,
  dts: !!options.watch, // On build (not watch), declaration files are generated directly from tsc compiler
}));
