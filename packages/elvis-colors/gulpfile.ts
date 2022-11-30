import * as fs from 'fs';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import * as del from 'del';
import { colors } from './src/elviaColors';

const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

/**
 * Makes a capitalized camel case name from a kebab case name.
 * @param name Original name in kebab case.
 * @returns Capitalized camel case name.
 */
const makeCapitalizedCamelCase = (name: string) => {
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
 * @param name Original name.
 * @returns New name.
 */
const renameToScssName = (name: string) => {
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
  const content: string[] = [];
  Object.values(colors).forEach((category) => {
    Object.entries(category).forEach(([colorLabel, color]) => {
      content.push(`$${renameToScssName(colorLabel)}: ${color.color};`);
      if (color['alt-labels']) {
        color['alt-labels'].forEach((altLabel: string) => {
          const newContent = `$${renameToScssName(altLabel)}: $${renameToScssName(colorLabel)};`;
          if (content.indexOf(newContent) === -1) {
            content.push(newContent);
          }
        });
      }
    });
  });

  content.splice(2, 0, '$FontColorLight: $ElviaWhite;');
  fs.writeFileSync('./dist/elviaColors.scss', WARNING + content.join('\n') + '\n');
};

const generateElvisColorMapScss = async () => {
  let content = WARNING;
  Object.entries(colors).forEach(([categoryLabel, category]) => {
    content += `$${categoryLabel}: (\n`;
    Object.entries(category).forEach(([colorLabel, color]) => {
      content += `\t'${colorLabel}': (\n`;
      content += `\t\tcolor: ${color.color},\n`;
      if (color.rgb) {
        content += `\t\trgb: ${color.rgb},\n`;
      }
      if (color['contrastText']) {
        content += `\t\tcontrastText: ${color['contrastText']},\n`;
      }
      if (color['alt-labels']) {
        let altLabels = `\t\talt-labels: (\n`;
        color['alt-labels'].forEach((altLabel: string) => {
          altLabels += `\t\t\t${altLabel},\n`;
        });
        content += altLabels + `\t\t),\n`;
      }
      content += `\t),\n`;
    });
    content += `);\n\n`;
  });
  fs.writeFileSync('./dist/colorMap.scss', content);
  return true;
};

const transpileElviaColors = async () => {
  const tsProject = typescript.createProject('../components/tsconfig.json');
  return gulp.src('./src/elviaColors.ts').pipe(tsProject()).pipe(gulp.dest('./dist/'));
};

function cleanup() {
  return del(['./dist/**/*'], { force: true });
}

const makeDistFolder = async () => {
  const dir = './dist';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
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
    transpileElviaColors,
    function (done) {
      console.log('Elvis-colors - Successfully built Elvis-colors! ');
      done();
    },
  ),
);
