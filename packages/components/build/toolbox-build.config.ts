import esbuild from 'esbuild';
import tinyGlob from 'tiny-glob';

import dtsPlugin from './dts.plugin';
import emotionPlugin from './esbuild-plugin-emotion';
import { toInOutTuple } from './utils';

const buildToolbox = async (config: {
  outDir: string;
  watch: boolean;
}): Promise<esbuild.BuildResult | void> => {
  const toolboxSrcPaths = await tinyGlob('components/elvis-toolbox/src/**/*.ts*');
  const paths = toolboxSrcPaths.map((path) => toInOutTuple(path));

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths,
    outdir: config.outDir,
    format: 'esm',
    plugins: [dtsPlugin({ watchMode: config.watch, silent: true }), emotionPlugin()],
  };

  if (config.watch) {
    const esBuildContext = await esbuild.context(baseConfig);
    return esBuildContext.watch();
  } else {
    return esbuild.build(baseConfig);
  }
};

export default buildToolbox;
