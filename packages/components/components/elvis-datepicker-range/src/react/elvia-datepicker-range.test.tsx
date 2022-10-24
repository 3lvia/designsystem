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

  describe('With vertical alignment', () => {
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

  describe('passes props to both underlying date pickers', () => {
    beforeEach(() => {
      render(<DatepickerRange isDisabled isFullWidth isCompact></DatepickerRange>);
    });

    it('should have both date pickers disabled', () => {
      const datePickers = screen.getAllByTestId('input');
      expect(datePickers).toHaveLength(2);
      expect(datePickers[0]).toBeDisabled();
      expect(datePickers[1]).toBeDisabled();
    });

    it('should have both date pickers fullwidth', () => {
      const datePickers = screen.getAllByTestId('wrapper');
      datePickers.forEach((datepicker) => {
        expect(datepicker).toHaveStyle('width: 100%');
      });
    });
    it('should have both date pickers compact', () => {
      const datePickers = screen.getAllByTestId('wrapper');
      datePickers.forEach((datepicker) => {
        expect(datepicker).toHaveStyle('padding-top: 0.5rem');
      });
    });
  });
});
