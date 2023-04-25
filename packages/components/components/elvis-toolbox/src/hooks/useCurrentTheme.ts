import React, { useCallback, useLayoutEffect, useMemo, useState } from 'react';
import { ThemeName, ThemeClassName } from '@elvia/elvis-colors';

interface UseCurrentThemeApi {
  currentTheme: ThemeName;
  themeClass: ThemeClassName;
  updateCurrentTheme: () => void;
}

/**
 *
 * @param ref Ref to a DOM element inside the current component. This is used to find the closest parent with a theme class.
 * @returns The current theme name and the theme class name. Defaults to light theme if no theme class is found.
 *
 * @since 7.6.0
 */
export const useCurrentTheme = (ref: React.RefObject<HTMLElement>): UseCurrentThemeApi => {
  const [themeClass, setThemeClass] = useState<ThemeClassName>('e-theme-light');
  const currentTheme = useMemo(() => (themeClass === 'e-theme-dark' ? 'dark' : 'light'), [themeClass]);

  const updateCurrentTheme = useCallback(() => {
    const closestParentWithThemeClass = ref.current?.closest('.e-theme-dark, .e-theme-light');
    if (closestParentWithThemeClass) {
      const newThemeClass = Array.from(closestParentWithThemeClass.classList).find((className) =>
        className.match(/e-theme-(dark|light)/),
      ) as ThemeClassName;
      setThemeClass(newThemeClass);
    }
  }, [ref]);

  useLayoutEffect(() => {
    updateCurrentTheme();
  }, [ref]);

  return { currentTheme, themeClass, updateCurrentTheme };
};
