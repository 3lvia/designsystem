import Divider from './elvia-divider';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey90: getColor('grey-90'),
};

describe('Elvis Divider', () => {
  describe('Type = Simple', () => {
    beforeEach(() => {
      render(<Divider type="simple"></Divider>);
    });

    it('should have border-bottom 1px solid', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle('border-bottom: 1px solid');
    });

    it('should have color grey10', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.grey10}`);
    });
  });

  describe('Type = Simple, Orientation = Vertical', () => {
    beforeEach(() => {
      render(<Divider type="simple" orientation="vertical"></Divider>);
    });

    it('should show vertical border', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle('border-left: 1px solid');
    });

    it('should have color grey10', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.grey10}`);
    });
  });

  describe('Type = Simple, Inverted', () => {
    beforeEach(() => {
      render(<Divider type="simple" isInverted={true}></Divider>);
    });

    it('should have color grey90', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.grey90}`);
    });
  });

  describe('Type = Curved', () => {
    beforeEach(() => {
      render(<Divider type="curved"></Divider>);
    });

    it('should not have border-bottom at dividerarea', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-bottom: none;`);
    });
  });

  describe('Type = Curved, Inverted', () => {
    beforeEach(() => {
      render(<Divider type="curved" isInverted={true}></Divider>);
    });

    it('should have color grey90', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.grey90}`);
    });
  });

  describe('Type = Title', () => {
    beforeEach(() => {
      render(<Divider type="title" title={<h2>Title</h2>}></Divider>);
    });

    it('should have border-bottom 1px solid', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle('border-bottom: 1px solid');
    });

    it('should have color black', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.elviaBlack}`);
    });

    it('should have md typography', () => {
      const dividerTitle = screen.getByTestId('divider-title');
      expect(dividerTitle).toHaveStyle('text-transform: unset');
      expect(dividerTitle).toHaveStyle('font-size: 30px');
    });
  });

  describe('Type = Title, Typography = Caps', () => {
    beforeEach(() => {
      render(<Divider type="title" title={<h2>Title</h2>} typography="caps"></Divider>);
    });

    it('should have caps typography', () => {
      const dividerTitle = screen.getByTestId('divider-title');
      expect(dividerTitle).toHaveStyle('text-transform: uppercase');
      expect(dividerTitle).toHaveStyle('font-size: 14px');
    });
  });

  describe('Type = Title, Inverted', () => {
    beforeEach(() => {
      render(<Divider type="title" title={<h2>Title</h2>} isInverted={true}></Divider>);
    });

    it('should have color white', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`border-color: ${colors.elviaWhite}`);
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Divider className="test-class" inlineStyle={{ margin: '24px' }}></Divider>);
    });

    it('should have className and inlineStyle', () => {
      const dividerArea = screen.getByTestId('divider-area');
      expect(dividerArea).toHaveStyle(`margin: 24px`);
      expect(dividerArea).toHaveClass(`test-class`);
    });
  });
});
