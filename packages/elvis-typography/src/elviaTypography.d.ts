/**
 * elvis-typography package containing typographies to use in Elvia's design profile.
 * Typographies are provided as objects containing css properties.
 *
 * @version 1.2.1
 */
declare module '@elvia/elvis-typography' {
  /**
   * Get a typography style from elvis-typography.
   * @param {string} typographyName Name of requested typography.
   * @returns {{[key: string]: string}} Object containing css properties of typography.
   *
   */
  export const getTypography: (typographyName: string) => { [property: string]: string };

  /**
   * Object containing all Elvia typographies.
   */
  const ElviaTypography: { [typography: string]: { [property: string]: string } };
  export default ElviaTypography;
}
