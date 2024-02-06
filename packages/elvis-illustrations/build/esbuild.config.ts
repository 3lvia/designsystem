import esbuild from 'esbuild';
import chalk from 'chalk';

import fs from 'fs/promises';
import generateIllustrations from './generateIllustrations.config';

const cleanDistFolder = async () => {
  await fs.rm('dist', { recursive: true, force: true });
};

export const build = async () => {
  const watchMode = process.argv.includes('--watch');

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: ['src/*'],
    outdir: 'dist',
    bundle: false,
    format: 'esm',
    write: true,
    plugins: [],
  };

  if (watchMode) {
    console.log('👀 Starting watch...');
    const esBuildContext = await esbuild.context({
      ...baseConfig,
      sourcemap: true,
      logLevel: 'info',
    });

    return Promise.all([esBuildContext.watch()]);
  } else {
    console.log('🧹 Removing old dist folder...');
    await cleanDistFolder();

    console.log('📦 Building illustrations...');
    const start = Date.now();
    return Promise.all([
      esbuild.build(baseConfig),
      generateIllustrations({ outDir: 'dist', watch: watchMode }),
    ]).then(() => console.log(chalk.green(`⚡️ Built N illustrations in ${Date.now() - start}ms`)));
  }
};
build();
