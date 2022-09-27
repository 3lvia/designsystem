import React, { useRef, useState } from 'react';
import { Backdrop } from '../styledComponents';
import { UserMenuProps } from '../elviaHeader.types';
import { createPortal } from 'react-dom';
import {
  Email,
  MenuButton,
  MenuContainer,
  MenuHr,
  TriggerButton,
  UserGrid,
  Username,
} from './desktopMenuStyles';
import { Icon } from '@elvia/elvis-icon/react';
import { useFocusTrap } from '@elvia/elvis-toolbox';

export const DesktopMenu: React.FC<UserMenuProps> = ({ username, email }) => {
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
      setFadeOut(false);
      setUserMenuIsOpen(isShowing);
      window?.addEventListener('keydown', onKeydown);

      setTimeout(() => {
        useFocusTrap(popoverRef);
      });
    } else {
      setFadeOut(true);
      useFocusTrap(popoverRef, true);
      window?.removeEventListener('keydown', onKeydown);
      triggerButtonRef.current?.focus();
    }
  };

  const onAnimationEnd = (): void => {
    if (fadeOut) {
      setUserMenuIsOpen(false);
    }
  };

  return (
    <>
      <TriggerButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        isActive={userMenuIsOpen}
        ref={triggerButtonRef}
      >
        <Icon name="profile" size="xs" />
        {username}
      </TriggerButton>
      {userMenuIsOpen &&
        createPortal(
          <>
            <Backdrop transparent={true} fadeOut={fadeOut} onClick={() => setIsShowing(false)} />
            <MenuContainer fadeOut={fadeOut} onAnimationEnd={onAnimationEnd} ref={popoverRef}>
              <UserGrid>
                <Username>{username}</Username>
                <Email>{email}</Email>
              </UserGrid>
              <MenuHr></MenuHr>
              <section>
                <MenuButton>
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
