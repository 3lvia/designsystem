import type { Color, ColorLabel, Theme, ThemeName } from './theme';
import { darkTheme } from './themes/darkTheme';
import { lightTheme } from './themes/lightTheme';

const getTheme = (name: ThemeName): Theme => {
  switch (name) {
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      return lightTheme;
  }
};

const getThemeColorObject = (label: ColorLabel, themeName: ThemeName): Color | null => {
  const theme = getTheme(themeName);
  const color =
    theme.data[label as keyof typeof theme.data] ??
    theme.state[label as keyof typeof theme.state] ??
    theme.text[label as keyof typeof theme.text] ??
    theme.background[label as keyof typeof theme.background] ??
    null;
  if (!color) {
    console.error(`Color ${label} not found.`);
    return null;
  }
  return color;
};

export const getThemeColor = (label: ColorLabel, themeName: ThemeName = 'dark'): string => {
  const color = getThemeColorObject(label, themeName);
  if (!color) {
    return '';
  }
  return color.hex;
};

// TODO: Add a way to get a base color from theme, not just a color label.
// This is needed for colors such as "selected" state, as they do not have labels.
