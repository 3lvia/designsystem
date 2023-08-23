import * as fs from 'fs';
import * as gulp from 'gulp';
import { getThemeColorContrast, getThemeColor, ColorLabel } from '@elvia/elvis-colors';

/** All the possible labels that can be used as css variables for icon colors. */
export type IconLabels =
  | 'stroke-1'
  | 'filled-foreground-1'
  | 'filled-background-1'
  | 'positive'
  | 'caution'
  | 'warning'
  | 'danger'
  | 'brand-accent';
type ColorLabelContrast = `${ColorLabel}--contrast`;
type ColorLabelOrContrast = ColorLabel | ColorLabelContrast;
type ColorLabelOrContrastOrCurrentColor = ColorLabelOrContrast | 'currentColor';
type IconClassToThemeColor = {
  [key: string]: { [label in IconLabels]?: ColorLabelOrContrastOrCurrentColor };
};

/**
 * Used to set all the color css variables in an icon to the colors they should have.
 *
 * Stoke and 'filled-background-1' are set to the same color as the label, and the
 * 'filled-foreground-1' is set to the corresponding contrast color.
 */
const defaultLabeledIconWithContrast = (newClassName: ColorLabel): IconClassToThemeColor[string] => ({
  'stroke-1': newClassName,
  'filled-background-1': newClassName,
  'filled-foreground-1': `${newClassName}--contrast`,
});

/**
 * Creates css classes in the format: `.e-icon--color-{label}` that set the color of the icon.
 * Different parts of the icon can be set to different colors.
 *
 * E.g. `.e-icon--color-on` sets the color of the icon that is labeled with stroke and 'filled-background' to the `icon-on` color.
 */
const iconClassToThemeColor = {
  inverted: {
    'stroke-1': 'static-white',
    'filled-background-1': 'static-white',
    'filled-foreground-1': 'static-black',
  },
  disabled: {
    'stroke-1': 'text-disabled-1',
    'filled-background-1': 'text-disabled-1',
  },
  ['disabled-1']: {
    'stroke-1': 'text-disabled-1',
    'filled-background-1': 'text-disabled-1',
  },
  'disabled-light': {
    'stroke-1': 'text-disabled-2',
    'filled-background-1': 'text-disabled-2',
  },
  ['disabled-2']: {
    'stroke-1': 'text-disabled-2',
    'filled-background-1': 'text-disabled-2',
  },
  placeholder: { 'stroke-1': 'text-placeholder-1', 'filled-background-1': 'text-placeholder-1' },
  currentColor: {
    'stroke-1': 'currentColor',
    'filled-background-1': 'currentColor',
  },
  on: defaultLabeledIconWithContrast('icon-positive'),
  success: defaultLabeledIconWithContrast('icon-positive'),
  green: defaultLabeledIconWithContrast('icon-positive'),
  positive: defaultLabeledIconWithContrast('icon-positive'),
  caution: defaultLabeledIconWithContrast('icon-caution'),
  yellow: defaultLabeledIconWithContrast('icon-caution'),
  warning: defaultLabeledIconWithContrast('icon-warning'),
  orange: defaultLabeledIconWithContrast('icon-warning'),
  error: defaultLabeledIconWithContrast('icon-danger'),
  danger: defaultLabeledIconWithContrast('icon-danger'),
  red: defaultLabeledIconWithContrast('icon-danger'),
  white: defaultLabeledIconWithContrast('static-white'),
  black: defaultLabeledIconWithContrast('static-black'),
} as const satisfies IconClassToThemeColor;

const WARNING = `// THIS FILE IS AUTOMATICALLY GENERATED AND WILL BE OVERWRITTEN.
// DO NOT MAKE CHANGES TO THIS FILE DIRECTLY.\n\n`;

const colorIsCurrentColor = (color: ColorLabelOrContrastOrCurrentColor): color is 'currentColor' =>
  color === 'currentColor';

const colorIsContrastColor = (color: ColorLabelOrContrast): color is ColorLabelContrast =>
  typeof color === 'string' && color.endsWith('--contrast');

const getScssColors = (colors: IconClassToThemeColor[keyof IconClassToThemeColor]) => {
  let scssColors = '';
  for (const [label, color] of Object.entries(colors)) {
    if (colorIsCurrentColor(color)) {
      scssColors += `'${label}': ${color}, `;
    } else if (colorIsContrastColor(color)) {
      scssColors += `'${label}': ${getThemeColorContrast(color.replace('--contrast', '') as ColorLabel)}, `;
    } else {
      scssColors += `'${label}': ${getThemeColor(color)}, `;
    }
  }
  return scssColors;
};

const generateIconColorClassesMap = () => {
  let fileContent = `$icon-theme-classes: (\n`;
  for (const [label, colors] of Object.entries(iconClassToThemeColor)) {
    if (label === 'inverted') {
      fileContent += `\t'${label}': ( ${getScssColors(colors)} ),\n`;
    } else {
      fileContent += `\t'color-${label}': ( ${getScssColors(colors)} ),\n`;
    }
  }
  fileContent += `);\n\n`;

  return fileContent;
};

const writeIconThemeVariables = async () => {
  const fileContent = WARNING + generateIconColorClassesMap();
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

export { generateIconsScss };
