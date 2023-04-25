import React, { useRef } from 'react';
import { ProfileButton } from '../styledComponents';
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
      <ProfileButton
        size="sm"
        onClick={() => togglePopupVisibility(!isShowing)}
        aria-label="Åpne brukermeny"
        aria-expanded={isShowing}
        aria-haspopup="dialog"
        aria-controls="ewc-header-menu-0"
        isActive={isShowing}
        ref={connectedElementRef}
      >
        <ImageContainer thumbnail>
          <ProfilePicture />
        </ImageContainer>
        {username}
      </ProfileButton>
      {isShowing && (
        <Overlay ref={popoverRef} onClose={() => togglePopupVisibility(false)}>
          <MenuContainer id="ewc-header-menu-0">
            <UserGrid>
              <ImageContainer>
                <ProfilePicture />
              </ImageContainer>
              <Username>{username}</Username>
              <Email>{email}</Email>
            </UserGrid>
            <MenuHr></MenuHr>
            <Footer>
              <TertiaryButton size="sm" onClick={onSignOutClick}>
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
