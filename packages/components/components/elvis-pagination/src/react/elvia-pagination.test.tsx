import React from 'react';
import Pagination from './elvia-pagination';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, waitFor } from '@testing-library/react';

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
      const infoText = screen.queryByText('Viser');
      expect(infoText).toBeInTheDocument();
    });

    it('should have default info amount', () => {
      const infoAmount = screen.queryByText('av 0 elementer');
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
      const previousButton = screen.queryByRole('button', { name: /forrige side/i });
      expect(previousButton).not.toBeInTheDocument();
    });

    it('should have visible right arrow', () => {
      const nextButton = screen.queryByRole('button', { name: /neste side/i });
      expect(nextButton).toBeInTheDocument();
    });

    it('should have visible left arrow after clicking right arrow', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste side/i });

      await user.click(nextButton);
      const previousButton = screen.getByRole('button', { name: /forrige side/i });
      expect(previousButton).toBeVisible();
    });

    it('should have hidden right arrow after clicking last paginator number', async () => {
      const user = userEvent.setup();

      const lastPageButton = screen.getByRole('button', { name: /velg side 10/i });
      await user.click(lastPageButton);
      const nextButton = screen.queryByRole('button', { name: /neste side/i });
      expect(nextButton).not.toBeInTheDocument();
    });

    it('should have both arrows visible in middle of selection range', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste side/i });

      for (let i = 0; i < 4; i++) {
        await user.click(nextButton);
      }
      expect(nextButton).toBeVisible();
      const previousButton = screen.getByRole('button', { name: /forrige side/i });
      expect(previousButton).toBeVisible();
    });

    it('it should update number of page button when the page size is changed', async () => {
      const user = userEvent.setup();
      const dropdown = screen.getByRole('combobox');
      await user.click(dropdown);
      await user.click(screen.getByRole('option', { name: /20/ }));

      const buttons = screen.queryAllByRole('button', { name: /(velg side \d+|valgt side)/i }); //5 "page dots"
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
    let dropdownSelectedItemIndexOnChangeEvent: jest.Mock;
    let valueOnChangeEvent: jest.Mock;

    beforeEach(() => {
      dropdownSelectedItemIndexOnChangeEvent = jest.fn();
      valueOnChangeEvent = jest.fn();

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
      await waitFor(() => expect(dropdownSelectedItemIndexOnChangeEvent).toHaveBeenCalled());
    });

    it('valueOnChange: should emit event when page button is clicked', async () => {
      const user = userEvent.setup();
      const nextButton = screen.getByRole('button', { name: /neste side/i });
      await user.click(nextButton);
      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalled());
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
