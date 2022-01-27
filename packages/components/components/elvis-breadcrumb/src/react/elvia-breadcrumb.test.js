import Breadcrumb from './elvia-breadcrumb.tsx';
import React from 'react';
import { mount } from 'enzyme';

const breadcumbsLinksTest = [
  {
    url: 'https://elvia.no',
    title: 'Elvia.no',
  },
  {
    url: 'https://www.elvia.no/nettleie',
    title: 'Nettleie',
  },
  {
    url: 'https://www.elvia.no/nettleie/elvias-leveringsplikt',
    title: 'Elvias leveringsplikt',
  },
];

describe('Elvis Breadcrumb', () => {
  let wrapper;
  let breadcrumbDekstopMultipleLinksOne;
  let breadcrumbDekstopMultipleLinksTwo;
  let breadcrumbDekstopMultipleLinksThree;
  let breadcrumbWrapper;

  describe('Have links', () => {
    beforeEach(() => {
      wrapper = mount(<Breadcrumb breadcrumbs={breadcumbsLinksTest}></Breadcrumb>);
      breadcrumbDekstopMultipleLinksOne = wrapper
        .find({ 'data-testid': 'breadcrumb-desktop-multiple-links' })
        .at(1)
        .getDOMNode()
        .getAttribute('href');
      breadcrumbDekstopMultipleLinksTwo = wrapper
        .find({ 'data-testid': 'breadcrumb-desktop-multiple-links' })
        .at(2)
        .getDOMNode()
        .getAttribute('href');
      breadcrumbDekstopMultipleLinksThree = wrapper
        .find({ 'data-testid': 'breadcrumb-desktop-last-link' })
        .at(0)
        .getDOMNode()
        .getAttribute('href');
    });
    it('First link should redirect to "https://elvia.no"', function (done) {
      expect(breadcrumbDekstopMultipleLinksOne).toBe('https://elvia.no');
      done();
    });
    it('Second link should redirect to "https://www.elvia.no/nettleie"', function (done) {
      expect(breadcrumbDekstopMultipleLinksTwo).toBe('https://www.elvia.no/nettleie');
      done();
    });
    it('Third link should redirect to "https://www.elvia.no/nettleie/elvias-leveringsplikt"', function (done) {
      expect(breadcrumbDekstopMultipleLinksThree).toBe('https://www.elvia.no/nettleie/elvias-leveringsplikt');
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Breadcrumb
          breadcrumbs={breadcumbsLinksTest}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        ></Breadcrumb>,
      );
      breadcrumbWrapper = wrapper.find({ 'data-testid': 'breadcrumb-wrapper' }).at(0);
    });
    it('should have className and inlineStyle', function (done) {
      expect(breadcrumbWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      expect(breadcrumbWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
