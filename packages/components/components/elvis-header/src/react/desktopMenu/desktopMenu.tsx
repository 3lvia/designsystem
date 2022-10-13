import React, { useRef } from 'react';
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
import { usePopoverHandler } from '../usePopoverHandler';

export const DesktopMenu: React.FC<UserMenuProps> = ({ username, email, onSignOutClick }) => {
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

  return (
    <>
      <TriggerButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        isActive={!fadeOut}
        ref={triggerButtonRef}
        data-testid="desktop-menu-trigger"
      >
        <Icon name="profile" size="xs" />
        {username}
      </TriggerButton>
      {userMenuIsOpen &&
        createPortal(
          <>
            <Backdrop transparent={true} fadeOut={fadeOut} onClick={() => setIsShowing(false)} />
            <MenuContainer
              data-testid="desktop-menu"
              fadeOut={fadeOut}
              onAnimationEnd={onAnimationEnd}
              ref={popoverRef}
            >
              <UserGrid>
                <Username data-testid="desktop-username">{username}</Username>
                <Email data-testid="desktop-email">{email}</Email>
              </UserGrid>
              <MenuHr></MenuHr>
              <section>
                <MenuButton onClick={onSignOutClick} data-testid="desktop-sign-out-trigger">
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
