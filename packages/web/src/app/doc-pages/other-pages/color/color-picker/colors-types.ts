import { ColorLabel } from '@elvia/elvis-colors';

export interface ColorElement {
  name: string;
  hex: string;
  contrast: { white: ContrastType; black: ContrastType };
  token: ColorLabel[];
}

export interface ColorsObject {
  primary: ColorElement[];
  signal: ColorElement[];
  data: ColorElement[];
  grey: ColorElement[];
}

type ContrastType = '' | 'Large AA' | 'AA' | 'AAA';

export type ThemeType = 'light' | 'dark';
