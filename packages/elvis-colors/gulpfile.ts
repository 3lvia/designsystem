import * as fs from 'fs';
import * as gulp from 'gulp';
import * as del from 'del';
import { shadows } from './src/shadows';
import { lightTheme, lightThemeColors } from './src/themes/lightTheme';
import { darkTheme, darkThemeColors } from './src/themes/darkTheme';
import { BaseColors, Color, Theme, ThemeName } from './src/theme';

const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

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

const generateElvisColorsCss = async () => {
  const purposeClasses = getPurposeColorClasses();
  const rootVariables = {
    ...getBaseColorCssVariables(lightThemeColors, 'light'),
    ...getBaseColorCssVariables(darkThemeColors, 'dark'),
  };
  const lightVariables = getPurposeColorCssVariables(lightTheme);
  const darkVariables = getPurposeColorCssVariables(darkTheme);

  let fileContent = WARNING;

  fileContent += purposeClasses + `\n`;
  fileContent += `:root {\n`;
  Object.entries(rootVariables).forEach(([name, color]) => (fileContent += `\t${name}: ${color};\n`));
  fileContent += `}\n`;
  fileContent += `.e-theme-light,\n:root {\n`;
  Object.entries(lightVariables).forEach(([name, color]) => (fileContent += `\t${name}: ${color};\n`));
  fileContent += `}\n`;
  fileContent += `.e-theme-dark, .e-color-background-element-4 , [class^='e-'][class$="--inverted"] {\n`;
  Object.entries(darkVariables).forEach(([name, color]) => (fileContent += `\t${name}: ${color};\n`));
  fileContent += `}\n`;

  fs.writeFileSync('./dist/elvisColors.scss', fileContent);
  return true;
};

const getPurposeColorClasses = (): string => {
  let colorClasses = '';
  Object.values(lightTheme).forEach((category: Record<string, Color>) =>
    Object.entries(category).forEach(([label]) => {
      if (
        label.includes('icon') ||
        label.includes('signal') ||
        label.includes('data') ||
        label.includes('static')
      ) {
        return;
      }
      if (label.includes('background')) {
        colorClasses += `.e-color-${label} {\n`;
        colorClasses += `\tbackground: var(--e-color-${label}) !important;\n`;
        colorClasses += `\tcolor: var(--e-color-${label}--contrast) !important;\n}\n`;
      } else if (label.includes('text')) {
        colorClasses += `.e-color-${label} {`;
        colorClasses += `color: var(--e-color-${label}) !important;}\n`;
      } else if (label.includes('border')) {
        colorClasses += `.e-color-${label} {`;
        colorClasses += `border-color: var(--e-color-${label}) !important;}\n`;
      }
    }),
  );
  return colorClasses;
};

const getBaseColorCssVariables = (colors: BaseColors, theme: ThemeName): Record<string, string> => {
  const variables: Record<string, string> = {};
  Object.values(colors).forEach((category) => {
    if (theme === 'light') {
      Object.keys(category).forEach(
        (color) => (variables[`--e-light-theme-${color}`] = category[color].color),
      );
    } else {
      Object.keys(category).forEach(
        (color) => (variables[`--e-dark-theme-${color}`] = category[color].color),
      );
    }
  });
  return variables;
};

const getPurposeColorCssVariables = (theme: Theme) => {
  const variables: Record<string, string> = {};
  Object.values(theme).forEach((category: Record<string, Color>) =>
    Object.entries(category).forEach(([label, color]) => {
      variables[`--e-color-${label}`] = color.hex;
      if (color.contrast) {
        variables[`--e-color-${label}--contrast`] = color.contrast;
      }
    }),
  );
  return variables;
};

const generateElvisShadowMapScss = async () => {
  let fileContent = WARNING;
  fileContent += `$shadow: (\n`;
  Object.entries(shadows).forEach(([name, shadow]) => {
    fileContent += `\t'${name}': ${shadow.boxShadow},\n`;
  });
  fileContent += `);\n\n`;

  fs.writeFileSync('./dist/elvisShadowMap.scss', fileContent);
  return true;
};

gulp.task(
  'default',
  gulp.series(makeDistFolder, cleanup, generateElvisShadowMapScss, generateElvisColorsCss, function (done) {
    console.log('Elvis-colors - Successfully built Elvis-colors! ');
    done();
  }),
);
