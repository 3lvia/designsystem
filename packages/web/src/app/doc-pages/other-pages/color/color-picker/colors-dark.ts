import {
  ColorLabel,
  BackgroundLabels,
  BorderLabels,
  DataLabels,
  SignalLabels,
  TextLabels,
  IconColors as IconLabels,
  ThemeName,
  DarkThemeColorName,
  getThemeColor,
  getBaseColor,
  darkThemeColors,
  darkTheme,
} from '@elvia/elvis-colors';

type DarkThemeColors = typeof darkThemeColors;
type PrimaryColors = DarkThemeColors['primary-colors'];
type PrimaryColor = keyof PrimaryColors;
const primaryColors = Object.keys(darkThemeColors['primary-colors']) as PrimaryColor[];

type SignalColors = DarkThemeColors['signal-colors'];
type SignalColor = keyof SignalColors;
const signalColors = Object.keys(darkThemeColors['signal-colors']) as SignalColor[];

type DataColors = DarkThemeColors['data-colors'];
type DataColor = keyof DataColors;
const dataColors = Object.keys(darkThemeColors['data-colors']) as DataColor[];

type GreyColors = DarkThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(darkThemeColors['grey-colors']) as GreyColor[];

interface ColorElement {
  name: string;
  hex: string;
  contrast: { white: false | 'AA' | 'AAA'; black: false | 'AA' | 'AAA' };
  token: ColorLabel[];
}

interface ColorTypes {
  primary: ColorElement[];
  signal: ColorElement[];
  data: ColorElement[];
  grey: ColorElement[];
}

const getTokens = (hex: string) => {
  const foundLabels: ColorLabel[] = [];
  Object.values(darkTheme).forEach((category) =>
    Object.entries(category).forEach(([colorName, label]) => {
      if (label.hex === hex) {
        foundLabels.push(colorName as ColorLabel);
      }
    }),
  );
  return foundLabels;
};

const getColorElement = (name: DarkThemeColorName) =>
  <ColorElement>{
    name: name,
    hex: getBaseColor(name),
    contrast: { white: false, black: 'AA' },
    token: getTokens(getBaseColor(name)),
  };

const contrasts = {
  'primary-colors': {
    white: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    green: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    black: {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    grey: {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
  },
  'signal-colors': {
    yellow: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    orange: {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    red: {
      contrasts: {
        white: 'AA',
        black: 'AA',
      },
    },
  },
  'data-colors': {
    'green-apple': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'violet-grape': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'blue-berry': {
      contrasts: {
        white: 'AA',
        black: '',
      },
    },
    'purple-plum': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'orange-mango': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'red-tomato': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
  },
  'grey-colors': {
    'grey-90': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'grey-80': {
      contrasts: {
        white: 'AAA',
        black: '',
      },
    },
    'grey-70': {
      contrasts: {
        white: 'AA',
        black: '',
      },
    },
    'grey-60': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'grey-50': {
      contrasts: {
        white: '',
        black: 'AA',
      },
    },
    'grey-40': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-30': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-20': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-10': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-05': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
    'grey-02': {
      contrasts: {
        white: '',
        black: 'AAA',
      },
    },
  },
};

export const darkColors: ColorTypes = {
  primary: primaryColors.map((colorName) => getColorElement(colorName)),
  signal: signalColors.map((colorName) => getColorElement(colorName)),
  data: dataColors.map((colorName) => getColorElement(colorName)),
  grey: greyColors.map((colorName) => getColorElement(colorName)),
};

// const primaryColors: ColorElement<PrimaryColor>[] = [
//   {
//     name: 'green',
//     hex: getBaseColor('green'),
//     contrast: { white: false, black: 'AA' },
//     token: getTokens(getBaseColor('green')),
//   },
//   {
//     name: 'black',
//     hex: getBaseColor('black'),
//     contrast: { white: false, black: 'AA' },
//     token: getTokens(getBaseColor('black')),
//   },
//   {
//     name: 'white',
//     hex: getBaseColor('white'),
//     contrast: { white: false, black: 'AA' },
//     token: getTokens(getBaseColor('white')),
//   },
//   {
//     name: 'grey',
//     hex: getBaseColor('grey'),
//     contrast: { white: false, black: 'AA' },
//     token: getTokens(getBaseColor('grey')),
//   },
// ];
