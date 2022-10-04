import { Icon } from '@elvia/elvis-icon/react';
import { useFocusTrap } from '@elvia/elvis-toolbox';
import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MobileUserMenuProps } from '../elviaHeader.types';
import { Hr, AppTitle, Backdrop, IconButton } from '../styledComponents';
import { Email, MenuButton, MenuContainer, MenuTitle, UserGrid, Username } from './mobileMenuStyles';

export const MobileMenu: React.FC<MobileUserMenuProps> = ({ appTitle, email, username, onSignOutClick }) => {
  const [userMenuIsOpen, setUserMenuIsOpen] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);

  const onKeydown = (ev: KeyboardEvent): void => {
    if (ev.key === 'Escape') {
      setIsShowing(false);
    }
  };

  const setIsShowing = (isShowing: boolean): void => {
    if (isShowing) {
      setUserMenuIsOpen(isShowing);
      setFadeOut(false);
      window?.addEventListener('keydown', onKeydown);
      setTimeout(() => useFocusTrap(popoverRef));
    } else {
      setFadeOut(true);
      useFocusTrap(popoverRef, true);
      window?.removeEventListener('keydown', onKeydown);
      setTimeout(() => triggerButtonRef.current?.focus());
    }
  };

  const onAnimationEnd = (): void => {
    if (fadeOut) {
      setUserMenuIsOpen(false);
    }
  };

  return (
    <>
      <IconButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        ref={triggerButtonRef}
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
            <MenuContainer fadeOut={fadeOut} onAnimationEnd={onAnimationEnd} ref={popoverRef}>
              <section>
                <MenuTitle>Applikasjon</MenuTitle>
                <AppTitle>{appTitle}</AppTitle>
              </section>
              <section>
                <MenuTitle>Innlogget som</MenuTitle>
                <UserGrid>
                  <Username>{username}</Username>
                  <Email>{email}</Email>
                </UserGrid>
              </section>
              <Hr></Hr>
              <section>
                <MenuButton onClick={onSignOutClick}>
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
