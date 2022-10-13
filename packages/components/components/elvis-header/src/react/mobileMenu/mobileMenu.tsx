import { Icon } from '@elvia/elvis-icon/react';
import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MobileUserMenuProps } from '../elviaHeader.types';
import { Hr, AppTitle, Backdrop, IconButton } from '../styledComponents';
import { usePopoverHandler } from '../usePopoverHandler';
import { Email, MenuButton, MenuContainer, MenuTitle, UserGrid, Username } from './mobileMenuStyles';

export const MobileMenu: React.FC<MobileUserMenuProps> = ({ appTitle, email, username, onSignOutClick }) => {
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

  return (
    <>
      <IconButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        ref={triggerButtonRef}
        data-testid="mobile-menu-trigger"
      >
        <Icon
          name={userMenuIsOpen ? 'removeCircleColor' : 'moreMenu'}
          color="black"
          size={userMenuIsOpen ? 'md' : 'sm'}
        />
      </IconButton>
      {userMenuIsOpen &&
        createPortal(
          <>
            <Backdrop fadeOut={fadeOut} onClick={() => setIsShowing(false)} />
            <MenuContainer
              data-testid="mobile-menu"
              fadeOut={fadeOut}
              onAnimationEnd={onAnimationEnd}
              ref={popoverRef}
            >
              <section>
                <MenuTitle>Applikasjon</MenuTitle>
                <AppTitle data-testid="mobile-menu-app-title">{appTitle}</AppTitle>
              </section>
              <section>
                <MenuTitle>Innlogget som</MenuTitle>
                <UserGrid>
                  <Username data-testid="mobile-username">{username}</Username>
                  <Email data-testid="mobile-email">{email}</Email>
                </UserGrid>
              </section>
              <Hr></Hr>
              <section>
                <MenuButton onClick={onSignOutClick} data-testid="mobile-sign-out-trigger">
                  <Icon name="logout" size="xs" color="black" />
                  Logg ut
                </MenuButton>
              </section>
            </MenuContainer>
          </>,
          document.body,
        )}
    </>
  );
};
