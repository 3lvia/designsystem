import { BaseColors, Theme } from '../theme';

export const lightThemeColors = {
  'primary-colors': {
    white: {
      color: '#FFFFFF',
      contrastText: '#000000',
    },
    green: {
      color: '#29D305',
      contrastText: '#000000',
    },
    black: {
      color: '#000000',
      contrastText: '#FFFFFF',
    },
    grey: {
      color: '#262626',
      contrastText: '#FFFFFF',
    },
  },
  'signal-colors': {
    yellow: {
      color: '#FFFF00',
      contrastText: '#000000',
    },
    orange: {
      color: '#FFA000',
      contrastText: '#000000',
    },
    red: {
      color: '#EE0701',
      contrastText: '#000000',
    },
  },
  'data-colors': {
    'green-apple': {
      color: '#21AC04',
      contrastText: '#000000',
    },
    'violet-grape': {
      color: '#490192',
      contrastText: '#FFFFFF',
    },
    'blue-berry': {
      color: '#006DDB',
      contrastText: '#FFFFFF',
    },
    'purple-plum': {
      color: '#B66DFF',
      contrastText: '#000000',
    },
    'orange-mango': {
      color: '#DB6D00',
      contrastText: '#000000',
    },
    'red-tomato': {
      color: '#B90202',
      contrastText: '#FFFFFF',
    },
  },
  'grey-colors': {
    'grey-90': {
      color: '#3B3B3B',
      contrastText: '#FFFFFF',
    },
    'grey-80': {
      color: '#515151',
      contrastText: '#FFFFFF',
    },
    'grey-70': {
      color: '#676767',
      contrastText: '#FFFFFF',
    },
    'grey-60': {
      color: '#7C7C7C',
      contrastText: '#000000',
    },
    'grey-50': {
      color: '#929292',
      contrastText: '#000000',
    },
    'grey-40': {
      color: '#A8A8A8',
      contrastText: '#000000',
    },
    'grey-30': {
      color: '#BDBDBD',
      contrastText: '#000000',
    },
    'grey-20': {
      color: '#D3D3D3',
      contrastText: '#000000',
    },
    'grey-10': {
      color: '#E9E9E9',
      contrastText: '#000000',
    },
    'grey-05': {
      color: '#F4F4F4',
      contrastText: '#000000',
    },
    'grey-02': {
      color: '#FAFAFA',
      contrastText: '#000000',
    },
  },
  'internal-colors': {
    'focus-outline': {
      color: '#0064FA',
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
    'background-overlay-strong': {
      hex: lightThemeColors['grey-colors']['grey-80'].color,
      contrast: lightThemeColors['grey-colors']['grey-80'].contrastText,
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
    'state-selected-grey': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'state-disabled': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'state-disabled-foreground': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'state-disabled-background': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'state-disabled-foreground-strong': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'state-disabled-background-strong': {
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
  static: {
    'static-white': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'static-black': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
  },
} as const satisfies Theme;
