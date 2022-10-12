import Card from './elvia-card.tsx';
import React from 'react';
import { render, screen } from '@testing-library/react';
import { getColor } from '@elvia/elvis-colors';
import userEvent from '@testing-library/user-event';

describe('Elvis Card', () => {
  describe('Type = simple square', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} header={'Header'} description={'Description'} label={'Label'}></Card>);
    });

    it('should have icon', () => {
      const cardIcon = screen.getByTestId('card-icon');
      expect(cardIcon).toHaveTextContent('Icon');
    });

    it('should have header', () => {
      const cardHeader = screen.getByTestId('card-header');
      expect(cardHeader).toHaveTextContent('Header');
    });

    it('should have description', () => {
      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveTextContent('Description');
    });

    it('should have shape square', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`border-radius: 8px`);
    });

    it('should have border', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
    });

    it('should not have top border with color', () => {
      const cardColoredLine = screen.queryByTestId('card-colored-line');
      expect(cardColoredLine).not.toBeInTheDocument();
    });

    // TODO: Figure out how to test css states (e.g. :hover)
    // it('should not have top border with color on hover', () => {
    //   wrapper.simulate('mouseenter');
    //   expect(cardColoredLine.at(0).getDOMNode()).not.toHaveStyle(`border-top: 4px solid ${getColor('red')}`);
    //   done();
    // });

    // it('should switch border on hover', () => {
    //   expect(cardArea.at(0).getDOMNode()).toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
    //   //   wrapper.simulate('mouseenter');
    //   expect(cardArea.at(0).getDOMNode()).toHaveStyle(`border: 2px solid ${getColor('elvia-charge')}`);
    //   done();
    // });

    it('should not have corner icon', () => {
      const cardCornerIcon = screen.queryByTestId('card-corner-icon');
      expect(cardCornerIcon).not.toBeInTheDocument();
    });

    it('should not have hover arrow', () => {
      const cardHoverArrow = screen.queryByTestId('card-detail-hover-arrow');
      expect(cardHoverArrow).not.toBeInTheDocument();
    });

    it('should not have label', () => {
      const cardLabel = screen.queryByTestId('card-label');
      expect(cardLabel).not.toBeInTheDocument();
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
      expect(cardArea).toHaveStyle(`min-width: 112px`);
    });

    it('should have default maxWidth', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`max-width: 400px`);
    });
  });

  describe('Type = simple square with width and colored top', () => {
    beforeEach(() => {
      render(
        <Card
          icon={'Icon'}
          header={'Header'}
          description={'Description'}
          borderColor={'red'}
          label={'Label'}
          width={'150px'}
          minWidth={150}
          maxWidth={350}
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
      expect(cardArea).toHaveStyle(`min-width: 150px`);
    });

    it('should have maxWidth', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`max-width: 350px`);
    });
  });

  describe('Type = simple square, with hover icon', () => {
    beforeEach(() => {
      render(<Card icon={'Icon'} iconHover={'IconHover'} minWidth={50}></Card>);
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

  describe('Type = simple circle', () => {
    beforeEach(() => {
      render(
        <Card
          shape={'circle'}
          icon={'Icon'}
          header={'Header'}
          description={'Description'}
          borderColor={'red'}
          cornerIcon={'CornerIcon'}
        ></Card>,
      );
    });

    it('should have shape circle', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle(`border-radius: 50%`);
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
  });

  describe('Type = detail', () => {
    beforeEach(() => {
      render(
        <Card
          type={'detail'}
          label={'Label'}
          description={'Description'}
          cornerIcon={'CornerIcon'}
          shape={'circle'}
        ></Card>,
      );
    });

    it('should not have icon', () => {
      const cardIcon = screen.queryByTestId('card-icon');
      expect(cardIcon).not.toBeInTheDocument();
    });

    it('should have label', () => {
      const cardLabel = screen.getByTestId('card-label');
      expect(cardLabel).toHaveTextContent('Label');
    });

    it('should have label with styling', () => {
      const cardLabel = screen.getByTestId('card-label');
      expect(cardLabel).toHaveStyle(
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
      expect(cardDescription).toHaveStyle(`line-clamp: 5;`);
    });
  });

  describe('Type = detail, shorter description', () => {
    beforeEach(() => {
      render(
        <Card type={'detail'} label={'Label'} description={'Description'} maxDescriptionLines={3}></Card>,
      );
    });

    it('should have max 3 lines of description text', () => {
      const cardDescription = screen.getByTestId('card-description');
      expect(cardDescription).toHaveStyle(`line-clamp: 3;`);
    });

    it('should have empty corner icon', () => {
      const cardCornerIcon = screen.getByTestId('card-corner-icon');
      expect(cardCornerIcon).toHaveTextContent('');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Card
          label={'Label'}
          description={'Description'}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        ></Card>,
      );
    });

    it('should have className and inlineStyle', () => {
      const cardArea = screen.getByTestId('card-area');
      expect(cardArea).toHaveStyle('margin: 24px');
      expect(cardArea).toHaveClass('test-class');
    });
  });
});
