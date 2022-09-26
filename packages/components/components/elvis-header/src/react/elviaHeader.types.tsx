import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export interface UserMenuProps {
  username: string;
  email: string;
}

export interface MobileUserMenuProps extends UserMenuProps {
  appTitle: string;
}

export interface NavItem {
  url: string;
  iconName: string;
  name: string;
  disabled?: boolean;
}

export interface HeaderProps extends MobileUserMenuProps {
  pageTitle: string;
  navItems: NavItem[];
  appContent: JSX.Element;
  onLogoClick: () => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
