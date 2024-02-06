import { getThemeColor } from '@elvia/elvis-colors';

export const colorIllustration = (illustration: string): string => {
  return illustration
    .replace(/fill="#29D305"/g, `fill="${getThemeColor('brand-accent')}"`)
    .replace(/fill="#E9E9E9"/g, `fill="${getThemeColor('background-element-3')}"`)
    .replace(/fill="white"/g, `fill="${getThemeColor('static-white')}"`);
};
