import { useBreakpoint, IconWrapper } from '@elvia/elvis-toolbox';
import React from 'react';
import { IconContainer, SideNavContainer, ToggleWidthButton } from './sideNavStyles';
import openMenu from '@elvia/elvis-assets-icons/dist/icons/openMenu';
import closeMenu from '@elvia/elvis-assets-icons/dist/icons/closeMenu';

interface SideNavProps {
  isExpanded: boolean;
  onSideNavToggle: () => void;
  children: React.ReactNode;
}

export const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  ({ children, isExpanded, onSideNavToggle }, ref) => {
    const isGtMobile = useBreakpoint('gt-mobile');

    return (
      <SideNavContainer isGtMobile={isGtMobile} isExpanded={isExpanded} ref={ref} data-testid="sidenav">
        {children}
        {isGtMobile && (
          <ToggleWidthButton onClick={() => onSideNavToggle()} data-testid="sidenav-width-toggle">
            <IconContainer>
              <IconWrapper icon={isExpanded ? closeMenu : openMenu} color="black" size="sm" />
            </IconContainer>
            {isExpanded ? 'Minimer' : 'Maksimer'}
          </ToggleWidthButton>
        )}
      </SideNavContainer>
    );
  },
);

SideNav.displayName = 'SideNavComponent';
