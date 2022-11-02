import Dropdown from './elvia-dropdown';
import React from 'react';
import { render, screen } from '@testing-library/react';

describe('Elvis Dropdown', () => {
  describe('Default', () => {
    beforeEach(() => {
      render(
        <Dropdown
          label={'Label'}
          items={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        ></Dropdown>,
      );
    });
    it('should have label', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).toHaveTextContent('Label');
    });

    it('should not be disabled', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).toHaveStyle('cursor: pointer');
    });

    it('should not be compact', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).not.toHaveStyle(`position: absolute; top: -5px; left: 8px;`);
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
      render(<Dropdown isCompact isDisabled items={[]}></Dropdown>);
    });

    it('should be disabled', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).toHaveStyle('cursor: not-allowed');
    });

    it('should be compact', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
    });

    it('should not have error message', () => {
      const dropdownError = screen.queryByTestId('error');
      expect(dropdownError).not.toBeInTheDocument();
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
      render(<Dropdown isFullWidth items={[]}></Dropdown>);
    });

    it('should be full width', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('max-width: 448px');
    });

    it('should not be disabled', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('cursor: not-allowed');
    });

    it('should not be compact', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).not.toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
    });

    it('should not have error message', () => {
      const dropdownError = screen.queryByTestId('error');
      expect(dropdownError).not.toBeInTheDocument();
    });
  });

  describe('Full width, compact', () => {
    beforeEach(() => {
      render(<Dropdown isFullWidth isCompact items={[]}></Dropdown>);
    });

    it('should be full width', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('max-width: 448px');
    });

    it('should not be disabled', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('cursor: not-allowed');
    });

    it('should be compact', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
    });

    it('should not have error message', () => {
      const dropdownError = screen.queryByTestId('error');
      expect(dropdownError).not.toBeInTheDocument();
    });
  });

  describe('Full width, compact, disabled', () => {
    beforeEach(() => {
      render(<Dropdown isFullWidth isCompact isDisabled items={[]}></Dropdown>);
    });

    it('should be full width', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).not.toHaveStyle('max-width: 448px');
    });

    it('should be disabled', () => {
      const dropdownWrapper = screen.getByTestId('wrapper');
      expect(dropdownWrapper).toHaveStyle('cursor: not-allowed');
    });

    it('should be compact', () => {
      const dropdownLabel = screen.getByTestId('label');
      expect(dropdownLabel).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
    });

    it('should not have error message', () => {
      const dropdownError = screen.queryByTestId('error');
      expect(dropdownError).not.toBeInTheDocument();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Dropdown className="test-class" inlineStyle={{ margin: '24px' }} items={[]}></Dropdown>);
    });

    it('should have className and inlineStyle', () => {
      const dropdownWrapper = screen.getByTestId('wrapper').parentElement;
      expect(dropdownWrapper).toHaveStyle('margin: 24px');
      expect(dropdownWrapper).toHaveClass('test-class');
    });
  });
});
