import React from 'react';
import Tabs from './elvia-tabs';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { getThemeColor } from '@elvia/elvis-colors';

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
      expect(tabLabel[0]).toHaveStyle(`color: ${getThemeColor('text-1')}`);
    });
    it('should have black text-shadow when selected', () => {
      const tabLabel = screen.getAllByTestId('tab-label');
      expect(tabLabel[0]).toHaveStyle(
        `text-shadow: 0 0 0 var(--e-color-text-1,#000000),0 0 0.5px var(--e-color-text-1,#000000);`,
      );
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
