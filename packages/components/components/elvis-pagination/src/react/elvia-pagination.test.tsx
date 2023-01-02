import React from 'react';
import Pagination from './elvia-pagination';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

const mockMatchMedia = (opts?: Partial<{ isGtMobile: boolean }>) => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: opts?.isGtMobile,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
};

describe('Elvis Pagination', () => {
  describe('Default values', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: true });
      render(<Pagination></Pagination>);
    });

    it('should have default info text', () => {
      const infoText = screen.getByTestId('info-text');
      expect(infoText).toHaveTextContent(`Viser`);
    });

    it('should have default info amount', () => {
      const infoAmount = screen.getByTestId('info-amount');
      expect(infoAmount).toHaveTextContent(`av 0 elementer`);
    });

    it('should not be right aligned', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`justify-content: flex-start`);
    });

    it('should have hidden left arrow', () => {
      const selectorArrowBtnLeft = screen.getByTestId('selector-arrow-btn-left');
      expect(selectorArrowBtnLeft).toHaveStyle(`visibility: hidden`);
    });

    it('should have hidden right arrow', () => {
      const selectorArrowBtnRight = screen.getByTestId('selector-arrow-btn-right');
      expect(selectorArrowBtnRight).toHaveStyle(`visibility: hidden`);
    });
  });

  describe('Custom values', () => {
    beforeEach(() => {
      render(
        <Pagination
          numberOfElements={100}
          alignment={'right'}
          labelOptions={{ displaying: 'Showing', of: 'of', label: 'elements' }}
        ></Pagination>,
      );
    });

    it('should have info text', () => {
      const infoText = screen.getByTestId('info-text');
      expect(infoText).toHaveTextContent(`Showing`);
    });

    it('should have info amount', () => {
      const infoAmount = screen.getByTestId('info-amount');
      expect(infoAmount).toHaveTextContent(`of 100 elements`);
    });

    it('should be right aligned', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`justify-content: flex-end`);
    });

    it('should have hidden left arrow', () => {
      const selectorArrowBtnLeft = screen.getByTestId('selector-arrow-btn-left');
      expect(selectorArrowBtnLeft).toHaveStyle(`visibility: hidden`);
    });

    it('should have visible right arrow', () => {
      const selectorArrowBtnRight = screen.getByTestId('selector-arrow-btn-right');
      expect(selectorArrowBtnRight).toHaveStyle(`visibility: visible`);
    });

    it('should have visible left arrow after clicking right arrow', async () => {
      const user = userEvent.setup();
      const selectorArrowBtnRight = screen.getByTestId('selector-arrow-btn-right');

      await user.click(selectorArrowBtnRight);
      const selectorArrowBtnLeft = screen.getByTestId('selector-arrow-btn-left');
      expect(selectorArrowBtnLeft).toHaveStyle(`visibility: visible`);
    });

    it('should have hidden right arrow after clicking last paginator number', async () => {
      const user = userEvent.setup();

      const lastPageButton = screen.getByTestId('paginator-button-9');
      await user.click(lastPageButton);
      const selectorArrowBtnRight = screen.getByTestId('selector-arrow-btn-right');
      expect(selectorArrowBtnRight).toHaveStyle(`visibility: hidden`);
    });

    it('should have both arrows visible in middle of selection range', async () => {
      const user = userEvent.setup();

      for (let i = 0; i < 4; i++) {
        await user.click(screen.getByTestId('selector-arrow-btn-right'));
      }
      const selectorArrowBtnRight = screen.getByTestId('selector-arrow-btn-right');
      expect(selectorArrowBtnRight).toHaveStyle(`visibility: visible`);
      const selectorArrowBtnLeft = screen.getByTestId('selector-arrow-btn-left');
      expect(selectorArrowBtnLeft).toHaveStyle(`visibility: visible`);
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Pagination
          numberOfElements={100}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        ></Pagination>,
      );
    });

    it('should have className and inlineStyle', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`margin: 24px`);
      expect(pagination).toHaveClass(`test-class`);
    });
  });

  describe.skip('the accessibility', () => {
    /* will fail if there are multiple paginators on same page -> considered user error */
    /* depends on fixes in dropdown before this test can be un-skipped */
    it('should have no axe violations', async () => {
      render(
        <div data-testid="paginations">
          <Pagination />
          <Pagination
            numberOfElements={100}
            alignment={'right'}
            labelOptions={{ displaying: 'Showing', of: 'of', label: 'elements' }}
          />
        </div>,
      );

      const paginations = screen.getByTestId('paginations');
      const results = await axe(paginations);

      expect(results).toHaveNoViolations();
    });
  });
});
