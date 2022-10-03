import React, { useEffect, useRef, useState } from 'react';
import { HeaderProps } from './elviaHeader.types';
import { useBreakpoint } from '@elvia/elvis-toolbox';
import {
  AppContent,
  AppTitle,
  Header,
  Hr,
  IconButton,
  LogoContainer,
  PageTitle,
  SquareContainer,
} from './styledComponents';
import { MobileMenu } from './mobileMenu/mobileMenu';
import { DesktopMenu } from './desktopMenu/desktopMenu';
import { SideNav } from './sideNav/sideNav';

export const Tooltip: React.FC<HeaderProps> = ({
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
  const isGtMobile = useBreakpoint('gt-mobile');
  const isGtTablet = useBreakpoint('gt-tablet');
  const [hasAppContent, setHasAppContent] = useState(!!appContent);
  const pageContainerElement = useRef<HTMLElement>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const sidenavRef = useRef<HTMLElement>(null);

  /** Get app content slot */
  useEffect(() => {
    if (!webcomponent) {
      return;
    }
    if (pageContainerElement.current && webcomponent.getSlot('appContent')) {
      pageContainerElement.current.innerHTML = '';
      pageContainerElement.current.appendChild(webcomponent.getSlot('appContent'));
      setHasAppContent(true);
    }

    if (pageTitleRef.current && webcomponent?.getSlot('pageTitle')) {
      pageTitleRef.current.innerHTML = '';
      pageTitleRef.current.appendChild(webcomponent.getSlot('pageTitle'));
    }

    if (sidenavRef.current && webcomponent?.getSlot('navItems')) {
      sidenavRef.current.innerHTML = '';
      sidenavRef.current.appendChild(webcomponent.getSlot('navItems'));
    }
  }, [webcomponent]);

  return (
    <div className={className ?? ''} style={{ ...inlineStyle }}>
      <Header isGtMobile={isGtMobile}>
        <LogoContainer isGtMobile={isGtMobile}>
          <IconButton
            onClick={() => {
              if (!webcomponent && onLogoClick) {
                onLogoClick();
              } else if (webcomponent) {
                webcomponent.triggerEvent('onLogoClick');
              }
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M71.4075 30.4575H28.578V40.7831H71.4075V30.4575Z" fill="black" />
              <path
                d="M36.379 60.915C22.5073 60.915 11.2459 49.5813 11.2459 35.6203C11.2459 21.6593 22.5073 10.3256 36.379 10.3256C44.3621 10.3256 51.4649 14.0832 56.0788 19.918L63.7887 13.1056C57.2929 5.10171 47.4279 0 36.379 0C16.8311 0 0.986298 15.9467 0.986298 35.6203C0.986298 55.294 16.8311 71.2406 36.379 71.2406C47.4279 71.2406 57.2929 66.1389 63.7887 58.135L56.0788 51.3226C51.4953 57.1575 44.3621 60.915 36.379 60.915Z"
                fill="black"
              />
            </svg>
          </IconButton>
        </LogoContainer>
        {isGtMobile && (
          <>
            <AppTitle>{appTitle}</AppTitle>
            <Hr direction="vertical" isGtTablet={isGtTablet} />
          </>
        )}
        <PageTitle isGtMobile={isGtMobile} ref={pageTitleRef}>
          {pageTitle}
        </PageTitle>
        {!isGtMobile && (
          <SquareContainer>
            <MobileMenu
              appTitle={appTitle}
              email={email}
              username={username}
              onSignOutClick={onSignOutClick}
            ></MobileMenu>
          </SquareContainer>
        )}
        {isGtMobile && (
          <DesktopMenu email={email} username={username} onSignOutClick={onSignOutClick}></DesktopMenu>
        )}
      </Header>
      {navItems && <SideNav ref={sidenavRef}></SideNav>}
      <AppContent
        ref={pageContainerElement}
        isGtMobile={isGtMobile}
        sidenavPadding={!!navItems}
        hidden={!hasAppContent}
      >
        {appContent}
      </AppContent>
    </div>
  );
};

export default Tooltip;
