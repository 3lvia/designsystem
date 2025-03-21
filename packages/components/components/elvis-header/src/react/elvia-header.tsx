import { getThemeColor } from '@elvia/elvis-colors';
import { useBreakpoint, useLanguage, useSlot } from '@elvia/elvis-toolbox';
import React, { useEffect, useState } from 'react';

import { AppDrawer } from './appDrawer/appDrawer';
import { DesktopMenu } from './desktopMenu/desktopMenu';
import { getActiveApp } from './elviaApps';
import { HeaderProps, Theme } from './elviaHeader.types';
import { MobileMenu } from './mobileMenu/mobileMenu';
import { SideNav } from './sideNav/sideNav';
import {
  AppContent,
  Hr,
  IconButton,
  LogoContainer,
  PageTitle,
  SquareContainer,
  StyledHeader,
} from './styledComponents';
import { getStoredActiveTheme, setThemeClassOnDocument } from './themeUtils';

export const Header: React.FC<HeaderProps> = ({
  appTitle,
  username,
  email,
  pageTitle,
  navItems,
  appContent,
  menuContent,
  hideThemeSwitch,
  onLogoClick,
  onSignOutClick,
  onThemeChange,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [sidenavIsExpanded, setSidenavIsExpanded] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const applicationTitle = appTitle ?? getActiveApp('name');
  const isGtMobile = useBreakpoint('gt-mobile');

  const { ref: pageContainerRef } = useSlot('appContent', webcomponent);
  const { ref: pageTitleRef } = useSlot<HTMLHeadingElement>('pageTitle', webcomponent);
  const { ref: sidenavRef } = useSlot('navItems', webcomponent);

  const hasNavItems = !!webcomponent?.getSlot('navItems') || !!navItems;
  const hasAppContent = !!webcomponent?.getSlot('appContent') || !!appContent;

  const signOutClick = (): void => {
    onSignOutClick?.();
    webcomponent?.triggerEvent('onSignOutClick');
  };

  const logoClick = () => {
    onLogoClick?.();
    webcomponent?.triggerEvent('onLogoClick');
  };

  const themeChange = (theme: Theme) => {
    onThemeChange?.(theme);
    webcomponent?.triggerEvent('onThemeChange', theme);
  };

  useEffect(() => {
    setThemeClassOnDocument(getStoredActiveTheme());
  }, []);

  const lang = useLanguage();

  const labels =
    lang === 'no'
      ? {
          openMenuLabel: 'Åpne brukermeny',
          selectAppLabel: 'Velg applikasjon',
          logoutLabel: 'Logg ut',
          minimizeLabel: 'Minimer',
          maximizeLabel: 'Maksimer',
        }
      : {
          openMenuLabel: 'Open user menu',
          selectAppLabel: 'Select application',
          logoutLabel: 'Log out',
          minimizeLabel: 'Minimize',
          maximizeLabel: 'Maximize',
        };

  return (
    <div className={className} style={{ ...inlineStyle }}>
      <StyledHeader>
        <LogoContainer>
          <IconButton aria-label="logo" onClick={() => logoClick()}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M71.4075 30.4575H28.578V40.7831H71.4075V30.4575Z" fill={getThemeColor('text-1')} />
              <path
                d="M36.379 60.915C22.5073 60.915 11.2459 49.5813 11.2459 35.6203C11.2459 21.6593 22.5073 10.3256 36.379 10.3256C44.3621 10.3256 51.4649 14.0832 56.0788 19.918L63.7887 13.1056C57.2929 5.10171 47.4279 0 36.379 0C16.8311 0 0.986298 15.9467 0.986298 35.6203C0.986298 55.294 16.8311 71.2406 36.379 71.2406C47.4279 71.2406 57.2929 66.1389 63.7887 58.135L56.0788 51.3226C51.4953 57.1575 44.3621 60.915 36.379 60.915Z"
                fill={getThemeColor('text-1')}
              />
            </svg>
          </IconButton>
        </LogoContainer>

        {isGtMobile && (
          <>
            <AppDrawer appTitle={applicationTitle} />
            <Hr direction="vertical" />
          </>
        )}

        <PageTitle isInvisible={mobileMenuIsOpen} ref={pageTitleRef}>
          {pageTitle}
        </PageTitle>

        {!isGtMobile && (
          <SquareContainer>
            <MobileMenu
              appTitle={applicationTitle}
              email={email}
              username={username}
              hideThemeSwitch={hideThemeSwitch}
              onSignOutClick={signOutClick}
              onThemeChange={(themeName) => themeChange(themeName)}
              onMenuToggle={(isOpen) => setMobileMenuIsOpen(isOpen)}
              menuContent={menuContent}
              webcomponent={webcomponent}
              labels={labels}
            />
          </SquareContainer>
        )}

        {isGtMobile && (
          <>
            <Hr direction="vertical" />
            <DesktopMenu
              email={email}
              username={username}
              hideThemeSwitch={hideThemeSwitch}
              onSignOutClick={signOutClick}
              onThemeChange={themeChange}
              menuContent={menuContent}
              webcomponent={webcomponent}
              labels={labels}
            />
          </>
        )}
      </StyledHeader>
      {hasNavItems && (
        <SideNav
          labels={labels}
          ref={sidenavRef}
          onSideNavToggle={() => setSidenavIsExpanded(!sidenavIsExpanded)}
          isExpanded={sidenavIsExpanded}
        >
          {!webcomponent && navItems}
        </SideNav>
      )}
      <AppContent
        ref={pageContainerRef}
        sidenavPadding={hasNavItems}
        hidden={!hasAppContent}
        isExpanded={sidenavIsExpanded}
      >
        {appContent}
      </AppContent>
    </div>
  );
};

export default Header;
