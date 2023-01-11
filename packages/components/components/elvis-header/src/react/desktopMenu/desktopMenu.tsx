import React, { useRef } from 'react';
import { TriggerButton } from '../styledComponents';
import { UserMenuProps } from '../elviaHeader.types';
import { Email, MenuButton, MenuContainer, MenuHr, UserGrid, Username } from './desktopMenuStyles';
import { IconWrapper, Overlay, useConnectedOverlay } from '@elvia/elvis-toolbox';
import profile from '@elvia/elvis-assets-icons/dist/icons/profile';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';

export const DesktopMenu: React.FC<UserMenuProps> = ({ username, email, onSignOutClick }) => {
  const connectedElementRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'right-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  return (
    <>
      <TriggerButton
        onClick={() => setIsShowing(!isShowing)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={isShowing}
        aria-haspopup="dialog"
        isActive={isShowing}
        ref={connectedElementRef}
        data-testid="desktop-menu-trigger"
      >
        <IconWrapper icon={profile} size="xs" />
        {username}
      </TriggerButton>
      {isShowing && (
        <Overlay ref={popoverRef} onClose={() => setIsShowing(false)}>
          <MenuContainer data-testid="desktop-menu">
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
        </Overlay>
      )}
    </>
  );
};
