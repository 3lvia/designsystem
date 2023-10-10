import React from 'react';
import { Dropdown } from './elvia-dropdown';
import userEvent from '@testing-library/user-event';
import { DropdownItem } from './publicApi.public';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

const mockMatchMedia = (opts?: Partial<{ isGtMobile: boolean }>) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: opts?.isGtMobile,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

const items: DropdownItem[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const treeItems: DropdownItem[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2', children: [{ value: '4', label: 'Subitem' }] },
  { value: '3', label: 'Option 3' },
];

describe('Elvis Dropdown', () => {
  describe('on desktop', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: true });
    });

    describe('', () => {
      beforeEach(() => {
        render(<Dropdown label={'Label'} items={items}></Dropdown>);
      });

      it('should have label', () => {
        const dropdownLabel = screen.getByText('Label');
        expect(dropdownLabel).toBeInTheDocument();
      });

      it('should not be disabled', () => {
        const input = screen.getByRole('combobox');
        expect(input).not.toBeDisabled();
      });

      it('should not be compact', () => {
        const dropdownLabel = screen.getByText('Label');
        expect(dropdownLabel).toHaveStyle(`font-size: 16px; line-height: 22px`);
      });

      it('should not have error message', () => {
        const dropdownError = screen.queryByTestId('error');
        expect(dropdownError).not.toBeInTheDocument();
      });

      it('should not be full width', () => {
        const dropdownWrapper = screen.getByTestId('wrapper');
        expect(dropdownWrapper).toHaveStyle('max-width: 448px');
      });
    });

    describe('when disabled', () => {
      beforeEach(() => {
        render(<Dropdown isDisabled items={[]}></Dropdown>);
      });

      it('should be disabled', () => {
        const input = screen.getByRole('combobox');
        expect(input).toBeDisabled();
      });

      it('should not be possible to open', async () => {
        const user = userEvent.setup();
        const input = screen.getByRole('combobox');
        await user.click(input);

        expect(screen.queryByTestId('popover')).not.toBeInTheDocument();
      });
    });

    it('should have error message', () => {
      render(<Dropdown errorOptions={{ text: 'Error message' }} items={[]}></Dropdown>);
      const dropdownError = screen.queryByTestId('error');
      expect(dropdownError).toHaveTextContent('Error');
    });

    it('should have a full width feature', () => {
      render(<Dropdown isFullWidth items={[]}></Dropdown>);
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('max-width: 448px');
    });

    it('should show a proper placeholder', () => {
      render(<Dropdown placeholder="Placeholder" items={[]}></Dropdown>);
      const input = screen.getByRole('combobox');
      expect(input).toHaveAttribute('placeholder', 'Placeholder');
    });

    describe('when the dropdown is clicked', () => {
      beforeEach(async () => {
        render(<Dropdown items={items}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');
        await user.click(dropdown);
      });

      it('the popover opens', () => {
        const element = screen.queryByTestId('popover');
        expect(element).toBeInTheDocument();
      });
    });

    describe('when an item is clicked', () => {
      beforeEach(async () => {
        render(<Dropdown items={items}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');
        await user.click(dropdown);

        const firstItem = screen.getByText(items[0].label);
        await user.click(firstItem);
      });

      it('the input receives the value', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue(items[0].label);
      });
    });

    describe('when the dropdown is filterable', () => {
      beforeEach(async () => {
        render(<Dropdown items={items} isSearchable></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        await user.click(dropdown);
        await user.type(dropdown, '3');
      });

      it('the number of options match the query', () => {
        const dropdownItems = screen.getAllByRole('option');
        expect(dropdownItems.length).toBe(1);
        expect(dropdownItems[0]).toHaveTextContent('Option 3');
      });
    });

    describe('when the filter gets no matches', () => {
      beforeEach(async () => {
        render(<Dropdown items={items} isSearchable></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        await user.click(dropdown);
        await user.type(dropdown, 'nothing-matches-this');
      });

      it('a "no matches" text is displayed', () => {
        const noResultsText = screen.queryByText('Ingen tilgjengelige valg');
        expect(noResultsText).toBeInTheDocument();
      });
    });

    describe('when an error text is provided', () => {
      beforeEach(() => {
        render(<Dropdown items={items} errorOptions={{ text: 'Error message' }}></Dropdown>);
      });

      it('the error is displayed', () => {
        const errorText = screen.queryByText('Error message');
        expect(errorText).toBeInTheDocument();
      });
    });

    describe('when the dropdown has tree structure and is filterable', () => {
      beforeEach(async () => {
        render(<Dropdown items={treeItems} isSearchable></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        await user.click(dropdown);
        await user.type(dropdown, 'sub');
      });

      it('the dropdown list is flattened', () => {
        const dropdownItems = screen.getAllByRole('option');
        expect(dropdownItems.length).toBe(1);
        expect(dropdownItems[0]).toHaveTextContent('Subitem');
      });
    });

    describe('when multiple selection is enabled and two items are clicked', () => {
      beforeEach(async () => {
        render(<Dropdown items={items} isMulti></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');
        await user.click(dropdown);

        const dropdownItems = screen.getAllByRole('option');
        await user.click(dropdownItems[0]);
        await user.click(dropdownItems[1]);
      });

      it('the input says two are selected', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue('2 valgte');
      });

      it('the popover remains open', () => {
        const element = screen.queryByTestId('popover');
        expect(element).toBeInTheDocument();
      });
    });

    describe('when an item with sub items are hovered and a sub item is clicked', () => {
      beforeEach(async () => {
        render(<Dropdown items={treeItems}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');
        await user.click(dropdown);

        const dropdownItems = screen.getAllByRole('option');
        await user.hover(dropdownItems[1]);

        await waitFor(() => {
          expect(screen.getByText('Subitem')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Subitem'));
      });

      it('the sub item is selected', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue('Subitem');
      });
    });

    describe('when keyboard is used for selecting child', () => {
      beforeEach(async () => {
        render(<Dropdown items={treeItems}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        // Select Option 2 child item
        await user.type(dropdown, '{enter}');
        await user.type(dropdown, '{arrowdown}');
        await user.type(dropdown, '{arrowright}');
        await user.type(dropdown, '{enter}');
      });

      it('the proper item is selected', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue('Subitem');
      });
    });

    describe('when keyboard is used to traverse up to parent', () => {
      beforeEach(async () => {
        render(<Dropdown items={treeItems}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        // Navigate to child, up to parent (Option 2) and down to Option 3
        await user.type(dropdown, '{enter}');
        await user.type(dropdown, '{arrowdown}');
        await user.type(dropdown, '{arrowright}');
        await user.type(dropdown, '{arrowleft}');
        await user.type(dropdown, '{arrowdown}');
        await user.type(dropdown, '{enter}');
      });

      it.skip('the proper item is selected', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue('Option 3');
      });
    });

    describe('when the button to select all is clicked', () => {
      beforeEach(async () => {
        render(<Dropdown hasSelectAllOption isMulti items={treeItems}></Dropdown>);

        const user = userEvent.setup();
        const dropdown = screen.getByRole('combobox');

        await user.click(dropdown);
        await user.click(screen.getByText('Alle'));
      });

      it('all items are selected', () => {
        const element = screen.getByRole('combobox');
        expect(element).toHaveValue('Alle');
      });
    });

    describe('className and inlineStyle passed to wrapper', () => {
      beforeEach(() => {
        render(<Dropdown className="test-class" inlineStyle={{ margin: '24px' }} items={[]}></Dropdown>);
      });

      it('should have className and inlineStyle', () => {
        const dropdownWrapper = screen.getByTestId('wrapper');
        expect(dropdownWrapper).toHaveStyle('margin: 24px');
        expect(dropdownWrapper).toHaveClass('test-class');
      });
    });
  });

  describe('events', () => {
    const valueOnChangeEvent = jest.fn();
    const onItemHoverEvent = jest.fn();
    const onLoadMoreItemsEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <Dropdown
          hasLoadMoreItemsButton={true}
          items={items}
          onItemHover={onItemHoverEvent}
          onLoadMoreItems={onLoadMoreItemsEvent}
          valueOnChange={valueOnChangeEvent}
        />,
      );
    });

    it('should not emit any events when idle', async () => {
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onItemHoverEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onLoadMoreItemsEvent).not.toHaveBeenCalled());
    });

    it('valueOnChange: should emit when an item is clicked', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);

      const dropdownItems = screen.getAllByRole('option');
      await user.click(dropdownItems[0]);

      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
    });

    it('onItemHover: should emit when an item is hovered', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);

      const dropdownItems = screen.getAllByRole('option');
      await user.hover(dropdownItems[0]);

      await waitFor(() => expect(onItemHoverEvent).toHaveBeenCalledTimes(1));
    });

    it('onLoadMoreItems: should emit when the load more button is clicked', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);

      //This button in inside a <div> element. The user clicks the div, not the "real" button.
      const loadMoreButton = screen.getByRole('button', { name: /last inn flere/i }).parentElement;

      if (loadMoreButton) {
        await user.click(loadMoreButton);
      }

      await waitFor(() => expect(onLoadMoreItemsEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="dropdowns-wrapper">
          <Dropdown label={'Label'} hasSelectAllOption isMulti items={treeItems} />
          <Dropdown ariaLabel="testing aria label" hasSelectAllOption isMulti items={treeItems} />
          <Dropdown label={'Label'} hasSelectAllOption isMulti items={treeItems} />
        </div>,
      );

      const user = userEvent.setup();
      const dropdown = screen.getAllByRole('combobox');

      await user.click(dropdown[2]);

      const dropdowns = screen.getByTestId('dropdowns-wrapper');
      const results = await axe(dropdowns);

      expect(results).toHaveNoViolations();
    });
  });
});
