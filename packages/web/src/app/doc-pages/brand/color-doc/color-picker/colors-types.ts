import { ColorLabel, DarkThemeColorName, LightThemeColorName } from '@elvia/elvis-colors';

export interface ColorElement {
  name: DarkThemeColorName | LightThemeColorName;
  hex: string;
  rgb: RGB;
  contrast: { white: ContrastType; black: ContrastType };
  tokens: ColorLabel[];
}

export interface ColorsObject {
  primary: ColorElement[];
  secondary: ColorElement[];
  data: ColorElement[];
  grey: ColorElement[];
}

export type ContrastType = '' | 'Large AA' | 'AA' | 'AAA';

export type RGB = [number, number, number];
