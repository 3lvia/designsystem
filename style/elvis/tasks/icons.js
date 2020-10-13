const del = require('del');
const gulp = require('gulp');
const svgo = require('gulp-svgo');
const icons = require('../src/config/icons.config');
const svgToMiniDataURI = require('mini-svg-data-uri');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');


// Delete unused icons + generated icons
function clean() {
  let filesToDelete = ['css/', 'src/icons/svg/dist/'];
  const unusedFiles = findUnusedIconFiles().map((file) => {
    return `src/icons/svg/src/${file}`;
  });

  filesToDelete = filesToDelete.concat(unusedFiles);
  return del(filesToDelete);
}

function findUnusedIconFiles() {
  const content = fs.readdirSync('./src/icons/svg/src/');
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
    return `src/icons/svg/src/${i.name}.svg`;
  });
  return gulp.src(iconsToInclude).pipe(svgo()).pipe(gulp.dest('src/icons/svg/dist'));
}


// Create embedded icons in elvis.js
async function createEmbeddedIconsJS() {
  const iconsToInclude = icons.map((i) => {
    return `src/icons/svg/dist/${i.name}.svg`;
  });
  let embeddedJs = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
  // ADD OR REMOVE ICONS IN icons.config.js
  let icons = {`;

  for (let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = fs.readFileSync(iconsToInclude[i]).toString();
    const iconName = path.basename(iconsToInclude[i], '.svg');
    const optimizedSVGDataURI = svgToMiniDataURI(fileContent);
    embeddedJs =
      embeddedJs +
      `
     "e-icon--${iconName}":"${optimizedSVGDataURI}"`;

    if (i < iconsToInclude.length - 1) {
      embeddedJs += ',';
    } else {
      embeddedJs += `};`;
    }
  }

  const template = fs.readFileSync('./src/templates/elvis.template.js').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', embeddedJs);
  fs.writeFileSync('elvis.js', newContent);
  fs.writeFileSync('../../src/assets/js/elvis.js', newContent);

  return true;
}


// Create icon module in icons.js and icons.d.ts
async function createIconModule() {
  const iconsToInclude = icons.map((i) => {
    return {
      name: i.name,
      path: `src/icons/svg/dist/${i.name}.svg`,
    };
  });
  let jsModule = `
  // THIS FILE IS GENERATED BY GULP, DO NOT CHANGE THIS ICON LIST MANUALLY.
  // ADD OR REMOVE ICONS IN icons.config.js`;
  let iconTypes = `declare type Icon = {
    getIcon: (color: string) => string
}`;
  let iconNameType = `
export declare type IconName = `;

  for (let i = 0; i < iconsToInclude.length; i++) {
    const fileContent = fs.readFileSync(iconsToInclude[i].path).toString();
    const iconName = path.basename(iconsToInclude[i].path, '.svg');
    jsModule =
      jsModule +
      `
    export const ${createCamelCase(iconsToInclude[i].name)} = {
      getIcon: function(color) {
          let icon = '${fileContent}'
          let iconName = '${iconName}'
          icon = icon.replace("<svg ", '<svg viewBox="0 0 24 24" aria-hidden="true" ');
          if(!color) {
              return icon;
          }
          if(color==='inverted') {
            if ((iconName.indexOf("-color") > -1) && !(iconName.indexOf("-color-") > -1)) {
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
          }
          return icon.replace(/fill="([^"]*)"/g, 'fill="' + color + '"');
      }
    }`;
    iconTypes =
      iconTypes +
      `
export declare const ${createCamelCase(iconsToInclude[i].name)}: Icon;`;
    iconNameType = iconNameType + `"${createCamelCase(iconsToInclude[i].name)}" | `;
  }
  const template = fs.readFileSync('./src/templates/icons.template.js').toString();
  const newContent = template.replace('//[[INJECT_ICONS]]', jsModule);
  fs.writeFileSync('./icons.js', newContent);
  fs.writeFileSync('./icons.d.ts', iconTypes + iconNameType.substring(0, iconNameType.length - 3) + ';');
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
    return { name: i.name, path: `src/icons/svg/src/${i.name}.svg` };
  });

  iconsToInclude.forEach((file) => {
    const density = parseInt((72 * 56) / 24);

    sharp(file.path, { density: density })
      .resize(56)
      .toFile('src/icons/png/src/' + file.name + '.png');
  });

  return true;
}


const generateIcons = gulp.series(clean, optimizeSVG, createEmbeddedIconsJS, createIconModule, createPNGs);
exports.generateIcons = generateIcons;