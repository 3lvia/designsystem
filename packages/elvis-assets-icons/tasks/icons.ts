import { getThemeColor } from '@elvia/elvis-colors';
import { mkdir, readFile, readdir, rm, writeFile } from 'fs/promises';
import { dest, series, src } from 'gulp';
import { basename } from 'path';
import * as sharp from 'sharp';

import type { IconLabels } from './iconsScss';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const svgmin = require('gulp-svgmin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const icons = require('../config/icons.config') as {
  name: string;
  terms?: string[];
  thirdparty?: {
    name: string | string[];
    duplicate?: string | string[];
  };
  deprecated?: boolean;
  newIconName?: string;
}[];

// Delete unused icons + generated icons
async function clean() {
  let filesToDelete = ['icons/svg/dist/'];
  const unusedFiles = (await findUnusedIconFiles()).map((file) => {
    return `icons/svg/src/${file}`;
  });

  filesToDelete = filesToDelete.concat(unusedFiles);
  return filesToDelete.map((file) => rm(file, { recursive: true, force: true }));
}

async function findUnusedIconFiles() {
  const content = await readdir('./icons/svg/src/');
  const remove: string[] = [];

  content.forEach((icon) => {
    const filename = icon.slice(0, -4);
    if (JSON.stringify(icons).indexOf(filename) === -1) {
      remove.push(icon);
    }
  });

  return remove;
}

function optimizeSVG() {
  const iconsToInclude = icons.map((i) => {
    return `icons/svg/src/${i.name}.svg`;
  });
  return src(iconsToInclude, { allowEmpty: true }).pipe(svgmin()).pipe(dest('icons/svg/dist'));
}

// The following is used to change hard-coded icon colors to use css variables for theme support.
type Variables = `icon-${IconLabels}` | 'brand-accent';
type FillVariablesUnion = `fill="var(--e-color-${Variables}, ${ReturnType<typeof getThemeColor>})"`;
export type FillVariables = { [label in IconLabels]: FillVariablesUnion };

/**
 * These are the string-values that are inserted into the SVGs as replacements for the hard-coded colors.
 */
const fillVariables = {
  'stroke-1': `fill="var(--e-color-icon-stroke-1, ${getThemeColor('icon-stroke-1')})"`,
  'filled-foreground-1': `fill="var(--e-color-icon-filled-foreground-1, ${getThemeColor(
    'icon-filled-foreground-1',
  )})"`,
  'filled-background-1': `fill="var(--e-color-icon-filled-background-1, ${getThemeColor(
    'icon-filled-background-1',
  )})"`,
  'brand-accent': `fill="var(--e-color-brand-accent, ${getThemeColor('brand-accent')})"`,
  positive: `fill="var(--e-color-icon-positive, ${getThemeColor('icon-positive')})"`,
  caution: `fill="var(--e-color-icon-caution, ${getThemeColor('icon-caution')})"`,
  warning: `fill="var(--e-color-icon-warning, ${getThemeColor('icon-warning')})"`,
  danger: `fill="var(--e-color-icon-danger, ${getThemeColor('icon-danger')})"`,
} as const satisfies FillVariables;

/**
 * Replace colors in a stringified SVG with css variables.
 */
function getIconWithCssVariables(icon: string, iconName: string) {
  const newIcon = icon
    .replace(/fill="#29D305"/g, fillVariables['brand-accent'])
    .replace(/fill="#FFFF00"/g, fillVariables.caution)
    .replace(/fill="#FFA000"/g, fillVariables.warning)
    .replace(/fill="#EE0701"/g, fillVariables.danger);
  if (iconName.includes('-filled-color')) {
    return newIcon;
  } else if (iconName.includes('-filled')) {
    return newIcon
      .replace(/fill="#fff"/g, fillVariables['filled-foreground-1'])
      .replace(/fill="#000"/g, fillVariables['filled-background-1']);
  } else {
    return newIcon.replace(/fill="#000"/g, fillVariables['stroke-1']);
  }
}

function createIconFileContent(icon: string, iconName: string) {
  const iconWithCssVariables = getIconWithCssVariables(icon, iconName).replace(
    '<svg ',
    '<svg viewBox="0 0 24 24" aria-hidden="true" ',
  );
  return `  getIcon: function (color) {
    const icon = '${iconWithCssVariables}';
    if (!color) {
      return icon;
    }
    if (!color.startsWith('#') && !color.startsWith('var(--')) {
      return icon.replaceAll('${fillVariables['stroke-1']}', 'fill="' + getThemeColor(color) + '"').replaceAll('${fillVariables['filled-background-1']}', 'fill="' + getThemeColor(color) + '"');
    }
    return icon.replaceAll('${fillVariables['stroke-1']}', 'fill="' + color + '"').replaceAll('${fillVariables['filled-background-1']}', 'fill="' + color + '"');
  }`;
}

