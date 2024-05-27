import { ColorLabel, DarkThemeColorName, LightThemeColorName } from '@elvia/elvis-colors';

export interface ColorElement {
  name: ColorName;
  hex: string;
  rgb: RGB;
  contrast: { white: ContrastType; black: ContrastType };
  tokens: ColorLabel[];
}

export interface ColorsObject {
  primary: ColorElement[];
  secondary: ColorElement[];
  tertiary: ColorElement[];
  grey: ColorElement[];
}

export type ContrastType = '' | 'Large AA' | 'AA' | 'AAA';

export type RGB = [number, number, number];

export type ColorName = LightThemeColorName | DarkThemeColorName;
