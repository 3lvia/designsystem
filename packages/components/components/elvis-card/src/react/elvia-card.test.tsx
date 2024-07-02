import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import React from 'react';

import { Card } from './elvia-card';

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

    it('should have tag', () => {
      const tag = screen.getByText('Tag');
      expect(tag).toBeInTheDocument();
    });

    it('should have corner icon', () => {
      const cornerIcon = screen.getByTestId('card-corner-icon');
      expect(cornerIcon).toHaveTextContent('CornerIcon');
    });

    it('should have hover arrow', () => {
      const hoverArrow = screen.getByTestId('card-detail-hover-arrow');
      expect(hoverArrow).toBeInTheDocument();
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
