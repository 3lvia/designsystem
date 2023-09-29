import tinyGlob from 'tiny-glob';
import { defineConfig } from 'tsup';
import cssModulesPlugin from 'esbuild-css-modules-plugin';
import styledComponentsPlugin from 'esbuild-plugin-styled-components';
import fs from 'fs';

interface ComponentData {
  content: Record<string, any>;
  componentName: string;
}

const getComponentData = async (): Promise<ComponentData[]> => {
  const paths = await tinyGlob('components/elvis-*/package.json');
  const orderedPaths = new Set([
    'components/elvis-component-wrapper/package.json',
    'components/elvis-toolbox/package.json',
    'components/elvis-tooltip/package.json',
    'components/elvis-dropdown/package.json',
    'components/elvis-datepicker/package.json',
    'components/elvis-timepicker/package.json',
    ...paths,
  ]);

  return Array.from(orderedPaths).map((path) => {
    const file = fs.readFileSync(path, 'utf-8');
    return { content: JSON.parse(file), componentName: path.split('/')[1] };
  });
};

const getEntryPoint = (componentData: ComponentData) => {
  return `components/${componentData.componentName}/${componentData.content.source}`;
};

const getAllComponentDependencies = (componentDataList: ComponentData[]) => {
  const dependencies = componentDataList.flatMap((c) => Object.keys(c.content.dependencies));
  return Array.from(new Set(dependencies));
};

const getFileOutPath = (path: string): string => {
  const componentFolder = path.split('/')[1];
  const subFolder = path.includes('.public.') ? 'public-api' : 'react';
  const fileName = path.includes('.types.') ? 'types' : path.includes('.public.') ? 'public-api' : 'react';

  return `${componentFolder}/dist/${subFolder}/${fileName}`;
};

export default defineConfig(async (buildOptions) => {
  const isBuild = !buildOptions.watch;

  const typePaths = await tinyGlob('components/elvis-*/src/react/*.{public,types}.ts*');
  const componentDataList = await getComponentData();
  const paths = componentDataList
    .map(getEntryPoint)
    // .concat(typePaths)
    .reduce((entriesObj, path) => {
      entriesObj[getFileOutPath(path)] = path;
      return entriesObj;
    }, {} as Record<string, string>);

  const dependencies = getAllComponentDependencies(componentDataList);

  return {
    entry: ['./components/elvis-badge/src/react/elvia-badge.tsx'],
    outDir: 'tmp-outdir',
    splitting: false,
    sourcemap: !isBuild,
    watch: !isBuild,
    format: 'esm',
    bundle: true,
    dts: true,
    external: dependencies,
  };
});
