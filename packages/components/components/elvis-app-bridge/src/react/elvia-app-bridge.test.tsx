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

  describe('in the dev environment', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { href: 'https://drops.dev-elvia.io/' },
      });
      render(<AppBridge targetId="testTarget" />);
    });

    it('should send Elvia apps links to the dev environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const louvreLink = screen.getByText('Louvre');
      expect(louvreLink).toHaveAttribute('href', expect.stringContaining('louvre.dev-elvia.io'));
    });

    // Not a bug, it does not have dev
    it('should send Salesforce to the test environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const sfLink = screen.getByText('Salesforce');
      expect(sfLink).toHaveAttribute(
        'href',
        expect.stringContaining('elvia--test.sandbox.lightning.force.com'),
      );
    });

    // Not a bug, it does not have dev
    it('should send IFS to the test environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const ifsLink = screen.getByText('IFS');
      expect(ifsLink).toHaveAttribute('href', expect.stringContaining('elvia-uat.ifs.cloud/b2b/'));
    });
  });

  describe('in the test environment', () => {
    beforeEach(() => {
      Object.defineProperty(window, 'location', {
        value: { href: 'https://drops.test-elvia.io/' },
      });
      render(<AppBridge targetId="testTarget" />);
    });

    it('should send Elvia apps links to the test environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const louvreLink = screen.getByText('Louvre');
      expect(louvreLink).toHaveAttribute('href', expect.stringContaining('louvre.test-elvia.io'));
    });

    it('should send Salesforce to the test environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const sfLink = screen.getByText('Salesforce');
      expect(sfLink).toHaveAttribute(
        'href',
        expect.stringContaining('elvia--test.sandbox.lightning.force.com'),
      );
    });

    it('should send IFS to the test environment', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByText('Åpne i'));

      const ifsLink = screen.getByText('IFS');
      expect(ifsLink).toHaveAttribute('href', expect.stringContaining('elvia-uat.ifs.cloud/b2b/'));
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
