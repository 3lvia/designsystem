import { Breadcrumb } from './elvia-breadcrumb';
import React from 'react';
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';

const breadcumbsLinksTest = [
  {
    href: 'https://elvia.no',
    text: 'Elvia.no',
  },
  {
    href: 'https://www.elvia.no/nettleie',
    text: 'Nettleie',
  },
  {
    href: 'https://www.elvia.no/nettleie/elvias-leveringsplikt',
    text: 'Elvias leveringsplikt',
  },
];

describe('Elvis Breadcrumb', () => {
  describe('Have links', () => {
    beforeEach(() => {
      render(<Breadcrumb items={breadcumbsLinksTest}></Breadcrumb>);
    });

    it('First link should redirect to "https://elvia.no"', () => {
      const linkOne = screen.getAllByTestId('breadcrumb-desktop-multiple-links')[0];
      expect(linkOne.getAttribute('href')).toBe('https://elvia.no');
    });

    it('Second link should redirect to "https://www.elvia.no/nettleie"', () => {
      const linkTwo = screen.getAllByTestId('breadcrumb-desktop-multiple-links')[1];
      expect(linkTwo.getAttribute('href')).toBe('https://www.elvia.no/nettleie');
    });

    it('Third link should redirect to "https://www.elvia.no/nettleie/elvias-leveringsplikt"', () => {
      const linkThree = screen.getByTestId('breadcrumb-desktop-last-link');
      expect(linkThree.getAttribute('href')).toBe('https://www.elvia.no/nettleie/elvias-leveringsplikt');
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      render(
        <Breadcrumb
          items={breadcumbsLinksTest}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        ></Breadcrumb>,
      );
    });

    it('should have className and inlineStyle', () => {
      const breadcrumbWrapper = screen.getByTestId('breadcrumb-wrapper');
      expect(breadcrumbWrapper).toHaveStyle('margin: 24px');
      expect(breadcrumbWrapper).toHaveClass('test-class');
    });
  });

  describe('the accessibility', () => {
    it('should have no axe violations', async () => {
      render(
        <div data-testid="breadcumbs">
          <Breadcrumb items={breadcumbsLinksTest}></Breadcrumb>
        </div>,
      );

      const breadcumbs = screen.getByTestId('breadcumbs');
      const results = await axe(breadcumbs);

      expect(results).toHaveNoViolations();
    });
  });
});
