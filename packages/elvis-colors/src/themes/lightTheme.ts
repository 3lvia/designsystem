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
      contrastText: '#FFFFFF',
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
    'green-apple-50': {
      color: '#94D787',
      contrastText: '#000000',
    },
    'violet-grape-50': {
      color: '#A885CB',
      contrastText: '#000000',
    },
    'blue-berry-50': {
      color: '#85B9EE',
      contrastText: '#000000',
    },
    'purple-plum-50': {
      color: '#DCB9FF',
      contrastText: '#000000',
    },
    'orange-mango-50': {
      color: '#EEB985',
      contrastText: '#000000',
    },
    'red-tomato-50': {
      color: '#DD8686',
      contrastText: '#000000',
    },
    'green-apple-30': {
      color: '#CCF4C3',
      contrastText: '#000000',
    },
    'violet-grape-30': {
      color: '#D3C2E5',
      contrastText: '#000000',
    },
    'blue-berry-30': {
      color: '#C2DCF6',
      contrastText: '#000000',
    },
    'purple-plum-30': {
      color: '#EDDCFF',
      contrastText: '#000000',
    },
    'orange-mango-30': {
      color: '#FFE8C2',
      contrastText: '#000000',
    },
    'red-tomato-30': {
      color: '#FBC3C2',
      contrastText: '#000000',
    },
    'green-apple-10': {
      color: '#EEFBEB',
      contrastText: '#000000',
    },
    'violet-grape-10': {
      color: '#F0EBF6',
      contrastText: '#000000',
    },
    'blue-berry-10': {
      color: '#EBF3FC',
      contrastText: '#000000',
    },
    'purple-plum-10': {
      color: '#F9F3FF',
      contrastText: '#000000',
    },
    'orange-mango-10': {
      color: '#FFF7EB',
      contrastText: '#000000',
    },
    'red-tomato-10': {
      color: '#FEEBEB',
      contrastText: '#000000',
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

export type LightThemeColorName =
  typeof lightThemeColors extends Record<string, infer Category>
    ? Category extends Record<string, any>
      ? keyof Category
      : never
    : never;

export const lightTheme = {
  text: {
    'text-1': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
    'text-2': {
      hex: lightThemeColors['grey-colors']['grey-80'].color,
      contrast: lightThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'text-3': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'text-4': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'text-5': {
      hex: lightThemeColors['primary-colors']['black'].color,
      contrast: lightThemeColors['primary-colors']['black'].contrastText,
    },
    'text-disabled-1': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'text-disabled-2': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'text-placeholder-1': {
      hex: lightThemeColors['grey-colors']['grey-70'].color,
      contrast: lightThemeColors['grey-colors']['grey-70'].contrastText,
    },
  },
  background: {
    'background-1': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-2': {
      hex: lightThemeColors['grey-colors']['grey-02'].color,
      contrast: lightThemeColors['grey-colors']['grey-02'].contrastText,
    },
    'background-3': {
      hex: lightThemeColors['primary-colors']['grey'].color,
      contrast: lightThemeColors['primary-colors']['grey'].contrastText,
    },
    'background-element-1': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-element-2': {
      hex: lightThemeColors['grey-colors']['grey-02'].color,
      contrast: lightThemeColors['grey-colors']['grey-02'].contrastText,
    },
    'background-element-3': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'background-element-4': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'background-element-5': {
      hex: lightThemeColors['primary-colors']['black'].color,
      contrast: lightThemeColors['primary-colors']['black'].contrastText,
    },
    'background-element-6': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'background-overlay-1': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-overlay-2': {
      hex: lightThemeColors['grey-colors']['grey-80'].color,
      contrast: lightThemeColors['grey-colors']['grey-80'].contrastText,
    },
    'background-overlay-3': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'background-disabled-1': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'background-disabled-2': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'background-hover-1': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'background-hover-2': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'background-selected-1': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'background-selected-2': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'background-readonly-1': {
      hex: lightThemeColors['grey-colors']['grey-02'].color,
      contrast: lightThemeColors['grey-colors']['grey-02'].contrastText,
    },
  },
  border: {
    'border-1': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
    'border-2': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'border-3': {
      hex: lightThemeColors['grey-colors']['grey-20'].color,
      contrast: lightThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'border-4': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'border-5': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'border-6': {
      hex: lightThemeColors['grey-colors']['grey-60'].color,
      contrast: lightThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'border-disabled-1': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'border-hover-1': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'border-selected-1': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'border-selected-2': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
  },
  signal: {
    'signal-positive': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'signal-caution': {
      hex: lightThemeColors['signal-colors'].yellow.color,
      contrast: lightThemeColors['signal-colors'].yellow.contrastText,
    },
    'signal-warning': {
      hex: lightThemeColors['signal-colors'].orange.color,
      contrast: lightThemeColors['signal-colors'].orange.contrastText,
    },
    'signal-danger': {
      hex: lightThemeColors['signal-colors'].red.color,
      contrast: lightThemeColors['signal-colors'].red.contrastText,
    },
    'signal-info': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
  },
  data: {
    'data-1': {
      hex: lightThemeColors['data-colors']['green-apple'].color,
      contrast: lightThemeColors['data-colors']['green-apple'].contrastText,
    },
    'data-2': {
      hex: lightThemeColors['data-colors']['violet-grape'].color,
      contrast: lightThemeColors['data-colors']['violet-grape'].contrastText,
    },
    'data-3': {
      hex: lightThemeColors['data-colors']['blue-berry'].color,
      contrast: lightThemeColors['data-colors']['blue-berry'].contrastText,
    },
    'data-4': {
      hex: lightThemeColors['data-colors']['purple-plum'].color,
      contrast: lightThemeColors['data-colors']['purple-plum'].contrastText,
    },
    'data-5': {
      hex: lightThemeColors['data-colors']['orange-mango'].color,
      contrast: lightThemeColors['data-colors']['orange-mango'].contrastText,
    },
    'data-6': {
      hex: lightThemeColors['data-colors']['red-tomato'].color,
      contrast: lightThemeColors['data-colors']['red-tomato'].contrastText,
    },
    'data-1-50': {
      hex: lightThemeColors['data-colors']['green-apple-50'].color,
      contrast: lightThemeColors['data-colors']['green-apple-50'].contrastText,
    },
    'data-2-50': {
      hex: lightThemeColors['data-colors']['violet-grape-50'].color,
      contrast: lightThemeColors['data-colors']['violet-grape-50'].contrastText,
    },
    'data-3-50': {
      hex: lightThemeColors['data-colors']['blue-berry-50'].color,
      contrast: lightThemeColors['data-colors']['blue-berry-50'].contrastText,
    },
    'data-4-50': {
      hex: lightThemeColors['data-colors']['purple-plum-50'].color,
      contrast: lightThemeColors['data-colors']['purple-plum-50'].contrastText,
    },
    'data-5-50': {
      hex: lightThemeColors['data-colors']['orange-mango-50'].color,
      contrast: lightThemeColors['data-colors']['orange-mango-50'].contrastText,
    },
    'data-6-50': {
      hex: lightThemeColors['data-colors']['red-tomato-50'].color,
      contrast: lightThemeColors['data-colors']['red-tomato-50'].contrastText,
    },
    'data-1-30': {
      hex: lightThemeColors['data-colors']['green-apple-30'].color,
      contrast: lightThemeColors['data-colors']['green-apple-30'].contrastText,
    },
    'data-2-30': {
      hex: lightThemeColors['data-colors']['violet-grape-30'].color,
      contrast: lightThemeColors['data-colors']['violet-grape-30'].contrastText,
    },
    'data-3-30': {
      hex: lightThemeColors['data-colors']['blue-berry-30'].color,
      contrast: lightThemeColors['data-colors']['blue-berry-30'].contrastText,
    },
    'data-4-30': {
      hex: lightThemeColors['data-colors']['purple-plum-30'].color,
      contrast: lightThemeColors['data-colors']['purple-plum-30'].contrastText,
    },
    'data-5-30': {
      hex: lightThemeColors['data-colors']['orange-mango-30'].color,
      contrast: lightThemeColors['data-colors']['orange-mango-30'].contrastText,
    },
    'data-6-30': {
      hex: lightThemeColors['data-colors']['red-tomato-30'].color,
      contrast: lightThemeColors['data-colors']['red-tomato-30'].contrastText,
    },
    'data-1-10': {
      hex: lightThemeColors['data-colors']['green-apple-10'].color,
      contrast: lightThemeColors['data-colors']['green-apple-10'].contrastText,
    },
    'data-2-10': {
      hex: lightThemeColors['data-colors']['violet-grape-10'].color,
      contrast: lightThemeColors['data-colors']['violet-grape-10'].contrastText,
    },
    'data-3-10': {
      hex: lightThemeColors['data-colors']['blue-berry-10'].color,
      contrast: lightThemeColors['data-colors']['blue-berry-10'].contrastText,
    },
    'data-4-10': {
      hex: lightThemeColors['data-colors']['purple-plum-10'].color,
      contrast: lightThemeColors['data-colors']['purple-plum-10'].contrastText,
    },
    'data-5-10': {
      hex: lightThemeColors['data-colors']['orange-mango-10'].color,
      contrast: lightThemeColors['data-colors']['orange-mango-10'].contrastText,
    },
    'data-6-10': {
      hex: lightThemeColors['data-colors']['red-tomato-10'].color,
      contrast: lightThemeColors['data-colors']['red-tomato-10'].contrastText,
    },
  },
  icon: {
    'icon-stroke-1': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
    'icon-filled-foreground-1': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'icon-filled-background-1': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
    'icon-positive': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'icon-caution': {
      hex: lightThemeColors['signal-colors'].yellow.color,
      contrast: lightThemeColors['signal-colors'].yellow.contrastText,
    },
    'icon-warning': {
      hex: lightThemeColors['signal-colors'].orange.color,
      contrast: lightThemeColors['signal-colors'].orange.contrastText,
    },
    'icon-danger': {
      hex: lightThemeColors['signal-colors'].red.color,
      contrast: lightThemeColors['signal-colors'].red.contrastText,
    },
    'icon-info': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
  },
  assorted: {
    'static-white': {
      hex: lightThemeColors['primary-colors'].white.color,
      contrast: lightThemeColors['primary-colors'].white.contrastText,
    },
    'static-black': {
      hex: lightThemeColors['primary-colors'].black.color,
      contrast: lightThemeColors['primary-colors'].black.contrastText,
    },
    'brand-accent': {
      hex: lightThemeColors['primary-colors'].green.color,
      contrast: lightThemeColors['primary-colors'].green.contrastText,
    },
    'focus-outline': {
      hex: lightThemeColors['internal-colors']['focus-outline'].color,
    },
  },
  illustration: {
    'illustration-main-1': {
      hex: lightThemeColors['primary-colors']['grey'].color,
      contrast: lightThemeColors['primary-colors']['grey'].contrastText,
    },
    'illustration-main-2': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'illustration-main-3': {
      hex: lightThemeColors['primary-colors']['grey'].color,
      contrast: lightThemeColors['primary-colors']['grey'].contrastText,
    },
    'illustration-main-4': {
      hex: lightThemeColors['primary-colors']['white'].color,
      contrast: lightThemeColors['primary-colors']['white'].contrastText,
    },
    'illustration-main-5': {
      hex: lightThemeColors['primary-colors']['green'].color,
      contrast: lightThemeColors['primary-colors']['green'].contrastText,
    },
    'illustration-shade-1': {
      hex: lightThemeColors['grey-colors']['grey-05'].color,
      contrast: lightThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'illustration-shade-2': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'illustration-shade-3': {
      hex: lightThemeColors['grey-colors']['grey-20'].color,
      contrast: lightThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'illustration-shade-4': {
      hex: lightThemeColors['grey-colors']['grey-30'].color,
      contrast: lightThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'illustration-background-1': {
      hex: lightThemeColors['grey-colors']['grey-10'].color,
      contrast: lightThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'illustration-background-2': {
      hex: lightThemeColors['data-colors']['green-apple-30'].color,
      contrast: lightThemeColors['data-colors']['green-apple-30'].contrastText,
    },
    'illustration-background-3': {
      hex: lightThemeColors['data-colors']['blue-berry-30'].color,
      contrast: lightThemeColors['data-colors']['blue-berry-30'].contrastText,
    },
    'illustration-background-4': {
      hex: lightThemeColors['data-colors']['purple-plum-30'].color,
      contrast: lightThemeColors['data-colors']['purple-plum-30'].contrastText,
    },
    'illustration-background-5': {
      hex: lightThemeColors['data-colors']['red-tomato-30'].color,
      contrast: lightThemeColors['data-colors']['red-tomato-30'].contrastText,
    },
    'illustration-background-6': {
      hex: lightThemeColors['data-colors']['orange-mango-30'].color,
      contrast: lightThemeColors['data-colors']['orange-mango-30'].contrastText,
    },
  },
} as const satisfies Theme;
