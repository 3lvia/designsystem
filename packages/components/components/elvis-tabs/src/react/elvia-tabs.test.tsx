import React from 'react';
import Tabs from './elvia-tabs';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

describe('Elvis Tabs', () => {
  const items = ['Oranges', 'Apples', 'Pears'];

  describe('Default', () => {
    beforeEach(() => {
      render(<Tabs items={items} />);
    });

    it('should have correct tabs', () => {
      const tabs = screen.getAllByRole('tab');
      expect(tabs.length).toEqual(3);

      expect(tabs[0]).toHaveTextContent('Oranges');
      expect(tabs[1]).toHaveTextContent('Apples');
      expect(tabs[2]).toHaveTextContent('Pears');
    });

    it('should have default value Oranges', () => {
      const selectedTab = screen.getByRole('tab', { selected: true });
      const selectedLabel = selectedTab.querySelector('span');

      if (selectedLabel) {
        expect(selectedLabel.innerHTML).toBe('Oranges');
      }
    });

    it('should update value when clicking new tab', async () => {
      const user = userEvent.setup();
      const tabs = screen.getAllByRole('tab');

      await user.click(tabs[1]);

      const selectedTab = screen.getByRole('tab', { selected: true });
      const selectedLabel = selectedTab.querySelector('span');

      if (selectedLabel) {
        expect(selectedLabel.innerHTML).toBe('Apples');
      }
    });

    it.skip('should have black label', () => {
      const tabLabel = screen.getByText('Oranges');
      expect(tabLabel).toHaveStyle('color: black');
    });
    it.skip('should have black text-shadow when selected', () => {
      const tabLabel = screen.getByText('Oranges');
      expect(tabLabel).toHaveStyle('text-shadow: 0 0 0 black,0 0 0.5px black');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Tabs items={items} className="test-class" inlineStyle={{ margin: '24px' }}></Tabs>);
    });

    it('should have className and inlineStyle', () => {
      const tabsContainer = screen.getByTestId('tabs-container');
      expect(tabsContainer).toHaveStyle('margin: 24px');
      expect(tabsContainer).toHaveClass('test-class');
    });
  });

  describe('Value = 2', () => {
    beforeEach(() => {
      render(<Tabs items={items} value={2}></Tabs>);
    });

    it('should have default value Pears', () => {
      const selectedTab = screen.getByRole('tab', { selected: true });
      const selectedLabel = selectedTab.querySelector('span');

      if (selectedLabel) {
        expect(selectedLabel.innerHTML).toBe('Pears');
      }
    });
  });

  describe('Inverted', () => {
    beforeEach(() => {
      render(<Tabs items={items} isInverted={true}></Tabs>);
    });

    it.skip('should have white label', () => {
      const tabLabel = screen.getByText('Oranges');
      expect(tabLabel).toHaveStyle('color: white');
    });
    it.skip('should have white text-shadow when selected', () => {
      const tabLabel = screen.getByText('Oranges');
      expect(tabLabel).toHaveStyle('text-shadow: 0 0 0 white,0 0 0.5px white');
    });
  });

  describe('Events', () => {
    let valueOnChangeEvent: jest.Mock;

    beforeEach(() => {
      valueOnChangeEvent = jest.fn();
      render(<Tabs items={items} valueOnChange={valueOnChangeEvent} />);
    });

    it('should not call onChange when clicking current tab', async () => {
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('should call onChange when clicking new tab', async () => {
      const user = userEvent.setup();
      const tabs = screen.getAllByRole('tab');

      await user.click(tabs[1]);
      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="tabs-wrapper">
          <Tabs items={items} tabIdPrefix={'test'} />
          <Tabs items={items} value={2} />
        </div>,
      );

      const tabs = screen.getByTestId('tabs-wrapper');
      const results = await axe(tabs);

      expect(results).toHaveNoViolations();
    });
  });
});
