import React from 'react';
import '@testing-library/jest-dom';
import Header from './elvia-header';
import dashboard from '@elvia/elvis-assets-icons/dist/icons/dashboard';
import userEvent from '@testing-library/user-event';
import { IconWrapper } from '@elvia/elvis-toolbox';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';
import { axe } from 'jest-axe';
import { render, screen, within } from '@testing-library/react';

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
  let user: UserEvent;

  describe('on desktop', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: true });
      user = userEvent.setup();
      render(
        <Header
          username={username}
          email={email}
          appTitle={appTitle}
          pageTitle={pageTitle}
          appContent={<div>Main content</div>}
          onLogoClick={() => (logoHasBeenClicked = true)}
          onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
          navItems={
            <div className="e-sidenav__container">
              <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                <div className="e-sidenav__icon-container">
                  <IconWrapper icon={dashboard} size="sm"></IconWrapper>
                </div>
                <div className="e-sidenav__item-text">Dashbord</div>
              </a>
            </div>
          }
        />,
      );
    });

    test('should show the app title', () => {
      const element = screen.getByText(appTitle);
      expect(element).toBeInTheDocument();
    });

    test('should show the page title', () => {
      const element = screen.getByRole('heading', { name: pageTitle });
      expect(element).toHaveTextContent(pageTitle);
    });

    test('should show the name of the current user', () => {
      const element = screen.getByRole('button', { name: /^åpne brukermeny$/i });
      expect(element).toHaveTextContent(username);
    });

    test('should show the sidenav items', () => {
      const sidenav = screen.getByRole('navigation');
      expect(sidenav.querySelectorAll('a').length).toBe(1);
    });

    test('should have a width toggle in the side nav', () => {
      const element = screen.getByRole('button', { name: /^maksimer$/i });

      expect(element).not.toBeEmptyDOMElement();
    });

    test('should not have a visible user menu initially', () => {
      const element = screen.queryByRole('menu');
      expect(element).not.toBeInTheDocument();
    });

    describe('when the logo is clicked', () => {
      beforeEach(async () => {
        const element = screen.getByRole('button', { name: /^logo$/i });
        await user.click(element);
      });

      test('the logo click event is fired', () => {
        expect(logoHasBeenClicked).toBe(true);
      });
    });

    describe('when the sidenav width toggle is clicked', () => {
      let classList = '';

      beforeEach(async () => {
        const sidenav = screen.getByRole('navigation');
        classList = sidenav.classList.toString();
        const element = screen.getByRole('button', { name: /^maksimer$/i });

        await user.click(element);
      });

      test('the class list for the sidenav changes', () => {
        const sidenav = screen.getByRole('navigation');
        expect(sidenav.classList.toString()).not.toBe(classList);
      });
    });

    describe('when the menu trigger is pressed', () => {
      beforeEach(async () => {
        const element = await screen.getByRole('button', { name: /^åpne brukermeny$/i });
        await user.click(element);
      });

      test('the user menu opens', () => {
        const element = screen.getByRole('menu');
        expect(element).toBeVisible();
      });

      test('the name of the user is displayed', () => {
        const menu = screen.getByRole('menu');
        const element = within(menu).getByText(username);
        expect(element).toBeVisible();
      });

      test('the email of the user is displayed', () => {
        const menu = screen.getByRole('menu');
        const element = within(menu).getByText(email);
        expect(element).toBeVisible();
      });

      describe('and the sign out button is clicked', () => {
        beforeEach(async () => {
          const menu = screen.getByRole('menu');
          const element = within(menu).getByRole('button', { name: /^logg ut$/i });
          await user.click(element);
        });

        test('the sign out event is triggered', () => {
          expect(signOutButtonHasBeenClicked).toBe(true);
        });
      });
    });
  });

  describe('on mobile', () => {
    beforeEach(() => {
      user = userEvent.setup();
      mockMatchMedia({ isGtMobile: false });
      render(
        <Header
          username={username}
          email={email}
          appTitle={appTitle}
          pageTitle={pageTitle}
          appContent={<div>Main content</div>}
          onLogoClick={() => (logoHasBeenClicked = true)}
          onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
          navItems={
            <div className="e-sidenav__container">
              <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                <div className="e-sidenav__icon-container">
                  <IconWrapper icon={dashboard} size="sm"></IconWrapper>
                </div>
                <div className="e-sidenav__item-text">Dashbord</div>
              </a>
            </div>
          }
        />,
      );
    });

    test('the app title is not visible', () => {
      const element = screen.queryByText(appTitle);
      expect(element).not.toBeInTheDocument();
    });

    test('the header has a mobile menu', () => {
      const element = screen.getByRole('button', { name: /^åpne brukermeny$/i });
      expect(element).not.toBeEmptyDOMElement();
    });

    test('the mobile menu is not yet visible', () => {
      const element = screen.queryByRole('menu');
      expect(element).not.toBeInTheDocument();
    });

    describe('when the mobile menu trigger is clicked', () => {
      beforeEach(async () => {
        const element = screen.getByRole('button', { name: /^åpne brukermeny$/i });
        await user.click(element);
      });

      test('the mobile menu opens', () => {
        const element = screen.getByRole('menu');
        expect(element).not.toBeEmptyDOMElement();
      });

      test('the mobile menu displays a log out button', () => {
        const element = screen.getByRole('button', { name: /^logg ut$/i });
        expect(element).toBeInTheDocument();
      });

      test('the mobile menu displays the users username', () => {
        const element = screen.getByText(username);
        expect(element).toBeVisible();
      });

      test('the mobile menu displays the users email', () => {
        const element = screen.getByText(email);
        expect(element).toBeVisible();
      });
    });
  });

  describe('the accessibility (desktop)', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="header-wrapper">
          <Header
            username={username}
            email={email}
            appTitle={appTitle}
            pageTitle={pageTitle}
            appContent={<div>Main content</div>}
            onLogoClick={() => (logoHasBeenClicked = true)}
            onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
            navItems={
              <div className="e-sidenav__container">
                <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                  <div className="e-sidenav__icon-container">
                    <IconWrapper icon={dashboard} size="sm"></IconWrapper>
                  </div>
                  <div className="e-sidenav__item-text">Dashbord</div>
                </a>
              </div>
            }
          />
        </div>,
      );

      const header = screen.getByTestId('header-wrapper');
      const results = await axe(header);

      expect(results).toHaveNoViolations();
    });
  });

  describe('the accessibility (mobile)', () => {
    it('should have no axe violations', async () => {
      mockMatchMedia({ isGtMobile: false });
      render(
        <div data-testid="header-wrapper">
          <Header
            username={username}
            email={email}
            appTitle={appTitle}
            pageTitle={pageTitle}
            appContent={<div>Main content</div>}
            onLogoClick={() => (logoHasBeenClicked = true)}
            onSignOutClick={() => (signOutButtonHasBeenClicked = true)}
            navItems={
              <div className="e-sidenav__container">
                <a href="/" className="e-sidenav__item e-sidenav__item--active" aria-label="Dashbord">
                  <div className="e-sidenav__icon-container">
                    <IconWrapper icon={dashboard} size="sm"></IconWrapper>
                  </div>
                  <div className="e-sidenav__item-text">Dashbord</div>
                </a>
              </div>
            }
          />
        </div>,
      );

      const header = screen.getByTestId('header-wrapper');
      const results = await axe(header);

      expect(results).toHaveNoViolations();
    });
  });
});
