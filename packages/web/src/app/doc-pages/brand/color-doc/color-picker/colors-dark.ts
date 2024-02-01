import { darkThemeColors } from '@elvia/elvis-colors';
import { getColorElement } from './colors-util';
import { ColorsObject } from './colors-types';

type DarkThemeColors = typeof darkThemeColors;

type PrimaryColors = DarkThemeColors['primary-colors'];
type PrimaryColor = keyof PrimaryColors;
const primaryColors = Object.keys(darkThemeColors['primary-colors']) as PrimaryColor[];

type SignalColors = DarkThemeColors['signal-colors'];
type SignalColor = keyof SignalColors;
const signalColors = Object.keys(darkThemeColors['signal-colors']) as SignalColor[];

type TertiaryColors = DarkThemeColors['data-colors'];
type TertiaryColor = keyof TertiaryColors;
const tertiaryColors = Object.keys(darkThemeColors['data-colors']) as TertiaryColor[];

type GreyColors = DarkThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(darkThemeColors['grey-colors']) as GreyColor[];

export const darkColors: ColorsObject = {
  primary: primaryColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['primary'],
  secondary: signalColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['secondary'],
  tertiary: tertiaryColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['tertiary'],
  grey: greyColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['grey'],
};
