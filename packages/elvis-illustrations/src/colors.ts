export type IllustrationColor = 'grey' | 'purple' | 'green' | 'blue' | 'orange';

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
