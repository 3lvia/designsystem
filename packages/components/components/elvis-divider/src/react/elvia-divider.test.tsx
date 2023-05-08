import Divider from './elvia-divider';
import React from 'react';
import { axe } from 'jest-axe';
import { getThemeColor } from '@elvia/elvis-colors';
import { render, screen } from '@testing-library/react';

describe('Elvis Divider', () => {
  describe('Type = Simple', () => {
    beforeEach(() => {
      render(<Divider type="simple" />);
    });

    it('should have border-bottom 1px solid', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle('border-bottom: 1px solid');
    });

    it('should have border 2', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-color: ${getThemeColor('border-2')}`);
    });
  });

  describe('Type = Simple, Orientation = Vertical', () => {
    beforeEach(() => {
      render(<Divider type="simple" orientation="vertical" />);
    });

    it('should show vertical border', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle('border-left: 1px solid');
    });
  });

  describe('Type = Curved', () => {
    beforeEach(() => {
      render(<Divider type="curved" />);
    });

    it('should not have border-bottom at separator', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-bottom: none;`);
    });
  });

  describe('Type = Heading', () => {
    beforeEach(() => {
      render(<Divider type="heading" heading={<h2>Heading</h2>} />);
    });

    it('should have border-bottom 1px solid', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle('border-bottom: 1px solid');
    });

    it('should have border 1', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-color: ${getThemeColor('border-1')}`);
    });

    it('should have md typography', () => {
      const dividerHeading = screen.getByTestId('divider-heading');
      expect(dividerHeading).toHaveStyle('text-transform: unset');
      expect(dividerHeading).toHaveStyle('font-size: 30px');
    });
  });

  describe('Type = Heading, Typography = Caps', () => {
    beforeEach(() => {
      render(<Divider type="heading" heading={<h2>Heading</h2>} typography="caps" />);
    });

    it('should have caps typography', () => {
      const dividerHeading = screen.getByTestId('divider-heading');
      expect(dividerHeading).toHaveStyle('text-transform: uppercase');
      expect(dividerHeading).toHaveStyle('font-size: 14px');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Divider className="test-class" inlineStyle={{ margin: '24px' }} />);
    });

    it('should have className and inlineStyle', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`margin: 24px`);
      expect(dividerArea).toHaveClass(`test-class`);
    });
  });

  describe('the accessability', () => {
    beforeEach(() => {
      render(
        <div data-testid="dividers">
          <Divider type="simple" />
          <Divider type="heading" heading={<h2>Heading</h2>} />
        </div>,
      );
    });

    it('should have no axe violations', async () => {
      const dividers = screen.getByTestId('dividers');
      const results = await axe(dividers);
      expect(results).toHaveNoViolations();
    });
  });
});
