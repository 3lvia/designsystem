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

interface MobileUserMenuProps extends UserMenuProps {
  appTitle: string;
}

export const MobileMenu: React.FC<MobileUserMenuProps> = ({
  appTitle,
  email,
  username,
  onSignOutClick,
  onMenuToggle,
}) => {
  const [view, setView] = useState<'mainPage' | 'appSelector' | 'themeSelector'>('mainPage');
  const [backButtonIsHovered, setBackButtonIsHovered] = useState(false);
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

  useEffect(() => {
    onMenuToggle(userMenuIsOpen);
  }, [userMenuIsOpen]);

  return (
    <>
      <IconButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        aria-controls="ewc-header-mobile-menu"
        ref={triggerButtonRef}
      >
        <IconWrapper
          icon={userMenuIsOpen ? removeCircleColor : moreMenu}
          color="black"
          size={userMenuIsOpen ? 'md' : 'sm'}
        />
      </IconButton>
      {userMenuIsOpen &&
        createPortal(
          <>
            <Backdrop fadeOut={fadeOut} onClick={() => setIsShowing(false)} />
            <MenuContainer
              fadeOut={fadeOut}
              onAnimationEnd={onAnimationEnd}
              ref={popoverRef}
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
                  <section>
                    <TertiaryButton size="sm" onClick={onSignOutClick}>
                      <IconWrapper icon={logout} size="xs" color="black" />
                      Logg ut
                    </TertiaryButton>
                  </section>
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
