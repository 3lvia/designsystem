import {
  ColorLabel,
  DarkThemeColorName,
  LightThemeColorName,
  darkTheme,
  getBaseColor,
  lightTheme,
} from '@elvia/elvis-colors';
import { ColorElement, ThemeType } from './colors-types';

const hexToRgb = (hex: string): number[] | null => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = makeHexValue6Length(hex);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
  return rgb;
};

const makeHexValue6Length = (hex: string): string => {
  if (hex.length === 4) {
    hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
  }
  return hex.toUpperCase();
};

const getLuminanace = (values: number[]) => {
  const rgb = values.map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

const getContrastRatio = (colorA: number[], colorB: number[]) => {
  const lumA = getLuminanace(colorA);
  const lumB = getLuminanace(colorB);

  return (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);
};

export const getContrastValue = (
  color1: DarkThemeColorName | LightThemeColorName,
  color2: DarkThemeColorName | LightThemeColorName,
  theme?: 'light' | 'dark',
) => {
  const colorRgb1 = hexToRgb(getBaseColor(color1, theme));
  const colorRgb2 = hexToRgb(getBaseColor(color2, theme));
  if (colorRgb1 && colorRgb2) {
    const contrast = getContrastRatio(colorRgb1, colorRgb2);
    if (contrast >= 7) {
      return 'AAA';
    } else if (contrast >= 4.5) {
      return 'AA';
    } else if (contrast >= 3) {
      return 'Large AA';
    }
  }
  return '';
};

const getTokens = (hex: string, theme?: ThemeType) => {
  const foundLabels: ColorLabel[] = [];
  if (theme === 'dark') {
    Object.values(darkTheme).forEach((category) =>
      Object.entries(category).forEach(([colorName, label]) => {
        if (label.hex === hex) {
          foundLabels.push(colorName as ColorLabel);
        }
      }),
    );
    return foundLabels;
  } else {
    Object.values(lightTheme).forEach((category) =>
      Object.entries(category).forEach(([colorName, label]) => {
        if (label.hex === hex) {
          foundLabels.push(colorName as ColorLabel);
        }
      }),
    );
    return foundLabels;
  }
};

export const getColorElement = (colorName: LightThemeColorName, theme?: ThemeType) =>
  <ColorElement>{
    name: colorName,
    hex: getBaseColor(colorName, theme),
    contrast: {
      white: getContrastValue(colorName, 'white', theme),
      black: getContrastValue(colorName, 'black', theme),
    },
    token: getTokens(getBaseColor(colorName, theme), theme),
  };
