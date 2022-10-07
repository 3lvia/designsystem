import { Icon } from '@elvia/elvis-icon/react';
import { useBreakpoint } from '@elvia/elvis-toolbox';
import React from 'react';
import { IconContainer, SideNavContainer, ToggleWidthButton } from './sideNavStyles';

interface SideNavProps {
  isExpanded: boolean;
  onSideNavToggle: () => void;
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
              <Icon name={isExpanded ? 'closeMenu' : 'openMenu'} color="black" size="sm" />
            </IconContainer>
            {isExpanded ? 'Minimer' : 'Maksimer'}
          </ToggleWidthButton>
        )}
      </SideNavContainer>
    );
  },
);

SideNav.displayName = 'SideNavComponent';
