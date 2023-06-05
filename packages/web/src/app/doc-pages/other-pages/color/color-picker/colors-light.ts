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
  Object.values(lightTheme).forEach((category) =>
    Object.entries(category).forEach(([colorName, label]) => {
      if (label.hex === hex) {
        foundLabels.push(colorName as ColorLabel);
      }
    }),
  );
  return foundLabels;
};

const getColorElement = (name: PrimaryColor | SignalColor | DataColor | GreyColor) =>
  <ColorElement>{
    name: name,
    hex: getBaseColor(name),
    contrast: { white: false, black: 'AA' },
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
