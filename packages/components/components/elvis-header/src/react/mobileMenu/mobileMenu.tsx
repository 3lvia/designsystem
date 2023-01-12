import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { MobileUserMenuProps } from '../elviaHeader.types';
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
} from './mobileMenuStyles';
import { IconWrapper, TertiaryButton } from '@elvia/elvis-toolbox';
import moreMenu from '@elvia/elvis-assets-icons/dist/icons/moreMenu';
import removeCircleColor from '@elvia/elvis-assets-icons/dist/icons/removeCircleColor';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';
import arrowLeftCircleColor from '@elvia/elvis-assets-icons/dist/icons/arrowLeftCircleColor';
import { AppList } from '../appList/appList';
import { AppSelector } from './appSelector';

export const MobileMenu: React.FC<MobileUserMenuProps> = ({ appTitle, email, username, onSignOutClick }) => {
  const [view, setView] = useState<'mainPage' | 'appSelector' | 'themeSelector'>('mainPage');
  const triggerButtonRef = useRef<HTMLButtonElement>(null);
  const popoverRef = useRef(null);
  const { userMenuIsOpen, setIsShowing, onAnimationEnd, fadeOut } = usePopoverHandler(
    triggerButtonRef,
    popoverRef,
  );

  return (
    <>
      <IconButton
        onClick={() => setIsShowing(!userMenuIsOpen)}
        type="button"
        aria-label="Åpne brukermeny"
        aria-expanded={userMenuIsOpen}
        aria-haspopup="dialog"
        ref={triggerButtonRef}
        data-testid="mobile-menu-trigger"
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
              data-testid="mobile-menu"
              fadeOut={fadeOut}
              onAnimationEnd={onAnimationEnd}
              ref={popoverRef}
            >
              {view === 'mainPage' && (
                <>
                  <ImageContainer>
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 64 64"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M37.172 37.8617C36.8066 37.8248 36.7225 36.8624 37.064 36.7274C42.2927 34.6594 45.9923 29.5503 45.9923 23.5753C45.9923 15.7694 39.6463 9.69556 31.8573 9.69556C24.0682 9.69556 17.7856 15.7694 17.7856 23.5753C17.7856 29.4809 21.3998 34.5406 26.5324 36.6541C26.8725 36.7941 26.7761 37.7932 26.4106 37.835C25.1548 37.9788 24.1089 38.1586 23.165 38.3281C23.1327 38.3339 23.1055 38.3552 23.0919 38.3852L22.3707 39.9753C22.3481 40.025 22.3696 40.0836 22.4189 40.1069L30.9186 44.1337C30.9382 44.1429 30.9602 44.1456 30.9814 44.1413L39.3827 42.4262C39.401 42.4225 39.4179 42.4136 39.4315 42.4008L42.167 39.8049C42.2 39.7736 42.2077 39.7241 42.1859 39.6842L41.4617 38.364C41.4455 38.3346 41.4158 38.3152 41.3823 38.3123C40.7552 38.2588 40.0325 38.1769 39.2336 38.0863C38.5921 38.0136 37.9015 37.9353 37.172 37.8617Z"
                        fill="#E9E9E9"
                      />
                      <path
                        d="M17.7598 22.8539C18.0362 17.8676 20.2476 9.44154 32.2022 9.44153C37.2473 9.65876 45.1016 11.4314 46.369 22.8539C41.5317 22.8539 33.9302 22.4384 32.2022 13.5738C32.2006 13.5604 32.1991 13.5461 32.1976 13.5312C32.137 13.0736 31.7588 13.1139 31.5897 13.487C30.0844 18.7475 25.9141 22.8539 17.7598 22.8539Z"
                        fill="black"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M40.5811 26.4122C40.3517 26.6142 40.0024 26.5915 39.8009 26.3616C39.3671 25.8667 38.5972 25.2975 37.7215 25.1585C36.8987 25.028 35.885 25.2602 34.8525 26.5467C34.6612 26.7851 34.3132 26.823 34.0753 26.6312C33.8373 26.4395 33.7996 26.0907 33.9909 25.8523C35.2423 24.2929 36.6359 23.8644 37.8944 24.0641C39.1 24.2554 40.0854 25.0073 40.6316 25.6303C40.8331 25.8602 40.8104 26.2103 40.5811 26.4122Z"
                        fill="#262626"
                      />
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M30.0054 26.7836C29.776 26.9855 29.4267 26.9628 29.2252 26.7329C28.7914 26.2381 28.0216 25.6688 27.1458 25.5299C26.323 25.3993 25.3093 25.6315 24.2769 26.918C24.0855 27.1565 23.7375 27.1943 23.4996 27.0026C23.2617 26.8108 23.2239 26.4621 23.4153 26.2236C24.6667 24.6643 26.0602 24.2357 27.3187 24.4354C28.5243 24.6267 29.5098 25.3786 30.0559 26.0017C30.2574 26.2316 30.2348 26.5816 30.0054 26.7836Z"
                        fill="#262626"
                      />
                      <path
                        d="M22.8197 38.3291C22.8197 39.1657 25.996 41.6717 31.0105 41.6717C36.025 41.6717 41.6526 39.7389 41.1085 38.3064C49.208 38.952 52.3923 43.4894 52.3923 64H12.5491C12.0511 55.8235 10.4902 39.6274 22.8197 38.3291Z"
                        fill="white"
                      />
                    </svg>
                  </ImageContainer>
                  <TextSmallStrong data-testid="mobile-username">{username}</TextSmallStrong>
                  <TextSmall data-testid="mobile-email">{email}</TextSmall>
                  <AppSelector appTitle={appTitle} onClick={() => setView('appSelector')} />
                  <section>
                    <TertiaryButton size="sm" onClick={onSignOutClick} data-testid="mobile-sign-out-trigger">
                      <IconWrapper icon={logout} size="xs" color="black" />
                      Logg ut
                    </TertiaryButton>
                  </section>
                </>
              )}

              {view === 'appSelector' && (
                <>
                  <BackButton onClick={() => setView('mainPage')}>
                    <IconWrapper icon={arrowLeftCircleColor} size="sm" />
                    <TextSmallStrong>Applikasjoner</TextSmallStrong>
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
