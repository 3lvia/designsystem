import { Accordion } from './elvia-accordion';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';

describe('Elvis Accordion', () => {
  describe('Type = normal', () => {
    beforeEach(() => {
      render(
        <Accordion
          labelPosition="center"
          openLabel="open"
          closeLabel="close"
          content="TextContent"
          type="normal"
        />,
      );
    });

    it('should show open label if not opened', () => {
      const accordionButton = screen.getByTestId('accordion-button-label');
      expect(accordionButton).toHaveTextContent('open');
    });

    it('should show close label if opened', async () => {
      const user = userEvent.setup();
      const accordionButton = screen.getByTestId('accordion-button-label');
      await user.click(accordionButton);
      expect(accordionButton).toHaveTextContent('close');
    });

    it('should not show content if not opened', () => {
      const accordionButtonNormal = screen.getByTestId('accordion-content-normal');
      expect(accordionButtonNormal).toHaveStyle('opacity: 0');
    });

    it('should show content if opened', async () => {
      const user = userEvent.setup();
      const accordionButton = screen.getByTestId('accordion-button-label');
      await user.click(accordionButton);

      const accordionButtonNormal = screen.getByTestId('accordion-content-normal');
      expect(accordionButtonNormal).toHaveStyle('opacity: 1');
    });
  });

  describe('Type = overflow', () => {
    beforeEach(() => {
      render(
        <Accordion
          labelPosition="center"
          openLabel="open"
          closeLabel="close"
          content="TextContent"
          type="overflow"
        ></Accordion>,
      );
    });

    it('should show content if not opened', () => {
      const accordionContentOverflow = screen.getByTestId('accordion-content-overflow');
      expect(accordionContentOverflow).toHaveStyle('opacity: 1');
    });

    it('should show content if opened', async () => {
      const user = userEvent.setup();
      const accordionButton = screen.getByTestId('accordion-button-label');
      await user.click(accordionButton);

      const accordionContentOverflow = screen.getByTestId('accordion-content-overflow');
      expect(accordionContentOverflow).toHaveStyle('opacity: 1');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Accordion content="TextContent" className="test-class" inlineStyle={{ margin: '24px' }}></Accordion>,
      );
    });

    it('should have className and inlineStyle', () => {
      const accordionArea = screen.getByTestId('accordion-area');

      expect(accordionArea).toHaveStyle('margin: 24px');
      expect(accordionArea).toHaveClass('test-class');
    });
  });

  describe('Events', () => {
    const onCloseEvent = jest.fn();
    const onOpenEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(<Accordion content="I am content" onClose={onCloseEvent} onOpen={onOpenEvent} />);
    });

    it('should not emit event when idle', async () => {
      await waitFor(() => expect(onOpenEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(onCloseEvent).not.toHaveBeenCalled());
    });

    it('onOpenEvent: should emit the onOpen event when user presses the accordion button', async () => {
      const user = userEvent.setup();
      const accordionButton = screen.getByTestId('accordion-button-label');
      await user.click(accordionButton);

      await waitFor(() => expect(onOpenEvent).toHaveBeenCalledTimes(1));
    });

    it('onCloseEvent: should emit the onClose event when user presses the accordion button when open', async () => {
      const user = userEvent.setup();
      const accordionButton = screen.getByTestId('accordion-button-label');
      await user.click(accordionButton); //open it first
      await user.click(accordionButton); //then close it

      await waitFor(() => expect(onCloseEvent).toHaveBeenCalledTimes(1));
      await waitFor(() => expect(onOpenEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="accordions">
          <Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
            type="normal"
          />
          <Accordion
            labelPosition="center"
            openLabel="open"
            closeLabel="close"
            content="TextContent"
            type="normal"
          />
        </div>,
      );

      const accordions = screen.getByTestId('accordions');
      const results = await axe(accordions);

      expect(results).toHaveNoViolations();
    });
  });
});
