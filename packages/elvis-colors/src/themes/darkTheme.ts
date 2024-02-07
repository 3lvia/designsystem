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
    'green-apple-50': {
      color: '#3C7230',
      contrastText: '#EDEDED',
    },
    'violet-grape-50': {
      color: '#583B75',
      contrastText: '#EDEDED',
    },
    'blue-berry-50': {
      color: '#2A5785',
      contrastText: '#EDEDED',
    },
    'purple-plum-50': {
      color: '#6F5689',
      contrastText: '#EDEDED',
    },
    'orange-mango-50': {
      color: '#85572C',
      contrastText: '#EDEDED',
    },
    'red-tomato-50': {
      color: '#722E2E',
      contrastText: '#EDEDED',
    },
    'green-apple-30': {
      color: '#8AAB83',
      contrastText: '#171717',
    },
    'violet-grape-30': {
      color: '#9788A6',
      contrastText: '#171717',
    },
    'blue-berry-30': {
      color: '#8096AE',
      contrastText: '#171717',
    },
    'purple-plum-30': {
      color: '#A396B0',
      contrastText: '#171717',
    },
    'orange-mango-30': {
      color: '#B6A281',
      contrastText: '#171717',
    },
    'red-tomato-30': {
      color: '#AE8685',
      contrastText: '#171717',
    },
    'green-apple-10': {
      color: '#444F41',
      contrastText: '#EDEDED',
    },
    'violet-grape-10': {
      color: '#453F4B',
      contrastText: '#EDEDED',
    },
    'blue-berry-10': {
      color: '#404850',
      contrastText: '#EDEDED',
    },
    'purple-plum-10': {
      color: '#4C4851',
      contrastText: '#EDEDED',
    },
    'orange-mango-10': {
      color: '#534C41',
      contrastText: '#EDEDED',
    },
    'red-tomato-10': {
      color: '#504242',
      contrastText: '#EDEDED',
    },
  },
  'grey-colors': {
    'grey-70': {
      color: '#262626',
      contrastText: '#EDEDED',
    },
    'grey-60': {
      color: '#2B2B2B',
      contrastText: '#EDEDED',
    },
    'grey-50': {
      color: '#333333',
      contrastText: '#EDEDED',
    },
    'grey-40': {
      color: '#424242',
      contrastText: '#EDEDED',
    },
    'grey-30': {
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
    'grey-05': {
      color: '#DFDFDF',
      contrastText: '#171717',
    },
  },
  'internal-colors': {
    'focus-outline': {
      color: '#0064fa',
    },
  },
} as const satisfies BaseColors;

