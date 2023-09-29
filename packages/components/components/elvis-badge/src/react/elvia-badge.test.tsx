import { Badge } from './elvia-badge';
import React from 'react';
import { axe } from 'jest-axe';
import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';
import { render, screen } from '@testing-library/react';

describe('Elvis Badge', () => {
  describe('the default background color of the badge', () => {
    beforeEach(() => {
      render(
        <Badge
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
    });

    it('is green', () => {
      const badgeCircle = screen.getByRole('status');

      expect(badgeCircle).toHaveStyle(`background-color: ${getThemeColor('background-selected-1')}`);
    });
  });

  //NUMBERED under 100
  describe('the number inside the badge circle when it is under 100', () => {
    beforeEach(() => {
      render(
        <Badge
          count={53}
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
    });

    it('should display the actual number', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveTextContent('53');
    });

    it('should have normal padding', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveStyle(`padding: 4px 0px`);
    });

    it('should have a fixed width to stay round', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveStyle(`width: 16px`);
    });
  });

  //NUMBERED over 100
  describe('the number inside the badge circle when it is over 100', () => {
    beforeEach(() => {
      render(
        <Badge
          count={101}
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
    });

    it('should display "99+"', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveTextContent('99+');
    });

    it('have some extra padding', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveStyle(`padding: 4px`);
    });

    it('should not have a fixed width', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveStyle(`width: unset`);
    });
  });

  //NUMBERED with red color
  describe('the text color when the badge is red', () => {
    beforeEach(() => {
      render(
        <Badge
          count={101}
          badgeColor="red"
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
    });

    it('should have a red contrast text color', () => {
      const badgeCircle = screen.getByRole('status');
      expect(badgeCircle).toHaveStyle(`color: ${getThemeColorContrast('signal-danger')}`);
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="badge">
          <Badge
            count={101}
            badgeColor="red"
            content={
              <span>
                <i className="e-icon e-icon--upload" aria-hidden="true"></i>
              </span>
            }
          />
        </div>,
      );

      const badge = screen.getByTestId('badge');
      const results = await axe(badge);

      expect(results).toHaveNoViolations();
    });
  });
});
