import { LanguageCode } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';

import { Theme, ThemeEvent, themeLocalStorageKey } from '../elviaHeader.types';
import { getApplicableTheme, getStoredActiveTheme, setThemeClassOnDocument } from '../themeUtils';
import { DarkThemeIcon } from './darkThemeIcon';
import { LightThemeIcon } from './lightThemeIcon';
import { SystemThemeIcon } from './systemThemeIcon';
import {
  ThemeButton,
  ThemeContainer,
  ThemeIconOutline,
  ThemeLabel,
  ThemeListContainer,
} from './themePickerStyles';

interface PickerTheme {
  theme: Theme;
  label: string;
}

interface ThemePickerProps {
  onThemeChange: ThemeEvent | undefined;
  lang: LanguageCode;
}

export const ThemePicker: React.FC<ThemePickerProps> = ({ lang, onThemeChange }) => {
  const themes: PickerTheme[] = [
    { theme: 'light', label: lang === 'no' ? 'Lys' : 'Light' },
    { theme: 'dark', label: lang === 'no' ? 'Mørk' : 'Dark' },
    { theme: 'system', label: lang === 'no' ? 'System' : 'System' },
  ];
  const [currentTheme, setCurrentTheme] = useState<Theme>(getStoredActiveTheme());

  const changeTheme = (theme: Theme): void => {
    setThemeClassOnDocument(theme);
    setCurrentTheme(theme);
    window?.localStorage?.setItem(themeLocalStorageKey, theme);
    onThemeChange?.(getApplicableTheme(theme));
  };

  useEffect(() => {
    setCurrentTheme(getStoredActiveTheme());

    const onUserPreferenceChange = (change: MediaQueryListEvent): void => {
      if (currentTheme === 'system') {
        setThemeClassOnDocument(change.matches ? 'dark' : 'light');
        onThemeChange?.(change.matches ? 'dark' : 'light');
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
            isActive={currentTheme === pickerTheme.theme}
            key={pickerTheme.theme}
            onClick={() => changeTheme(pickerTheme.theme)}
            type="button"
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
