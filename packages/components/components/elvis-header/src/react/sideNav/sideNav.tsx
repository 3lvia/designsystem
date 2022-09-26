import { Icon } from '@elvia/elvis-icon/react';
import { useDeviceCheck } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { NavItem } from '../elviaHeader.types';
import {
  ButtonContainer,
  IconContainer,
  NavButton,
  SideNavContainer,
  ToggleWidthButton,
} from './sideNavStyles';

interface Props {
  navItems: NavItem[];
  onNavItemClick: (item: NavItem) => void;
}

export const SideNav: React.FC<Props> = ({ navItems = [], onNavItemClick }) => {
  const isGtMobile = useDeviceCheck('gt-mobile');
  const [isExpanded, setIsExpanded] = useState(false);

  const isActive = (url: string): boolean => {
    const currentUrl = location.pathname;
    return currentUrl.startsWith(url);
  };

  return (
    <SideNavContainer isGtMobile={isGtMobile} isExpanded={isExpanded}>
      <ButtonContainer isGtMobile={isGtMobile}>
        {navItems.map((navItem) => {
          return (
            <NavButton
              aria-label={navItem.name}
              type="button"
              role="link"
              key={navItem.url}
              onClick={() => onNavItemClick(navItem)}
              isGtMobile={isGtMobile}
            >
              <IconContainer isActive={isActive(navItem.url)}>
                <Icon name={navItem.iconName} color="black" size="sm" />
              </IconContainer>
              {isGtMobile && <>{navItem.name}</>}
            </NavButton>
          );
        })}
      </ButtonContainer>
      {isGtMobile && (
        <ToggleWidthButton onClick={() => setIsExpanded(!isExpanded)}>
          <IconContainer>
            <Icon name={isExpanded ? 'closeMenu' : 'openMenu'} color="black" size="sm" />
          </IconContainer>
          {isExpanded ? 'Minimer' : 'Maksimer'}
        </ToggleWidthButton>
      )}
    </SideNavContainer>
  );
};
