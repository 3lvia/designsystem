import { Color } from './color.interface';
import { colors } from '@elvia/elvis-colors';
import { contrasts } from './color-contrasts';

const hexToRgb = (hex: string): string => {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  hex = makeHexValue6Length(hex);

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const rgb = result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
  return rgb ? `${rgb.r} / ${rgb.g} / ${rgb.b}` : '';
};

const getGreyRgba = (name: string): string => {
  const alpha = name.slice(-2).replace(/0+$/, '');
  return `38/38/38/0.${alpha}`;
};

const makeHexValue6Length = (hex: string): string => {
  if (hex.length === 4) {
    hex = `#${hex.charAt(1)}${hex.charAt(1)}${hex.charAt(2)}${hex.charAt(2)}${hex.charAt(3)}${hex.charAt(3)}`;
  }
  return hex.toUpperCase();
};

const convertColorObject = (category: string): Color[] => {
  return (Object.entries(colors[category]) as any).map(([name, color]) => {
    return {
      title: name,
      labels: color['alt-labels']?.filter((label: string) => !label.includes('elvis')),
      hex: makeHexValue6Length(color.color),
      rgba: category === 'grey-colors' ? getGreyRgba(name) : hexToRgb(color.color),
      contrastBlack: contrasts[category as keyof typeof contrasts][name].contrasts.black,
      contrastWhite: contrasts[category as keyof typeof contrasts][name].contrasts.white,
      lg: category === 'primary-colors',
    };
  });
};

export const primaryColors = convertColorObject('primary-colors');
export const signalColors = convertColorObject('signal-colors');
export const dataColors = convertColorObject('data-colors');
export const greysColors = convertColorObject('grey-colors');
