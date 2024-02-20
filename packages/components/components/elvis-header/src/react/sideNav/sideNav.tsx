import React from 'react';

import closeMenu from '@elvia/elvis-assets-icons/dist/icons/closeMenu';
import openMenu from '@elvia/elvis-assets-icons/dist/icons/openMenu';
import { IconWrapper, useBreakpoint } from '@elvia/elvis-toolbox';

import { IconContainer, SideNavContainer, ToggleWidthButton } from './sideNavStyles';

interface SideNavProps {
  isExpanded: boolean;
  onSideNavToggle: () => void;
  children: React.ReactNode;
}

export const SideNav = React.forwardRef<HTMLElement, SideNavProps>(
  ({ children, isExpanded, onSideNavToggle }, ref) => {
    const isGtMobile = useBreakpoint('gt-mobile');

    return (
      <SideNavContainer isGtMobile={isGtMobile} isExpanded={isExpanded} ref={ref}>
        {children}
        {isGtMobile && (
          <ToggleWidthButton onClick={() => onSideNavToggle()}>
            <IconContainer>
              <IconWrapper icon={isExpanded ? closeMenu : openMenu} size="sm" />
            </IconContainer>
            {isExpanded ? 'Minimer' : 'Maksimer'}
          </ToggleWidthButton>
        )}
      </SideNavContainer>
    );
  },
);

SideNav.displayName = 'SideNavComponent';
