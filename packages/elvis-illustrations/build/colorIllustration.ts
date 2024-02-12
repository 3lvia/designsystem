export const colorIllustration = (illustration: string): string => {
  const lines = illustration.split('\n');
  const linesWithNewColors = lines.map((line, i) => {
    const id = /id="(?<id>.*?)(_d)?"/.exec(line)?.['groups']?.['id'];
    const cleanId = id?.split('_')[0]?.toLowerCase();

    // If no id, cut out any fill that is a pure hex-code
    if (
      !cleanId ||
      !(cleanId.startsWith('main') || cleanId.startsWith('shade') || cleanId.startsWith('background'))
    ) {
      const match = /fill=".*?"/.exec(line);
      if (match) {
        return line.slice(0, match.index) + line.slice(match.index + match[0].length);
      }
      return line;
    }
    // Some groups have an ID and need to be colored
    if (line.startsWith('<g ')) {
      const groupId = /id="(?<id>(Shade|Main|Background).*?)(_d)?"/.exec(line)?.['groups']?.['id'];
      const cleanGroupId = groupId?.split('_')[0]?.toLowerCase();
      if (!cleanGroupId) {
        return line;
      }
      if (/(fill|stroke)/.exec(line)?.length) {
        return line.replace(/(fill|stroke)=".*?"/g, `fill="${cleanGroupId}"`);
      } else {
        return line.slice(0, 2) + ` fill="${cleanGroupId}" ` + line.slice(2);
      }
    }
    return line.replace(/(fill|stroke)=".*?"/g, `fill="${cleanId}"`);
  });

  return linesWithNewColors.join('\n');
};
