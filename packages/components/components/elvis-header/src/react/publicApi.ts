import { Theme } from './elviaHeader.shared.types';
import { getStoredActiveTheme } from './themeUtils';

/**
 * Retrieves the current Elvia theme.
 *
 * @example
 * import { getCurrentTheme } from '@elvia/elvis-header';
 *
 * const currentTheme = getCurrentTheme();
 *
 */
export const getCurrentTheme = (): Theme => {
  return getStoredActiveTheme();
};
