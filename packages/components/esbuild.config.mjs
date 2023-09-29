import esbuild from 'esbuild';
import { dtsPlugin } from './dts.plugin.mjs';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import tinyGlob from 'tiny-glob';
import fs from 'fs';
import crypto from 'crypto';

const tmpOutputFolder = 'tmp-public-api-output';

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

const getPackageJsons = async () => {
  const paths = await tinyGlob('components/elvis-*/package.json');
  return paths.map((path) => {
    const file = fs.readFileSync(path, 'utf-8');
    return { content: JSON.parse(file), component: path.split('/')[1] };
  });
};

const getEntryPoint = (componentData) => {
  return `components/${componentData.component}/${componentData.content.source}`;
};

const getAllDependencies = (componentDataList) => {
  const dependencies = componentDataList.flatMap((c) => Object.keys(c.content.dependencies));
  return Array.from(new Set(dependencies));
};

const moveTypingsToComponentFolders = {
  name: 'move-public-api-files',
  setup(build) {
    build.onEnd(async () => {
      const paths = await tinyGlob(`${tmpOutputFolder}/**/*.{public,types}.{d.ts,js}`);

      paths.forEach((filePath) => {
        const componentFolder = filePath.split('/')[1];
        const isReactTypes = filePath.includes('.types');
        const isDTs = filePath.endsWith('.d.ts');

        const newDir = `components/${componentFolder}/dist/${isReactTypes ? 'react' : 'public-api'}`;
        const newFileName = `${isReactTypes ? 'types' : 'public-api'}.${isDTs ? 'd.ts' : 'js'}`;

        const newPath = `${newDir}/${newFileName}`;

        if (getMd5(filePath) !== getMd5(newPath)) {
          fs.mkdirSync(newDir, { recursive: true });
          fs.renameSync(filePath, newPath);
        }
      });

      fs.rmSync(tmpOutputFolder, { force: true, recursive: true });
    });
  },
};

const changePublicApiImportPath = {
  name: 'move-public-api-files',
  setup(build) {
    build.onEnd(async () => {
      const paths = await tinyGlob(`${tmpOutputFolder}/**/*.types.{d.ts,js}`);

      paths.forEach((filePath) => {
        let file = fs.readFileSync(filePath, 'utf-8');
        file = file.replace(/\.\/publicApi.public/g, '../public-api/public-api');
        fs.writeFileSync(filePath, file, 'utf-8');
      });
    });
  },
};

const toInOutTuple = (path) => {
  const componentFolder = path.split('/')[1];
  const subFolder = path.includes('.public.') ? 'public-api' : 'react';
  const fileName = path.includes('.types.') ? 'types' : path.includes('.public.') ? 'public-api' : 'react';

  return { in: path, out: `${componentFolder}/dist/${subFolder}/${fileName}` };
};

(async () => {
  const watchMode = process.argv.includes('--watch');

  const typePaths = await tinyGlob('components/elvis-*/src/react/*.{public,types}.ts*');
  const pckJsons = await getPackageJsons();
  const paths = typePaths.concat(pckJsons.map(getEntryPoint)).map(toInOutTuple);
  const dependencies = getAllDependencies(pckJsons);

  if (watchMode) {
    const esBuildContext = await esbuild.context({
      entryPoints: paths,
      outdir: tmpOutputFolder,
      sourcemap: true,
      logLevel: 'info',
      bundle: true,
      format: 'esm',
      external: dependencies,
      plugins: [styledComponentsPlugin({ ssr: true }), dtsPlugin()],
    });
    esBuildContext.watch();
  } else {
    esbuild.build({
      entryPoints: paths,
      outdir: tmpOutputFolder,
      minify: false,
      logLevel: 'info',
      bundle: true,
      format: 'esm',
      external: dependencies,
      plugins: [styledComponentsPlugin({ ssr: true }), dtsPlugin()],
    });
  }
})();
