import Box from './elvia-box';
import React from 'react';
import { axe } from 'jest-axe';
import { getThemeColor } from '@elvia/elvis-colors';
import { render, screen } from '@testing-library/react';

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
      expect(boxColoredLineWithContent).toHaveStyle(`background: ${getThemeColor('state-on')}`);
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

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="boxes">
          <Box title="Hello Box" content=""></Box>
          <Box isColored content="Some content"></Box>
        </div>,
      );

      const boxes = screen.getByTestId('boxes');
      const results = await axe(boxes);

      expect(results).toHaveNoViolations();
    });
  });
});
