import React, { useRef } from 'react';
import { TriggerButton } from '../styledComponents';
import { UserMenuProps } from '../elviaHeader.types';
import {
  Email,
  Footer,
  ImageContainer,
  MenuContainer,
  MenuHr,
  UserGrid,
  Username,
} from './desktopMenuStyles';
import {
  IconWrapper,
  Overlay,
  TertiaryButton,
  useConnectedOverlay,
  useFocusTrap,
} from '@elvia/elvis-toolbox';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';
import { ProfilePicture } from '../ProfilePicture';

export const DesktopMenu: React.FC<UserMenuProps> = ({ username, email, onSignOutClick, onMenuToggle }) => {
  const { trapFocus, releaseFocusTrap } = useFocusTrap();
  const connectedElementRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { isShowing, setIsShowing } = useConnectedOverlay(connectedElementRef, popoverRef, {
    offset: 8,
    horizontalPosition: 'right-inside',
    verticalPosition: 'bottom',
    alignWidths: false,
  });

  const togglePopupVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);
    onMenuToggle(isShowing);

    if (isShowing) {
      trapFocus(popoverRef);
    } else {
      releaseFocusTrap();
      connectedElementRef.current?.focus();
    }
  };

  return (
    <>
      <TriggerButton
        size="sm"
        onClick={() => togglePopupVisibility(!isShowing)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={isShowing}
        aria-haspopup="dialog"
        isActive={isShowing}
        ref={connectedElementRef}
        data-testid="desktop-menu-trigger"
      >
        <ImageContainer thumbnail>
          <ProfilePicture />
        </ImageContainer>
        {username}
      </TriggerButton>
      {isShowing && (
        <Overlay ref={popoverRef} onClose={() => togglePopupVisibility(false)}>
          <MenuContainer data-testid="desktop-menu">
            <UserGrid>
              <ImageContainer>
                <ProfilePicture />
              </ImageContainer>
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
