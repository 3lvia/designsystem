import Card from './elvia-card';
import React from 'react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { getColor } from '@elvia/elvis-colors';
import { render, screen } from '@testing-library/react';

describe('Elvis Card', () => {
  describe('Type = simple square', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} heading={'Heading'} description={'Description'} tag={'Tag'}></Card>);
    });

    it('should have icon', () => {
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');
    });

    it('should have header', () => {
      const cardHeading = screen.getByTestId('card-heading');
      expect(cardHeading).toHaveTextContent('Heading');
    });

    it('should have description', () => {
      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveTextContent('Description');
    });

    it('should have border', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
    });

    it('should not have top border with color', () => {
      const cardColoredLine = screen.queryByTestId('card-colored-line');
      expect(cardColoredLine).not.toBeInTheDocument();
    });

    it('should not have corner icon', () => {
      const cardCornerIcon = screen.queryByTestId('card-corner-icon');
      expect(cardCornerIcon).not.toBeInTheDocument();
    });

    it('should not have hover arrow', () => {
      const cardHoverArrow = screen.queryByTestId('card-detail-hover-arrow');
      expect(cardHoverArrow).not.toBeInTheDocument();
    });

    it('should not have tag', () => {
      const cardTag = screen.queryByTestId('card-tag');
      expect(cardTag).not.toBeInTheDocument();
    });

    it('should not switch icon on hover', async () => {
      const user = userEvent.setup();
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');

      await user.hover(screen.getByTestId('card-area'));
      expect(cardIcon).toHaveTextContent('Icon');
    });

    it('should have default width', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`width: 100%`);
    });

    it('should have default minWidth', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`min-width: 150px`);
    });

    it('should have default maxWidth', () => {
      const cardArea = screen.getByTestId('card-area');
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
        ></Card>,
      );
    });

    it('should have top border with color', () => {
      const cardColoredLine = screen.getByTestId('card-colored-line');
      expect(cardColoredLine).toHaveStyle(`border-top: 4px solid ${getColor('red')}`);
    });

    it('should have a set width', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`width: 150px`);
    });

    it('should have minWidth', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`min-width: 200px`);
    });

    it('should have maxWidth', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`max-width: 220px`);
    });
  });

  describe.skip('Type = simple square, with hover icon', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} iconHover={'IconHover'}></Card>);
    });

    it('should switch icon on hover', async () => {
      const user = userEvent.setup();
      const cardArea = screen.getByTestId('card-area');
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');

      await user.hover(cardArea);
      expect(cardIcon).toHaveTextContent('IconHover');

      await user.unhover(cardArea);
      expect(cardIcon).toHaveTextContent('Icon');
    });
  });

  describe('Type = simple square, no border', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} hasBorder={false}></Card>);
    });

    it('should not have standard border', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).not.toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
    });

    it('should have grey border (to match "on grey")', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).not.toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
    });
  });

  describe('Type = detail', () => {
    beforeEach(() => {
      render(
        <Card
          icon=""
          type={'detail'}
          tag={'Tag'}
          description={'Description'}
          cornerIcon={'CornerIcon'}
        ></Card>,
      );
    });

    it('should not have icon', () => {
      const cardIcon = screen.queryByTestId('card-icon');
      expect(cardIcon).not.toBeInTheDocument();
    });

    it('should have label', () => {
      const cardTag = screen.getByTestId('card-tag');
      expect(cardTag).toHaveTextContent('Tag');
    });

    it('should have label with styling', () => {
      const cardTag = screen.getByTestId('card-tag');
      expect(cardTag).toHaveStyle(
        `padding: 4px 8px;
        border-radius: 4px;
        background: ${getColor('grey-10')}; 
        font-size: 11px;
        font-weight: 400;`,
      );
    });

    it('should have shape square', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`border-radius: 8px`);
    });

    it('should have corner icon', () => {
      const cardCornerIcon = screen.getByTestId('card-corner-icon');
      expect(cardCornerIcon).toHaveTextContent('CornerIcon');
    });

    it('should have hover arrow', () => {
      const cardHoverArrow = screen.getByTestId('card-detail-hover-arrow');
      expect(cardHoverArrow).toBeInTheDocument();
    });

    it('should have default lines of description text', () => {
      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveStyle(`line-clamp: 3;`);
    });
  });

  describe('Type = detail, shorter description', () => {
    beforeEach(() => {
      render(<Card type={'detail'} tag={'Tag'} description={'Description'} maxDescriptionLines={4}></Card>);
    });

    it('should have max 4 lines of description text', () => {
      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveStyle(`line-clamp: 4;`);
    });

    it('should have empty corner icon', () => {
      const cardCornerIcon = screen.getByTestId('card-corner-icon');
      expect(cardCornerIcon).toHaveTextContent('');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(<Card className="test-class" inlineStyle={{ margin: '24px' }}></Card>);
    });

    it('should have className and inlineStyle', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle('margin: 24px');
      expect(cardArea).toHaveClass('test-class');
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="cards">
          <Card icon={'Icon'} heading={'Heading'} description={'Description'} tag={'Tag'}></Card>
          <Card
            icon={'Icon'}
            heading={'Heading'}
            description={'Description'}
            borderColor={'red'}
            tag={'Tag'}
            width={'150px'}
            minWidth={200}
            maxWidth={220}
          ></Card>
          <Card
            icon=""
            type={'detail'}
            tag={'Tag'}
            description={'Description'}
            cornerIcon={'CornerIcon'}
          ></Card>
        </div>,
      );

      const cards = screen.getByTestId('cards');
      const results = await axe(cards);

      expect(results).toHaveNoViolations();
    });
  });
});
