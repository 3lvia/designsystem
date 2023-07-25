import * as del from 'del';
import * as gulp from 'gulp';
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
import * as path from 'path';
import * as fs from 'fs';
import * as sharp from 'sharp';
import { getThemeColor } from '@elvia/elvis-colors';
import type { IconLabels } from './iconsScss';

// Delete unused icons + generated icons
function clean() {
  let filesToDelete = ['icons/svg/dist/'];
  const unusedFiles = findUnusedIconFiles().map((file) => {
    return `icons/svg/src/${file}`;
  });

  filesToDelete = filesToDelete.concat(unusedFiles);
  return del(filesToDelete);
}

function findUnusedIconFiles() {
  const content = fs.readdirSync('./icons/svg/src/');
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
  return gulp.src(iconsToInclude, { allowEmpty: true }).pipe(svgmin()).pipe(gulp.dest('icons/svg/dist'));
}

// The following is used to change hard-coded icon colors to use css variables for theming support.
type FillVariablesUnion = `fill="var(--e-color-icon-${IconLabels}, ${ReturnType<typeof getThemeColor>})"`;
export type FillVariables = { [label in IconLabels]: FillVariablesUnion };

/**
 * These are the string-values that are inserted into the SVGs as replacements for the hard-coded colors.
 */
const fillVariables = {
  stroke: `fill="var(--e-color-icon-stroke, ${getThemeColor('icon-stroke')})"`,
  'filled-foreground': `fill="var(--e-color-icon-filled-foreground, ${getThemeColor(
    'icon-filled-foreground',
  )})"`,
  'filled-background': `fill="var(--e-color-icon-filled-background, ${getThemeColor(
    'icon-filled-background',
  )})"`,
  'filled-foreground-colored': `fill="var(--e-color-icon-filled-foreground-colored, ${getThemeColor(
    'black',
  )})"`,
  success: `fill="var(--e-color-icon-success, ${getThemeColor('icon-success')})"`,
  caution: `fill="var(--e-color-icon-caution, ${getThemeColor('icon-caution')})"`,
  warning: `fill="var(--e-color-icon-warning, ${getThemeColor('icon-warning')})"`,
  error: `fill="var(--e-color-icon-error, ${getThemeColor('icon-error')})"`,
} as const satisfies FillVariables;

/**
 * Replace colors in a stringified SVG with css variables.
 */
function getIconWithCssVariables(icon: string, iconName: string) {
  const newIcon = icon
    .replace(/fill="#29D305"/g, fillVariables.success)
    .replace(/fill="#FFFF00"/g, fillVariables.caution)
    .replace(/fill="#FFA000"/g, fillVariables.warning)
    .replace(/fill="#EE0701"/g, fillVariables.error);
  if (iconName.includes('-filled-color')) {
    return newIcon.replace(/fill="#000"/g, fillVariables['filled-foreground-colored']);
  } else if (iconName.includes('-filled')) {
    return newIcon
      .replace(/fill="#fff"/g, fillVariables['filled-foreground'])
      .replace(/fill="#000"/g, fillVariables['filled-background']);
  } else {
    return newIcon.replace(/fill="#000"/g, fillVariables.stroke);
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
      return icon.replaceAll('${fillVariables.stroke}', 'fill="' + getThemeColor(color) + '"').replaceAll('${fillVariables['filled-background']}', 'fill="' + getThemeColor(color) + '"');
    }
    return icon.replaceAll('${fillVariables.stroke}', 'fill="' + color + '"').replaceAll('${fillVariables['filled-background']}', 'fill="' + color + '"');
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
  const uniqueIcons = iconsToInclude.reduce((newIconList, current) => {
    if (newIconList.find((icon) => createCamelCase(icon.name) === createCamelCase(current.name))) {
      return newIconList;
    }
    return [...newIconList, current];
  }, [] as typeof iconsToInclude);
  return uniqueIcons;
};

// Create icon module in icons.js and icons.d.ts
async function createIconModule() {
  const iconsToInclude = getIconsToBuild();
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
`;
  const jsModuleContents = [];
  const iconTypeContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
import { getThemeColor } from '@elvia/elvis-colors';
`;
  const iconTypes = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
import type { IconType } from './_iconType';
`;
  let iconNameType = `
export declare type IconName =`;

  for (const icon of iconsToInclude) {
    const fileContent = fs.readFileSync(icon.path).toString();
    const iconName = path.basename(icon.path, '.svg');
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

  jsModuleContents.forEach((icon) => {
    fs.writeFileSync(`./dist/icons/${icon.name}.js`, icon.content + '\n');
  });
  iconTypeContents.forEach((icon) => {
    fs.writeFileSync(`./dist/icons/${icon.name}.d.ts`, icon.content + '\n');
  });
  fs.writeFileSync(`./icons.js`, iconsIndexFile + '\n');
  fs.writeFileSync(`./icons.d.ts`, iconsIndexFile + iconNameType + '\n');
  return true;
}

async function createCommonJSIconModule() {
  const iconsToInclude = getIconsToBuild();
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
`;
  const jsModuleContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
const getThemeColor = require('@elvia/elvis-colors')['getThemeColor'];
`;

  for (const icon of iconsToInclude) {
    const fileContent = fs.readFileSync(icon.path).toString();
    const iconName = path.basename(icon.path, '.svg');
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

  jsModuleContents.forEach((icon) => {
    fs.writeFileSync(`./dist/icons/${icon.name}.cjs`, icon.content + '\n');
  });
  fs.writeFileSync(`./icons.cjs.js`, iconsIndexFile + '\n');
  return true;
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
// ADD OR REMOVE ICONS IN icons.config.js
import type { ColorLabel } from '@elvia/elvis-colors';
export type IconType = {
  getIcon: (color?: ColorLabel | (string & {}) ) => string;
};
`;
  fs.writeFileSync(`./dist/icons/_iconType.d.ts`, iconType + '\n');
};

const makeDistFolder = async () => {
  const dir = './dist/icons';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return true;
};

const generateIcons = gulp.series(
  makeDistFolder,
  clean,
  optimizeSVG,
  makeIconTypeFile,
  createIconModule,
  createCommonJSIconModule,
  createPNGs,
);
export { generateIcons };
