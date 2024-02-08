import { ColorLabel, getThemeColor } from '@elvia/elvis-colors';

export type IllustrationColor = 'grey' | 'purple' | 'green' | 'blue' | 'orange';
export type ColorId =
  | 'main-1'
  | 'main-2'
  | 'main-3'
  | 'main-4'
  | 'main-5'
  | 'shade-1'
  | 'shade-2'
  | 'shade-3'
  | 'shade-4'
  | 'background-1';

type ColorMap = Record<ColorId, ColorLabel>;

const defaultColors: ColorMap = {
  'background-1': 'illustration-background-1',
  'main-1': 'illustration-main-1',
  'main-2': 'illustration-main-2',
  'main-3': 'illustration-main-3',
  'main-4': 'illustration-main-4',
  'main-5': 'illustration-main-5',
  'shade-1': 'illustration-shade-1',
  'shade-2': 'illustration-shade-2',
  'shade-3': 'illustration-shade-3',
  'shade-4': 'illustration-shade-4',
};

export const grey: ColorMap = {
  ...defaultColors,
};

export const purple: ColorMap = {
  ...defaultColors,
  'background-1': 'illustration-background-4',
  'main-5': 'data-4',
};

export const green: ColorMap = {
  ...defaultColors,
  'background-1': 'illustration-background-2',
};

export const blue: ColorMap = {
  ...defaultColors,
  'background-1': 'illustration-background-3',
  'main-5': 'data-3',
};

export const orange: ColorMap = {
  ...defaultColors,
  'background-1': 'illustration-background-6',
  'main-5': 'signal-warning',
};

export const convertStringToIllustrationColor = (color: string | null): IllustrationColor => {
  if (!color) {
    return 'grey';
  }
  if (['grey', 'purple', 'green', 'blue', 'orange'].includes(color)) {
    return color as IllustrationColor;
  }
  console.warn(`Illustration - the provided color "${color}" was wrong.`);
  return 'grey';
};

const getColorPalette = (color: IllustrationColor): ColorMap => {
  switch (convertStringToIllustrationColor(color)) {
    case 'grey':
      return grey;
    case 'purple':
      return purple;
    case 'green':
      return green;
    case 'blue':
      return blue;
    case 'orange':
      return orange;
    default: {
      return grey;
    }
  }
};

export const replaceColors = (illustration: string, color: IllustrationColor): string => {
  const colors = getColorPalette(color);
  return illustration
    .replace(/fill="main-1"/g, `fill="${getThemeColor(colors['main-1'])}"`)
    .replace(/fill="main-2"/g, `fill="${getThemeColor(colors['main-2'])}"`)
    .replace(/fill="main-3"/g, `fill="${getThemeColor(colors['main-3'])}"`)
    .replace(/fill="main-4"/g, `fill="${getThemeColor(colors['main-4'])}"`)
    .replace(/fill="main-5"/g, `fill="${getThemeColor(colors['main-5'])}"`)
    .replace(/fill="background-1"/g, `fill="${getThemeColor(colors['background-1'])}"`)
    .replace(/fill="shade-1"/g, `fill="${getThemeColor(colors['shade-1'])}"`)
    .replace(/fill="shade-2"/g, `fill="${getThemeColor(colors['shade-2'])}"`)
    .replace(/fill="shade-3"/g, `fill="${getThemeColor(colors['shade-3'])}"`)
    .replace(/fill="shade-4"/g, `fill="${getThemeColor(colors['shade-4'])}"`);
};
