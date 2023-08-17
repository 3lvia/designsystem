import { BaseProps } from '@elvia/elvis-toolbox';
import { ThemeName } from '@elvia/elvis-colors';

export type ThemeEvent = (themeName: Theme) => void;

export interface UserMenuProps {
  onMenuToggle: (isShowing: boolean) => void;
  onSignOutClick?: () => void;
  onThemeChange?: ThemeEvent;
  username: string;
  email: string;
  hideThemeSwitch?: boolean;
}

export interface HeaderProps extends BaseProps {
  appContent?: JSX.Element;
  appTitle?: string;
  email: string;
  navItems?: JSX.Element;
  onLogoClick?: () => void;
  onSignOutClick?: () => void;
  onThemeChange?: ThemeEvent;
  pageTitle: string | JSX.Element;
  username: string;
  hideThemeSwitch?: boolean;
}

export type Theme = ThemeName | 'system';
export const themeLocalStorageKey = 'elviaHeaderPreferredTheme';
