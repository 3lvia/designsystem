const del = require('del');
const gulp = require('gulp');
const svgmin = require('gulp-svgmin');
const icons = require('../config/icons.config');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

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
  const remove = [];

  content.forEach((icon) => {
    const filename = icon.substr(0, icon.length - 4);
    if (JSON.stringify(icons).indexOf(filename) === -1) {
      remove.push(icon);
    }
  });

  return remove;
}

// Optimize SVG icons
function optimizeSVG() {
  const iconsToInclude = icons.map((i) => {
    return `icons/svg/src/${i.name}.svg`;
  });
  return gulp.src(iconsToInclude, { allowEmpty: true }).pipe(svgmin()).pipe(gulp.dest('icons/svg/dist'));
}

// Create icon module in icons.js and icons.d.ts
async function createIconModule() {
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
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
`;
  const jsModuleContents = [];
  const iconTypeContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
import { getColor } from '@elvia/elvis-colors';
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
  getIcon: function (color) {
    let icon =
      '${fileContent}';
    let iconName = '${iconName}';
    icon = icon.replace('<svg ', '<svg viewBox="0 0 24 24" aria-hidden="true" ');
    if (!color) {
      return icon;
    }
    if (color === 'inverted') {
      if (iconName.indexOf('-color') > -1 && iconName.indexOf('-color-') <= -1) {
        icon = icon.replace(/fill="#29D305"/g, 'fillGreen');
      }
      // -full-color check can be removed when new icons have been added
      if (iconName.indexOf('-filled-color') > -1 || iconName.indexOf('-full-color') > -1) {
        icon = icon.replace(/fill="#000"/g, 'fillBlack');
      }
      icon = icon.replace(/fill="#fff"/g, 'fillBlack');
      icon = icon.replace(/fill="([^"]*)"/g, "fill='white'");
      icon = icon.replace(/fillBlack/g, "fill='black'");
      icon = icon.replace(/fillGreen/g, "fill='#29D305'");
      return icon;
    } else if (!color.startsWith('#')) {
      return icon.replace(/fill="#000"/g, 'fill="' + getColor(color) + '"');
    }
    return icon.replace(/fill="#000"/g, 'fill="' + color + '"');
  },
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
  let iconsIndexFile = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
`;
  const jsModuleContents = [];
  const jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
const getColor = require('@elvia/elvis-colors')['getColor'];
`;

  for (const icon of iconsToInclude) {
    const fileContent = fs.readFileSync(icon.path).toString();
    const iconName = path.basename(icon.path, '.svg');
    jsModuleContents.push({
      name: createCamelCase(icon.name),
      content:
        jsModule +
        `module.exports = {
  getIcon: function(color) {
    let icon = '${fileContent}'
    let iconName = '${iconName}'
    icon = icon.replace("<svg ", '<svg viewBox="0 0 24 24" aria-hidden="true" ');
    if(!color) {
      return icon;
    }
    if(color==='inverted') {
      if ((iconName.indexOf("-color") > -1) && iconName.indexOf("-color-") <= -1) {
        icon = icon.replace(/fill="#29D305"/g, "fillGreen");
      }
      // -full-color check can be removed when new icons have been added
      if((iconName.indexOf("-filled-color") > -1) || (iconName.indexOf("-full-color") > -1)){
        icon = icon.replace(/fill="#000"/g, "fillBlack'");
      }
      icon = icon.replace(/fill="#fff"/g, "fillBlack");
      icon = icon.replace(/fill="([^"]*)"/g, "fill='white'");
      icon = icon.replace(/fillBlack/g, "fill='black'");
      icon = icon.replace(/fillGreen/g, "fill='#29D305'");
      return icon;
      } else if (!color.startsWith('#')) {
        return icon.replace(/fill="#000"/g, 'fill="' + getColor(color) + '"');
    }
    return icon.replace(/fill="#000"/g, 'fill="' + color + '"');
  }
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

function createCamelCase(original) {
  const arr = original.split(/[_-]+/);
  let newText = '';

  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      newText += arr[i];
      continue;
    }
    newText += arr[i][0].toUpperCase() + arr[i].substr(1, arr[i].length - 1);
  }
  return newText;
}

// Create png-files from svg-files
async function createPNGs(done) {
  const iconsToInclude = icons.map((i) => {
    if (i.deprecated) {
      return { name: i.name, path: `icons/svg/src/${i.newIconName}.svg` };
    }
    return { name: i.name, path: `icons/svg/src/${i.name}.svg` };
  });

  for (const file of iconsToInclude) {
    const density = parseInt((72 * 56) / 24);

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
import type { ElviaColor } from '@elvia/elvis-colors';
export type IconType = {
  getIcon: (color?: ElviaColor | 'inverted') => string;
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
exports.generateIcons = generateIcons;
