import { getThemeColor, type ColorLabel } from '@elvia/elvis-colors';

const idToColorLabel = (id: string) => {
  return `illustration-${id}`;
};

export const colorIllustration = (illustration: string, name?: string): string => {
  const lines = illustration.split('\n');
  const ids: string[] = [];
  const linesWithNewColors = lines.map((line) => {
    const id = line.match(/<path.*id="(?<id>.*?)(_d)?"/)?.['groups']?.['id'];
    const cleanId = id?.split('_')[0]?.toLowerCase();

    cleanId && ids.push(cleanId);

    if (!cleanId) {
      return line;
    }
    const newLine = line.replace(/fill=".*?"/, `fill="${cleanId}"`);
    return newLine;
  });

  if (ids.length) {
    console.group(`Labels (${name}.svg):`);
    [...new Set(ids)].sort().forEach((id) => console.log(id));
    console.groupEnd();
  }
  const newIllustration = linesWithNewColors.join('\n');

  return newIllustration;
};
