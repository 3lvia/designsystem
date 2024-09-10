import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import AppBridge from './elvia-app-bridge';

describe('Elvis App Bridge', () => {
  describe('the link', () => {
    it('should render the link', async () => {
      render(<AppBridge targetId="testTarget" />);

      const user = userEvent.setup();

      const appBridge = screen.getByText('Åpne i');
      await user.click(appBridge);

      const dropsLink = screen.getByText('DROPS');

      expect(dropsLink).toBeInTheDocument();
      expect(dropsLink).toHaveAttribute('href', 'https://drops.elvia.io/meteringpoint/testTarget');
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
