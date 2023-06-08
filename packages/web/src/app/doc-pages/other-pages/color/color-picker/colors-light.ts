import { lightThemeColors } from '@elvia/elvis-colors';
import { getColorElement } from './colors-util';
import { ColorsObject } from './colors-types';

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

export const lightColors: ColorsObject = {
  primary: primaryColors.map((colorName) => getColorElement(colorName)),
  signal: signalColors.map((colorName) => getColorElement(colorName)),
  data: dataColors.map((colorName) => getColorElement(colorName)),
  grey: greyColors.map((colorName) => getColorElement(colorName)),
};
