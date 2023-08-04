import React from 'react';
import Autocomplete from './elvia-autocomplete';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import { AutocompleteItem } from './elvia-autocomplete.types';

const items: AutocompleteItem[] = [
  { value: 'Appelsin', label: '🍊 Appelsin' },
  { value: 'Banan', label: '🍌 Banan' },
  { value: 'Eple', label: '🍏 Eple' },
  { value: 'Jordbær', label: '🍓 Jordbær' },
  { value: 'Pære', label: '🍐 Pære' },
  { value: 'Vannmelon', label: '🍉 Vannmelon' },
  { value: 'Druer', label: '🍇 Druer' },
];

describe('Elvis Autocomplete', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Autocomplete items={items} />);
    });

    it('should not have a default value', () => {
      const input = screen.getByRole('combobox');
      expect(input).toHaveValue('');
    });

    it('should not have a default placeholder', () => {
      const input = screen.getByRole('combobox');
      expect(input).not.toHaveAttribute('placeholder');
    });

    it('should not have a popover visible by default', () => {
      const popover = screen.queryByRole('listbox');
      expect(popover).not.toBeInTheDocument();
    });

    it('should accept a value when the user starts typing', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      expect(input).toHaveValue('a');
    });

    it('should show a popover when the user starts typing', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      const popover = screen.queryByRole('listbox');
      expect(popover).toBeInTheDocument();
    });

    it('should show a popover with the correct number of items when the user starts typing', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      const popover = screen.queryByRole('listbox');
      expect(popover).toBeInTheDocument();

      const listItems = screen.getAllByRole('option');
      expect(listItems).toHaveLength(3); //Appelsin, Banan, Vannmelon
    });

    it('should have the correct value when the user selects an suggestion', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      const popover = screen.queryByRole('listbox');
      expect(popover).toBeInTheDocument();

      const listItems = screen.getAllByRole('option');

      await user.click(listItems[0]);

      expect(input).toHaveValue('Appelsin');
    });

    it('should be able to select an item with the keyboard', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      await user.type(input, '{arrowdown}');
      await user.type(input, '{arrowdown}');
      await user.type(input, '{arrowdown}');
      await user.type(input, '{enter}');

      expect(input).toHaveValue('Vannmelon');
    });

    it('should not show a popover when the user starts typing and there are no suggestion to give', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'zzz');

      const popover = screen.queryByRole('listbox');
      expect(popover).not.toBeInTheDocument();
      expect(input).toHaveAttribute('aria-expanded', 'false');

      const listItems = screen.queryAllByRole('option');
      expect(listItems).toHaveLength(0); //no fruit includes 'zzz'
    });
  });

  describe('ariaLabel prop', () => {
    beforeEach(() => {
      render(<Autocomplete items={items} ariaLabel={'Velg en frukt'} />);
    });

    it('should have the correct ariaLabel if provided', () => {
      const input = screen.getByRole('combobox');

      expect(input).toHaveAttribute('aria-label', 'Velg en frukt');
    });
  });

  describe('isDisabled prop', () => {
    beforeEach(() => {
      render(<Autocomplete isDisabled={true} items={items} />);
    });

    it('should have an disabled input field', () => {
      const input = screen.getByRole('combobox');
      expect(input).toBeDisabled();
    });

    it('should not show a popover when the user starts typing', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.type(input, 'a');

      const popover = screen.queryByRole('listbox');
      expect(popover).not.toBeInTheDocument();
    });
  });

  describe('isRequired prop', () => {
    beforeEach(() => {
      render(<Autocomplete isRequired={true} items={items} />);
    });

    it('should have required = true', () => {
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('required');
    });

    it('should give an error if no value is provided after blur', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.click(input);
      await user.tab();
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });

  describe('label prop', () => {
    beforeEach(() => {
      render(<Autocomplete isDisabled={true} items={items} label={'frukter'} />);
    });

    it('should have an label if provided', () => {
      const label = screen.queryByLabelText('frukter');
      expect(label).toBeInTheDocument();
    });
  });

  describe('placeholder prop', () => {
    beforeEach(() => {
      render(
        <Autocomplete isDisabled={true} items={items} label={'frukter'} placeholder={'velg en frukt'} />,
      );
    });

    it('should have an placeholder if provided', () => {
      const placeholder = screen.queryByPlaceholderText('velg en frukt');
      expect(placeholder).toBeInTheDocument();
    });
  });

  describe('errorOptions prop', () => {
    beforeEach(() => {
      render(<Autocomplete items={items} errorOptions={{ text: 'error text' }} />);
    });

    it('should have an error message if provided', () => {
      const errorMessage = screen.queryByText('error text');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  describe('Events', () => {
    let onCloseEvent: jest.Mock;
    let onFocusEvent: jest.Mock;
    let onOpenEvent: jest.Mock;
    let onSelectItemEvent: jest.Mock;
    let valueOnChangeEvent: jest.Mock;
    let errorOnChangeEvent: jest.Mock;

    beforeEach(() => {
      onCloseEvent = jest.fn();
      onFocusEvent = jest.fn();
      onOpenEvent = jest.fn();
      onSelectItemEvent = jest.fn();
      valueOnChangeEvent = jest.fn();
      errorOnChangeEvent = jest.fn();

      render(
        <Autocomplete
          items={items}
          onClose={onCloseEvent}
          onFocus={onFocusEvent}
          onOpen={onOpenEvent}
          onSelectItem={onSelectItemEvent}
          valueOnChange={valueOnChangeEvent}
          errorOnChange={errorOnChangeEvent}
          isRequired={true}
        />,
      );
    });

    it('onFocusEvent: should emit the focus event when focused', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.click(input);

      await waitFor(() => expect(onFocusEvent).toHaveBeenCalled());
      await waitFor(() => expect(onOpenEvent).not.toHaveBeenCalled());
    });

    it('onOpenEvent: should emit the open event when the user starts typing', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.type(input, 'a');

      await waitFor(() => expect(onOpenEvent).toHaveBeenCalled());
    });

    it('onCloseEvent: should emit the close event when the user clicks outside the component', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.type(input, 'a');

      await user.click(document.body);

      await waitFor(() => expect(onCloseEvent).toHaveBeenCalled());
    });

    it('onCloseEvent: should _not_ emit the close event when the user clicks inside the combobox while open', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.type(input, 'a');

      await user.click(input);

      await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
    });

    it('onSelectItemEvent: should emit the select item event when the user selects an item', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.type(input, 'a');

      const listItems = screen.getAllByRole('option');
      await user.click(listItems[0]);

      expect(onSelectItemEvent).toHaveBeenCalled();
    });

    it('valueOnChangeEvent: should emit the value change event when the user types', async () => {
      const user = userEvent.setup();

      const input = screen.getByRole('combobox');
      await user.type(input, 'b');
      await user.type(input, 'a');
      await user.type(input, 'n');

      expect(valueOnChangeEvent).toHaveBeenCalledTimes(3);
    });

    it('errorOnChangeEvent: should emit the error change event when component becomes invalid', async () => {
      const user = userEvent.setup();
      const input = screen.getByRole('combobox');

      await user.click(input);
      await user.tab();

      //required error
      expect(errorOnChangeEvent).toHaveBeenCalled();
    });
  });

  describe('Accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="autocompletes">
          <Autocomplete items={items} ariaLabel={'velg en frukt'} />
          <Autocomplete items={items} isDisabled={true} ariaLabel={'velg en frukt'} />
        </div>,
      );

      const user = userEvent.setup();
      const input = screen.getAllByRole('combobox');

      await user.type(input[0], 'a');

      const autocompletes = screen.getByTestId('autocompletes');
      const results = await axe(autocompletes);

      expect(results).toHaveNoViolations();
    });
  });
});
