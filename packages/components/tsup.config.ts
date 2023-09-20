import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import { defineConfig } from 'tsup';

export default defineConfig(async (options) => {
  const isBuild = !options.watch;

  return {
    entry: ['index.ts'],
    outDir: 'dist/react',
    sourcemap: !isBuild,
    minify: isBuild,
    bundle: true,
    watch: !isBuild,
    format: 'esm',
    clean: true,
    splitting: false,
    plugins: [styledComponentsPlugin({ ssr: true })],
  };
});
