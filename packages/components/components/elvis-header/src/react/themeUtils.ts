import { ApplicableTheme, Theme, themeLocalStorageKey } from './elviaHeader.types';

export const getStoredActiveTheme = (): Theme =>
  (localStorage.getItem(themeLocalStorageKey) as Theme) || 'system';

export const getApplicableTheme = (theme: Theme): ApplicableTheme => {
  if (theme === 'system') {
    const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)');
    return prefersDarkTheme.matches ? 'dark' : 'light';
  }

  return theme;
};

export const setThemeClassOnDocument = (theme: Theme): void => {
  const applicableTheme = getApplicableTheme(theme);
  const classToRemove = applicableTheme === 'light' ? 'e-theme-dark' : 'e-theme-light';
  const classToAdd = applicableTheme === 'light' ? 'e-theme-light' : 'e-theme-dark';

  document.body.classList.remove(classToRemove);
  if (!document.body.classList.contains(classToAdd)) {
    document.body.classList.add(classToAdd);
  }
};
