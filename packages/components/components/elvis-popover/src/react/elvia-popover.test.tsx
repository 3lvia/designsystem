import Popover from './elvia-popover';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Elvis Popover', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Popover trigger={<button>Trigger</button>} heading="Header" content="Content" />);
    });

    it('should be closed by default', () => {
      const popoverContainer = screen.getByTestId('popover-container');
      expect(popoverContainer).toHaveClass('ewc-popover--hide');
    });

    it('should be able to open and close the popover', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByTestId('popover-trigger');

      await user.click(popoverTrigger);
      expect(screen.getByTestId('popover-container')).not.toHaveClass('ewc-popover--hide');

      await user.click(popoverTrigger);
      expect(screen.getByTestId('popover-container')).toHaveClass('ewc-popover--hide');
    });

    it('should have close btn', () => {
      const popoverCloseBtn = screen.getByTestId('popover-close-btn');
      expect(popoverCloseBtn).toBeInTheDocument();
    });

    it('should close popover when clicking close btn', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByTestId('popover-trigger');

      await user.click(popoverTrigger);

      const popoverCloseBtn = screen.getByTestId('popover-close-btn');
      await user.click(popoverCloseBtn);

      const popoverContainer = screen.getByTestId('popover-container');
      expect(popoverContainer).toHaveClass('ewc-popover--hide');
    });

    it('should have correct header', () => {
      const popoverHeader = screen.getByTestId('popover-header');
      expect(popoverHeader).toHaveTextContent('Header');
    });

    it('should have correct content', () => {
      const popoverText = screen.getByTestId('popover-text');
      expect(popoverText).toHaveTextContent('Content');
    });
  });

  describe('Showing = True', () => {
    beforeEach(() => {
      render(<Popover trigger={<button>Trigger</button>} heading="Header" content="Content" isShowing />);
    });

    it('should be open by default', () => {
      const popoverContainer = screen.getByTestId('popover-container');
      expect(popoverContainer).not.toHaveClass('ewc-popover--hide');
    });
  });

  describe('Close button', () => {
    beforeEach(() => {
      render(
        <Popover
          trigger={<button>Trigger</button>}
          heading="Header"
          content="Content"
          hasCloseButton={false}
        />,
      );
    });

    it('should not have close btn', () => {
      const popoverCloseBtn = screen.queryByTestId('popover-close-btn');
      expect(popoverCloseBtn).not.toBeInTheDocument();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Popover
          trigger={<button>Trigger</button>}
          heading="Header"
          content="Content"
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        />,
      );
    });

    it('should have className and inlineStyle', () => {
      const popoverWrapper = screen.getByTestId('popover-wrapper');
      expect(popoverWrapper).toHaveStyle('margin: 24px');
      expect(popoverWrapper).toHaveClass('test-class');
    });
  });
});
