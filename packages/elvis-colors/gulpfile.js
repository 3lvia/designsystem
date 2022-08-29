'use strict';

const fs = require('fs');
const gulp = require('gulp');
const prettier = require('gulp-prettier');
const header = require('gulp-header');
const tap = require('gulp-tap');
const del = require('del');
const colors = require('./src/elviaColors')['default'];

const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

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
 * Finally, all names are prefixed with "Elvia".
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

const generateElviaColorsJsonFile = async () => {
  const colorsJSON = JSON.stringify(colors);
  fs.writeFileSync('./dist/elviaColors.json', colorsJSON);
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
      // Each color is added with its color hex value.
      content.push(`$${renameToScssName(colorLabel)}: ${colors[categoryLabel][colorLabel]['color']};`);
      if (colors[categoryLabel][colorLabel]['alt-labels']) {
        for (const altLabelIndex in colors[categoryLabel][colorLabel]['alt-labels']) {
          const altLabel = colors[categoryLabel][colorLabel]['alt-labels'][altLabelIndex];
          // Alt-labels are added as references to their parent color.
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
  fs.writeFileSync('./dist/elviaColors.scss', WARNING + content.join('\n') + '\n');
};

const generateElvisColorMapScss = async () => {
  let content = WARNING;
  // For each color category
  for (const categoryLabel in colors) {
    content += `\$${categoryLabel}: (\n`;
    // For each color
    for (const colorLabel in colors[categoryLabel]) {
      content += `\t'${colorLabel}': (\n`;
      // Add color value
      content += `\t\tcolor: ${colors[categoryLabel][colorLabel].color},\n`;
      // Add rgb value
      if (colors[categoryLabel][colorLabel].rgb) {
        const rgbValue = `\t\trgb: ${colors[categoryLabel][colorLabel].rgb},\n`;
        content += rgbValue;
      }
      // Add contrastText value
      if (colors[categoryLabel][colorLabel]['contrastText']) {
        const contrastText = `\t\tcontrastText: ${colors[categoryLabel][colorLabel]['contrastText']},\n`;
        content += contrastText;
      }
      // Add alt-labels
      if (colors[categoryLabel][colorLabel]['alt-labels']) {
        let altLabels = `\t\talt-labels: (\n`;
        for (const altLabel in colors[categoryLabel][colorLabel]['alt-labels']) {
          altLabels += `\t\t\t${colors[categoryLabel][colorLabel]['alt-labels'][altLabel]},\n`;
        }
        content += altLabels + `\t\t),\n`;
      }
      content += `\t),\n`;
    }
    content += `);\n\n`;
  }
  fs.writeFileSync('./dist/colorMap.scss', content);
};

const copyElviaColorsJs = async () => {
  return gulp.src(['./src/elviaColors.js']).pipe(header(WARNING)).pipe(gulp.dest('./dist/'));
};

const copyElviaColorsDTs = async () => {
  const colorNamesAndAltLabels = [];
  for (const categoryLabel in colors) {
    for (const colorLabel in colors[categoryLabel]) {
      colorNamesAndAltLabels.push(colorLabel);
      if (colors[categoryLabel][colorLabel]['alt-labels']) {
        for (const altLabel in colors[categoryLabel][colorLabel]['alt-labels']) {
          colorNamesAndAltLabels.push(colors[categoryLabel][colorLabel]['alt-labels'][altLabel]);
        }
      }
    }
  }
  const colorNameTypeString = colorNamesAndAltLabels.map((name) => `'${name}'`).join('\n\t| ');

  return gulp
    .src(['./src/elviaColors.d.ts'])
    .pipe(header(WARNING))
    .pipe(
      tap((file) => {
        file.contents = Buffer.from(
          String(file.contents).replace(/'{{INSERT_COLOR_NAMES}}'/, colorNameTypeString),
        );
      }),
    )
    .pipe(gulp.dest('./dist/'));
};

const formatPrettier = async () => {
  return gulp.src(['./dist**/*']).pipe(prettier()).pipe(gulp.dest('.'));
};

function cleanup() {
  return del(['./dist/**/*'], { force: true });
}

const makeDistFolder = async () => {
  const dir = './dist';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return true;
};

gulp.task(
  'default',
  gulp.series(
    makeDistFolder,
    cleanup,
    generateElviaColorsJsonFile,
    generateElviaColorsScssFile,
    generateElvisColorMapScss,
    copyElviaColorsJs,
    copyElviaColorsDTs,
    formatPrettier,
    function (done) {
      console.log('Elvis-colors - Successfully built Elvis-colors! ');
      done();
    },
  ),
);
