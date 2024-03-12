import { mkdir, rm, writeFile } from 'fs/promises';
import { series, task } from 'gulp';

import { shadows } from './src/shadows';
import { BaseColors, Color, Theme, ThemeName } from './src/theme';
import { darkTheme, darkThemeColors } from './src/themes/darkTheme';
import { lightTheme, lightThemeColors } from './src/themes/lightTheme';

const distFolder = './dist';
const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

const cleanup = async () => rm(distFolder, { recursive: true, force: true });

const makeDistFolder = async () => mkdir(distFolder, { recursive: true });

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
  fileContent += `.e-theme-dark, .e-color-background-3, [class*='e-'][class*="--inverted"] {\n`;
  Object.entries(darkVariables).forEach(([name, color]) => (fileContent += `\t${name}: ${color};\n`));
  fileContent += `}\n`;

  return writeFile('./dist/elvisColors.scss', fileContent);
};

const getPurposeColorClasses = (): string => {
  let colorClasses = '';
  Object.values(lightTheme).forEach((category) =>
    Object.entries(category).forEach(([label]) => {
      if (
        label.includes('icon') ||
        label.includes('signal') ||
        label.includes('data') ||
        label.includes('static') ||
        label.includes('border')
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
      }
    }),
  );
  return colorClasses;
};

const getBaseColorCssVariables = (colors: BaseColors, theme: ThemeName): Record<string, string> => {
  const variables: Record<string, string> = {};
  Object.values(colors).forEach((category) => {
    if (theme === 'light') {
      Object.keys(category).forEach((color) => {
        variables[`--e-light-theme-${color}`] = category[color].color;
        variables[`--e-light-theme-${color}--contrast`] = category[color].contrastText;
      });
    } else {
      Object.keys(category).forEach((color) => {
        variables[`--e-dark-theme-${color}`] = category[color].color;
        variables[`--e-dark-theme-${color}--contrast`] = category[color].contrastText;
      });
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

  return writeFile('./dist/elvisShadowMap.scss', fileContent);
};

task('default', series(cleanup, makeDistFolder, generateElvisShadowMapScss, generateElvisColorsCss));
