import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import AppBridge from './elvia-app-bridge';

describe('Elvis App Bridge', () => {
  describe('default', () => {
    beforeEach(() => {
      render(<AppBridge targetId="testTarget" />);
    });
    it('should render the link', async () => {
      const user = userEvent.setup();

      const appBridge = screen.getByText('Åpne i');
      await user.click(appBridge);

      const dropsLink = screen.getByText('DROPS');

      expect(dropsLink).toBeInTheDocument();
      expect(dropsLink).toHaveAttribute('href', 'https://drops.elvia.io/meteringpoint/testTarget');
    });

    it('should hide the link for the current page', async () => {
      Object.defineProperty(window, 'location', {
        value: {
          href: 'https://drops.elvia.io/',
        },
      });
      const user = userEvent.setup();

      const appBridge = screen.getByText('Åpne i');
      await user.click(appBridge);

      const dropsLink = screen.queryByText('DROPS');
      expect(dropsLink).not.toBeInTheDocument();
    });
  });

  describe('with active apps', () => {
    beforeEach(() => {
      render(<AppBridge targetId="testTarget" activeApps={['msim', 'mdmx']} />);
    });
    it('should only render the active apps', async () => {
      const user = userEvent.setup();

      const appBridge = screen.getByText('Åpne i');
      await user.click(appBridge);

      const allLinks = screen.getAllByRole('link');
      expect(allLinks).toHaveLength(2);

      const mdmxLink = screen.getByText('MDMx');
      expect(mdmxLink).toBeInTheDocument();

      const msimLink = screen.getByText('MSIm');
      expect(msimLink).toBeInTheDocument();
    });
  });

  describe('the accessability', () => {
    beforeEach(() => {
      render(<AppBridge targetId="testTarget" />);
    });

    it('should have no axe violations', async () => {
      const appBridge = screen.getByText('Åpne i');
      const results = await axe(appBridge);
      expect(results).toHaveNoViolations();
    });
  });
});
