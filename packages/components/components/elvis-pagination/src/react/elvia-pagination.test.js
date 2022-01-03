import Pagination from './elvia-pagination.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Pagination', () => {
  let wrapper;
  let paginator;
  let paginatorNumbers;
  let infoText;
  let infoAmount;
  let selectorArrowLeft;
  let selectorArrowRight;
  let dropdown;

  describe('Default values', () => {
    beforeEach(() => {
      wrapper = mount(<Pagination></Pagination>);
      paginator = wrapper.find({ 'data-testid': 'pagination' });
      infoText = wrapper.find({ 'data-testid': 'info-text' });
      infoAmount = wrapper.find({ 'data-testid': 'info-amount' });
      selectorArrowLeft = wrapper.find({ 'data-testid': 'selector-arrow-btn-left' });
      selectorArrowRight = wrapper.find({ 'data-testid': 'selector-arrow-btn-right' });
      dropdown = wrapper.find({ 'data-testid': 'dropdown' });
    });

    it('should have default info text', function (done) {
      expect(infoText.at(0).text()).toBe(`Viser`);
      done();
    });
    it('should have default info amount', function (done) {
      expect(infoAmount.at(0).text()).toBe(`av 0 elementer`);
      done();
    });
    it('should not be right aligned', function (done) {
      expect(paginator.at(0).getDOMNode()).toHaveStyle(`justify-content: start`);
      done();
    });
    it('should have hidden left arrow', function (done) {
      expect(selectorArrowLeft.at(0).getDOMNode()).toHaveStyle(`visibility: hidden`);
      done();
    });
    it('should have hidden right arrow', function (done) {
      expect(selectorArrowRight.at(0).getDOMNode()).toHaveStyle(`visibility: hidden`);
      done();
    });
  });
  describe('Custom values', () => {
    beforeEach(() => {
      wrapper = mount(
        <Pagination
          numberOfElements={100}
          isRightAligned={true}
          label={'elements'}
          labelDisplaying={'Showing'}
          labelOf={'of'}
        ></Pagination>,
      );
      paginator = wrapper.find({ 'data-testid': 'pagination' });
      paginatorNumbers = wrapper.find({ 'data-testid': 'paginators' });
      infoText = wrapper.find({ 'data-testid': 'info-text' });
      infoAmount = wrapper.find({ 'data-testid': 'info-amount' });
      selectorArrowLeft = wrapper.find({ 'data-testid': 'selector-arrow-btn-left' });
      selectorArrowRight = wrapper.find({ 'data-testid': 'selector-arrow-btn-right' });
      dropdown = wrapper.find({ 'data-testid': 'dropdown' });
    });

    it('should have info text', function (done) {
      expect(infoText.at(0).text()).toBe(`Showing`);
      done();
    });
    it('should have info amount', function (done) {
      expect(infoAmount.at(0).text()).toBe(`of 100 elements`);
      done();
    });
    it('should be right aligned', function (done) {
      expect(paginator.at(0).getDOMNode()).toHaveStyle(`justify-content: flex-end`);
      done();
    });
    it('should have hidden left arrow', function (done) {
      expect(selectorArrowLeft.at(0).getDOMNode()).toHaveStyle(`visibility: hidden`);
      done();
    });
    it('should have visible right arrow', function (done) {
      expect(selectorArrowRight.at(0).getDOMNode()).toHaveStyle(`visibility: visible`);
      done();
    });
    it('should have visible left arrow after clicking right arrow', function (done) {
      selectorArrowRight.at(0).simulate('click');
      expect(selectorArrowLeft.at(0).getDOMNode()).toHaveStyle(`visibility: visible`);
      done();
    });
    it('should have hidden right arrow after clicking last paginator number', function (done) {
      paginatorNumbers
        .at(0)
        .findWhere((node) => node.key() === 'lastPaginationNumber')
        .simulate('click');
      expect(selectorArrowRight.at(0).getDOMNode()).toHaveStyle(`visibility: hidden`);
      done();
    });
    it('should have both arrows visible in middle of selection range', function (done) {
      for (let i = 0; i < 4; i++) {
        selectorArrowRight.at(0).simulate('click');
      }
      expect(selectorArrowRight.at(0).getDOMNode()).toHaveStyle(`visibility: visible`);
      expect(selectorArrowLeft.at(0).getDOMNode()).toHaveStyle(`visibility: visible`);
      done();
    });
  });
});
