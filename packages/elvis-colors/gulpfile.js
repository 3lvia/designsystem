'use strict';

import fs from 'fs';
import gulp from 'gulp';
import prettier from 'gulp-prettier';
import colors from './src/elviaColors.js';

/**
 * Generates the elviaColors.json file from the colors object in elviaColors.js.
 */
const generateElviaColorsJsonFile = async () => {
  const colorsJSON = JSON.stringify(colors);
  fs.writeFileSync('./src/elviaColors.json', colorsJSON);
};

/**
 * Makes a capitalized camel case name from a kebab case name.
 * @param {string} name Original name in kebab case.
 * @returns Capitalized camel case name.
 */
const makeCapitalizedCamelCase = (name) => {
  const arr = name.split('-');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  return arr.join('');
};

/**
 * Rename a color name (or alt-label) from elviaColors.js to its scss name.
 *
 * If a name is prefixed with "elvis" or "elvia", this prefix is removed.
 *
 * All names are prefixed with "Elvia".
 * @param {string} name Original name.
 * @returns New name.
 */
const renameToScssName = (name) => {
  let returnName = 'Elvia';
  if (name.startsWith('elvis') || name.startsWith('elvia')) {
    returnName = returnName + makeCapitalizedCamelCase(name.substring(5));
  } else {
    returnName = returnName + makeCapitalizedCamelCase(name);
  }
  return returnName;
};

/**
 * Iterates through the colors object in elviaColors.js and adds each
 * color (and alt-label) to an array as a string in scss-format.
 * Will not produce any duplicate entries.
 *
 * Then writes the elviaColors.scss file containing all the entries from the array.
 */
const generateElviaColorsScssFile = async () => {
  let content = [];
  for (const categoryLabel in colors) {
    for (const colorLabel in colors[categoryLabel]) {
      content.push(`$${renameToScssName(colorLabel)}: ${colors[categoryLabel][colorLabel]['color']};`);
      if (colors[categoryLabel][colorLabel]['alt-labels']) {
        for (const altLabelIndex in colors[categoryLabel][colorLabel]['alt-labels']) {
          const altLabel = colors[categoryLabel][colorLabel]['alt-labels'][altLabelIndex];
          const newContent = `$${renameToScssName(altLabel)}: $${renameToScssName(colorLabel)};`;
          // Make sure the color isn't already in the array.
          if (content.indexOf(newContent) === -1) {
            content.push(newContent);
          }
        }
      }
    }
  }
  content.splice(2, 0, '$FontColorLight: $ElviaWhite;');
  fs.writeFileSync('./src/elviaColors.scss', content.join('\n') + '\n');
};

/**
 * Perform Prettier formatting on generated files.
 */
const formatPrettier = async () => {
  return gulp
    .src(['./src/elviaColors.json', './src/elviaColors.scss'])
    .pipe(prettier())
    .pipe(gulp.dest('./src'));
};

gulp.task(
  'default',
  gulp.series(generateElviaColorsJsonFile, generateElviaColorsScssFile, formatPrettier, function (done) {
    console.log('Elvis-colors - Successfully build JSON file!');
    done();
  }),
);
