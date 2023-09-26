import React from 'react';
import Popover from './elvia-popover';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

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

      await waitFor(() => {
        expect(popoverContent).not.toBeInTheDocument();
        expect(popoverHeading).not.toBeInTheDocument();
      });
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

  describe('events', () => {
    let onCloseEvent: jest.Mock;
    let onOpenEvent: jest.Mock;

    beforeEach(() => {
      onCloseEvent = jest.fn();
      onOpenEvent = jest.fn();

      render(
        <Popover
          content="Content"
          hasCloseButton={true}
          heading="Header"
          onClose={onCloseEvent}
          onOpen={onOpenEvent}
          trigger={<button>Trigger</button>}
        />,
      );
    });

    it('should not emit any event on init', async () => {
      await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onOpenEvent).not.toHaveBeenCalled());
    });

    it('onOpen: should emit when trigger is clicked', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /trigger/i });

      await user.click(trigger);

      await waitFor(() => expect(onOpenEvent).toHaveBeenCalled());
    });

    it('onClose: should emit event when close button is clicked', async () => {
      const user = userEvent.setup();
      const trigger = screen.getByRole('button', { name: /trigger/i });

      await user.click(trigger);

      const closeButton = screen.getByRole('button', { name: /lukk/i });
      await user.click(closeButton);

      await waitFor(() => expect(onCloseEvent).toHaveBeenCalled());
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="popovers-wrapper">
          <Popover trigger={<button>Trigger</button>} heading="Header" content="Content" />
          <Popover trigger={<button>Trigger</button>} heading="Header" content="Content" isShowing />
        </div>,
      );

      const popovers = screen.getByTestId('popovers-wrapper');
      const results = await axe(popovers);

      expect(results).toHaveNoViolations();
    });
  });
});
