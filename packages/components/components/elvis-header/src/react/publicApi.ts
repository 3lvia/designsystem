import { ThemeName } from '@elvia/elvis-colors';
import { getApplicableTheme, getStoredActiveTheme } from './themeUtils';

/**
 * Retrieves the current Elvia theme.
 *
 * @example
 * import { getCurrentTheme } from '@elvia/elvis-header';
 *
 * const currentTheme = getCurrentTheme();
 *
 */
export const getCurrentTheme = (): ThemeName => {
  return getApplicableTheme(getStoredActiveTheme());
};
