import React from 'react';
import DatepickerRange from './elvia-datepicker-range';
import { axe } from 'jest-axe';
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

  describe('with vertical alignment', () => {
    beforeEach(() => {
      render(<DatepickerRange isVertical></DatepickerRange>);
    });

    it('should have vertical stacking', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveStyle('flex-direction: column');
    });
  });

  describe('with time picker', () => {
    beforeEach(() => {
      render(<DatepickerRange hasTimepickers></DatepickerRange>);
    });

    it('should display a start- and end-time picker', () => {
      expect(screen.getAllByPlaceholderText('tt:mm').length).toBe(2);
    });
  });

  describe('with time picker + errorOptions', () => {
    beforeEach(() => {
      render(
        <DatepickerRange
          hasTimepickers
          errorOptions={{
            start: {
              text: 'error start',
              isErrorState: true,
            },
            end: {
              text: 'error end',
              isErrorState: true,
            },
          }}
        />,
      );
    });

    it('the date pickers _and_ time pickers should all become invalid', () => {
      const pickers = screen.getAllByRole('textbox');
      pickers.forEach((picker) => {
        expect(picker).toHaveAttribute('aria-invalid', 'true');
      });
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
      render(<DatepickerRange isDisabled isFullWidth size="small"></DatepickerRange>);
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

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="datepicker-ranges">
          <DatepickerRange />
          <DatepickerRange />
        </div>,
      );

      const datepickerRanges = screen.getByTestId('datepicker-ranges');
      const results = await axe(datepickerRanges);

      expect(results).toHaveNoViolations();
    });
  });
});
