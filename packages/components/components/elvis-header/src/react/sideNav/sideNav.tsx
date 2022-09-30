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

interface Props {
  navItems: NavItem[];
  onNavItemClick: (item: NavItem) => void;
}

export const SideNav: React.FC<Props> = ({ navItems = [], onNavItemClick }) => {
  const [items, setItems] = useState<NavItem[]>(navItems.slice());
  const isGtMobile = useBreakpoint('gt-mobile');
  const [isExpanded, setIsExpanded] = useState(false);

  const onItemClick = (item: NavItem): void => {
    onNavItemClick(item);
    const listClone = items.slice();
    listClone.forEach((item) => (item.isActive = false));
    item.isActive = true;
    setItems(listClone);
  };

  useEffect(() => {
    const setActiveItemFromUrl = () => {
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

    setActiveItemFromUrl();
    window.addEventListener('popstate', setActiveItemFromUrl);

    return () => {
      window.removeEventListener('popstate', setActiveItemFromUrl);
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
              onClick={() => onItemClick(navItem)}
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
