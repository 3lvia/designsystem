import { BaseProps } from '@elvia/elvis-toolbox';

export interface UserMenuProps {
  onMenuToggle: (isShowing: boolean) => void;
  onSignOutClick?: () => void;
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
  pageTitle: string | JSX.Element;
  username: string;
}

export type ApplicableTheme = 'light' | 'dark';
export type Theme = ApplicableTheme | 'system';
export const themeLocalStorageKey = 'elviaHeaderPreferredTheme';
