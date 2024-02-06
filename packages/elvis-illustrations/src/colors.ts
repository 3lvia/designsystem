import { ColorLabel } from '@elvia/elvis-colors';

export type IllustrationColor = 'grey' | 'purple' | 'green' | 'blue' | 'orange';
type IllustrationPart = '$background' | '$brand-accent' | '$white';
type IllustrationColors = Record<IllustrationPart, ColorLabel>;

// Define the color palettes for the different illustration color sets
export const greyColors: IllustrationColors = {
  $background: 'background-element-3',
  '$brand-accent': 'brand-accent',
  $white: 'static-white',
};
export const purpleColors: IllustrationColors = {
  $background: 'data-2',
  '$brand-accent': 'brand-accent',
  $white: 'static-white',
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
