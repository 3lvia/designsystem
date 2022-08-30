/**
 * elvis-colors package containing colors to use in Elvia's design profile.
 *
 */
declare module '@elvia/elvis-colors' {
  /**
   * Get a color from elvis-colors.
   * @param colorName Name of color in elvis-colors package.
   * @returns Hex value of requested color.
   */
  export function getColor(colorName: ElviaColor): string;

  /**
   * Get a contrast text color from elvis-colors.
   * @param colorName Name of color in elvis-colors package.
   * @returns Hex value of the contrast text color corresponding to the requested color.
   */
  export function getContrastText(colorName: ElviaColor): string;

  /**
   * Object containing all Elvia colors.
   */
  export const colors: {
    [category: string]: {
      [label: string]: {
        color: string;
        rgb: string;
        contrastText: string;
        'alt-label': string[];
      };
    };
  };

  export default colors;

  /**
   * All elvia color names.
   */
  export type ElviaColor =
    | '{{INSERT_COLOR_NAMES}}'
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {});
}
