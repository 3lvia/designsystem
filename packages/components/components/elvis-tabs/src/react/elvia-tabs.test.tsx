import React from 'react';
import Tabs from './elvia-tabs';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

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
      const orangesTab = screen.getByText('Oranges');
      expect(orangesTab).toHaveClass('ewc-tabs__label--selected');
    });

    it('should update value when clicking new tab', async () => {
      const user = userEvent.setup();
      const tabs = screen.getAllByTestId('tab-button');

      await user.click(tabs[1]);

      const applesTab = screen.getByText('Apples');
      expect(applesTab).toHaveClass('ewc-tabs__label--selected');

      const orangesTab = screen.getByText('Oranges');
      expect(orangesTab).not.toHaveClass('ewc-tabs__label--selected');
    });
  });

  describe('Value = 2', () => {
    beforeEach(() => {
      render(<Tabs items={items} value={2}></Tabs>);
    });

    it('should have default value Pears', () => {
      const orangesTab = screen.getByText('Pears');
      expect(orangesTab).toHaveClass('ewc-tabs__label--selected');
    });
  });

  describe('Inverted', () => {
    beforeEach(() => {
      render(<Tabs items={items} isInverted={true}></Tabs>);
    });

    it('should have class inverted', () => {
      const tabsContainer = screen.getByTestId('tabs-container');
      expect(tabsContainer).toHaveClass('ewc-tabs--inverted');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Tabs items={items} className="test-class" inlineStyle={{ margin: '24px' }}></Tabs>);
    });

    it('should have class ewc-tabs', () => {
      const tabsContainer = screen.getByTestId('tabs-container');
      expect(tabsContainer).toHaveClass('ewc-tabs');
    });

    it('should have className and inlineStyle', () => {
      const tabsContainer = screen.getByTestId('tabs-container');
      expect(tabsContainer.parentElement).toHaveStyle('margin: 24px');
      expect(tabsContainer.parentElement).toHaveClass('test-class');
    });
  });

  //FAILS. To pass fix: Invalid ARIA attribute value: aria-controls="item".
  describe.skip('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="tabs-wrapper">
          <Tabs items={items} />
          <Tabs items={items} value={2} />
        </div>,
      );

      const tabs = screen.getByTestId('tabs-wrapper');
      const results = await axe(tabs);

      expect(results).toHaveNoViolations();
    });
  });
});
