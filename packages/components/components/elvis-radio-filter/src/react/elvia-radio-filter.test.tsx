import RadioFilter, { Option } from './elvia-radio-filter';
import React from 'react';
import { render, screen } from '@testing-library/react';

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
});
