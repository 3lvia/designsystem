import React, { useRef } from 'react';
import { Backdrop, TriggerButton } from '../styledComponents';
import { UserMenuProps } from '../elviaHeader.types';
import { createPortal } from 'react-dom';
import { Email, MenuButton, MenuContainer, MenuHr, UserGrid, Username } from './desktopMenuStyles';
import { usePopoverHandler } from '../usePopoverHandler';
import { IconWrapper } from '@elvia/elvis-toolbox';
import profile from '@elvia/elvis-assets-icons/dist/icons/profile';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';

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
        <IconWrapper icon={profile} size="xs" />
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
                  <IconWrapper icon={logout} size="xs" color="black" />
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
