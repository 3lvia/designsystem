import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { IconName } from '@elvia/elvis-icon/react';
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
  strictMatching?: boolean;
  iconName: IconName;
  name: string;
}

export interface HeaderProps extends MobileUserMenuProps {
  pageTitle: string | JSX.Element;
  navItems?: NavItem[];
  appContent?: JSX.Element;
  onLogoClick?: () => void;
  onSideNavItemClick?: (item: NavItem) => void;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
