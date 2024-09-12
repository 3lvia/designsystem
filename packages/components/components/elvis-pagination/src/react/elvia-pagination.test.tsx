import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import Pagination from './elvia-pagination';

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
      render(<Pagination />);
    });

    it('should have default info text', () => {
      waitFor(() => {
        const infoText = screen.queryByText('Showing');
        expect(infoText).toBeInTheDocument();
      });
    });

    it('should have default info amount', () => {
      const infoAmount = screen.queryByText('of 0 items');
      expect(infoAmount).toBeInTheDocument();
    });

    it('should not be right aligned', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`justify-content: flex-start`);
    });

    it('show have a dropdown', () => {
      const dropdown = screen.queryByRole('combobox');
      expect(dropdown).toBeInTheDocument();
    });
  });

  describe('Custom values', () => {
    beforeEach(() => {
      render(
        <Pagination
          numberOfElements={100}
          alignment={'right'}
          labelOptions={{ displaying: 'Showing', of: 'of', label: 'elements' }}
        />,
      );
    });

    it('should have info text', () => {
      const infoText = screen.getByText('Showing');
      expect(infoText).toBeVisible();
    });

    it('should have info amount', () => {
      const infoAmount = screen.getByText('of 100 elements');
      expect(infoAmount).toBeVisible();
    });

    it('should be right aligned', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`justify-content: flex-end`);
    });

    it('should have selection area', () => {
      const selectorArea = screen.queryByRole('navigation');
      expect(selectorArea).toBeInTheDocument();
    });

    it('should have hidden left arrow', () => {
      const previousButton = screen.queryByRole('button', { name: /previous page/i });
      expect(previousButton).not.toBeInTheDocument();
    });

    it('should have visible right arrow', () => {
      const nextButton = screen.queryByRole('button', { name: /next page/i });
      expect(nextButton).toBeInTheDocument();
    });

    it('should have visible left arrow after clicking right arrow', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /next page/i });

      await user.click(nextButton);
      const previousButton = screen.getByRole('button', { name: /previous page/i });
      expect(previousButton).toBeVisible();
    });

    it('should have hidden right arrow after clicking last paginator number', async () => {
      const user = userEvent.setup();

      const lastPageButton = screen.getByRole('button', { name: /select page 10/i });
      await user.click(lastPageButton);
      const nextButton = screen.queryByRole('button', { name: /next page/i });
      expect(nextButton).not.toBeInTheDocument();
    });

    it('should have both arrows visible in middle of selection range', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /next page/i });

      for (let i = 0; i < 4; i++) {
        await user.click(nextButton);
      }
      expect(nextButton).toBeVisible();
      const previousButton = screen.getByRole('button', { name: /previous page/i });
      expect(previousButton).toBeVisible();
    });

    it('it should update number of page button when the page size is changed', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);
      await user.click(screen.getByRole('option', { name: /20/ }));

      const buttons = screen.queryAllByRole('button', { name: /(select page \d+|selected page)/i }); //5 "page dots"
      expect(buttons.length).toBe(5);
    });
  });

  describe('All elements displayed', () => {
    beforeEach(() => {
      render(
        <Pagination
          numberOfElements={10}
          alignment={'right'}
          labelOptions={{ displaying: 'Showing', of: 'of', label: 'elements' }}
        />,
      );
    });

    it('should have no selection area when all elements are visible', () => {
      const selectorArea = screen.queryByRole('navigation');
      expect(selectorArea).not.toBeInTheDocument();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Pagination numberOfElements={100} className="test-class" inlineStyle={{ margin: '24px' }} />);
    });

    it('should have className and inlineStyle', () => {
      const pagination = screen.getByTestId('pagination');
      expect(pagination).toHaveStyle(`margin: 24px`);
      expect(pagination).toHaveClass(`test-class`);
    });
  });

  describe('events', () => {
    const dropdownSelectedItemIndexOnChangeEvent = jest.fn();
    const valueOnChangeEvent = jest.fn();

    beforeEach(() => {
      jest.clearAllMocks();
      render(
        <Pagination
          numberOfElements={100}
          dropdownSelectedItemIndexOnChange={dropdownSelectedItemIndexOnChangeEvent}
          valueOnChange={valueOnChangeEvent}
        />,
      );
    });

    it('should not emit any event on init', async () => {
      await waitFor(() => expect(dropdownSelectedItemIndexOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
    });

    it('dropdownSelectedItemIndexOnChange: should emit event when dropdown is clicked', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);
      await user.click(screen.getByRole('option', { name: /20/ }));
      await waitFor(() => expect(dropdownSelectedItemIndexOnChangeEvent).toHaveBeenCalledTimes(1));
    });

    it('valueOnChange: should emit event when page button is clicked', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /next page/i });
      await user.click(nextButton);
      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalledTimes(1));
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="pagination-wrapper">
          <Pagination
            numberOfElements={100}
            alignment={'right'}
            labelOptions={{ displaying: 'Showing', of: 'of', label: 'elements' }}
          />
        </div>,
      );

      const pagination = screen.getByTestId('pagination-wrapper');
      const results = await axe(pagination);

      expect(results).toHaveNoViolations();
    });
  });
});
