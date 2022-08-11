const del = require('del');
const gulp = require('gulp');
const svgo = require('gulp-svgo');
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
  return gulp.src(iconsToInclude, { allowEmpty: true }).pipe(svgo()).pipe(gulp.dest('icons/svg/dist'));
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
  let jsModule = `// THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
// ADD OR REMOVE ICONS IN icons.config.js
import { getColor } from '@elvia/elvis-colors';
`;
  let iconTypes = `import type { ElviaColor } from '@elvia/elvis-colors';

declare type Icon = {
  getIcon: (color?: ElviaColor | 'inverted') => string;
};`;
  let iconNameType = `
export declare type IconName =`;

  for (const icon of iconsToInclude) {
    const fileContent = fs.readFileSync(icon.path).toString();
    const iconName = path.basename(icon.path, '.svg');
    jsModule =
      jsModule +
      `
export const ${createCamelCase(icon.name)} = {
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
      return icon.replace(/fill="([^"]*)"/g, 'fill="' + getColor(color) + '"');
    }
    return icon.replace(/fill="([^"]*)"/g, 'fill="' + color + '"');
  },
};`;
    iconTypes =
      iconTypes +
      `
export declare const ${createCamelCase(icon.name)}: Icon;`;
    iconNameType = iconNameType + `\n  | '${createCamelCase(icon.name)}'`;
  }
  // const template = fs.readFileSync('./src/templates/icons.template.js').toString();
  // const newContent = template.replace('//[[INJECT_ICONS]]', jsModule);

  fs.writeFileSync('./icons.js', jsModule + '\n');
  fs.writeFileSync('./icons.d.ts', iconTypes + iconNameType + ';\n');
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
  let jsModule = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
  // ADD OR REMOVE ICONS IN icons.config.js
  const getColor = require('@elvia/elvis-colors')['getColor'];
  `;
  let iconTypes = ``;
  let iconNameType = ``;

  for (const icon of iconsToInclude) {
    const fileContent = fs.readFileSync(icon.path).toString();
    const iconName = path.basename(icon.path, '.svg');
    jsModule =
      jsModule +
      `
    exports.${createCamelCase(icon.name)} = {
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
            return icon.replace(/fill="([^"]*)"/g, 'fill="' + getColor(color) + '"');
          }
          return icon.replace(/fill="([^"]*)"/g, 'fill="' + color + '"');
      }
    }`;
    iconTypes =
      iconTypes +
      `
exports.${createCamelCase(icon.name)}: Icon;`;
    iconNameType = iconNameType + `"${createCamelCase(icon.name)}" | `;
  }

  fs.writeFileSync('./icons.cjs.js', jsModule);
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
async function createPNGs() {
  const iconsToInclude = icons.map((i) => {
    if (i.deprecated) {
      return { name: i.name, path: `icons/svg/src/${i.newIconName}.svg` };
    }
    return { name: i.name, path: `icons/svg/src/${i.name}.svg` };
  });

  iconsToInclude.forEach((file) => {
    const density = parseInt((72 * 56) / 24);

    sharp(file.path, { density: density })
      .resize(56)
      .toFile('icons/png/dist/' + file.name + '.png');
  });

  return true;
}

const generateIcons = gulp.series(clean, optimizeSVG, createIconModule, createCommonJSIconModule, createPNGs);
exports.generateIcons = generateIcons;
