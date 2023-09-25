import React from 'react';
import RadioFilter, { Option } from './elvia-radio-filter';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Elvis RadioFilter', () => {
  const items: Option[] = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
  ];

  describe('Default', () => {
    beforeEach(() => {
      render(<RadioFilter items={items} name="radio-filter" value="" />);
    });

    it('should have correct number of items', () => {
      const radioFilters = screen.getAllByTestId('radio-button');
      expect(radioFilters.length).toEqual(3);
    });

    it('should have correct labels', () => {
      const radioFilters = screen.getAllByTestId('radio-button');
      expect(radioFilters[0]).toHaveTextContent('All');
      expect(radioFilters[1]).toHaveTextContent('Read');
      expect(radioFilters[2]).toHaveTextContent('Unread');
    });
  });

  describe('Value = Unread', () => {
    beforeEach(() => {
      render(<RadioFilter items={items} value="unread" name="radio-filter" />);
    });

    it('should have new default value 2', () => {
      const radioFilters = screen.getAllByTestId('radio-button');
      expect(radioFilters[2].firstChild).toBeChecked();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <RadioFilter
          items={items}
          name="radio-filter"
          value=""
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        />,
      );
    });

    it('should have className and inlineStyle', () => {
      const radioFilterGroup = screen.getByTestId('radio-filter-group');
      expect(radioFilterGroup).toHaveStyle('margin: 24px');
      expect(radioFilterGroup).toHaveClass('test-class');
    });
  });

  describe('events', () => {
    //valueOnChange
    let valueOnChangeEvent: jest.Mock;

    beforeEach(() => {
      valueOnChangeEvent = jest.fn();

      render(
        <RadioFilter items={items} name="radio-filter" value="all" valueOnChange={valueOnChangeEvent} />,
      );
    });

    it('should not emit any event on init', async () => {
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('valueOnChange: should emit event when radio button is clicked', async () => {
      const user = userEvent.setup();
      const radioFilterButton = screen.getAllByRole('radio');

      await user.click(radioFilterButton[1]);
      screen.debug();

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalled());
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="radio-filers">
          <RadioFilter items={items} name="radio-filter" value="" />
          <RadioFilter items={items} value="unread" name="radio-filter" />
        </div>,
      );

      const radioFilters = screen.getByTestId('radio-filers');
      const results = await axe(radioFilters);

      expect(results).toHaveNoViolations();
    });
  });
});
