import Badge from './elvia-badge';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  elviaRed: getColor('red'),
  elviaWhite: getColor('white'),
};

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
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveStyle(`background-color: ${colors.elviaCharge}`);
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
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveTextContent('53');
    });

    it('should have normal padding', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveStyle(`padding: 2px 0px`);
    });

    it('should have a fixed width to stay round', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
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
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveTextContent('99+');
    });

    it('have some extra padding', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveStyle(`padding: 2px 4px`);
    });

    it('should not have a fixed width', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
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

    it('should have a red background color', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveStyle(`background-color: ${colors.elviaRed}`);
    });

    it('should have a white text color', () => {
      const badgeCircle = screen.getByTestId('badge-circle');
      expect(badgeCircle).toHaveStyle(`color: ${colors.elviaWhite}`);
    });
  });
});
