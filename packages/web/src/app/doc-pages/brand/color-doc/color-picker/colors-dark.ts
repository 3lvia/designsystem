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

type DataColors = DarkThemeColors['data-colors'];
type DataColor = keyof DataColors;
const dataColors = Object.keys(darkThemeColors['data-colors']) as DataColor[];

type GreyColors = DarkThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(darkThemeColors['grey-colors']) as GreyColor[];

export const darkColors: ColorsObject = {
  primary: primaryColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['primary'],
  secondary: signalColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['secondary'],
  data: dataColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['data'],
  grey: greyColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['grey'],
};
