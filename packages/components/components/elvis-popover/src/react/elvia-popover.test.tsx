import Popover from './elvia-popover';
import React from 'react';
import { render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('Elvis Popover', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(<Popover trigger={<button>Trigger</button>} heading="Header" content="Content" />);
    });

    it('should be closed by default', () => {
      const popoverContent = screen.queryByText('Content');
      const popoverHeading = screen.queryByText('Header');
      expect(popoverContent).not.toBeInTheDocument();
      expect(popoverHeading).not.toBeInTheDocument();
    });

    it('should be able to open and close the popover', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      //open
      await user.click(popoverTrigger);
      const popoverContent = screen.queryByText('Content');
      const popoverHeading = screen.queryByText('Header');

      expect(popoverContent).toBeInTheDocument();
      expect(popoverHeading).toBeInTheDocument();

      //close
      await user.click(popoverTrigger);

      expect(popoverContent).not.toBeInTheDocument();
      expect(popoverHeading).not.toBeInTheDocument();
    });

    it('should have close btn', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverCloseBtn = screen.getByRole('button', { name: 'Lukk' });
      expect(popoverCloseBtn).toBeInTheDocument();
    });

    it('should close popover when clicking close btn', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverCloseBtn = screen.getByRole('button', { name: 'Lukk' });
      await user.click(popoverCloseBtn);

      await waitFor(() => {
        const popoverContent = screen.queryByText('Content');
        const popoverHeading = screen.queryByText('Header');
        expect(popoverContent).not.toBeInTheDocument();
        expect(popoverHeading).not.toBeInTheDocument();
      });
    });

    it('should have correct header', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverHeading = screen.queryByText('Header');
      expect(popoverHeading).toBeInTheDocument();
    });

    it('should have correct content', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverContent = screen.queryByText('Content');
      expect(popoverContent).toBeInTheDocument();
    });

    it('should be closed if the user presses Escape', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      //open
      await user.click(popoverTrigger);
      expect(screen.queryByText('Content')).toBeInTheDocument();
      expect(screen.queryByText('Header')).toBeInTheDocument();

      //close
      await user.keyboard('{Escape}');

      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument();
        expect(screen.queryByText('Header')).not.toBeInTheDocument();
      });
    });
  });

  describe('Showing = True', () => {
    beforeEach(() => {
      render(<Popover trigger={<button>Trigger</button>} heading="Header" content="Content" isShowing />);
    });

    it('should be open by default', () => {
      const popoverContent = screen.queryByText('Content');
      expect(popoverContent).toBeInTheDocument();
    });
  });

  describe('Close button = False', () => {
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

    it('should _not_ have close btn', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverCloseBtn = screen.queryByRole('button', { name: 'Lukk' });
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

    it('should have className and inlineStyle', async () => {
      const user = userEvent.setup();
      const popoverTrigger = screen.getByRole('button', { name: 'Trigger' });

      await user.click(popoverTrigger);

      const popoverContent = screen.getByTestId('popover');
      expect(popoverContent).toHaveStyle('margin: 24px');
      expect(popoverContent).toHaveClass('test-class');
    });
  });
});
