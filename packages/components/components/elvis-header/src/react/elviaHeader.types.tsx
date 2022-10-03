import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export interface UserMenuProps {
  onSignOutClick?: () => void;
  username: string;
  email: string;
}

export interface MobileUserMenuProps extends UserMenuProps {
  appTitle: string;
}

export interface HeaderProps extends MobileUserMenuProps {
  pageTitle: string | JSX.Element;
  navItems?: JSX.Element;
  appContent?: JSX.Element;
  onLogoClick?: () => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
