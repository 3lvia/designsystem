import { nodeResolve } from '@rollup/plugin-node-resolve'; // Resolves node_module dependencies on build
import filesize from 'rollup-plugin-filesize'; // Prints filesize
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'src/loader/elvia-loader.js',
  output: {
    file: 'dist/cdn/elvia-loader.js',
    format: 'esm',
  },
  onwarn(warn) {
    console.error(`Error: ${warn.message}`);
  },
  plugins: [nodeResolve(), commonjs(), filesize()],
};
