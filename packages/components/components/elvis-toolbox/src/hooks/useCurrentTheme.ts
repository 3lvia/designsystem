import React, { useLayoutEffect, useState } from 'react';
import { ThemeName, ThemeClassName } from '@elvia/elvis-colors';

interface UseCurrentThemeApi {
  currentTheme: ThemeName;
  themeClass: ThemeClassName;
}

/**
 *
 * @param ref Ref to a DOM element inside the current component. This is used to find the closest parent with a theme class.
 * @returns The current theme name and the theme class name. Defaults to light theme.
 *
 * @since 7.6.0
 */
export const useCurrentTheme = (ref: React.RefObject<HTMLElement>): UseCurrentThemeApi => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('light');
  const [themeClass, setThemeClass] = useState<ThemeClassName>('e-theme-light');

  useLayoutEffect(() => {
    const closestParentWithThemeClass = ref.current?.closest('.e-theme-dark, .e-theme-light');
    if (closestParentWithThemeClass) {
      const themeClass = closestParentWithThemeClass.className.match(/e-theme-(dark|light)/)?.[0];
      setThemeClass(themeClass as ThemeClassName);
      setCurrentTheme(themeClass === 'e-theme-dark' ? 'dark' : 'light');
    }
  }, []);

  return { currentTheme, themeClass };
};
