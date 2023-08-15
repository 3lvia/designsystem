import { BaseProps } from '@elvia/elvis-toolbox';
import { ThemeName } from '@elvia/elvis-colors';

export interface UserMenuProps {
  onMenuToggle: (isShowing: boolean) => void;
  onSignOutClick?: () => void;
  onThemeChange?: () => void;
  username: string;
  email: string;
}

export interface HeaderProps extends BaseProps {
  appContent?: JSX.Element;
  appTitle?: string;
  email: string;
  navItems?: JSX.Element;
  onLogoClick?: () => void;
  onSignOutClick?: () => void;
  onThemeChange?: () => void;
  pageTitle: string | JSX.Element;
  username: string;
}

export type Theme = ThemeName | 'system';
export const themeLocalStorageKey = 'elviaHeaderPreferredTheme';
