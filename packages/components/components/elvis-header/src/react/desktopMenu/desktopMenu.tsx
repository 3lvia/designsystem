import React, { useEffect, useRef } from 'react';
import { TriggerButton } from '../styledComponents';
import { UserMenuProps } from '../elviaHeader.types';
import { Email, Footer, MenuContainer, MenuHr, UserGrid, Username } from './desktopMenuStyles';
import {
  IconWrapper,
  Overlay,
  TertiaryButton,
  useConnectedOverlay,
  useFocusTrap,
} from '@elvia/elvis-toolbox';
import profile from '@elvia/elvis-assets-icons/dist/icons/profile';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';

export const DesktopMenu: React.FC<UserMenuProps> = ({ username, email, onSignOutClick }) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const connectedElementRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'right-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  useEffect(() => {
    if (isShowing) {
      trapFocus(popoverRef);
    } else {
      releaseFocusTrap();
      connectedElementRef.current?.focus();
    }
  }, [isShowing]);

  return (
    <>
      <TriggerButton
        size="sm"
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
            <Footer>
              <TertiaryButton size="sm" onClick={onSignOutClick} data-testid="desktop-sign-out-trigger">
                <IconWrapper icon={logout} size="xs" color="black" />
                Logg ut
              </TertiaryButton>
            </Footer>
          </MenuContainer>
        </Overlay>
      )}
    </>
  );
};
