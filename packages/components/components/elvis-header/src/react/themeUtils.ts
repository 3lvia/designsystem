import { ThemeClassName, ThemeName } from '@elvia/elvis-colors';
import { Theme, themeLocalStorageKey } from './elviaHeader.shared.types';

export const getStoredActiveTheme = (): Theme => {
  return (window?.localStorage?.getItem(themeLocalStorageKey) as Theme) || 'light';
};

export const getApplicableTheme = (theme: Theme): ThemeName => {
  if (theme === 'system') {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkTheme.matches ? 'dark' : 'light';
  }

  return theme;
};

export const setThemeClassOnDocument = (theme: Theme): void => {
  const applicableTheme = getApplicableTheme(theme);
  const classToRemove: ThemeClassName = applicableTheme === 'light' ? 'e-theme-dark' : 'e-theme-light';
  const classToAdd: ThemeClassName = applicableTheme === 'light' ? 'e-theme-light' : 'e-theme-dark';

  document.body.style.colorScheme = applicableTheme;
  document.body.classList.remove(classToRemove);
  if (!document.body.classList.contains(classToAdd)) {
    document.body.classList.add(classToAdd);
  }
};
