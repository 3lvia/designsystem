import esbuild from 'esbuild';
import dtsPlugin from './dts.plugin.ts';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import cssModulesPlugin from 'esbuild-css-modules-plugin';
import tinyGlob from 'tiny-glob';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

interface ComponentData {
  component: string;
  content: Record<string, any>;
}

const rootDir = 'components';

// We create a hash of the new output to see if it differs from the old
// If the file content is the same, we don't move it. This increases performance.
const getMd5 = (fileName: string) => {
  if (!fs.existsSync(fileName) || fs.statSync(fileName).isDirectory()) {
    return null;
  }

  const hash = crypto.createHash('md5');
  const data = hash.update(fs.readFileSync(fileName) as any, 'utf-8');
  return data.digest('hex');
};

const getComponentData = async () => {
  const paths = await tinyGlob('components/elvis-*/package.json');
  return paths.map((path) => {
    const file = fs.readFileSync(path, 'utf-8');
    return { content: JSON.parse(file), component: path.split('/')[1] };
  });
};

const getEntryPoint = (componentData: ComponentData) => {
  return path.join('components', componentData.component, componentData.content.source);
};

const getAllDependencies = (componentDataList: ComponentData[]) => {
  const dependencies = componentDataList.flatMap((c) => Object.keys(c.content.dependencies));
  return Array.from(new Set(dependencies));
};

const toInOutTuple = (filePath: string) => {
  const fileName = path.parse(filePath).name;
  const componentFolder = filePath.split('/')[1];
  const subFolder = fileName.endsWith('.public') ? 'public-api' : 'react';

  return { in: filePath, out: path.join(componentFolder, 'dist', subFolder, fileName) };
};

export const build = async () => {
  const watchMode = process.argv.includes('--watch');

  const typePaths = await tinyGlob('components/elvis-*/src/react/*.{public,types}.ts*');
  const componentDataList = await getComponentData();
  const paths = typePaths.concat(componentDataList.map(getEntryPoint)).map(toInOutTuple);
  const dependencies = getAllDependencies(componentDataList);

  const baseConfig: esbuild.BuildOptions = {
    entryPoints: paths,
    outdir: rootDir,
    logLevel: 'info',
    bundle: true,
    format: 'esm',
    external: dependencies,
    plugins: [
      dtsPlugin({ destinationDir: rootDir }),
      styledComponentsPlugin({ ssr: true, displayName: true }),
      cssModulesPlugin({ inject: true, localsConvention: 'camelCase' }),
    ],
  };

  if (watchMode) {
    const esBuildContext = await esbuild.context({
      ...baseConfig,
      sourcemap: true,
    });
    esBuildContext.watch();
  } else {
    await esbuild.build({ ...baseConfig, minify: true });
  }
};
build();
