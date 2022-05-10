/**
 * elvis-colors package containing colors to use in Elvia's design profile.
 *
 */
declare module '@elvia/elvis-colors' {
  /**
   * Get a color from elvis-colors.
   * @param {ElviaColor} colorName Name of color in elvis-colors package.
   * @returns {string} Hex value of requested color.
   */
  export function getColor(colorName: ElviaColor): string;

  /**
   * Get a contrast text color from elvis-colors.
   * @param {string} colorName Name of color in elvis-colors package.
   * @returns {string} Hex value of the contrast text color corresponding to the requested color.
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

  /**
   * All elvia color names.
   */
  export type ElviaColor =
    | 'white'
    | 'elvis-on'
    | 'elvia-on'
    | 'font-color-light'
    | 'elvia-inverted'
    | 'black'
    | 'elvis-off'
    | 'elvia-off'
    | 'font-color'
    | 'grey'
    | 'elvia-dark'
    | 'green'
    | 'elvia-charge'
    | 'yellow'
    | 'orange'
    | 'warning'
    | 'red'
    | 'error'
    | 'green-apple'
    | 'violet-grape'
    | 'blue-berry'
    | 'purple-plum'
    | 'orange-mango'
    | 'red-tomato'
    | 'grey-90'
    | 'grey-80'
    | 'font-grey'
    | 'text-light'
    | 'grey-70'
    | 'placeholder'
    | 'grey-60'
    | 'grey-50'
    | 'grey-40'
    | 'grey-30'
    | 'disabled'
    | 'light-inverted'
    | 'grey-20'
    | 'grey-10'
    | 'grey-05'
    | 'disabled-light'
    | 'grey-02'
    | 'focus-outline'
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {});

  export default colors;
}
