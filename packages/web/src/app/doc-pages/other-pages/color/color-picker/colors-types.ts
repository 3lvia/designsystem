import { ColorLabel } from '@elvia/elvis-colors';

export interface ColorElement {
  name: string;
  hex: string;
  contrast: { white: '' | 'AA' | 'AAA'; black: '' | 'AA' | 'AAA' };
  token: ColorLabel[];
}

export interface ColorsObject {
  primary: ColorElement[];
  signal: ColorElement[];
  data: ColorElement[];
  grey: ColorElement[];
}

export type ThemeType = 'light' | 'dark';
