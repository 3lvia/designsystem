import React, { useEffect, useState } from 'react';
import { ThemeButton, ThemeContainer, ThemeLabel, ThemeListContainer } from './themePickerStyles';
import { LightThemeIcon } from './lightThemeIcon';
import { DarkThemeIcon } from './darkThemeIcon';
import { SystemThemeIcon } from './systemThemeIcon';
import { getStoredActiveTheme, setThemeClassOnDocument } from '../themeUtils';
import { Theme, themeLocalStorageKey } from '../elviaHeader.types';

export const ThemePicker: React.FC = () => {
  const themes: Theme[] = ['light', 'dark', 'system'];
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredActiveTheme());

  const changeTheme = (theme: Theme): void => {
    setThemeClassOnDocument(theme);
    setCurrentTheme(theme);
    localStorage.setItem(themeLocalStorageKey, theme);
  };

  useEffect(() => {
    setCurrentTheme(getStoredActiveTheme());

    const onUserPreferenceChange = (change: MediaQueryListEvent): void => {
      if (currentTheme === 'system') {
        setThemeClassOnDocument(change.matches ? 'dark' : 'light');
      }
    };
    const prefersColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

    prefersColorScheme.addEventListener('change', onUserPreferenceChange);

    return () => prefersColorScheme.removeEventListener('change', onUserPreferenceChange);
  }, []);

  return (
    <ThemeContainer className="e-strip-fieldset">
      <ThemeLabel>Tema</ThemeLabel>
      <ThemeListContainer>
        {themes.map((theme) => (
          <ThemeButton key={theme} isActive={currentTheme === theme} onClick={() => changeTheme(theme)}>
            {theme === 'dark' && <DarkThemeIcon />}
            {theme === 'system' && <SystemThemeIcon />}
            {theme === 'light' && <LightThemeIcon />}
          </ThemeButton>
        ))}
      </ThemeListContainer>
    </ThemeContainer>
  );
};
