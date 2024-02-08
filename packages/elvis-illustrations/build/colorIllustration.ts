import { getThemeColor, type ColorLabel } from '@elvia/elvis-colors';
import { ColorId } from '../src/colors';

const idToColorLabel = (id: ColorId): ColorLabel => {
  return `illustration-${id}`;
};

export const colorIllustration = (illustration: string): string => {
  const lines = illustration.split('\n');
  const linesWithNewColors = lines.map((line) => {
    const id = line.match(/id="(?<id>.*?)(_d)?"/)?.['groups']?.['id'];
    const cleanId = id?.split('_')[0]?.toLowerCase();
    if (!cleanId) {
      return line;
    }
    return line.replace(/fill=".*?"/, `fill="${cleanId}"`);
  });

  return linesWithNewColors.join('\n');
};
