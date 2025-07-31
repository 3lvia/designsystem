import esbuild from 'esbuild';
import fs from 'fs/promises';
import pico from 'picocolors';

import generateIllustrations from './generateIllustrations.config';

const cleanDistFolder = async () => {
  await fs.rm('dist', { recursive: true, force: true });
};

export const build = async () => {
  const watchMode = process.argv.includes('--watch');

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: ['src/**/*.ts'],
    outdir: './dist/common',
    bundle: false,
    format: 'esm',
    write: true,
    plugins: [],
  };

  if (watchMode) {
    console.log('👀 Starting watch...');
    const esBuildContext = await esbuild.context({
      ...baseConfig,
      logLevel: 'info',
    });

    return Promise.all([esBuildContext.watch()]);
  } else {
    console.log('🧹 Removing old dist folder...');
    await cleanDistFolder();

    const numberOfIllustrations = (await fs.readdir('src/illustrations')).filter((name) =>
      name.endsWith('.svg'),
    ).length;

    console.log('📦 Building illustrations...');
    const start = Date.now();
    return Promise.all([
      esbuild.build(baseConfig),
      generateIllustrations({ outDir: 'dist', watch: watchMode }),
    ]).then(() =>
      console.log(pico.green(`⚡️ Built ${numberOfIllustrations} illustrations in ${Date.now() - start}ms`)),
    );
  }
};
build();
