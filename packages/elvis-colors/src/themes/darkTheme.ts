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
    grey: {
      color: '#1F1F1F',
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
      contrastText: '#EDEDED',
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
      color: '#A1A1A1',
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
  text: {
    'text-1': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'text-2': {
      hex: darkThemeColors['grey-colors']['grey-10'].color,
      contrast: darkThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'text-3': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
      contrast: darkThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'text-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'text-disabled-2': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
  },
  background: {
    'background-1': {
      hex: darkThemeColors['primary-colors']['grey'].color,
      contrast: darkThemeColors['primary-colors']['grey'].contrastText,
    },
    'background-2': {
      hex: darkThemeColors['primary-colors']['grey'].color,
      contrast: darkThemeColors['primary-colors']['grey'].contrastText,
    },
    'background-element-1': {
      hex: 'transparent',
    },
    'background-element-2': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-element-3': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-element-4': {
      hex: darkThemeColors['primary-colors']['grey'].color,
      contrast: darkThemeColors['primary-colors']['grey'].contrastText,
    },
    'background-element-5': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-overlay-1': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-overlay-2': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-overlay-3': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'background-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-disabled-2': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'background-hover-1': {
      hex: darkThemeColors['primary-colors']['green'].color,
      contrast: darkThemeColors['primary-colors']['green'].contrastText,
    },
    'background-hover-2': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-selected-1': {
      hex: darkThemeColors['primary-colors']['green'].color,
      contrast: darkThemeColors['primary-colors']['green'].contrastText,
    },
    'background-selected-2': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
  },
  border: {
    'border-1': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'border-2': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'border-3': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'border-4': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'border-5': {
      hex: 'transparent',
    },
    'border-6': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
      contrast: darkThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'border-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'border-hover-1': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'border-selected-1': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'border-selected-2': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
  },
  signal: {
    'signal-success': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'signal-caution': {
      hex: darkThemeColors['signal-colors'].yellow.color,
      contrast: darkThemeColors['signal-colors'].yellow.contrastText,
    },
    'signal-warning': {
      hex: darkThemeColors['signal-colors'].orange.color,
      contrast: darkThemeColors['signal-colors'].orange.contrastText,
    },
    'signal-error': {
      hex: darkThemeColors['signal-colors'].red.color,
      contrast: darkThemeColors['signal-colors'].red.contrastText,
    },
    'signal-info': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
  },
  data: {
    'data-1': {
      hex: darkThemeColors['data-colors']['green-apple'].color,
      contrast: darkThemeColors['data-colors']['green-apple'].contrastText,
    },
    'data-2': {
      hex: darkThemeColors['data-colors']['violet-grape'].color,
      contrast: darkThemeColors['data-colors']['violet-grape'].contrastText,
    },
    'data-3': {
      hex: darkThemeColors['data-colors']['blue-berry'].color,
      contrast: darkThemeColors['data-colors']['blue-berry'].contrastText,
    },
    'data-4': {
      hex: darkThemeColors['data-colors']['purple-plum'].color,
      contrast: darkThemeColors['data-colors']['purple-plum'].contrastText,
    },
    'data-5': {
      hex: darkThemeColors['data-colors']['orange-mango'].color,
      contrast: darkThemeColors['data-colors']['orange-mango'].contrastText,
    },
    'data-6': {
      hex: darkThemeColors['data-colors']['red-tomato'].color,
      contrast: darkThemeColors['data-colors']['red-tomato'].contrastText,
    },
  },
  icon: {
    'icon-stroke': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'icon-filled-foreground': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'icon-filled-background': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'icon-filled-foreground-colored': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'icon-success': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'icon-caution': {
      hex: darkThemeColors['signal-colors'].yellow.color,
      contrast: darkThemeColors['signal-colors'].yellow.contrastText,
    },
    'icon-warning': {
      hex: darkThemeColors['signal-colors'].orange.color,
      contrast: darkThemeColors['signal-colors'].orange.contrastText,
    },
    'icon-error': {
      hex: darkThemeColors['signal-colors'].red.color,
      contrast: darkThemeColors['signal-colors'].red.contrastText,
    },
    'icon-info': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
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
    'static-brand-accent': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
  },
} as const satisfies Theme;
