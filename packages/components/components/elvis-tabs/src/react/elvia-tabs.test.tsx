import Tabs from './elvia-tabs';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Elvis Tabs', () => {
  const items = ['Oranges', 'Apples', 'Pears'];

  describe('Default', () => {
    beforeEach(() => {
      render(<Tabs items={items} />);
    });

    it('should have correct tabs', () => {
      const tabs = screen.getAllByTestId('tab-button');
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
      const tabs = screen.getAllByTestId('tab-button');

      await user.click(tabs[1]);

      const selectedTab = screen.getByRole('tab', { selected: true });
      const selectedLabel = selectedTab.querySelector('span');

      if (selectedLabel) {
        expect(selectedLabel.innerHTML).toBe('Apples');
      }
    });

    it('should have black label', () => {
      const tabLabel = screen.getAllByTestId('tab-label');
      expect(tabLabel[0]).toHaveStyle('color: black');
    });
    it('should have black text-shadow when selected', () => {
      const tabLabel = screen.getAllByTestId('tab-label');
      expect(tabLabel[0]).toHaveStyle('text-shadow: 0 0 0 black,0 0 0.5px black');
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

    it('should have white label', () => {
      const tabLabel = screen.getAllByTestId('tab-label');
      expect(tabLabel[0]).toHaveStyle('color: white');
    });
    it('should have white text-shadow when selected', () => {
      const tabLabel = screen.getAllByTestId('tab-label');
      expect(tabLabel[0]).toHaveStyle('text-shadow: 0 0 0 white,0 0 0.5px white');
    });
  });
});
