import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { DatepickerRange } from './elvia-datepicker-range';

describe('Elvis DatepickerRange', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<DatepickerRange />);
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
      render(<DatepickerRange isVertical />);
    });

    it('should have vertical stacking', () => {
      const datepickerRangeWrapper = screen.getByTestId('datepicker-range-wrapper');
      expect(datepickerRangeWrapper).toHaveStyle('flex-direction: column');
    });
  });

  describe('min/max date constraints', () => {
    it('should not allow selecting dates outside min/max range', async () => {
      const user = userEvent.setup();

      render(<DatepickerRange minDate={new Date('2022-10-21')} maxDate={new Date('2024-04-19')} />);

      const startDate = screen.getByRole('textbox', { name: /fra dato/i });
      await user.type(startDate, '10.11.2017');
      await user.tab();
      await user.tab();

      const errors = screen.getAllByTestId('error');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toHaveTextContent(/tidligste dato er 21.10.2022/i);
    });
  });

  describe('with time picker', () => {
    beforeEach(() => {
      render(<DatepickerRange hasTimepickers />);
    });

    it('should display a start- and end-time picker', () => {
      expect(screen.getAllByPlaceholderText('tt:mm').length).toBe(2);
    });
  });

  describe('with errorOptions', () => {
    it('should display custom error messages for both datepickers', async () => {
      const errorOptions = {
        start: { text: 'Start error' },
        end: { text: 'End error' },
      };

      render(<DatepickerRange errorOptions={errorOptions} />);

      const errors = screen.getAllByTestId('error');
      expect(errors).toHaveLength(2);
      expect(errors[0]).toHaveTextContent('Start error');
      expect(errors[1]).toHaveTextContent('End error');
    });

    it('should not show internal errors if the errorOptions are set', async () => {
      const errorOptions = {
        start: { text: 'Start error' },
        end: { text: 'End error' },
      };

      const user = userEvent.setup();
      render(<DatepickerRange errorOptions={errorOptions} />);

      const startDate = screen.getByRole('textbox', { name: /fra dato/i });
      await user.click(startDate);
      await user.type(startDate, '11.11.1111'); // invalid date
      await user.tab();
      await user.tab();

      const errors = screen.getAllByTestId('error');
      expect(errors).toHaveLength(2);
      expect(errors[0]).toHaveTextContent('Start error');
      expect(errors[1]).toHaveTextContent('End error');
    });

    it('should show default required error message when no errorOptions', async () => {
      const user = userEvent.setup();

      render(<DatepickerRange isRequired />);

      const startDate = screen.getByRole('textbox', { name: /fra dato/i });
      await user.click(startDate);
      await user.type(startDate, ' ');
      await user.tab();
      await user.tab();

      const errors = screen.getAllByTestId('error');
      expect(errors).toHaveLength(1);
      expect(errors[0]).toHaveTextContent(/velg dato/i);
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<DatepickerRange className="testclass" inlineStyle={{ paddingTop: '24px' }} />);
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
      render(<DatepickerRange isDisabled isFullWidth />);
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
  });

  describe('Events', () => {
    const errorOnChangeEvent = jest.fn();
    const valueOnChangeEvent = jest.fn();
    const valueOnChangeISOStringEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <DatepickerRange
          errorOnChange={errorOnChangeEvent}
          minDate={new Date('08/11/2022')}
          valueOnChange={valueOnChangeEvent}
          valueOnChangeISOString={valueOnChangeISOStringEvent}
        />,
      );
    });

    it('should not emit any events when idle', async () => {
      await waitFor(() => expect(errorOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeISOStringEvent).not.toHaveBeenCalled());
    });

    it('valueOnChangeEvent / valueOnChangeISOStringEvent: should emit when a date is selected', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('textbox', { name: /fra dato/i });
      await user.click(input);
      await user.type(input, '11.08.2022');
      // Tab twice to get outside the whole datepicker (input field and overlay trigger)
      await user.tab();
      await user.tab();

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(valueOnChangeISOStringEvent).toHaveBeenCalledTimes(1));

      await waitFor(() =>
        expect(valueOnChangeEvent).toHaveBeenCalledWith({ start: new Date('08/11/2022'), end: null }),
      );
      await waitFor(() =>
        expect(valueOnChangeISOStringEvent).toHaveBeenCalledWith({
          start: '2022-08-11',
          end: null,
        }),
      );
    });

    it('errorOnChangeEvent: should emit when an error is shown', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('textbox', { name: /fra dato/i });
      await user.click(input);
      await user.type(input, '26.03.2000');
      // Tab twice to get outside the whole datepicker (input field and overlay trigger)
      await user.tab();
      await user.tab();

      await waitFor(() => expect(errorOnChangeEvent).toHaveBeenCalledTimes(1));
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
