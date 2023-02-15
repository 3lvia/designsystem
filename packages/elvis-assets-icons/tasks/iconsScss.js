const fs = require('fs');
const gulp = require('gulp');
const getThemeColor = require('@elvia/elvis-colors').getThemeColor;

/**
 * Corresponds to the css variables used for icon colors.
 *
 * Creates css variables in the format: `--e-icon-color-{label}: var(--e-color-{color});`
 */
const iconLabelToColor = {
  stroke: getThemeColor('text-primary'),
  foreground: getThemeColor('background-primary'),
  on: getThemeColor('state-on'),
  caution: getThemeColor('state-caution'),
  warning: getThemeColor('state-warning'),
  error: getThemeColor('state-error'),
};

/**
 * Creates css classes in the format: `.e-icon--color-{label}` that set the color of the icon.
 *
 * E.g. `.e-icon--color-on` sets the color of the icon to the `state-on` color.
 */
const iconClassToThemeColor = {
  disabled: 'state-disabled',
  on: 'state-on',
  green: 'state-on',
  caution: 'state-caution',
  yellow: 'state-caution',
  warning: 'state-warning',
  orange: 'state-warning',
  error: 'state-error',
  danger: 'state-error',
  red: 'state-error',
};

const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

const generateIconThemeVariablesMap = () => {
  let fileContent = `$icon-variables: (\n`;
  for (const [label, color] of Object.entries(iconLabelToColor)) {
    fileContent += `\t'${label}': ${color},\n`;
  }
  fileContent += `);\n\n`;

  return fileContent;
};

const generateIconThemeClassesMap = () => {
  let fileContent = `$icon-theme-classes: (\n`;
  fileContent += `\t'inverted': ( 'stroke': var(--e-color-background-primary, #fff), 'foreground': var(--e-color-text-primary, #000) ),\n`;
  for (const [label, color] of Object.entries(iconClassToThemeColor)) {
    fileContent += `\t'color-${label}': ( 'stroke': ${getThemeColor(color)} ),\n`;
  }
  fileContent += `);\n\n`;

  return fileContent;
};

const writeIconThemeVariables = async () => {
  let fileContent = WARNING;
  fileContent += generateIconThemeVariablesMap();
  fileContent += generateIconThemeClassesMap();
  fs.writeFileSync('./dist/scss/themeVariables.scss', fileContent);
  return true;
};

const makeDistFolder = async () => {
  const dir = './dist/scss';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  return true;
};

const generateIconsScss = gulp.series(makeDistFolder, writeIconThemeVariables);

exports.generateIconsScss = generateIconsScss;
