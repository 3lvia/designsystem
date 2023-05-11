import type { ColorLabel, ThemeName } from './theme';
import { lightTheme, lightThemeColors, LightThemeColorName } from './themes/lightTheme';
import { darkTheme, darkThemeColors, DarkThemeColorName } from './themes/darkTheme';

const getTheme = (name: ThemeName) => {
  switch (name) {
    case 'dark':
      return darkTheme;
    case 'light':
      return lightTheme;
    default:
      return lightTheme;
  }
};

const getThemeColorObject = (label: ColorLabel, themeName: ThemeName) => {
  const theme = getTheme(themeName);
  const color =
    theme.text[label as keyof typeof theme.text] ??
    theme.background[label as keyof typeof theme.background] ??
    theme.border[label as keyof typeof theme.border] ??
    theme.signal[label as keyof typeof theme.signal] ??
    theme.data[label as keyof typeof theme.data] ??
    theme.icon[label as keyof typeof theme.icon] ??
    theme.static[label as keyof typeof theme.static] ??
    null;
  if (!color) {
    console.error(`Color ${label} not found.`);
    return null;
  }
  return color;
};

/**
 * Get a color from a theme by label. Will `console.error` and return empty string if color isn't found.
 * @param label
 * @param themeName The theme name. Defaults to `'light'`. This only affects the fallback color.
 * @returns CSS-variable for label, with fallback to the color hex.
 * @example
 * const color = getThemeColor('background-1');
 *
 * @since 1.5.0
 */
export const getThemeColor = <TLabel extends ColorLabel>(
  label: TLabel,
  themeName: ThemeName = 'light',
): `var(--e-color-${TLabel}, ${string})` | '' => {
  const color = getThemeColorObject(label, themeName);
  if (!color) {
    console.error(`Color '${label}' not found.`);
    return '';
  }
  return `var(--e-color-${label}, ${color.hex})`;
};

/**
 * Get a contrast color from a theme by label.
 * @param label
 * @param themeName The theme name. Defaults to 'light'.
 * @returns CSS-variable for label, with fallback to the contrast color hex.
 * @example
 * const contrastColor = getThemeColorContrast('background-1');
 *
 * @since 1.6.0
 */
export const getThemeColorContrast = (label: ColorLabel, themeName: ThemeName = 'light'): string => {
  const color = getThemeColorObject(label, themeName);
  if (!color) {
    console.error(`Color '${label}' not found.`);
    return '';
  }
  if (!('contrast' in color)) {
    console.error(`Color '${label}' does not have a contrast color.`);
    return '';
  }
  return `var(--e-color-${label}--contrast, ${color.contrast})`;
};

const getBaseThemeColors = <TThemeName extends ThemeName>(
  name: TThemeName,
): TThemeName extends 'dark' ? typeof darkThemeColors : typeof lightThemeColors => {
  switch (name) {
    case 'dark':
      return darkThemeColors as any;
    case 'light':
      return lightThemeColors as any;
    default:
      return lightThemeColors as any;
  }
};

type ColorNameToThemeMap = {
  light: LightThemeColorName;
  dark: DarkThemeColorName;
};

/**
 * Create a custom mapping between colors from themes. This is useful when you need a color combination that there is no label for.
 *
 * **NB**: This requires that you have access to what theme is currently active in the component, in JS. This can be done by using the `useCurrentTheme` hook.
 * @param colorNameToThemeMap A map of theme names to color names
 * @param themeName The current theme name.
 * @returns Hex color string.
 *
 * @example
 * import { useCurrentTheme } from '@elvia/elvis-toolbox';
 * const { currentTheme } = useCurrentTheme(ref);
 * ...
 * const color = getCustomThemeColor({
 *  light: 'grey-10',
 *  dark: 'grey-60',
 * }, currentTheme);
 *
 * @since 1.5.0
 */
export const getCustomThemeColor = (
  colorNameToThemeMap: ColorNameToThemeMap,
  themeName: ThemeName,
): string => {
  const colors = getBaseThemeColors(themeName);
  const label = colorNameToThemeMap[themeName];
  const color =
    colors['primary-colors'][label as keyof (typeof colors)['primary-colors']] ??
    colors['signal-colors'][label as keyof (typeof colors)['signal-colors']] ??
    colors['data-colors'][label as keyof (typeof colors)['data-colors']] ??
    colors['grey-colors'][label as keyof (typeof colors)['grey-colors']];
  if (!color) {
    console.error(`Color '${label}' for theme '${themeName}' not found.`);
    return '';
  }
  return color.color;
};