const getIconsToBuild = () => {
  const iconsToInclude = icons.map((i) => {
    if (i.deprecated) {
      return {
        name: i.name,
        path: `icons/svg/dist/${i.newIconName}.svg`,
      };
    } else {
      return {
        name: i.name,
        path: `icons/svg/dist/${i.name}.svg`,
      };
    }
  });
  const uniqueIcons = iconsToInclude.reduce(
    (newIconList, current) => {
      if (newIconList.find((icon) => createCamelCase(icon.name) === createCamelCase(current.name))) {
        return newIconList;
      }
      return [...newIconList, current];
    },
    [] as typeof iconsToInclude,
  );
  return uniqueIcons;
};

// Create icon module in icons.js and icons.d.ts
async function createIconModule() {
  const iconsToInclude = getIconsToBuild();
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
`;
  const jsModuleContents = [];
  const iconTypeContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
import { getThemeColor } from '@elvia/elvis-colors';
`;
  const iconTypes = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
import type { IconType } from './_iconType';
`;
  let iconNameType = `
export declare type IconName =`;

  for (const icon of iconsToInclude) {
    const fileContent = (await readFile(icon.path)).toString();
    const iconName = basename(icon.path, '.svg');
    jsModuleContents.push({
      name: createCamelCase(icon.name),
      content:
        jsModule +
        `export default {
  ${createIconFileContent(fileContent, iconName)},
};`,
    });
    iconTypeContents.push({
      name: createCamelCase(icon.name),
      content:
        iconTypes +
        `declare const ${createCamelCase(icon.name)}: IconType;
export default ${createCamelCase(icon.name)};`,
    });
    iconNameType = iconNameType + `\n  | '${createCamelCase(icon.name)}'`;
    iconsIndexFile =
      iconsIndexFile +
      `export { default as ${createCamelCase(icon.name)} } from './dist/icons/${createCamelCase(icon.name)}';
`;
  }

  return Promise.all([
    Promise.all(
      jsModuleContents.map((icon) => writeFile(`./dist/icons/${icon.name}.js`, icon.content + '\n')),
    ),
    Promise.all(
      iconTypeContents.map((icon) => writeFile(`./dist/icons/${icon.name}.d.ts`, icon.content + '\n')),
    ),
    writeFile(`./icons.js`, iconsIndexFile + '\n'),
    writeFile(`./icons.d.ts`, iconsIndexFile + iconNameType + '\n'),
  ]);
}

async function createCommonJSIconModule() {
  const iconsToInclude = getIconsToBuild();
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
`;
  const jsModuleContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
const getThemeColor = require('@elvia/elvis-colors')['getThemeColor'];
`;

  for (const icon of iconsToInclude) {
    const fileContent = (await readFile(icon.path)).toString();
    const iconName = basename(icon.path, '.svg');
    jsModuleContents.push({
      name: createCamelCase(icon.name),
      content:
        jsModule +
        `module.exports = {
  ${createIconFileContent(fileContent, iconName)}
}`,
    });
    iconsIndexFile =
      iconsIndexFile +
      `exports.${createCamelCase(icon.name)} = require('./dist/icons/${createCamelCase(icon.name)}.cjs');
`;
  }

  return Promise.all([
    Promise.all(
      jsModuleContents.map((icon) => writeFile(`./dist/icons/${icon.name}.cjs`, icon.content + '\n')),
    ),
    writeFile(`./icons.cjs.js`, iconsIndexFile + '\n'),
  ]);
}

function createCamelCase(original: string) {
  const arr = original.split(/[_-]+/);
  let newText = '';

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      newText += arr[i];
      continue;
    }
    newText += arr[i][0].toUpperCase() + arr[i].substring(1, arr[i].length);
  }
  return newText;
}

// Create png-files from svg-files
async function createPNGs(done: () => void) {
  const iconsToInclude = icons.map((i) => {
    if (i.deprecated) {
      return { name: i.name, path: `icons/svg/src/${i.newIconName}.svg` };
    }
    return { name: i.name, path: `icons/svg/src/${i.name}.svg` };
  });

  for (const file of iconsToInclude) {
    const density = (72 * 56) / 24;

    await sharp(file.path, { density: density })
      .resize(56)
      .toFile('icons/png/dist/' + file.name + '.png');
  }
  done();
  return true;
}

const makeIconTypeFile = async () => {
  const iconType = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.ts
import type { ColorLabel } from '@elvia/elvis-colors';
export type IconType = {
  getIcon: (color?: ColorLabel | (string & {}) ) => string;
};
`;
  return writeFile(`./dist/icons/_iconType.d.ts`, iconType + '\n');
};

const makeDistFolder = async () => {
  const dir = './dist/icons';
  return mkdir(dir, { recursive: true });
};

const generateIcons = series(
  clean,
  makeDistFolder,
  optimizeSVG,
  makeIconTypeFile,
  createIconModule,
  createCommonJSIconModule,
  createPNGs,
);
export { generateIcons };
