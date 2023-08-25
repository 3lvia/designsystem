import Card from './elvia-card';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { getThemeColor } from '@elvia/elvis-colors';
import { render, screen } from '@testing-library/react';

describe('Elvis Card', () => {
  describe('Type = simple square', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} heading={'Heading'} description={'Description'} tag={'Tag'} />);
    });

    it('should have icon', () => {
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');
    });

    it('should have header', () => {
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Heading');
    });

    it('should have description', () => {
      const description = screen.getByText('Description');
      expect(description).toBeInTheDocument();
    });

    it('should not have top border with color', () => {
      const cardColoredLine = screen.queryByTestId('card-colored-line');
      expect(cardColoredLine).toHaveStyle(`border-top: 4px solid transparent`);
    });

    it('should not have corner icon', () => {
      const cornerIcon = screen.queryByTestId('card-corner-icon');
      expect(cornerIcon).not.toBeInTheDocument();
    });

    it('should not have hover arrow', () => {
      const hoverArrow = screen.queryByTestId('card-detail-hover-arrow');
      expect(hoverArrow).not.toBeInTheDocument();
    });

    it('should not have tag', () => {
      const tag = screen.queryByTestId('card-tag');
      expect(tag).not.toBeInTheDocument();
    });

    it('should not switch icon on hover', async () => {
      const user = userEvent.setup();
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');

      await user.hover(screen.getByRole('article'));
      expect(cardIcon).toHaveTextContent('Icon');
    });

    it('should have default width', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`width: 100%`);
    });

    it('should have default minWidth', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`min-width: 150px`);
    });

    it('should have default maxWidth', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`max-width: 250px`);
    });
  });

  describe('Type = simple square with width and colored top', () => {
    beforeEach(() => {
      render(
        <Card
          icon={'Icon'}
          heading={'Heading'}
          description={'Description'}
          borderColor={'red'}
          tag={'Tag'}
          width={'150px'}
          minWidth={200}
          maxWidth={220}
        />,
      );
    });

    it('should have top border with color', () => {
      const coloredLine = screen.getByTestId('card-colored-line');
      expect(coloredLine).toHaveStyle(`border-top: 4px solid ${getThemeColor('signal-danger')}`);
    });

    it('should have a set width', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`width: 150px`);
    });

    it('should have minWidth', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`min-width: 200px`);
    });

    it('should have maxWidth', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`max-width: 220px`);
    });
  });

  describe.skip('Type = simple square, with hover icon', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} iconHover={'IconHover'} />);
    });

    it('should switch icon on hover', async () => {
      const user = userEvent.setup();
      const cardArea = screen.getByRole('article');
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');

      await user.hover(cardArea);
      expect(cardIcon).toHaveTextContent('IconHover');

      await user.unhover(cardArea);
      expect(cardIcon).toHaveTextContent('Icon');
    });
  });

  describe('Type = detail', () => {
    beforeEach(() => {
      render(
        <Card icon="" type={'detail'} tag={'Tag'} description={'Description'} cornerIcon={'CornerIcon'} />,
      );
    });

    it('should not have icon', () => {
      const cardIcon = screen.queryByTestId('card-icon');
      expect(cardIcon).not.toBeInTheDocument();
    });

    it('should have label', () => {
      const tag = screen.getByText('Tag');
      expect(tag).toBeInTheDocument();
    });

    it('should have label with styling', () => {
      const tag = screen.getByText('Tag');
      expect(tag).toHaveStyle(
        `padding: 4px 8px;
        border-radius: 4px;
        background: ${getThemeColor('background-element-3')}; 
        font-size: 11px;
        font-weight: 400;`,
      );
    });

    it('should have shape square', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle(`border-radius: 8px`);
    });

    it('should have corner icon', () => {
      const cornerIcon = screen.getByTestId('card-corner-icon');
      expect(cornerIcon).toHaveTextContent('CornerIcon');
    });

    it('should have hover arrow', () => {
      const hoverArrow = screen.getByTestId('card-detail-hover-arrow');
      expect(hoverArrow).toBeInTheDocument();
    });

    it('should have default lines of description text', () => {
      const description = screen.getByText('Description');
      expect(description).toHaveStyle(`line-clamp: 3;`);
    });
  });

  describe('Type = detail, shorter description', () => {
    beforeEach(() => {
      render(<Card type={'detail'} tag={'Tag'} description={'Description'} maxDescriptionLines={4} />);
    });

    it('should have max 4 lines of description text', () => {
      const description = screen.getByText('Description');
      expect(description).toHaveStyle(`line-clamp: 4;`);
    });

    it('should have empty corner icon', () => {
      const cornerIcon = screen.getByTestId('card-corner-icon');
      expect(cornerIcon).toHaveTextContent('');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Card className="test-class" inlineStyle={{ margin: '24px' }} />);
    });

    it('should have className and inlineStyle', () => {
      const cardArea = screen.getByRole('article');
      expect(cardArea).toHaveStyle('margin: 24px');
      expect(cardArea).toHaveClass('test-class');
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="cards">
          <Card icon={'Icon'} heading={'Heading'} description={'Description'} tag={'Tag'} />
          <Card
            icon={'Icon'}
            heading={'Heading'}
            description={'Description'}
            borderColor={'red'}
            tag={'Tag'}
            width={'150px'}
            minWidth={200}
            maxWidth={220}
          />
          <Card icon="" type={'detail'} tag={'Tag'} description={'Description'} cornerIcon={'CornerIcon'} />
        </div>,
      );

      const cards = screen.getByTestId('cards');
      const results = await axe(cards);

      expect(results).toHaveNoViolations();
    });
  });
});
