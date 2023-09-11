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
import { ThemePicker } from '../themePicker/themePicker';

export const DesktopMenu: React.FC<UserMenuProps> = ({
  username,
  email,
  hideThemeSwitch,
  onSignOutClick,
  onMenuToggle,
  onThemeChange,
}) => {
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
        $size="sm"
        onClick={() => togglePopupVisibility(!isShowing)}
        aria-label="Åpne brukermeny"
        aria-expanded={isShowing}
        aria-haspopup="dialog"
        aria-controls="ewc-header-desktop-menu"
        isActive={isShowing}
        ref={connectedElementRef}
      >
        <ImageContainer $thumbnail>
          <ProfilePicture />
        </ImageContainer>
        {username?.replace(/\(ekstern\)/gi, '').trim()}
      </ProfileButton>
      {isShowing && (
        <Overlay useGlobalTheme ref={popoverRef} onClose={() => togglePopupVisibility(false)}>
          <MenuContainer role="menu" id="ewc-header-desktop-menu">
            <UserGrid>
              <ImageContainer>
                <ProfilePicture />
              </ImageContainer>
              <Username>{username}</Username>
              <Email>{email}</Email>
            </UserGrid>
            {!hideThemeSwitch && <ThemePicker onThemeChange={onThemeChange} />}
            <MenuHr></MenuHr>
            <Footer>
              <TertiaryButton $size="sm" onClick={onSignOutClick}>
                <IconWrapper icon={logout} size="xs" />
                Logg ut
              </TertiaryButton>
            </Footer>
          </MenuContainer>
        </Overlay>
      )}
    </>
  );
};
