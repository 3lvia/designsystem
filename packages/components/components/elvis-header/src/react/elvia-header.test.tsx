import '@testing-library/jest-dom';
import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import Header from './elvia-header';
import { Icon } from '@elvia/elvis-icon/react';

const mockMatchMedia = (opts?: Partial<{ isGtMobile: boolean }>) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: opts?.isGtMobile,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Elvia Header', () => {
  const appTitle = 'My app';
  const pageTitle = 'My page';
  const username = 'Karine Svendsen';
  const email = 'e12345@elvia.no';
  let logoHasBeenClicked = false;
  let signOutButtonHasBeenClicked = false;

  describe('on desktop', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: true });
      render(
        <Header
          username={username}
          email={email}
          appTitle={appTitle}
          pageTitle={pageTitle}
          appContent={<div data-testid="main-content">Main content</div>}
          onLogoClick={() => (logoHasBeenClicked = true)}
          onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
          navItems={
            <div className="e-sidenav__container">
              <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                <div className="e-sidenav__icon-container">
                  <Icon name="dashboard" size="sm"></Icon>
                </div>
                <div className="e-sidenav__item-text">Dashbord</div>
              </a>
            </div>
          }
        />,
      );
    });

    test('should show a logo', async () => {
      const element = await screen.findByTestId('header-logo');
      expect(element.querySelector('svg')).not.toBeEmptyDOMElement();
    });

    test('should show the app title', async () => {
      const element = await screen.findByTestId('app-title');
      expect(element).toHaveTextContent(appTitle);
    });

    test('should show the page title', async () => {
      const element = await screen.findByTestId('page-title');
      expect(element).toHaveTextContent(pageTitle);
    });

    test('should show the name of the current user', async () => {
      const element = await screen.findByTestId('desktop-menu-trigger');
      expect(element).toHaveTextContent(username);
    });

    test('should show the sidenav items', async () => {
      const sidenav = await screen.findByTestId('sidenav');
      expect(sidenav.querySelectorAll('a').length).toBe(1);
    });

    test('should have a width toggle in the side nav', async () => {
      const element = await screen.findByTestId('sidenav-width-toggle');
      expect(element).not.toBeEmptyDOMElement();
    });

    test('should not have a visible user menu initially', () => {
      const element = screen.queryAllByTestId('desktop-menu');
      expect(element.length).toBe(0);
    });

    describe('when the logo is clicked', () => {
      beforeEach(async () => {
        const element = await screen.findByTestId('header-logo');
        fireEvent.click(element);
      });

      test('the logo click event is fired', () => {
        expect(logoHasBeenClicked).toBe(true);
      });
    });

    describe('when the sidenav width toggle is clicked', () => {
      let classList = '';

      beforeEach(async () => {
        const sidenav = await screen.findByTestId('sidenav');
        classList = sidenav.classList.toString();

        const element = await screen.findByTestId('sidenav-width-toggle');
        fireEvent.click(element);
      });

      test('the class list for the sidenav changes', async () => {
        const sidenav = await screen.findByTestId('sidenav');
        expect(sidenav.classList.toString()).not.toBe(classList);
      });
    });

    describe('when the menu trigger is pressed', () => {
      beforeEach(async () => {
        const element = await screen.findByTestId('desktop-menu-trigger');
        fireEvent.click(element);
      });

      test('the user menu opens', async () => {
        const element = await screen.findByTestId('desktop-menu');
        expect(element).not.toBeEmptyDOMElement();
      });

      test('the name of the user is displayed', async () => {
        const element = await screen.findByTestId('desktop-username');
        expect(element).toHaveTextContent(username);
      });

      test('the email of the user is displayed', async () => {
        const element = await screen.findByTestId('desktop-email');
        expect(element).not.toBeEmptyDOMElement();
      });

      describe('and the sign out button is clicked', () => {
        beforeEach(async () => {
          const element = await screen.findByTestId('desktop-sign-out-trigger');
          fireEvent.click(element);
        });

        test('the sign out event is triggered', () => {
          expect(signOutButtonHasBeenClicked).toBe(true);
        });
      });
    });
  });

  describe('on mobile', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: false });
      render(
        <Header
          username={username}
          email={email}
          appTitle={appTitle}
          pageTitle={pageTitle}
          appContent={<div data-testid="main-content">Main content</div>}
          onLogoClick={() => (logoHasBeenClicked = true)}
          onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
          navItems={
            <div className="e-sidenav__container">
              <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                <div className="e-sidenav__icon-container">
                  <Icon name="dashboard" size="sm"></Icon>
                </div>
                <div className="e-sidenav__item-text">Dashbord</div>
              </a>
            </div>
          }
        />,
      );
    });

    test('the app title is not visible', () => {
      const element = screen.queryAllByTestId('app-title');
      expect(element.length).toBe(0);
    });

    test('the header has a mobile menu', async () => {
      const element = await screen.findByTestId('mobile-menu-trigger');
      expect(element).not.toBeEmptyDOMElement();
    });

    test('the mobile menu is not yet visible', () => {
      const element = screen.queryAllByTestId('mobile-menu');
      expect(element.length).toBe(0);
    });

    describe('when the mobile menu trigger is clicked', () => {
      beforeEach(async () => {
        const element = await screen.findByTestId('mobile-menu-trigger');
        fireEvent.click(element);
      });

      test('the mobile menu opens', async () => {
        const element = await screen.findByTestId('mobile-menu');
        expect(element).not.toBeEmptyDOMElement();
      });
    });
  });
});
