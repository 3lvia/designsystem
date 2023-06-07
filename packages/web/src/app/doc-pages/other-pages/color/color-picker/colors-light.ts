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
  LightThemeColorName,
  getThemeColor,
  lightThemeColors,
  lightTheme,
  getBaseColor,
} from '@elvia/elvis-colors';

type LightThemeColors = typeof lightThemeColors;
type PrimaryColors = LightThemeColors['primary-colors'];
type PrimaryColor = keyof PrimaryColors;
const primaryColors = Object.keys(lightThemeColors['primary-colors']) as PrimaryColor[];

type SignalColors = LightThemeColors['signal-colors'];
type SignalColor = keyof SignalColors;
const signalColors = Object.keys(lightThemeColors['signal-colors']) as SignalColor[];

type DataColors = LightThemeColors['data-colors'];
type DataColor = keyof DataColors;
const dataColors = Object.keys(lightThemeColors['data-colors']) as DataColor[];

type GreyColors = LightThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(lightThemeColors['grey-colors']) as GreyColor[];

interface ColorElement {
  name: string;
  hex: string;
  contrast: { white: '' | 'AA' | 'AAA'; black: '' | 'AA' | 'AAA' };
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
  Object.values(lightTheme).forEach((category) =>
    Object.entries(category).forEach(([colorName, label]) => {
      if (label.hex === hex) {
        foundLabels.push(colorName as ColorLabel);
      }
    }),
  );
  return foundLabels;
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

const hexToRgb = (hex: string): number[] | null => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = makeHexValue6Length(hex);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  return rgb;
};

const makeHexValue6Length = (hex: string): string => {
  if (hex.length === 4) {
    hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
  }
  return hex.toUpperCase();
};

const getLuminanace = (values: number[]) => {
  const rgb = values.map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

const getContrastRatio = (colorA: number[], colorB: number[]) => {
  const lumA = getLuminanace(colorA);
  const lumB = getLuminanace(colorB);

  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};
const greenRgb = hexToRgb(lightThemeColors['primary-colors'].green.color);
const blackRgb = hexToRgb(lightThemeColors['primary-colors'].black.color);
if (greenRgb && blackRgb) {
  const cont = getContrastRatio(greenRgb, blackRgb);
  console.log();
}

const getContrastValues = (color1: LightThemeColorName, color2: LightThemeColorName) => {
  const colorRgb1 = hexToRgb(getBaseColor(color1));
  const colorRgb2 = hexToRgb(getBaseColor(color2));
  if (colorRgb1 && colorRgb2) {
    const contrast = getContrastRatio(colorRgb1, colorRgb2);
  }
};

type colorType = keyof typeof contrasts;
const whiteColor = 'white';
const ex = contrasts['primary-colors'][whiteColor].contrasts;

const getColorElement = (name: LightThemeColorName) =>
  <ColorElement>{
    name: name,
    hex: getBaseColor(name),
    contrast: { white: '', black: '' },
    token: getTokens(getBaseColor(name)),
  };

export const lightColors: ColorTypes = {
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
