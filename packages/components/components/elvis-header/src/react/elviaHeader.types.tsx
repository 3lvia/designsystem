import { ThemeName } from '@elvia/elvis-colors';
import { BaseProps } from '@elvia/elvis-toolbox';

export type Theme = ThemeName | 'system';
export const themeLocalStorageKey = 'elviaHeaderPreferredTheme';
export type ThemeEvent = (themeName: Theme) => void;

export interface UserMenuProps {
  onSignOutClick?: () => void;
  onThemeChange?: ThemeEvent;
  username: string;
  email: string;
  hideThemeSwitch?: boolean;
  menuContent?: JSX.Element;
  webcomponent: BaseProps['webcomponent'];
}

export interface HeaderProps extends BaseProps {
  appContent?: JSX.Element;
  appTitle?: string;
  menuContent?: JSX.Element;
  email: string;
  navItems?: JSX.Element;
  onLogoClick?: () => void;
  onSignOutClick?: () => void;
  onThemeChange?: ThemeEvent;
  pageTitle: string | JSX.Element;
  username: string;
  hideThemeSwitch?: boolean;
}

export interface HeaderFunctions {
  getCurrentTheme?: () => Theme;
}
