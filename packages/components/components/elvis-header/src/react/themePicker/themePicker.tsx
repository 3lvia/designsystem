import React from 'react';
import { ThemeButton, ThemeContainer, ThemeLabel, ThemeListContainer } from './themePickerStyles';
import { LightThemeIcon } from './lightThemeIcon';
import { DarkThemeIcon } from './darkThemeIcon';
import { SystemThemeIcon } from './systemThemeIcon';

type Theme = 'light' | 'dark' | 'system';

export const ThemePicker: React.FC = () => {
  // TODO: Find types for these?
  const setTheme = (theme: Theme): void => {
    let classToRemove = 'e-theme-dark';
    let classToAdd = 'e-theme-light';

    if (theme === 'dark') {
      classToRemove = 'e-theme-light';
      classToAdd = 'e-theme-dark';
    }

    document.body.classList.remove(classToRemove);
    if (!document.body.classList.contains(classToAdd)) {
      document.body.classList.add(classToAdd);
    }
  };

  const getActiveTheme = (): Theme => {
    if (document.body.classList.contains('e-theme-dark')) {
      return 'dark';
    } else if (document.body.classList.contains('e-theme-system')) {
      return 'system';
    }
    return 'light';
  };

  return (
    <ThemeContainer className="e-strip-fieldset">
      <ThemeLabel>Tema</ThemeLabel>
      <ThemeListContainer>
        <ThemeButton isActive={getActiveTheme() === 'light'} onClick={() => setTheme('light')}>
          <LightThemeIcon />
        </ThemeButton>
        <ThemeButton isActive={getActiveTheme() === 'dark'} onClick={() => setTheme('dark')}>
          <DarkThemeIcon />
        </ThemeButton>
        <ThemeButton isActive={getActiveTheme() === 'system'} onClick={() => setTheme('system')}>
          <SystemThemeIcon />
        </ThemeButton>
      </ThemeListContainer>
    </ThemeContainer>
  );
};
