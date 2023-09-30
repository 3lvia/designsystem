import esbuild from 'esbuild';
import { dtsPlugin } from './dts.plugin.mjs';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import tinyGlob from 'tiny-glob';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const rootDir = 'components';

// We create a hash of the new output to see if it differs from the old
// If the file content is the same, we don't move it. This increases performance.
const getMd5 = (fileName) => {
  if (!fs.existsSync(fileName) || fs.statSync(fileName).isDirectory()) {
    return null;
  }

  const hash = crypto.createHash('md5');
  const data = hash.update(fs.readFileSync(fileName), 'utf-8');
  return data.digest('hex');
};

const getComponentData = async () => {
  const paths = await tinyGlob(`${rootDir}/elvis-*/package.json`);
  return paths.map((path) => {
    const file = fs.readFileSync(path, 'utf-8');
    return { content: JSON.parse(file), component: path.split('/')[1] };
  });
};

const getEntryPoint = (componentData) => {
  return path.join(rootDir, componentData.component, componentData.content.source);
};

const getAllDependencies = (componentDataList) => {
  const dependencies = componentDataList.flatMap((c) => Object.keys(c.content.dependencies));
  return Array.from(new Set(dependencies));
};

const toInOutTuple = (filePath) => {
  const fileName = path.basename(filePath);
  const componentFolder = filePath.split('/')[1];
  const subFolder = fileName.includes('.public') ? 'public-api' : 'react';
  const newFileName = fileName.includes('.types')
    ? 'types'
    : fileName.includes('.public')
    ? 'public-api'
    : 'react';

  return { in: filePath, out: path.join(componentFolder, 'dist', subFolder, newFileName) };
};

(async () => {
  const watchMode = process.argv.includes('--watch');

  const typePaths = await tinyGlob(`${rootDir}/elvis-*/src/react/*.{public,types}.ts*`);
  const componentDataList = await getComponentData();
  const paths = typePaths.concat(componentDataList.map(getEntryPoint)).map(toInOutTuple);
  const dependencies = getAllDependencies(componentDataList);

  const baseConfig = {
    entryPoints: paths,
    outdir: rootDir,
    logLevel: 'info',
    bundle: true,
    format: 'esm',
    external: dependencies,
    plugins: [
      dtsPlugin({ destinationDir: rootDir, paths }),
      styledComponentsPlugin({ ssr: true, displayName: true }),
    ],
  };

  if (watchMode) {
    const esBuildContext = await esbuild.context(
      Object.assign(baseConfig, {
        sourcemap: true,
      }),
    );
    esBuildContext.watch();
  } else {
    await esbuild.build(Object.assign(baseConfig, { minify: true }));
  }
})();
