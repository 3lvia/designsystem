import { BaseColors, Theme } from '../theme';

export const lightThemeColors = {
  'primary-colors': {
    white: {
      color: '#fff',
      contrastText: '#000',
    },
    green: {
      color: '#29d305',
      contrastText: '#000',
    },
    black: {
      color: '#000',
      contrastText: '#fff',
    },
    grey: {
      color: '#262626',
      contrastText: '#fff',
    },
  },
  'signal-colors': {
    yellow: {
      color: '#ffff00',
      contrastText: '#000',
    },
    orange: {
      color: '#ffa000',
      contrastText: '#000',
    },
    red: {
      color: '#ee0701',
      contrastText: '#000',
    },
  },
  'data-colors': {
    'green-apple': {
      color: '#21ac04',
      contrastText: '#000',
    },
    'violet-grape': {
      color: '#490192',
      contrastText: '#fff',
    },
    'blue-berry': {
      color: '#006ddb',
      contrastText: '#fff',
    },
    'purple-plum': {
      color: '#b66dff',
      contrastText: '#000',
    },
    'orange-mango': {
      color: '#db6d00',
      contrastText: '#000',
    },
    'red-tomato': {
      color: '#b90202',
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
    },
    'grey-70': {
      color: '#676767',
      contrastText: '#fff',
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
} as const satisfies BaseColors;

export type LightThemeColorName = typeof lightThemeColors extends Record<string, infer Category>
  ? Category extends Record<string, any>
    ? keyof Category
    : never
  : never;

export const lightTheme = {
  background: {
    'background-primary': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-secondary': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'background-tertiary': {
      hex: lightThemeColors['primary-colors'].grey.color,
      contrast: lightThemeColors['primary-colors'].grey.contrastText,
    },
    'background-element': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-element-zebra': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'background-overlay': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-header': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-accent': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'background-accent-strong': {
      hex: lightThemeColors['grey-colors']['grey-20'].color,
      contrast: lightThemeColors['grey-colors']['grey-20'].contrastText,
    },
  },
  text: {
    'text-primary': {
      hex: lightThemeColors['primary-colors'].black.color,
    },
    'text-secondary': {
      hex: lightThemeColors['grey-colors']['grey-80'].color,
    },
    'text-placeholder': {
      hex: lightThemeColors['grey-colors']['grey-70'].color,
    },
  },
  state: {
    'state-on': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'state-caution': {
      hex: lightThemeColors['signal-colors'].yellow.color,
      contrast: lightThemeColors['signal-colors'].yellow.contrastText,
    },
    'state-warning': {
      hex: lightThemeColors['signal-colors'].orange.color,
      contrast: lightThemeColors['signal-colors'].orange.contrastText,
    },
    'state-error': {
      hex: lightThemeColors['signal-colors'].red.color,
      contrast: lightThemeColors['signal-colors'].red.contrastText,
    },
    'state-hover-green': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'state-hover-grey': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'state-disabled': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'state-focus': {
      hex: lightThemeColors['internal-colors']['focus-outline'].color,
    },
  },
  data: {
    'data-green': {
      hex: lightThemeColors['data-colors']['green-apple'].color,
      contrast: lightThemeColors['data-colors']['green-apple'].contrastText,
    },
    'data-violet': {
      hex: lightThemeColors['data-colors']['violet-grape'].color,
      contrast: lightThemeColors['data-colors']['violet-grape'].contrastText,
    },
    'data-blue': {
      hex: lightThemeColors['data-colors']['blue-berry'].color,
      contrast: lightThemeColors['data-colors']['blue-berry'].contrastText,
    },
    'data-purple': {
      hex: lightThemeColors['data-colors']['purple-plum'].color,
      contrast: lightThemeColors['data-colors']['purple-plum'].contrastText,
    },
    'data-orange': {
      hex: lightThemeColors['data-colors']['orange-mango'].color,
      contrast: lightThemeColors['data-colors']['orange-mango'].contrastText,
    },
    'data-red': {
      hex: lightThemeColors['data-colors']['red-tomato'].color,
      contrast: lightThemeColors['data-colors']['red-tomato'].contrastText,
    },
  },
} as const satisfies Theme;
