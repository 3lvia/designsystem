import { darkThemeColors } from '@elvia/elvis-colors';

import { ColorsObject } from './colors-types';
import { getColorElement } from './colors-util';

type DarkThemeColors = typeof darkThemeColors;

type PrimaryColors = DarkThemeColors['primary-colors'];
type PrimaryColor = keyof PrimaryColors;
const primaryColors = Object.keys(darkThemeColors['primary-colors']) as PrimaryColor[];

type SecondaryColors = DarkThemeColors['signal-colors'];
type SecondaryColor = keyof SecondaryColors;
const secondaryColors = Object.keys(darkThemeColors['signal-colors']) as SecondaryColor[];

type TertiaryColors = DarkThemeColors['data-colors'];
type TertiaryColor = keyof TertiaryColors;
const tertiaryColors = Object.keys(darkThemeColors['data-colors']) as TertiaryColor[];

type GreyColors = DarkThemeColors['grey-colors'];
type GreyColor = keyof GreyColors;
const greyColors = Object.keys(darkThemeColors['grey-colors']) as GreyColor[];

export const darkColors: ColorsObject = {
  primary: primaryColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['primary'],
  secondary: secondaryColors.map((colorName) =>
    getColorElement(colorName, 'dark'),
  ) as ColorsObject['secondary'],
  tertiary: tertiaryColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['tertiary'],
  grey: greyColors.map((colorName) => getColorElement(colorName, 'dark')) as ColorsObject['grey'],
};
