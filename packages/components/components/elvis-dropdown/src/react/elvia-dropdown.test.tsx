import Dropdown from './elvia-dropdown';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { DropdownItem } from './elviaDropdown.types';

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

describe('Elvis Dropdown', () => {
  describe('on desktop', () => {
    beforeEach(() => {
      mockMatchMedia({ isGtMobile: true });
    });

    describe('Default', () => {
      beforeEach(() => {
        const items: DropdownItem[] = [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ];
        render(<Dropdown label={'Label'} items={items}></Dropdown>);
      });

      it('should have label', () => {
        const dropdownLabel = screen.getByTestId('label');
        expect(dropdownLabel).toHaveTextContent('Label');
      });

      it('should not be disabled', () => {
        const dropdownWrapper = screen.getByTestId('input-container');
        expect(dropdownWrapper).toHaveStyle('cursor: pointer');
      });

      it('should not be compact', () => {
        const dropdownLabel = screen.getByTestId('label');
        expect(dropdownLabel).toHaveStyle(`font-size: 16px; line-height: 23px`);
      });

      it('should not have error message', () => {
        const dropdownError = screen.queryByTestId('error');
        expect(dropdownError).not.toBeInTheDocument();
      });

      it('should not be full width', () => {
        const dropdownWrapper = screen.getByTestId('wrapper');
        expect(dropdownWrapper).toHaveStyle('max-width: 448px');
      });
    });

    describe('Compact, disabled', () => {
      beforeEach(() => {
        render(<Dropdown label="Label" isCompact isDisabled items={[]}></Dropdown>);
      });

      it('should be disabled', () => {
        const dropdownWrapper = screen.getByTestId('input-container');
        expect(dropdownWrapper).toHaveStyle('cursor: not-allowed');
      });

      it('should be compact', () => {
        const dropdownLabel = screen.getByTestId('wrapper');
        expect(dropdownLabel).toHaveStyle(`padding-top: 0.5rem`);
      });
    });

    describe('Error', () => {
      beforeEach(() => {
        render(<Dropdown errorMessage="Error" items={[]}></Dropdown>);
      });

      it('should have error message', () => {
        const dropdownError = screen.queryByTestId('error');
        expect(dropdownError).toHaveTextContent('Error');
      });
    });

    describe('Full width', () => {
      beforeEach(() => {
        render(<Dropdown label="Label" isFullWidth items={[]}></Dropdown>);
      });

      it('should be full width', () => {
        const dropdownWrapper = screen.getByTestId('wrapper');
        expect(dropdownWrapper).not.toHaveStyle('max-width: 448px');
      });
    });

    describe('className and inlineStyle passed to wrapper', () => {
      beforeEach(() => {
        render(<Dropdown className="test-class" inlineStyle={{ margin: '24px' }} items={[]}></Dropdown>);
      });

      it('should have className and inlineStyle', () => {
        const dropdownWrapper = screen.getByTestId('wrapper');
        expect(dropdownWrapper).toHaveStyle('margin: 24px');
        expect(dropdownWrapper).toHaveClass('test-class');
      });
    });
  });
});
