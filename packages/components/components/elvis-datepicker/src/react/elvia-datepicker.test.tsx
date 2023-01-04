import React from 'react';
import Datepicker from './elvia-datepicker';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { formatDate } from './dateHelpers';
import { getColor } from '@elvia/elvis-colors';
import { render, screen, waitFor } from '@testing-library/react';

describe('Elvis Datepicker', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Datepicker></Datepicker>);
    });

    it('should have default label = Velg dato', () => {
      const datepickerLabel = screen.getByTestId('label');
      expect(datepickerLabel).toHaveTextContent('Velg dato');
    });

    it('should not have date selected when untouched', () => {
      expect(screen.getByTestId('input')).toHaveProperty('value', '');
    });

    it('should have date selected when button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).not.toHaveProperty('value', '');
    });

    it('should move calendar to todays month when the reset button is pressed', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());

      await user.click(screen.getByTestId('prev-month-btn'));

      const previousMonth = new Date();
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      const previousMonthName = formatDate(previousMonth, { month: 'long' });
      expect(screen.getByTestId('month-name').textContent).toContain(previousMonthName);

      await user.click(screen.getByText('Nullstill'));

      const currentMonthName = formatDate(new Date(), { month: 'long' });
      expect(screen.getByTestId('month-name').textContent).toContain(currentMonthName);
    });
  });

  describe('Value = custom', () => {
    beforeEach(() => {
      const oddDateFilter = (d: Date) => d.getDate() % 2 !== 0;
      render(<Datepicker value={new Date('2024/04/02')} disableDate={oddDateFilter}></Datepicker>);
    });

    it('should have value = 02.04.2024', () => {
      expect(screen.getByTestId('input')).toHaveProperty('value', '02.04.2024');
    });

    it('should show month name in calendar', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());

      expect(screen.getByTestId('month-name')).toHaveTextContent('april 2024');
    });

    it('should be able to view next month', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('popover-toggle'));
      await waitFor(() => expect(screen.queryByTestId('month-name')).toBeInTheDocument());
      await user.click(screen.getByTestId('next-month-btn'));

      expect(screen.getByTestId('month-name')).toHaveTextContent('mai 2024');
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

      expect(screen.queryByTestId('month-name')).toHaveTextContent('april 2025');
    });
  });

  describe('Label = Custom label', () => {
    beforeEach(() => {
      render(<Datepicker label="Custom label"></Datepicker>);
    });

    it('should have label = Custom label', () => {
      expect(screen.getByTestId('label')).toHaveTextContent('Custom label');
    });
  });

  describe('Compact, Full width', () => {
    beforeEach(() => {
      render(<Datepicker isCompact isFullWidth></Datepicker>);
    });

    it('should have compact class', () => {
      const datepickerWrapper = screen.getByTestId('wrapper');
      expect(datepickerWrapper).toHaveStyle('padding-top: 0.5rem');
    });
    it('should have full width class', () => {
      const datepickerWrapper = screen.getByTestId('wrapper');
      expect(datepickerWrapper).toHaveStyle('width: 100%');
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Datepicker isDisabled></Datepicker>);
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
      render(<Datepicker isRequired></Datepicker>);
    });

    it('should not have error when untouched', () => {
      expect(screen.queryByTestId('error')).not.toBeInTheDocument();
      expect(screen.getByTestId('input')).toHaveProperty('value', '');
    });

    it('should have an error when clicked and blurred ', async () => {
      const user = userEvent.setup();

      await user.click(screen.getByTestId('input'));
      await user.tab();

      expect(screen.getByTestId('error')).toHaveTextContent('Velg dato');
    });
  });

  describe('Custom error = Feil', () => {
    beforeEach(() => {
      render(<Datepicker errorOptions={{ text: 'Feil' }}></Datepicker>);
    });

    it('should have error style', () => {
      const datepickerWrapper = screen.getByTestId('input-container');
      expect(datepickerWrapper).toHaveStyle(`border-color: ${getColor('error')}`);
    });

    it('should have custom error in DOM', () => {
      expect(screen.getByTestId('error')).toHaveTextContent('Feil');
    });
  });

  describe('Min date', () => {
    beforeEach(() => {
      // A high min date, to ensure that the test doesn't break for a long time
      render(<Datepicker minDate={new Date('2077/05/01')}></Datepicker>);
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
      expect(screen.getByTestId('month-name')).toHaveTextContent('mai 2077');
    });

    it('should show an error if a date before the min date is typed into the input', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByTestId('input'), '01.05.2076');
      await user.tab();

      expect(screen.queryByTestId('error')).toHaveTextContent('Kan ikke være før 01.05.2077');
    });
  });

  describe('Max date', () => {
    beforeEach(() => {
      render(<Datepicker maxDate={new Date('2022/05/01')}></Datepicker>);
    });

    it('should pick maximum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).toHaveProperty('value', '01.05.2022');
    });

    it('should show an error if a date after the max date is typed into the input', async () => {
      const user = userEvent.setup();

      await user.type(screen.getByTestId('input'), '01.05.2023');
      await user.tab();

      expect(screen.queryByTestId('error')).toHaveTextContent('Kan ikke være etter 01.05.2022');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Datepicker className="test-class" inlineStyle={{ margin: '24px' }}></Datepicker>);
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
      render(<Datepicker errorOptions={{ isErrorState: true }}></Datepicker>);
    });

    it('should have error state', () => {
      const datepickerWrapper = screen.getByTestId('input-container');
      expect(datepickerWrapper).toHaveStyle(`border-color: ${getColor('error')}`);
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="dateppickers-wrapper">
          <Datepicker />
          <Datepicker value={new Date('2024/04/02')}></Datepicker>
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
});
