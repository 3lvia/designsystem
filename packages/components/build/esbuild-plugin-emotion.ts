import { transformFileAsync } from '@babel/core';
import { type ParserPlugin } from '@babel/parser';
import emotion from '@emotion/babel-plugin';
import { type Plugin } from 'esbuild';

// Based on the source code from esbuild-plugin-styled-components
const esbuildPluginEmotion = (): Plugin => ({
  name: 'emotion',
  setup: ({ onLoad, initialOptions }) => {
    const root = process.cwd();
    onLoad({ filter: /\.[tj]sx?$/ }, async (args) => {
      // Determine plugins to use
      const plugins = [
        'importMeta',
        'topLevelAwait',
        'classProperties',
        'classPrivateProperties',
        'classPrivateMethods',
      ] as ParserPlugin[];
      const isJsx = /\.[tj]sx$/.test(args.path);
      if (isJsx) plugins.push('jsx');
      const isTs = /\.tsx?$/.test(args.path);
      if (isTs) plugins.push('typescript');

      // Run the code through babel
      const map = initialOptions.sourcemap !== false;
      const result = await transformFileAsync(args.path, {
        babelrc: false,
        configFile: false,
        ast: false,
        root,
        filename: args.path,
        parserOpts: {
          sourceType: 'module',
          allowAwaitOutsideFunction: true,
          plugins,
        },
        generatorOpts: {
          decoratorsBeforeExport: true,
        },
        plugins: [
          [
            emotion,
            {
              autoLabel: 'always',
            },
          ],
        ],
        sourceMaps: map,
      });

      // If babel fails to return, throw an error
      if (!result) throw new Error(`Babel transformation failed for ${args.path}`);

      // Return the transformed code to esbuild
      return {
        contents:
          result.code +
          (result.map && map
            ? `//# sourceMappingURL=data:application/json;base64,${Buffer.from(
                JSON.stringify(result.map),
              ).toString('base64')}`
            : ''),
        loader: `${isTs ? 'ts' : 'js'}${isJsx ? 'x' : ''}`,
      };
    });
  },
});

export default esbuildPluginEmotion;
