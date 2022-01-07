/**
 * elvis-colors package containing colors to use in Elvia's design profile.
 * @version 1.2.0
 */
declare module '@elvia/elvis-colors' {
  /**
   * Get a color from elvis-colors.
   * @param {string} colorName Name of color in elvis-colors package.
   * @returns {string} Hex value of requested color.
   */
  export function getColor(colorName: string): string;

  /**
   * Get a contrast text color from elvis-colors.
   * @param {string} colorName Name of color in elvis-colors package.
   * @returns {string} Hex value of the contrast text color corresponding to the requested color.
   */
  export function getContrastTest(colorName: string): string;

  /**
   * Object containing all Elvia colors.
   */
  const colors: {
    [category: string]: {
      [label: string]: {
        [color: string]: { [property: 'color' | 'rgb' | 'contrastText' | 'alt-label']: string | string[] };
      };
    };
  };
  export default colors;
}
