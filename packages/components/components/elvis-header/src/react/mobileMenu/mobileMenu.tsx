import React, { useRef } from 'react';
import { createPortal } from 'react-dom';
import { MobileUserMenuProps } from '../elviaHeader.types';
import { IconButton } from '../styledComponents';
import { usePopoverHandler } from './usePopoverHandler';
import { Backdrop, Email, ImageContainer, MenuContainer, Username } from './mobileMenuStyles';
import { IconWrapper, TertiaryButton } from '@elvia/elvis-toolbox';
import moreMenu from '@elvia/elvis-assets-icons/dist/icons/moreMenu';
import removeCircleColor from '@elvia/elvis-assets-icons/dist/icons/removeCircleColor';
import logout from '@elvia/elvis-assets-icons/dist/icons/logout';
import profile from '@elvia/elvis-assets-icons/dist/icons/profile';

export const MobileMenu: React.FC<MobileUserMenuProps> = ({ appTitle, email, username, onSignOutClick }) => {
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
              <ImageContainer>
                <IconWrapper icon={profile} size="sm" color="black" />
              </ImageContainer>
              <Username data-testid="mobile-username">{username}</Username>
              <Email data-testid="mobile-email">{email}</Email>
              {appTitle}
              <section>
                <TertiaryButton size="sm" onClick={onSignOutClick} data-testid="mobile-sign-out-trigger">
                  <IconWrapper icon={logout} size="xs" color="black" />
                  Logg ut
                </TertiaryButton>
              </section>
            </MenuContainer>
          </>,
          document.body,
        )}
    </>
  );
};
