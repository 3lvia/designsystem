import { ColorLabel, getThemeColor } from '@elvia/elvis-colors';

export type IllustrationColor = 'grey' | 'purple' | 'green' | 'blue' | 'orange';
type ColorId =
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

export const grey: Partial<ColorMap> = {
  'background-1': 'background-element-3',
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

export const replaceColors = (illustration: string, colors: ColorMap): string => {
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
