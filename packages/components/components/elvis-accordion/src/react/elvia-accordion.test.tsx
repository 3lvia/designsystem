import Accordion from './elvia-accordion.tsx';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

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
});
