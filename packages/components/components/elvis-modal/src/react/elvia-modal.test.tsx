import React from 'react';
import Modal from './elvia-modal';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

describe('Elvis Modal', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(
        <Modal
          isShowing={false}
          heading="Title"
          content={<p>Content</p>}
          primaryButton={<button>Primary</button>}
        ></Modal>,
      );
    });

    it('should not be visible', () => {
      const container = screen.getByRole('dialog', { hidden: true });
      expect(container).not.toBeVisible();
    });

    it('should have primary button', () => {
      const primaryButton = screen.getByText('Primary');
      expect(primaryButton).toBeInTheDocument();
    });

    it('should not have secondary button', () => {
      const secondaryButton = screen.queryByText('Secondary');
      expect(secondaryButton).not.toBeInTheDocument();
    });

    it('should have heading', () => {
      const heading = screen.getByRole('heading', { level: 2, hidden: true });
      expect(heading).toBeInTheDocument();
    });

    it('should have content', () => {
      const content = screen.getByTestId('modal-content');
      expect(content).toHaveTextContent('Content');
    });

    it('should not have illustration', () => {
      const illustration = screen.queryByRole('presentation');
      expect(illustration).not.toBeInTheDocument();
    });

    it('should not have close button', () => {
      const closeButton = screen.queryByRole('button', { name: 'Lukk modal' });
      expect(closeButton).not.toBeInTheDocument();
    });
  });

  describe('Visible', () => {
    beforeEach(() => {
      render(
        <Modal
          content={<p>Content</p>}
          primaryButton={<button>Primary</button>}
          secondaryButton={<button>Secondary</button>}
          illustration={<svg />}
          hasCloseButton
          isShowing
        ></Modal>,
      );
    });

    it('should be visible', () => {
      const container = screen.getByRole('dialog');
      expect(container).toBeVisible();
    });

    it('should have secondary button', () => {
      const secondaryButton = screen.getByText('Secondary');
      expect(secondaryButton).toBeInTheDocument();
    });

    it('should have illustration', () => {
      const illustration = screen.getByRole('presentation');
      expect(illustration).toBeInTheDocument();
    });

    it('should have close button', () => {
      const closeButton = screen.getByRole('button', { name: 'Lukk modal' });
      expect(closeButton).toBeInTheDocument();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Modal
          content={<p>Content</p>}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
          isShowing
        ></Modal>,
      );
    });

    it('should have className and inlineStyle', () => {
      const wrapper = screen.getByTestId('modal-wrapper');
      expect(wrapper).toHaveStyle('margin: 24px');
      expect(wrapper).toHaveClass('test-class');
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="modals">
          <Modal
            isShowing={false}
            heading="Title"
            content={<p>Content</p>}
            primaryButton={<button>Primary</button>}
          ></Modal>
          <Modal
            heading="Title"
            content={<p>Content</p>}
            primaryButton={<button>Primary</button>}
            secondaryButton={<button>Secondary</button>}
            illustration={<svg />}
            hasCloseButton
            isShowing
          ></Modal>
        </div>,
      );

      const modals = screen.getByTestId('modals');
      const results = await axe(modals);

      expect(results).toHaveNoViolations();
    });
  });
});
