/**
 * Transforms an svg exported from Figma (with IDs) to be ready for coloring.
 * Replaces a path's `fill` with it's `id`, which is later used to apply the correct color.
 * Also handles groups `<g>` that should have a shared `fill`.
 *
 * Example:
 * ```xml
 * <path id="Main-1" d="M109.707 68.0002C109.707 ..." fill="#262626"/>
 * ```
 * will be transformed into
 * ```xml
 * <path id="Main-1" d="M109.707 68.0002C109.707 ..." fill="main-1"/>
 * ```
 * @param illustration svg as string
 * @returns
 */
export const transformSvgString = (illustration: string): string => {
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
      if (/(fill|stroke)=".*?"/.exec(line)?.length) {
        return line.replace(/(fill|stroke)=".*?"/g, `$1="${cleanGroupId}"`);
      } else {
        return line.slice(0, 2) + ` fill="${cleanGroupId}" ` + line.slice(2);
      }
    }
    return line.replace(/(fill|stroke)=".*?"/g, `$1="${cleanId}"`);
  });

  return linesWithNewColors.join('\n');
};
