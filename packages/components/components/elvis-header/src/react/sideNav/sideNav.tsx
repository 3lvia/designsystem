import { Icon } from '@elvia/elvis-icon/react';
import { useBreakpoint } from '@elvia/elvis-toolbox';
import React, { useState } from 'react';
import { IconContainer, SideNavContainer, ToggleWidthButton } from './sideNavStyles';

export const SideNav = React.forwardRef<HTMLElement>(({ children }, ref) => {
  const isGtMobile = useBreakpoint('gt-mobile');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <SideNavContainer isGtMobile={isGtMobile} isExpanded={isExpanded} ref={ref}>
      {children}
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
});

SideNav.displayName = 'SideNavComponent';
