import { BaseProps } from '@elvia/elvis-toolbox';

export interface UserMenuProps {
  email: string;
  onMenuToggle: (isShowing: boolean) => void;
  onSignOutClick?: () => void;
  username: string;
}

export interface HeaderProps extends BaseProps {
  appContent?: JSX.Element;
  appTitle?: string;
  bonusContent?: JSX.Element;
  email: string;
  navItems?: JSX.Element;
  onLogoClick?: () => void;
  onSignOutClick?: () => void;
  pageTitle: string;
  username: string;
}
