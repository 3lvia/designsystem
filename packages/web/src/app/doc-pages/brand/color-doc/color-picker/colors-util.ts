import {
  ColorLabel,
  DarkThemeColorName,
  LightThemeColorName,
  ThemeName,
  darkTheme,
  getBaseColor,
  lightTheme,
} from '@elvia/elvis-colors';
import { ColorElement, ColorsObject, ContrastType, RGB } from './colors-types';

const hexToRgb = (hex: string): RGB => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = makeHexValue6Length(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    throw new Error('Cannot parse color');
  }
  return [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)];
};

const makeHexValue6Length = (hex: string): string => {
  if (hex.length === 4) {
    hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
  }
  return hex.toUpperCase();
};

const getLuminance = (values: RGB) => {
  const rgb = values.map((v) => {
    const val = v / 255;
    return val <= 0.03928 ? val / 12.92 : ((val + 0.055) / 1.055) ** 2.4;
  });
  return Number((0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]).toFixed(3));
};

const getContrastRatio = (color1: RGB, color2: RGB) => {
  const luminance1 = getLuminance(color1);
  const luminance2 = getLuminance(color2);

  return (Math.max(luminance1, luminance2) + 0.05) / (Math.min(luminance1, luminance2) + 0.05);
};

export const getContrastValue = (
  color1: DarkThemeColorName | LightThemeColorName,
  color2: DarkThemeColorName | LightThemeColorName,
  theme?: ThemeName,
) => {
  const colorRgb1 = hexToRgb(getBaseColor(color1, theme));
  const colorRgb2 = hexToRgb(getBaseColor(color2, theme));
  const contrast = getContrastRatio(colorRgb1, colorRgb2);
  if (contrast >= 7) {
    return 'AAA';
  } else if (contrast >= 4.5) {
    return 'AA';
  } else if (contrast >= 3) {
    return 'Large AA';
  }
  return '';
};

export const convertContrastValueToNumber = (contrast: ContrastType) => {
  switch (contrast) {
    case '': {
      return 0;
    }
    case 'Large AA': {
      return 1;
    }
    case 'AA': {
      return 2;
    }
    case 'AAA': {
      return 3;
    }
  }
};

export const getHighestContrast = (color: ColorElement, theme: ThemeName) => {
  const white = convertContrastValueToNumber(color.contrast.white);
  const black = convertContrastValueToNumber(color.contrast.black);
  if (white > black) {
    return getColorElement('white', theme);
  } else {
    return getColorElement('black', theme);
  }
};

const getTokens = (hex: string, theme?: ThemeName) => {
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

export const getOpacityColors = (
  colorName: DarkThemeColorName | LightThemeColorName,
  colorList: ColorsObject,
) => {
  return colorList['tertiary'].filter(
    (color) => getBaseColorName(colorName) === getBaseColorName(color.name),
  );
};

const getBaseColorName = (colorName: DarkThemeColorName | LightThemeColorName) => {
  return colorName.split('-').slice(0, 2).join('-');
};

export const getColorElement = (
  colorName: DarkThemeColorName | LightThemeColorName,
  theme?: ThemeName,
): ColorElement | undefined => {
  try {
    return {
      name: colorName,
      hex: getBaseColor(colorName, theme),
      rgb: hexToRgb(getBaseColor(colorName, theme)),
      contrast: {
        white: getContrastValue(colorName, 'white', theme),
        black: getContrastValue(colorName, 'black', theme),
      },
      tokens: getTokens(getBaseColor(colorName, theme), theme),
    };
  } catch {
    return undefined;
  }
};
