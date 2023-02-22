import { BaseColors, Theme } from '../theme';

export const darkThemeColors = {
  'primary-colors': {
    white: {
      color: '#EDEDED',
      contrastText: '#171717',
    },
    green: {
      color: '#35BB18',
      contrastText: '#171717',
    },
    black: {
      color: '#171717',
      contrastText: '#EDEDED',
    },
  },
  'signal-colors': {
    yellow: {
      color: '#EBEB18',
      contrastText: '#171717',
    },
    orange: {
      color: '#E59712',
      contrastText: '#171717',
    },
    red: {
      color: '#C82520',
      contrastText: '#171717',
    },
  },
  'data-colors': {
    'green-apple': {
      color: '#2d9f15',
      contrastText: '#171717',
    },
    'violet-grape': {
      color: '#692CA5',
      contrastText: '#EDEDED',
    },
    'blue-berry': {
      color: '#0967C6',
      contrastText: '#EDEDED',
    },
    'purple-plum': {
      color: '#9963CF',
      contrastText: '#171717',
    },
    'orange-mango': {
      color: '#C5670C',
      contrastText: '#171717',
    },
    'red-tomato': {
      color: '#9E1111',
      contrastText: '#EDEDED',
    },
  },
  'grey-colors': {
    'grey-80': {
      color: '#1F1F1F',
      contrastText: '#EDEDED',
    },
    'grey-70': {
      color: '#242424',
      contrastText: '#EDEDED',
    },
    'grey-60': {
      color: '#333333',
      contrastText: '#EDEDED',
    },
    'grey-50': {
      color: '#424242',
      contrastText: '#EDEDED',
    },
    'grey-40': {
      color: '#5E5E5E',
      contrastText: '#EDEDED',
    },
    'grey-20': {
      color: '#BDBDBD',
      contrastText: '#171717',
    },
    'grey-10': {
      color: '#C4C4C4',
      contrastText: '#171717',
    },
  },
  'internal-colors': {
    'focus-outline': {
      color: '#0064fa',
    },
  },
} as const satisfies BaseColors;

export type DarkThemeColorName = typeof darkThemeColors extends Record<string, infer Category>
  ? Category extends Record<string, any>
    ? keyof Category
    : never
  : never;

export const darkTheme = {
  background: {
    'background-primary': {
      hex: darkThemeColors['grey-colors']['grey-80'].color,
      contrast: darkThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'background-secondary': {
      hex: darkThemeColors['grey-colors']['grey-80'].color,
      contrast: darkThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'background-tertiary': {
      hex: darkThemeColors['grey-colors']['grey-80'].color,
      contrast: darkThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'background-element': {
      hex: darkThemeColors['grey-colors']['grey-80'].color,
      contrast: darkThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'background-element-zebra': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-overlay': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-overlay-strong': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-header': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'background-accent': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-accent-strong': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
  },
  text: {
    'text-primary': {
      hex: darkThemeColors['primary-colors'].white.color,
    },
    'text-secondary': {
      hex: darkThemeColors['grey-colors']['grey-10'].color,
    },
    'text-placeholder': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
    },
  },
  state: {
    'state-on': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'state-caution': {
      hex: darkThemeColors['signal-colors'].yellow.color,
      contrast: darkThemeColors['signal-colors'].yellow.contrastText,
    },
    'state-warning': {
      hex: darkThemeColors['signal-colors'].orange.color,
      contrast: darkThemeColors['signal-colors'].orange.contrastText,
    },
    'state-error': {
      hex: darkThemeColors['signal-colors'].red.color,
      contrast: darkThemeColors['signal-colors'].red.contrastText,
    },
    'state-hover-green': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'state-hover-grey': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'state-selected-grey': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'state-disabled': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'state-focus': {
      hex: darkThemeColors['internal-colors']['focus-outline'].color,
    },
  },
  data: {
    'data-green': {
      hex: darkThemeColors['data-colors']['green-apple'].color,
      contrast: darkThemeColors['data-colors']['green-apple'].contrastText,
    },
    'data-violet': {
      hex: darkThemeColors['data-colors']['violet-grape'].color,
      contrast: darkThemeColors['data-colors']['violet-grape'].contrastText,
    },
    'data-blue': {
      hex: darkThemeColors['data-colors']['blue-berry'].color,
      contrast: darkThemeColors['data-colors']['blue-berry'].contrastText,
    },
    'data-purple': {
      hex: darkThemeColors['data-colors']['purple-plum'].color,
      contrast: darkThemeColors['data-colors']['purple-plum'].contrastText,
    },
    'data-orange': {
      hex: darkThemeColors['data-colors']['orange-mango'].color,
      contrast: darkThemeColors['data-colors']['orange-mango'].contrastText,
    },
    'data-red': {
      hex: darkThemeColors['data-colors']['red-tomato'].color,
      contrast: darkThemeColors['data-colors']['red-tomato'].contrastText,
    },
  },
  static: {
    'static-white': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'static-black': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
  },
} as const satisfies Theme;
