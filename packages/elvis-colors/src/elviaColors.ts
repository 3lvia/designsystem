export const colors = {
  'primary-colors': {
    white: {
      color: '#fff',
      contrastText: '#000',
      'alt-labels': ['elvis-on', 'elvia-on', 'font-color-light', 'elvia-inverted'],
    },
    green: {
      color: '#29d305',
      contrastText: '#000',
      'alt-labels': ['elvia-charge'],
    },
    black: {
      color: '#000',
      contrastText: '#fff',
      'alt-labels': ['elvis-off', 'elvia-off', 'font-color', 'text'],
    },
    grey: {
      color: '#262626',
      contrastText: '#fff',
      'alt-labels': ['elvia-dark'],
    },
  },
  'signal-colors': {
    yellow: {
      color: '#ffff00',
      rgb: 'rgb(255, 255, 0)',
      contrastText: '#000',
    },
    orange: {
      color: '#ffa000',
      rgb: 'rgb(255, 160, 0)',
      contrastText: '#000',
      'alt-labels': ['warning'],
    },
    red: {
      color: '#ee0701',
      rgb: 'rgb(255, 0, 0)',
      contrastText: '#000',
      'alt-labels': ['error'],
    },
  },
  'data-colors': {
    'green-apple': {
      color: '#21ac04',
      rgb: 'rgb(33, 172, 4)',
      contrastText: '#000',
    },
    'violet-grape': {
      color: '#490192',
      rgb: 'rgb(73, 1, 146)',
      contrastText: '#fff',
    },
    'blue-berry': {
      color: '#006ddb',
      rgb: 'rgb(0, 109, 219)',
      contrastText: '#fff',
    },
    'purple-plum': {
      color: '#b66dff',
      rgb: 'rgb(182, 109, 255)',
      contrastText: '#000',
    },
    'orange-mango': {
      color: '#db6d00',
      rgb: 'rgb(219, 109, 0)',
      contrastText: '#000',
    },
    'red-tomato': {
      color: '#b90202',
      rgb: 'rgb(185, 2, 2)',
      contrastText: '#fff',
    },
  },
  'grey-colors': {
    'grey-90': {
      color: '#3b3b3b',
      contrastText: '#fff',
    },
    'grey-80': {
      color: '#515151',
      contrastText: '#fff',
      'alt-labels': ['font-grey', 'text-light'],
    },
    'grey-70': {
      color: '#676767',
      contrastText: '#fff',
      'alt-labels': ['placeholder'],
    },
    'grey-60': {
      color: '#7c7c7c',
      contrastText: '#000',
    },
    'grey-50': {
      color: '#929292',
      contrastText: '#000',
    },
    'grey-40': {
      color: '#a8a8a8',
      contrastText: '#000',
    },
    'grey-30': {
      color: '#bdbdbd',
      contrastText: '#000',
      'alt-labels': ['disabled', 'light-inverted'],
    },
    'grey-20': {
      color: '#d3d3d3',
      contrastText: '#000',
    },
    'grey-10': {
      color: '#e9e9e9',
      contrastText: '#000',
    },
    'grey-05': {
      color: '#f4f4f4',
      contrastText: '#000',
      'alt-labels': ['disabled-light'],
    },
    'grey-02': {
      color: '#fafafa',
      contrastText: '#000',
    },
  },
  'internal-colors': {
    'focus-outline': {
      color: '#0064fa',
    },
  },
} as const;

export default colors;
type Colors = typeof colors;

type ColorNames = Colors extends Record<string, infer Category>
  ? Category extends Record<string, any>
    ? keyof Category
    : never
  : never;

type AltLabels = Colors extends Record<string, infer Category>
  ? Category extends Record<string, infer Color>
    ? Color extends Record<'alt-labels', infer AltLabels>
      ? AltLabels extends ReadonlyArray<infer Label>
        ? Label
        : never
      : never
    : never
  : never;

export type ElviaColor =
  | ColorNames
  | AltLabels
  // eslint-disable-next-line @typescript-eslint/ban-types
  | (string & {});

const getColorObject = (colorName: ElviaColor) => {
  const color = Object.values(colors).reduce((acc, category) => {
    const color = Object.entries(category).find(([label, color]) => {
      const altLabels = 'alt-labels' in color ? color['alt-labels'] : [];
      return label === colorName || altLabels.includes(colorName);
    });
    return color ?? acc;
  }, null);

  if (color === null) {
    console.error(
      `Cannot get color ${colorName} from elvis-colors.${
        colorName !== colorName.toLowerCase() ? ' Did you forget to use kebab-case?' : ''
      }`,
    );
  }
  return color?.[1];
};

/**
 * Get a color from elvis-colors.
 * @param colorName Name of color in elvis-colors package.
 * @returns Hex value of requested color, or an empty string if the color is not found.
 *
 * @deprecated Deprecated since 1.5.0. Use `getThemeColor()` instead.
 */
export const getColor = (colorName: ElviaColor): string => {
  return getColorObject(colorName)?.color ?? '';
};

/**
 * Get a contrast text color from elvis-colors.
 * @param colorName Name of color in elvis-colors package.
 * @returns Hex value of the contrast text color corresponding to the requested color, or an empty string if the color is not found.
 */
export const getContrastText = (colorName: ElviaColor): string => {
  return getColorObject(colorName)?.contrastText ?? '';
};

export { getThemeColor, getCustomThemeColor } from './getThemeColor';
export { ThemeName, ThemeClassName, ColorLabel } from './theme';

export { shadows, getShadow } from './shadows';
