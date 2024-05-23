import chalk from 'chalk';
import esbuild from 'esbuild';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
import fs from 'node:fs';
import path from 'node:path';
import tinyGlob from 'tiny-glob';

import cleanDistFolders from './cleanDist';
import dtsPlugin from './dts.plugin';
import emotionPlugin from './esbuild-plugin-emotion';
import buildToolbox from './toolbox-build.config';
import { toInOutTuple } from './utils';
import buildWebComponents from './web-component-build.config';
import writeFilesAndInjectCssPlugin from './write.plugin';

interface ComponentData {
  component: string;
  content: Record<string, any>;
}

const rootDir = 'components';

const getComponentData = async () => {
  const paths = await tinyGlob('components/*/package.json');

  // Exclude elvis-toolbox from the main build because it needs to be built without bundling
  // to support tree-shaking. It has a separate build script.
  return paths
    .filter((packageJsonPath) => !packageJsonPath.includes('elvis-toolbox'))
    .map((packageJsonPath) => {
      const file = fs.readFileSync(packageJsonPath, 'utf-8');
      return { content: JSON.parse(file), component: packageJsonPath.split(path.sep)[1] };
    });
};

const getEntryPoint = (componentData: ComponentData) => {
  return path.join('components', componentData.component, componentData.content.source);
};

const getAllDependencies = (componentDataList: ComponentData[]) => {
  return componentDataList
    .flatMap((c) => Object.keys(c.content.dependencies))
    .reduce((list, dep) => {
      if (!list.includes(dep)) {
        list.push(dep);
      }
      return list;
    }, [] as string[]);
};

export const build = async () => {
  const watchMode = process.argv.includes('--watch');

  const typePaths = await tinyGlob('components/elvis-*/src/react/*.{public,types}.ts*');
  const componentDataList = await getComponentData();
  const paths = typePaths.concat(componentDataList.map(getEntryPoint)).map((path) => toInOutTuple(path));
  const dependencies = getAllDependencies(componentDataList);

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths,
    outdir: rootDir,
    bundle: true,
    format: 'esm',
    external: dependencies,
    write: false,
    plugins: [
      dtsPlugin({ watchMode: watchMode }),
      emotionPlugin(),
      styledComponentsPlugin({ ssr: true, displayName: true }),
      sassPlugin({ transform: postcssModules({}) }),
      writeFilesAndInjectCssPlugin,
    ],
  };

  if (watchMode) {
    console.log('👀 Starting watch...');
    if (process.argv.includes('--clean')) {
      console.log('🧹 Removing old dist folders...');
      await cleanDistFolders();
    }
    const esBuildContext = await esbuild.context({
      ...baseConfig,
      sourcemap: true,
      logLevel: 'info',
    });

    return Promise.all([
      esBuildContext.watch(),
      buildWebComponents({ outDir: rootDir, watch: watchMode }),
      buildToolbox({ outDir: rootDir, watch: watchMode }),
    ]);
  } else {
    console.log('🧹 Removing old dist folders...');
    await cleanDistFolders();

    console.log('📦 Building components...');
    const start = Date.now();
    return Promise.all([
      esbuild.build(baseConfig),
      buildWebComponents({ outDir: rootDir, watch: watchMode }),
      buildToolbox({ outDir: rootDir, watch: watchMode }),
    ]).then(() =>
      console.log(chalk.green(`⚡️ Built ${componentDataList.length} components in ${Date.now() - start}ms`)),
    );
  }
};
build();
