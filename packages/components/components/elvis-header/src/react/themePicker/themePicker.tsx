import React, { useEffect, useState } from 'react';
import {
  ThemeButton,
  ThemeContainer,
  ThemeIconOutline,
  ThemeLabel,
  ThemeListContainer,
} from './themePickerStyles';
import { LightThemeIcon } from './lightThemeIcon';
import { DarkThemeIcon } from './darkThemeIcon';
import { SystemThemeIcon } from './systemThemeIcon';
import { getStoredActiveTheme, setThemeClassOnDocument } from '../themeUtils';
import { Theme, themeLocalStorageKey } from '../elviaHeader.types';

interface PickerTheme {
  theme: Theme;
  label: string;
}

interface ThemePickerProps {
  onThemeChange: ((theme: Theme) => void) | undefined;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ onThemeChange }) => {
  const themes: PickerTheme[] = [
    { theme: 'light', label: 'Lys' },
    { theme: 'dark', label: 'Mørk' },
    { theme: 'system', label: 'System' },
  ];
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredActiveTheme());

  const changeTheme = (theme: Theme): void => {
    setThemeClassOnDocument(theme);
    setCurrentTheme(theme);
    localStorage.setItem(themeLocalStorageKey, theme);
    onThemeChange?.(theme);
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
    <ThemeContainer>
      <ThemeLabel>Tema</ThemeLabel>
      <ThemeListContainer>
        {themes.map((pickerTheme) => (
          <ThemeButton
            key={pickerTheme.theme}
            isActive={currentTheme === pickerTheme.theme}
            onClick={() => changeTheme(pickerTheme.theme)}
          >
            <ThemeIconOutline>
              {pickerTheme.theme === 'dark' && <DarkThemeIcon />}
              {pickerTheme.theme === 'system' && <SystemThemeIcon />}
              {pickerTheme.theme === 'light' && <LightThemeIcon />}
            </ThemeIconOutline>
            {pickerTheme.label}
          </ThemeButton>
        ))}
      </ThemeListContainer>
    </ThemeContainer>
  );
};
