import logout from '@elvia/elvis-assets-icons/dist/icons/logout';
import {
  IconWrapper,
  Overlay,
  TertiaryButton,
  useConnectedOverlay,
  useFocusTrap,
} from '@elvia/elvis-toolbox';
import React, { useEffect, useRef } from 'react';

import { ProfilePicture } from '../ProfilePicture';
import { UserMenuProps } from '../elviaHeader.types';
import { ProfileButton } from '../styledComponents';
import { ThemePicker } from '../themePicker/themePicker';
import {
  DesktopMenuSlot,
  Email,
  Footer,
  ImageContainer,
  MenuContainer,
  MenuHr,
  UserGrid,
  Username,
} from './desktopMenuStyles';

export const DesktopMenu: React.FC<UserMenuProps> = ({
  username,
  email,
  hideThemeSwitch,
  onSignOutClick,
  onThemeChange,
  menuContent,
  webcomponent,
  labels,
  lang,
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

  const menuContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (menuContentRef.current && webcomponent?.getSlot('menuContent')) {
      menuContentRef.current.innerHTML = '';
      menuContentRef.current.appendChild(webcomponent.getSlot('menuContent'));
    }
  }, [isShowing]);

  const togglePopupVisibility = (isShowing: boolean): void => {
    setIsShowing(isShowing);

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
        aria-label={labels.openMenuLabel}
        aria-expanded={isShowing}
        aria-haspopup="dialog"
        aria-controls="ewc-header-desktop-menu"
        isActive={isShowing}
        ref={connectedElementRef}
      >
        <ImageContainer thumbnail>
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
            <DesktopMenuSlot ref={menuContentRef}>{menuContent}</DesktopMenuSlot>
            {!hideThemeSwitch && <ThemePicker lang={lang} onThemeChange={onThemeChange} />}
            <MenuHr></MenuHr>
            <Footer>
              <TertiaryButton size="sm" onClick={onSignOutClick}>
                <IconWrapper icon={logout} size="xs" />
                {labels.logoutLabel}
              </TertiaryButton>
            </Footer>
          </MenuContainer>
        </Overlay>
      )}
    </>
  );
};
