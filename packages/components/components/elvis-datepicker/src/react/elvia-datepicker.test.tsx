import { getThemeColor } from '@elvia/elvis-colors';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { dateIsWithinMinMaxBoundary, isAfter, isBefore, isValidDate, localISOTime } from './dateHelpers';
import { Datepicker } from './elvia-datepicker';

describe('Elvis Datepicker', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Datepicker />);
    });

    it('should have default label = Velg dato', () => {
      const datepickerLabel = screen.getByTestId('label');
      expect(datepickerLabel).toHaveTextContent(/^Velg dato$/);
    });

    it('should not have date selected when untouched', () => {
      expect(screen.getByTestId('input')).toHaveProperty('value', '');
    });

    it('should have date selected when button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).not.toHaveProperty('value', '');
    });
  });

  describe('Value = custom', () => {
    beforeEach(() => {
      const oddDateFilter = (d: Date) => d.getDate() % 2 !== 0;
      render(<Datepicker value={new Date('2024/04/02')} disableDate={oddDateFilter} />);
    });

    it('should have value = 02.04.2024', () => {
      expect(screen.getByTestId('input')).toHaveProperty('value', '02.04.2024');
    });

    it('should show month name in calendar', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());

      expect(screen.getByTestId('month-name')).toHaveTextContent(/^april 2024$/);
    });

    it('should be able to view next month', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      await user.click(screen.getByTestId('next-month-btn'));

      expect(screen.getByTestId('month-name')).toHaveTextContent(/^mai 2024$/);
    });

    it('should be able to select month from the calendar', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      await user.click(screen.getByText('30'));

      expect(screen.getByTestId('input')).toHaveProperty('value', '30.04.2024');
    });

    it('should be able to select odd months due to the disabled date prop', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      await user.click(screen.getByText('29'));

      expect(screen.getByTestId('input')).toHaveProperty('value', '02.04.2024');
    });

    it('should be able to switch year from the year toggle', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      await user.click(screen.getByTestId('year-view-toggle'));
      await user.click(screen.getByText('2025'));

      expect(screen.queryByTestId('month-name')).toHaveTextContent(/^april 2025$/);
    });
  });

  describe('Label = Custom label', () => {
    beforeEach(() => {
      render(<Datepicker label="Custom label" />);
    });

    it('should have label = Custom label', () => {
      expect(screen.getByTestId('label')).toHaveTextContent(/^Custom label$/);
    });
  });

  describe('Full width', () => {
    beforeEach(() => {
      render(<Datepicker isFullWidth />);
    });

    it('should have full width class', () => {
      const datepickerWrapper = screen.getByTestId('wrapper');
      expect(datepickerWrapper).toHaveStyle('width: 100%');
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Datepicker isDisabled />);
    });

    it('should have a disabled input', () => {
      expect(screen.getByTestId('input')).toBeDisabled();
    });

    it('should not possible to open by clicking the toggle', () => {
      expect(screen.getByTestId('popover-toggle')).toBeDisabled();
    });
  });

  describe('Required', () => {
    beforeEach(() => {
      render(<Datepicker isRequired />);
    });

    it('should not have error when untouched', () => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveProperty('value', '');
    });

    it('should have an error when clicked and blurred ', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('input'));
      // Tab twice to get outside the whole datepicker (input field and overlay trigger)
      await user.tab();
      await user.tab();

      expect(screen.getByTestId('error')).toHaveTextContent(/^Velg dato$/);
    });
  });

  describe('Custom error = Feil', () => {
    beforeEach(() => {
      render(<Datepicker errorOptions={{ text: 'Feil' }} />);
    });

    it('should have error style', () => {
      const datepickerWrapper = screen.getByTestId('input-container');
      expect(datepickerWrapper).toHaveStyle(`border-color: ${getThemeColor('signal-danger')}`);
    });

    it('should have custom error in DOM', () => {
      expect(screen.getByTestId('error')).toHaveTextContent(/^Feil$/);
    });
  });

  describe('Min date', () => {
    beforeEach(() => {
      // A high min date, to ensure that the test doesn't break for a long time
      render(<Datepicker minDate={new Date('2077/05/01')} />);
    });

    it('should pick minimum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).toHaveProperty('value', '01.05.2077');
    });

    it('should view the selected month in the calendar', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      expect(screen.getByTestId('month-name')).toHaveTextContent(/^mai 2077$/);
    });

    it('should show an error if a date before the min date is typed into the input', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByTestId('input'), '01.05.2076');
      await user.tab();
      await user.tab();

      expect(screen.queryByTestId('error')).toHaveTextContent(/^Tidligste dato er 01.05.2077$/);
    });
  });

  describe('Max date', () => {
    beforeEach(() => {
      render(<Datepicker maxDate={new Date('2022/05/01')} />);
    });

    it('should pick maximum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).toHaveProperty('value', '01.05.2022');
    });

    it('should show an error if a date after the max date is typed into the input', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByTestId('input'), '01.05.2023');
      // Tab twice to get outside the whole datepicker (input field and overlay trigger)
      await user.tab();
      await user.tab();

      expect(screen.queryByTestId('error')).toHaveTextContent(/^Seneste dato er 01.05.2022$/);
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Datepicker className="test-class" inlineStyle={{ margin: '24px' }} />);
    });

    it('should have className', () => {
      const datepickerWrapper = screen.getByTestId('wrapper');
      expect(datepickerWrapper).toHaveClass('test-class');
    });

    it('should have inlineStyle', () => {
      const datepickerWrapper = screen.getByTestId('wrapper');
      expect(datepickerWrapper).toHaveStyle('margin: 24px');
    });
  });

  describe('Error state from prop', () => {
    beforeEach(() => {
      render(<Datepicker errorOptions={{ isErrorState: true }} />);
    });

    it('should have error state', () => {
      const datepickerWrapper = screen.getByTestId('input-container');
      expect(datepickerWrapper).toHaveStyle(`border-color: ${getThemeColor('signal-danger')}`);
    });
  });

  describe('Events', () => {
    const onCloseEvent = jest.fn();
    const onOpenEvent = jest.fn();
    const onResetEvent = jest.fn();
    const valueOnChangeEvent = jest.fn();
    const valueOnChangeISOStringEvent = jest.fn();
    const onFocusEvent = jest.fn();
    const errorOnChangeEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <Datepicker
          errorOnChange={errorOnChangeEvent}
          hasSelectDateOnOpen={false}
          minDate={new Date('08/11/2022')}
          value={new Date('10/11/2022')}
          onClose={onCloseEvent}
          onFocus={onFocusEvent}
          onOpen={onOpenEvent}
          onReset={onResetEvent}
          valueOnChange={valueOnChangeEvent}
          valueOnChangeISOString={valueOnChangeISOStringEvent}
        />,
      );
    });

    it('should not emit any events when idle', async () => {
      await waitFor(() => expect(errorOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onFocusEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onOpenEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onResetEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeISOStringEvent).not.toHaveBeenCalled());
    });

    it('onOpenEvent: should emit onOpen when the trigger is clicked', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /åpne datovelger/i });
      await user.click(trigger);

      await waitFor(() => expect(onOpenEvent).toHaveBeenCalledTimes(1));
    });

    it('onCloseEvent: should emit onClose when the popover closes', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /åpne datovelger/i });
      await user.click(trigger);
      await user.keyboard('[Escape]');

      await waitFor(() => expect(onCloseEvent).toHaveBeenCalledTimes(1));
    });

    it('onFocusEvent: should emit onFocus when the input is focused', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('textbox', { name: /velg dato/i });
      await user.click(input);

      await waitFor(() => expect(onFocusEvent).toHaveBeenCalledTimes(1));
    });

    it('onResetEvent: should emit onReset when the reset button is clicked', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /åpne datovelger/i });
      await user.click(trigger);
      const resetButton = screen.getByRole('button', { name: /nullstill/i });
      await user.click(resetButton);

      await waitFor(() => expect(onResetEvent).toHaveBeenCalledTimes(1));
    });

    it('valueOnChangeEvent / valueOnChangeISOStringEvent: should emit when a date is selected', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /åpne datovelger/i });
      await user.click(trigger);
      const dateButton = screen.getByRole('button', { name: /15/i });
      await user.click(dateButton);

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(valueOnChangeISOStringEvent).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledWith(new Date('10/15/2022')));
      await waitFor(() => expect(valueOnChangeISOStringEvent).toHaveBeenCalledWith('2022-10-15'));
    });

    it('errorOnChangeEvent: should emit when an error is shown', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('textbox', { name: /velg dato/i });
      await user.click(input);
      await user.clear(input);
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
        <div data-testid="dateppickers-wrapper">
          <Datepicker />
          <Datepicker value={new Date('2024/04/02')} />
        </div>,
      );

      const user = userEvent.setup();

      //open the second datepicker to see if the popover has a11y violations
      await user.click(screen.getAllByTestId('popover-toggle')[1]);

      const datepickers = screen.getByTestId('dateppickers-wrapper');
      const results = await axe(datepickers);

      expect(results).toHaveNoViolations();
    });
  });

  describe('dateHelpers.ts', () => {
    const earlyDate = new Date(2020, 1, 1, 0, 0, 0, 0);
    const middleDate = new Date(2021, 1, 1, 0, 0, 0, 0);
    const lateDate = new Date(2022, 2, 2, 0, 0, 0, 0);

    it('should give isBefore and isAfter', () => {
      const before = isBefore(earlyDate, lateDate);
      const notBefore = isBefore(lateDate, earlyDate);
      const after = isAfter(lateDate, earlyDate);
      const notAfter = isAfter(earlyDate, lateDate);

      expect(before).toBeTruthy();
      expect(notBefore).not.toBeTruthy();
      expect(after).toBeTruthy();
      expect(notAfter).not.toBeTruthy();
    });
    it('should give isBefore and isAfter false when min/max date dont exist', () => {
      const before = isBefore(earlyDate);
      const after = isAfter(lateDate);

      expect(before).toBeFalsy();
      expect(after).toBeFalsy();
    });
    it('should check if date is in min/max-boundary', () => {
      const isBetween = dateIsWithinMinMaxBoundary(middleDate, earlyDate, lateDate);
      const isNotBetween = dateIsWithinMinMaxBoundary(earlyDate, middleDate, lateDate);

      expect(isBetween).toBeTruthy();
      expect(isNotBetween).not.toBeTruthy();
    });
    it('should check if date is valid', () => {
      const isDate = isValidDate(earlyDate);
      const isString = isValidDate('abc');
      const isBoolean = isValidDate(true);
      const isNumber = isValidDate(123);
      const isObject = isValidDate({});

      expect(isDate).toBeTruthy();
      expect(isString).not.toBeTruthy();
      expect(isBoolean).not.toBeTruthy();
      expect(isNumber).not.toBeTruthy();
      expect(isObject).not.toBeTruthy();
    });
    it('should give correct ISO string', () => {
      const iso = localISOTime(earlyDate);
      expect(iso).toBe('2020-02-01T00:00:00.000Z');
    });
  });
});
