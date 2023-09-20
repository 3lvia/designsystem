import { context } from 'esbuild';

(async () => {
  // let entryPoints = await glob('components/elvis-!(component-wrapper)/entry-point.js');
  // let entryPoints = await glob('components/elvis-*/entry-point.js');
  let entryPoints = [
    'components/elvis-tooltip/src/react/config.ts.js',
    'components/elvis-toast/src/react/config.ts',
  ];

  const ctx = await context({
    // entryPoints: ['components/elvis-component-wrapper/entry-point.js', ...entryPoints],
    entryPoints: entryPoints,
    outdir: 'components',
    entryNames: '[dir]/../../dist/web_component/web_component',
    bundle: true,
    external: ['@elvia/elvis-toolbox'],
    format: 'esm',
    minify: false,
    plugins: [],
    logLevel: 'info',
  });

  await ctx.watch();
})();