export type DarkThemeColorName =
  typeof darkThemeColors extends Record<string, infer Category>
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
      hex: darkThemeColors['primary-colors']['white'].color,
      contrast: darkThemeColors['primary-colors']['white'].contrastText,
    },
    'text-4': {
      hex: darkThemeColors['primary-colors']['black'].color,
      contrast: darkThemeColors['primary-colors']['black'].contrastText,
    },
    'text-5': {
      hex: darkThemeColors['primary-colors']['black'].color,
      contrast: darkThemeColors['primary-colors']['black'].contrastText,
    },
    'text-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-30'].color,
      contrast: darkThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'text-disabled-2': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'text-placeholder-1': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
      contrast: darkThemeColors['grey-colors']['grey-20'].contrastText,
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
    'background-3': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-element-1': {
      hex: 'transparent',
    },
    'background-element-2': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-element-3': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'background-element-4': {
      hex: darkThemeColors['grey-colors']['grey-70'].color,
      contrast: darkThemeColors['grey-colors']['grey-70'].contrastText,
    },
    'background-element-5': {
      hex: darkThemeColors['primary-colors']['white'].color,
      contrast: darkThemeColors['primary-colors']['white'].contrastText,
    },
    'background-element-6': {
      hex: darkThemeColors['primary-colors']['black'].color,
      contrast: darkThemeColors['primary-colors']['black'].contrastText,
    },
    'background-overlay-1': {
      hex: darkThemeColors['grey-colors']['grey-60'].color,
      contrast: darkThemeColors['grey-colors']['grey-60'].contrastText,
    },
    'background-overlay-2': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'background-overlay-3': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'background-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'background-disabled-2': {
      hex: darkThemeColors['grey-colors']['grey-30'].color,
      contrast: darkThemeColors['grey-colors']['grey-30'].contrastText,
    },
    'background-hover-1': {
      hex: darkThemeColors['primary-colors']['green'].color,
      contrast: darkThemeColors['primary-colors']['green'].contrastText,
    },
    'background-hover-2': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'background-selected-1': {
      hex: darkThemeColors['primary-colors']['green'].color,
      contrast: darkThemeColors['primary-colors']['green'].contrastText,
    },
    'background-selected-2': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
  },
  border: {
    'border-1': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'border-2': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'border-3': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'border-4': {
      hex: darkThemeColors['grey-colors']['grey-50'].color,
      contrast: darkThemeColors['grey-colors']['grey-50'].contrastText,
    },
    'border-5': {
      hex: 'transparent',
    },
    'border-6': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
      contrast: darkThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'border-disabled-1': {
      hex: darkThemeColors['grey-colors']['grey-30'].color,
      contrast: darkThemeColors['grey-colors']['grey-30'].contrastText,
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
    'signal-positive': {
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
    'signal-danger': {
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
    'data-1-50': {
      hex: darkThemeColors['data-colors']['green-apple-50'].color,
      contrast: darkThemeColors['data-colors']['green-apple-50'].contrastText,
    },
    'data-2-50': {
      hex: darkThemeColors['data-colors']['violet-grape-50'].color,
      contrast: darkThemeColors['data-colors']['violet-grape-50'].contrastText,
    },
    'data-3-50': {
      hex: darkThemeColors['data-colors']['blue-berry-50'].color,
      contrast: darkThemeColors['data-colors']['blue-berry-50'].contrastText,
    },
    'data-4-50': {
      hex: darkThemeColors['data-colors']['purple-plum-50'].color,
      contrast: darkThemeColors['data-colors']['purple-plum-50'].contrastText,
    },
    'data-5-50': {
      hex: darkThemeColors['data-colors']['orange-mango-50'].color,
      contrast: darkThemeColors['data-colors']['orange-mango-50'].contrastText,
    },
    'data-6-50': {
      hex: darkThemeColors['data-colors']['red-tomato-50'].color,
      contrast: darkThemeColors['data-colors']['red-tomato-50'].contrastText,
    },
    'data-1-30': {
      hex: darkThemeColors['data-colors']['green-apple-30'].color,
      contrast: darkThemeColors['data-colors']['green-apple-30'].contrastText,
    },
    'data-2-30': {
      hex: darkThemeColors['data-colors']['violet-grape-30'].color,
      contrast: darkThemeColors['data-colors']['violet-grape-30'].contrastText,
    },
    'data-3-30': {
      hex: darkThemeColors['data-colors']['blue-berry-30'].color,
      contrast: darkThemeColors['data-colors']['blue-berry-30'].contrastText,
    },
    'data-4-30': {
      hex: darkThemeColors['data-colors']['purple-plum-30'].color,
      contrast: darkThemeColors['data-colors']['purple-plum-30'].contrastText,
    },
    'data-5-30': {
      hex: darkThemeColors['data-colors']['orange-mango-30'].color,
      contrast: darkThemeColors['data-colors']['orange-mango-30'].contrastText,
    },
    'data-6-30': {
      hex: darkThemeColors['data-colors']['red-tomato-30'].color,
      contrast: darkThemeColors['data-colors']['red-tomato-30'].contrastText,
    },
    'data-1-10': {
      hex: darkThemeColors['data-colors']['green-apple-10'].color,
      contrast: darkThemeColors['data-colors']['green-apple-10'].contrastText,
    },
    'data-2-10': {
      hex: darkThemeColors['data-colors']['violet-grape-10'].color,
      contrast: darkThemeColors['data-colors']['violet-grape-10'].contrastText,
    },
    'data-3-10': {
      hex: darkThemeColors['data-colors']['blue-berry-10'].color,
      contrast: darkThemeColors['data-colors']['blue-berry-10'].contrastText,
    },
    'data-4-10': {
      hex: darkThemeColors['data-colors']['purple-plum-10'].color,
      contrast: darkThemeColors['data-colors']['purple-plum-10'].contrastText,
    },
    'data-5-10': {
      hex: darkThemeColors['data-colors']['orange-mango-10'].color,
      contrast: darkThemeColors['data-colors']['orange-mango-10'].contrastText,
    },
    'data-6-10': {
      hex: darkThemeColors['data-colors']['red-tomato-10'].color,
      contrast: darkThemeColors['data-colors']['red-tomato-10'].contrastText,
    },
  },
  icon: {
    'icon-stroke-1': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'icon-filled-foreground-1': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'icon-filled-background-1': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'icon-positive': {
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
    'icon-danger': {
      hex: darkThemeColors['signal-colors'].red.color,
      contrast: darkThemeColors['signal-colors'].red.contrastText,
    },
    'icon-info': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
  },
  assorted: {
    'static-white': {
      hex: darkThemeColors['primary-colors'].white.color,
      contrast: darkThemeColors['primary-colors'].white.contrastText,
    },
    'static-black': {
      hex: darkThemeColors['primary-colors'].black.color,
      contrast: darkThemeColors['primary-colors'].black.contrastText,
    },
    'brand-accent': {
      hex: darkThemeColors['primary-colors'].green.color,
      contrast: darkThemeColors['primary-colors'].green.contrastText,
    },
    'focus-outline': {
      hex: darkThemeColors['internal-colors']['focus-outline'].color,
    },
  },
  illustration: {
    'illustration-main-1': {
      hex: darkThemeColors['primary-colors']['grey'].color,
      contrast: darkThemeColors['primary-colors']['grey'].contrastText,
    },
    'illustration-main-2': {
      hex: darkThemeColors['primary-colors']['white'].color,
      contrast: darkThemeColors['primary-colors']['white'].contrastText,
    },
    'illustration-main-3': {
      hex: darkThemeColors['primary-colors']['white'].color,
      contrast: darkThemeColors['primary-colors']['white'].contrastText,
    },
    'illustration-main-4': {
      hex: darkThemeColors['primary-colors']['grey'].color,
      contrast: darkThemeColors['primary-colors']['grey'].contrastText,
    },
    'illustration-main-5': {
      hex: darkThemeColors['primary-colors']['green'].color,
      contrast: darkThemeColors['primary-colors']['green'].contrastText,
    },
    'illustration-shade-1': {
      hex: darkThemeColors['grey-colors']['grey-05'].color,
      contrast: darkThemeColors['grey-colors']['grey-05'].contrastText,
    },
    'illustration-shade-2': {
      hex: darkThemeColors['grey-colors']['grey-10'].color,
      contrast: darkThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'illustration-shade-3': {
      hex: darkThemeColors['grey-colors']['grey-20'].color,
      contrast: darkThemeColors['grey-colors']['grey-20'].contrastText,
    },
    'illustration-shade-4': {
      hex: darkThemeColors['grey-colors']['grey-40'].color,
      contrast: darkThemeColors['grey-colors']['grey-40'].contrastText,
    },
    'illustration-background-1': {
      hex: darkThemeColors['grey-colors']['grey-10'].color,
      contrast: darkThemeColors['grey-colors']['grey-10'].contrastText,
    },
    'illustration-background-2': {
      hex: darkThemeColors['data-colors']['green-apple-30'].color,
      contrast: darkThemeColors['data-colors']['green-apple-30'].contrastText,
    },
    'illustration-background-3': {
      hex: darkThemeColors['data-colors']['blue-berry-30'].color,
      contrast: darkThemeColors['data-colors']['blue-berry-30'].contrastText,
    },
    'illustration-background-4': {
      hex: darkThemeColors['data-colors']['purple-plum-30'].color,
      contrast: darkThemeColors['data-colors']['purple-plum-30'].contrastText,
    },
    'illustration-background-5': {
      hex: darkThemeColors['data-colors']['red-tomato-30'].color,
      contrast: darkThemeColors['data-colors']['red-tomato-30'].contrastText,
    },
    'illustration-background-6': {
      hex: darkThemeColors['data-colors']['orange-mango-30'].color,
      contrast: darkThemeColors['data-colors']['orange-mango-30'].contrastText,
    },
  },
} as const satisfies Theme;
