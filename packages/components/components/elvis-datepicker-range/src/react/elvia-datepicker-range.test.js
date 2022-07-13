import DatepickerRange from './elvia-datepicker-range.tsx';
import Datepicker from '../../../elvis-datepicker/dist/react/js/elvia-datepicker';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis DatepickerRange', () => {
  let wrapper;
  let datepickerRangeWrapper;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<DatepickerRange></DatepickerRange>);
      datepickerRangeWrapper = wrapper.find({ 'data-testid': 'datepicker-range-wrapper' });
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have two children', function (done) {
      expect(datepickerRangeWrapper.at(0).getDOMNode().children.length).toBe(2);
      done();
    });
    it('should have two datepickers', function (done) {
      expect(wrapper.find(Datepicker).length).toBe(2);
      done();
    });
    it('should have horizontal stacking', function (done) {
      expect(datepickerRangeWrapper.at(0).getDOMNode()).toHaveStyle('flex-direction: row');
      done();
    });
  });
  describe('', () => {
    beforeEach(() => {
      wrapper = mount(<DatepickerRange isVertical></DatepickerRange>);
      datepickerRangeWrapper = wrapper.find({ 'data-testid': 'datepicker-range-wrapper' });
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have vertical stacking', function (done) {
      expect(datepickerRangeWrapper.at(0).getDOMNode()).toHaveStyle('flex-direction: column');
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <DatepickerRange className="testclass" inlineStyle={{ paddingTop: '24px' }}></DatepickerRange>,
      );
      datepickerRangeWrapper = wrapper.find({ 'data-testid': 'datepicker-range-wrapper' });
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have classname', function (done) {
      expect(datepickerRangeWrapper.at(0).getDOMNode()).toHaveClass('testclass');
      done();
    });
    it('should have inlineStyle', function (done) {
      expect(datepickerRangeWrapper.at(0).getDOMNode()).toHaveStyle('padding-top: 24px;');
      done();
    });
  });
  describe('passes props to both underlying datepickers', () => {
    beforeEach(() => {
      wrapper = mount(<DatepickerRange isDisabled isFullWidth isCompact></DatepickerRange>);
      datepickerRangeWrapper = wrapper.find({ 'data-testid': 'datepicker-range-wrapper' });
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have both datepickers disabled', function (done) {
      expect(
        wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0).getDOMNode(),
      ).toHaveClass('Mui-disabled');
      expect(
        wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(1).getDOMNode(),
      ).toHaveClass('Mui-disabled');
      done();
    });
    it('should have both datepickers fullwidth', function (done) {
      expect(wrapper.find('.ewc-datepicker--full-width').length).toBe(2);
      done();
    });
    it('should have both datepickers compact', function (done) {
      expect(wrapper.find('.ewc-datepicker--compact').length).toBe(2);
      done();
    });
  });
});
