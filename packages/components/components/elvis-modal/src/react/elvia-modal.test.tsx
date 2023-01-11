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
      const modalContainer = screen.getByTestId('modal-container');
      expect(modalContainer).toHaveStyle('display: none');
    });

    it('should have primary btn', () => {
      const modalPrimaryBtn = screen.queryByTestId('modal-primary-btn');
      expect(modalPrimaryBtn).toBeInTheDocument();
    });

    it('should not have secondary btn', () => {
      const modalSecondaryBtn = screen.queryByTestId('modal-secondaory-btn');
      expect(modalSecondaryBtn).not.toBeInTheDocument();
    });

    it('should have heading', () => {
      const modalHeading = screen.getByTestId('modal-heading');
      expect(modalHeading).toHaveTextContent('Title');
    });

    it('should have content', () => {
      const modalContent = screen.getByTestId('modal-content');
      expect(modalContent).toHaveTextContent('Content');
    });

    it('should not have illustration', () => {
      const modalIllustration = screen.queryByTestId('modal-illustration');
      expect(modalIllustration).not.toBeInTheDocument();
    });

    it('should not have close btn', () => {
      const modalCloseBtn = screen.queryByTestId('modal-close-btn');
      expect(modalCloseBtn).not.toBeInTheDocument();
    });
  });

  describe('Visible', () => {
    beforeEach(() => {
      render(
        <Modal
          heading="Title"
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
      const modalContainer = screen.getByTestId('modal-container');
      expect(modalContainer).not.toHaveStyle('display: none');
    });

    it('should have secondary btn', () => {
      const modalSecondaryBtn = screen.getByTestId('modal-secondary-btn');
      expect(modalSecondaryBtn).toBeInTheDocument();
    });

    it('should have illustration', () => {
      const modalIllustration = screen.getByTestId('modal-illustration');
      expect(modalIllustration).toBeInTheDocument();
    });

    it('should have close btn', () => {
      const modalCloseBtn = screen.getByTestId('modal-close-btn');
      expect(modalCloseBtn).toBeInTheDocument();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Modal
          heading="Title"
          content={<p>Content</p>}
          primaryButton={<button>Primary</button>}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
          isShowing
        ></Modal>,
      );
    });

    it('should have className and inlineStyle', () => {
      const modalWrapper = screen.getByTestId('modal-wrapper');
      expect(modalWrapper).toHaveStyle('margin: 24px');
      expect(modalWrapper).toHaveClass('test-class');
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
