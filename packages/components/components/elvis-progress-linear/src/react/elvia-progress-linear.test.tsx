import React from 'react';
import ProgressLinear from './elvia-progress-linear';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

describe('Elvis Progress Linear', () => {
  describe('Value = 48', () => {
    beforeEach(() => {
      render(<ProgressLinear value={48}></ProgressLinear>);
    });

    it('should have value 48', () => {
      const progressLinearProgress = screen.getByTestId('progress-linear-progress');
      expect(progressLinearProgress).toHaveStyle('width: 48%');
    });
  });

  describe('Indeterminate', () => {
    beforeEach(() => {
      render(<ProgressLinear isIndeterminate></ProgressLinear>);
    });

    it('should have color green', () => {
      const progressLinearProgress = screen.getByTestId('progress-linear-progress');
      expect(progressLinearProgress).toHaveStyle('background-color: #29d305');
    });
  });

  describe('Error', () => {
    beforeEach(() => {
      render(<ProgressLinear isError></ProgressLinear>);
    });

    it('should have color red', () => {
      const progressLinearProgress = screen.getByTestId('progress-linear-progress');
      expect(progressLinearProgress).toHaveStyle('background-color: #ee0701');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <ProgressLinear value={48} className="test-class" inlineStyle={{ margin: '24px' }}></ProgressLinear>,
      );
    });

    it('should have className and inlineStyle', () => {
      const progressWrapper = screen.getByTestId('progress-wrapper');
      expect(progressWrapper).toHaveStyle('margin: 24px');
      expect(progressWrapper).toHaveClass('test-class');
    });
  });

  //Skipped. see https://elvia.atlassian.net/browse/LEGO-2151?atlOrigin=eyJpIjoiZTI4MDEzYzJkYTBkNDczZGJiMDZhZTA3ZmM3ZDk5MGMiLCJwIjoiaiJ9
  describe.skip('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="progress-linears-wrapper">
          <ProgressLinear value={48} />
        </div>,
      );

      const progressLinears = screen.getByTestId('progress-linears-wrapper');
      const results = await axe(progressLinears);

      expect(results).toHaveNoViolations();
    });
  });
});
