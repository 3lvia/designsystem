import { Icon } from '@elvia/elvis-icon/react';
import { useBreakpoint } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';
import { NavItem } from '../elviaHeader.types';
import {
  ButtonContainer,
  IconContainer,
  NavButton,
  SideNavContainer,
  ToggleWidthButton,
} from './sideNavStyles';

interface NavItemWithActiveState extends NavItem {
  isActive: boolean;
}

interface Props {
  navItems: NavItem[];
  onNavItemClick: (item: NavItem) => void;
}

export const SideNav: React.FC<Props> = ({ navItems = [], onNavItemClick }) => {
  const [items, setItems] = useState<NavItemWithActiveState[]>([
    ...navItems.map((item) => item as NavItemWithActiveState),
  ]);
  const isGtMobile = useBreakpoint('gt-mobile');
  const [isExpanded, setIsExpanded] = useState(false);

  const setActiveState = () => {
    const listClone = items.slice();
    const currentUrl = window.location.pathname;

    listClone.forEach((navItem) => {
      if (navItem.strictMatching) {
        navItem.isActive = currentUrl === navItem.url;
      } else {
        navItem.isActive = currentUrl.startsWith(navItem.url);
      }
    });

    setItems(listClone);
  };

  useEffect(() => {
    /**
     * We use a mutation observer to detect page
     * changes. This is a workaround since listening
     * for route changes is impossible in vanilla js.
     */
    const observer = new MutationObserver(setActiveState);

    observer.observe(document, { childList: true, subtree: true, attributes: false, characterData: false });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <SideNavContainer isGtMobile={isGtMobile} isExpanded={isExpanded}>
      <ButtonContainer isGtMobile={isGtMobile}>
        {items.map((navItem) => {
          return (
            <NavButton
              aria-label={navItem.name}
              type="button"
              role="link"
              key={navItem.url}
              onClick={() => onNavItemClick(navItem)}
            >
              <IconContainer isActive={navItem.isActive}>
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
