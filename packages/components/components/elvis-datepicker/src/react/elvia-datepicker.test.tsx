import Datepicker from './elvia-datepicker';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getColor } from '@elvia/elvis-colors';

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
  });

  describe('Value = custom', () => {
    beforeEach(() => {
      render(<Datepicker value={new Date('2024-04-02')}></Datepicker>);
    });

    it('should have value = 02.04.2024', () => {
      expect(screen.getByTestId('input')).toHaveProperty('value', '02.04.2024');
    });
  });

  describe('Label = Custom label', () => {
    beforeEach(() => {
      render(<Datepicker label="Custom label"></Datepicker>);
    });

    it('should have label = Custom label', () => {
      const datepickerLabel = screen.getByTestId('label');
      expect(datepickerLabel).toHaveTextContent('Custom label');
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
      render(<Datepicker minDate={new Date('2077-05-01')}></Datepicker>);
    });

    it('should pick minimum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).toHaveProperty('value', '01.05.2077');
    });
  });

  describe('Max date', () => {
    beforeEach(() => {
      render(<Datepicker maxDate={new Date('2022-05-01')}></Datepicker>);
    });

    it('should pick maximum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(screen.getByTestId('popover-toggle'));
      expect(screen.getByTestId('input')).toHaveProperty('value', '01.05.2022');
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
});
