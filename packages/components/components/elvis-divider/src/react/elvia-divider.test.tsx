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

    it('should have color "background-accent"', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-color: ${getThemeColor('background-accent')}`);
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

    it('should have color "background-accent"', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-color: ${getThemeColor('background-accent')}`);
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

    it('should be horizontal by default', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`height: 4vw;`);
    });
  });

  describe('Type = Curved, Orientation = Vertical', () => {
    beforeEach(() => {
      render(<Divider type="curved" orientation="vertical" />);
    });

    it('should be vertical', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`width: 4vw;`);
    });
  });

  describe('Type = Title', () => {
    beforeEach(() => {
      render(<Divider type="title" title={<h2>Title</h2>} />);
    });

    it('should have border-bottom 1px solid', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle('border-bottom: 1px solid');
    });

    it('should have the color "text-primary"', () => {
      const dividerArea = screen.getByRole('separator');
      expect(dividerArea).toHaveStyle(`border-color: ${getThemeColor('text-primary')}`);
    });

    it('should have md typography', () => {
      const dividerTitle = screen.getByTestId('divider-title');
      expect(dividerTitle).toHaveStyle('text-transform: unset');
      expect(dividerTitle).toHaveStyle('font-size: 30px');
    });
  });

  describe('Type = Title, Typography = Caps', () => {
    beforeEach(() => {
      render(<Divider type="title" title={<h2>Title</h2>} typography="caps" />);
    });

    it('should have caps typography', () => {
      const dividerTitle = screen.getByTestId('divider-title');
      expect(dividerTitle).toHaveStyle('text-transform: uppercase');
      expect(dividerTitle).toHaveStyle('font-size: 14px');
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
          <Divider type="title" title={<h2>Title</h2>} />
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
