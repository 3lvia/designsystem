import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { UserMenuProps } from '../elviaHeader.types';
import { IconButton } from '../styledComponents';
import { usePopoverHandler } from './usePopoverHandler';
import {
  Backdrop,
  TextSmall,
  ImageContainer,
  MenuContainer,
  TextSmallStrong,
  BackButton,
  ButtonSpacer,
  AppListContainer,
  TextMdStrong,
  MobileMenuFooter,
  MobileMenuSlot,
} from './mobileMenuStyles';
import { IconWrapper, TertiaryButton } from '@elvia/elvis-toolbox';
import moreMenu from '@elvia/elvis-assets-icons/dist/icons/moreMenu';
import removeCircleColor from '@elvia/elvis-assets-icons/dist/icons/removeCircleColor';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';
import arrowLeftCircleColor from '@elvia/elvis-assets-icons/dist/icons/arrowLeftCircleColor';
import arrowLeftCircleFilledColor from '@elvia/elvis-assets-icons/dist/icons/arrowLeftCircleFilledColor';
import { AppList } from '../appList/appList';
import { AppSelector } from './appSelector';
import { ProfilePicture } from '../ProfilePicture';
import { ThemePicker } from '../themePicker/themePicker';

interface MobileUserMenuProps extends UserMenuProps {
  appTitle: string;
  onMenuToggle: (isShowing: boolean) => void;
}

export const MobileMenu: React.FC<MobileUserMenuProps> = ({
  appTitle,
  email,
  username,
  hideThemeSwitch,
  onSignOutClick,
  onMenuToggle,
  onThemeChange,
  menuContent,
  webcomponent,
}) => {
  const [view, setView] = useState<'mainPage' | 'appSelector'>('mainPage');
  const [backButtonIsHovered, setBackButtonIsHovered] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

  const menuContentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (menuContentRef.current && webcomponent?.getSlot('menuContent')) {
      menuContentRef.current.innerHTML = '';
      menuContentRef.current.appendChild(webcomponent.getSlot('menuContent'));
    }
  }, [userMenuIsOpen, view]);

  const onMobileMenuToggle = (isShowing: boolean) => {
    setIsShowing(isShowing);
    onMenuToggle(isShowing);
  };

  return (
    <>
      <IconButton
        onClick={() => onMobileMenuToggle(!userMenuIsOpen)}
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        aria-controls="ewc-header-mobile-menu"
        ref={triggerButtonRef}
      >
        <IconWrapper
          icon={userMenuIsOpen ? removeCircleColor : moreMenu}
          size={userMenuIsOpen ? 'md' : 'sm'}
        />
      </IconButton>
      {userMenuIsOpen &&
        createPortal(
          <>
            <Backdrop fadeOut={fadeOut} onClick={() => onMobileMenuToggle(false)} />
            <MenuContainer
              fadeOut={fadeOut}
              onAnimationEnd={onAnimationEnd}
              ref={popoverRef}
              role="menu"
              id="ewc-header-mobile-menu"
            >
              {view === 'mainPage' && (
                <>
                  <ImageContainer>
                    <ProfilePicture />
                  </ImageContainer>
                  <TextSmallStrong>{username}</TextSmallStrong>
                  <TextSmall>{email}</TextSmall>
                  <MobileMenuSlot ref={menuContentRef}>{menuContent}</MobileMenuSlot>
                  <AppSelector appTitle={appTitle} onClick={() => setView('appSelector')} />
                  {!hideThemeSwitch && <ThemePicker onThemeChange={onThemeChange} />}
                  <MobileMenuFooter>
                    <TertiaryButton size="sm" onClick={onSignOutClick}>
                      <IconWrapper icon={logout} size="xs" />
                      Logg ut
                    </TertiaryButton>
                  </MobileMenuFooter>
                </>
              )}

              {view === 'appSelector' && (
                <>
                  <BackButton
                    onClick={() => setView('mainPage')}
                    onMouseEnter={() => setBackButtonIsHovered(true)}
                    onMouseLeave={() => setBackButtonIsHovered(false)}
                  >
                    <IconWrapper
                      icon={backButtonIsHovered ? arrowLeftCircleFilledColor : arrowLeftCircleColor}
                      size="sm"
                    />
                    <TextMdStrong>Velg applikasjon</TextMdStrong>
                    <ButtonSpacer />
                  </BackButton>
                  <AppListContainer>
                    <AppList />
                  </AppListContainer>
                </>
              )}
            </MenuContainer>
          </>,
          document.body,
        )}
    </>
  );
};
