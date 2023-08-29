import React, { useRef, useState } from 'react';
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
}

export const MobileMenu: React.FC<MobileUserMenuProps> = ({
  appTitle,
  email,
  username,
  hideThemeSwitch,
  onSignOutClick,
  onMenuToggle,
  onThemeChange,
}) => {
  const [view, setView] = useState<'mainPage' | 'appSelector' | 'themeSelector'>('mainPage');
  const [backButtonIsHovered, setBackButtonIsHovered] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

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
