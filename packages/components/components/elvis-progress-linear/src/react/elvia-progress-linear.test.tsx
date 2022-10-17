import ProgressLinear from './elvia-progress-linear';
import React from 'react';
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
});
