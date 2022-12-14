import Box from './elvia-box';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  green: getColor('green'),
  grey10: getColor('grey-10'),
};

const htmlCode = <div>Html content</div>;

describe('Elvis Box', () => {
  describe('Title = Hello', () => {
    beforeEach(() => {
      render(<Box title="Hello Box" content=""></Box>);
    });

    it('should have title containing "Hello Box"', () => {
      const boxTitle = screen.getByTestId('box-title');
      expect(boxTitle).toHaveTextContent('Hello Box');
    });

    it('should not have className undefined', () => {
      const boxArea = screen.getByTestId('box-area');
      expect(boxArea).not.toHaveClass('undefined');
    });
  });

  describe('Content = "Some content", isColored = true', () => {
    beforeEach(() => {
      render(<Box isColored content="Some content"></Box>);
    });

    it('should show content of string "Some content"', () => {
      const boxContent = screen.getByTestId('box-content');
      expect(boxContent).toHaveTextContent('Some content');
    });

    it('should have green boxColored line', () => {
      const boxColoredLineWithContent = screen.getByTestId('box-colored-line');
      expect(boxColoredLineWithContent).toHaveStyle(`background: ${colors.green}`);
    });
  });

  describe('Content = html', () => {
    beforeEach(() => {
      render(<Box isColored content={htmlCode}></Box>);
    });

    it('should show content of html code containing "Html content"', () => {
      const boxContent = screen.getByTestId('box-content');
      expect(boxContent).toHaveTextContent('Html content');
    });
  });

  describe('hasBorder = true', () => {
    beforeEach(() => {
      render(<Box hasBorder content=""></Box>);
    });

    it('should show box content with a grey border', () => {
      const boxContent = screen.getByTestId('box-content');
      expect(boxContent).toHaveStyle(`border: 1px solid ${colors.grey10}`);
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Box content="" className={'test-class'} inlineStyle={{ margin: '24px' }}></Box>);
    });

    it('should have className and inlineStyle from props', () => {
      const boxArea = screen.getByTestId('box-area');
      expect(boxArea).toHaveStyle(`margin: 24px`);
      expect(boxArea).toHaveClass('test-class');
    });
  });
});
