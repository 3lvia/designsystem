/**
 * elvis-typography package containing typographies to use in Elvia's design profile.
 * Typographies are provided as objects containing CSS properties.
 *
 * @version 1.2.1
 */
declare module '@elvia/elvis-typography' {
  /**
   * Get a typography style from elvis-typography.
   * @param typographyName Name of requested typography.
   * @returns Object containing CSS properties of typography.
   *
   */
  export const getTypography: (typographyName: TypographyName) => { [property: string]: string };

  /**
   * @param typographyName Name of requested typography.
   * @returns CSS-formated string with all the properties of the typography, including a media query for mobile font properties.
   */
  export const getTypographyCss: (typographyName: TypographyName) => string;

  export type TypographyName =
    | '{{INSERT_TYPOGRAPHY_NAMES}}'
    // eslint-disable-next-line @typescript-eslint/ban-types
    | (string & {});

  /**
   * Object containing all Elvia typographies.
   */
  const ElviaTypography: { [typography: TypographyName]: { [property: string]: string } };
  export default ElviaTypography;
}
