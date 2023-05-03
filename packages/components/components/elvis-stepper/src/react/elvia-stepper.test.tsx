import Stepper from './elvia-chip';
import React from 'react';
// import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

describe('Elvis Stepper', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Stepper value="chip value"></Stepper>);
    });

    it('should have label "chip value"', () => {
      const chipLabel = screen.getByTestId('chip-label');
      expect(chipLabel).toHaveTextContent('chip value');
    });
  });
});
