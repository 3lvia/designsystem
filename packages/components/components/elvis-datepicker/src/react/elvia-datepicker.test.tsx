import Datepicker from './elvia-datepicker';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const getDatepickerInput = () => {
  return document.querySelector('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd');
};

const getDatepickerButton = (): HTMLButtonElement => {
  return document.querySelector('.MuiIconButton-root') as HTMLButtonElement;
};

describe('Elvis Datepicker', () => {
  const minDate = new Date('1/1/30');
  const maxDate = new Date('1/1/10');
  const customValue = new Date('4/2/24');

  describe('Default', () => {
    beforeEach(() => {
      render(<Datepicker></Datepicker>);
    });

    it('should have default label = Velg dato', () => {
      const datepickerLabel = screen.getByTestId('datepicker-label');
      expect(datepickerLabel).toHaveTextContent('Velg dato');
    });

    it('should have class unselected', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker--unselected');
    });

    it('should not have date selected when untouched', () => {
      expect(getDatepickerInput()).toHaveProperty('value', '');
    });

    it('should have date selected when button is clicked', async () => {
      const user = userEvent.setup();

      await user.click(getDatepickerButton());
      expect(getDatepickerInput()).not.toHaveProperty('value', '');
    });

    it('should have error placeholder element', () => {
      const datepickerErrorPlaceholder = screen.getByTestId('datepicker-error-placeholder');
      expect(datepickerErrorPlaceholder).toHaveClass('ewc-datepicker__error-placeholder');
    });
  });

  describe('Value = custom', () => {
    beforeEach(() => {
      render(<Datepicker value={customValue}></Datepicker>);
    });

    it('should have value = 02.04.2024', () => {
      expect(getDatepickerInput()).toHaveProperty('value', '02.04.2024');
    });
  });

  describe('Label = Custom label', () => {
    beforeEach(() => {
      render(<Datepicker label="Custom label"></Datepicker>);
    });

    it('should have label = Custom label', () => {
      const datepickerLabel = screen.getByTestId('datepicker-label');
      expect(datepickerLabel).toHaveTextContent('Custom label');
    });
  });

  describe('Compact, Full width', () => {
    beforeEach(() => {
      render(<Datepicker isCompact isFullWidth></Datepicker>);
    });

    it('should have compact class', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker--compact');
    });
    it('should have full width class', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker--full-width');
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      render(<Datepicker isDisabled></Datepicker>);
    });

    it('should have disabled class', () => {
      expect(getDatepickerInput()).toHaveClass('Mui-disabled');
    });

    it('should not be clickable', () => {
      expect(getDatepickerButton()).toHaveStyle('pointer-events: none');
    });
  });

  describe('Required', () => {
    beforeEach(() => {
      render(<Datepicker isRequired></Datepicker>);
    });

    it('should not have error class when untouched', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).not.toHaveClass('ewc-datepicker--error');
      expect(getDatepickerInput()).toHaveProperty('value', '');
    });

    it('should not have error class when filled ', async () => {
      const user = userEvent.setup();

      await user.click(getDatepickerButton());

      expect(screen.getByTestId('datepicker-wrapper')).not.toHaveClass('ewc-datepicker--error');
    });
  });

  describe('Does not have error placeholder element', () => {
    beforeEach(() => {
      render(<Datepicker hasErrorPlaceholderElement={false}></Datepicker>);
    });

    it('should not have error placeholder element', () => {
      const datepickerErrorPlaceholder = screen.queryByTestId('datepicker-error-placeholder');
      expect(datepickerErrorPlaceholder).not.toBeInTheDocument();
    });
  });

  describe('Custom error = Feil', () => {
    beforeEach(() => {
      render(<Datepicker customError="Feil"></Datepicker>);
    });

    it('should have error class', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker--error');
    });

    it('should not have error placeholder element when custom error', () => {
      const datepickerErrorPlaceholder = screen.queryByTestId('datepicker-error-placeholder');
      expect(datepickerErrorPlaceholder).not.toBeInTheDocument();
    });
  });

  describe('Min date', () => {
    beforeEach(() => {
      render(<Datepicker minDate={minDate}></Datepicker>);
    });

    it('should pick minimum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(getDatepickerButton());
      expect(getDatepickerInput()).toHaveProperty('value', '01.01.2030');
    });
  });

  describe('Max date', () => {
    beforeEach(() => {
      render(<Datepicker maxDate={maxDate}></Datepicker>);
    });

    it('should pick maximum date when opened', async () => {
      const user = userEvent.setup();
      await user.click(getDatepickerButton());
      expect(getDatepickerInput()).toHaveProperty('value', '01.01.2010');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Datepicker maxDate={maxDate} className="test-class" inlineStyle={{ margin: '24px' }}></Datepicker>,
      );
    });

    it('should have className', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker');
      expect(datepickerWrapper).toHaveClass('test-class');
    });

    it('should have inlineStyle', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveStyle('margin: 24px');
    });
  });
  describe('Error state from prop', () => {
    beforeEach(() => {
      render(<Datepicker isErrorState></Datepicker>);
    });

    it('should have error state', () => {
      const datepickerWrapper = screen.getByTestId('datepicker-wrapper');
      expect(datepickerWrapper).toHaveClass('ewc-datepicker--error');
    });
  });
});
