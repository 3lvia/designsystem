import closeMenu from '@elvia/elvis-assets-icons/dist/icons/closeMenu';
import openMenu from '@elvia/elvis-assets-icons/dist/icons/openMenu';
import { IconWrapper } from '@elvia/elvis-toolbox';
import React from 'react';

import { Labels } from '../elviaHeader.types';
import { IconContainer, NavItemsContainer, SideNavContainer, ToggleWidthButton } from './sideNavStyles';

interface SideNavProps {
  labels: Labels;
  isExpanded: boolean;
  onSideNavToggle: () => void;
  children: React.ReactNode;
}

export const SideNav = React.forwardRef<HTMLDivElement, SideNavProps>(
  ({ labels, children, isExpanded, onSideNavToggle }, ref) => {
    return (
      <SideNavContainer isExpanded={isExpanded}>
        <NavItemsContainer ref={ref}>{children}</NavItemsContainer>
        <ToggleWidthButton onClick={() => onSideNavToggle()}>
          <IconContainer>
            <IconWrapper icon={isExpanded ? closeMenu : openMenu} size="sm" />
          </IconContainer>
          {isExpanded ? labels.minimizeLabel : labels.maximizeLabel}
        </ToggleWidthButton>
      </SideNavContainer>
    );
  },
);

SideNav.displayName = 'SideNavComponent';
