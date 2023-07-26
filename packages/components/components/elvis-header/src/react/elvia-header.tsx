import React, { useEffect, useState } from 'react';
import { HeaderProps } from './elviaHeader.types';
import { GtMobile, MobileOnly, useSlot } from '@elvia/elvis-toolbox';
import { getThemeColor } from '@elvia/elvis-colors';
import {
  AppContent,
  StyledHeader,
  Hr,
  IconButton,
  LogoContainer,
  PageTitle,
  SquareContainer,
} from './styledComponents';
import { MobileMenu } from './mobileMenu/mobileMenu';
import { DesktopMenu } from './desktopMenu/desktopMenu';
import { SideNav } from './sideNav/sideNav';
import { AppDrawer } from './appDrawer/appDrawer';
import { getActiveApp } from './elviaApps';
import { getStoredActiveTheme, setThemeClassOnDocument } from './themeUtils';

export const Header: React.FC<HeaderProps> = ({
  appTitle,
  username,
  email,
  pageTitle,
  navItems,
  appContent,
  onLogoClick,
  onSignOutClick,
  className,
  inlineStyle,
  webcomponent,
}) => {
  const [sidenavIsExpanded, setSidenavIsExpanded] = useState(false);
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);
  const [desktopMenuIsOpen, setDesktopMenuIsOpen] = useState(false);
  const applicationTitle = appTitle ?? getActiveApp('name');

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

  useEffect(() => {
    setThemeClassOnDocument(getStoredActiveTheme());
  }, []);

  return (
    <div className={className} style={{ ...inlineStyle }}>
      <StyledHeader menuIsOpen={desktopMenuIsOpen}>
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

        <GtMobile>
          <AppDrawer appTitle={applicationTitle} onMenuToggle={(isOpen) => setDesktopMenuIsOpen(isOpen)} />
          <Hr direction="vertical" />
        </GtMobile>

        <PageTitle isInvisible={mobileMenuIsOpen} ref={pageTitleRef}>
          {pageTitle}
        </PageTitle>

        <MobileOnly>
          <SquareContainer>
            <MobileMenu
              appTitle={applicationTitle}
              email={email}
              username={username}
              onSignOutClick={signOutClick}
              onMenuToggle={(isOpen) => setMobileMenuIsOpen(isOpen)}
            />
          </SquareContainer>
        </MobileOnly>

        <GtMobile>
          <Hr direction="vertical" />
          <DesktopMenu
            email={email}
            username={username}
            onSignOutClick={signOutClick}
            onMenuToggle={(isOpen) => setDesktopMenuIsOpen(isOpen)}
          />
        </GtMobile>
      </StyledHeader>
      {hasNavItems && (
        <SideNav
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
