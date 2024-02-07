export const colorIllustration = (illustration: string): string => {
  const lines = illustration.split('\n');
  console.group('labels');
  const linesWithNewColors = lines.map((line) => {
    const id = line.match(/<path.*id="(?<id>.*?)(_d)?"/)?.['groups']?.['id'];
    const cleanId = id?.split('_')[0]?.toLowerCase();

    cleanId && console.log(cleanId);

    if (!cleanId) {
      return line;
    }
    const newLine = line.replace(/fill=".*?"/, `fill="${cleanId}"`);
    return newLine;
  });
  console.groupEnd();
  const newIllustration = linesWithNewColors.join('\n');

  return newIllustration;
};
