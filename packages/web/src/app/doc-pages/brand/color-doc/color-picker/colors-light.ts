import { lightThemeColors } from '@elvia/elvis-colors';
import { getColorElement } from './colors-util';
import { ColorsObject } from './colors-types';

type LightThemeColors = typeof lightThemeColors;

type PrimaryColors = LightThemeColors['primary-colors'];
type PrimaryColor = keyof PrimaryColors;
const primaryColors = Object.keys(lightThemeColors['primary-colors']) as PrimaryColor[];

type SecondaryColors = LightThemeColors['signal-colors'];
type SecondaryColor = keyof SecondaryColors;
const secondaryColors = Object.keys(lightThemeColors['signal-colors']) as SecondaryColor[];

type TertiaryColors = LightThemeColors['data-colors'];
type TertiaryColor = keyof TertiaryColors;
const tertiaryColors = Object.keys(lightThemeColors['data-colors']) as TertiaryColor[];

type GreyColors = LightThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(lightThemeColors['grey-colors']) as GreyColor[];

export const lightColors: ColorsObject = {
  primary: primaryColors.map((colorName) => getColorElement(colorName)) as ColorsObject['primary'],
  secondary: secondaryColors.map((colorName) => getColorElement(colorName)) as ColorsObject['secondary'],
  tertiary: tertiaryColors.map((colorName) => getColorElement(colorName)) as ColorsObject['tertiary'],
  grey: greyColors.map((colorName) => getColorElement(colorName)) as ColorsObject['grey'],
};
