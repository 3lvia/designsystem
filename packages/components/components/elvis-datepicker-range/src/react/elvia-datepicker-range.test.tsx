import DatepickerRange from './elvia-datepicker-range';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Elvis DatepickerRange', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<DatepickerRange></DatepickerRange>);
    });

    it('should have two children', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper.children.length).toBe(2);
    });

    it('should have horizontal stacking', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveStyle('flex-direction: row');
    });
  });

  describe('', () => {
    beforeEach(() => {
      render(<DatepickerRange isVertical></DatepickerRange>);
    });

    it('should have vertical stacking', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveStyle('flex-direction: column');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<DatepickerRange className="testclass" inlineStyle={{ paddingTop: '24px' }}></DatepickerRange>);
    });

    it('should have classname', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveClass('testclass');
    });

    it('should have inlineStyle', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveStyle('padding-top: 24px;');
    });
  });

  describe('passes props to both underlying datepickers', () => {
    beforeEach(() => {
      render(<DatepickerRange isDisabled isFullWidth isCompact></DatepickerRange>);
    });

    it('should have both datepickers disabled', () => {
      const datepickers = document.querySelectorAll(
        '.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd',
      );
      expect(datepickers[0]).toHaveClass('Mui-disabled');
      expect(datepickers[1]).toHaveClass('Mui-disabled');
    });

    it('should have both datepickers fullwidth', () => {
      const fullWidthElements = document.querySelectorAll('.ewc-datepicker--full-width');
      expect(fullWidthElements.length).toBe(2);
    });
    it('should have both datepickers compact', () => {
      const compactElements = document.querySelectorAll('.ewc-datepicker--compact');
      expect(compactElements.length).toBe(2);
    });
  });
});
