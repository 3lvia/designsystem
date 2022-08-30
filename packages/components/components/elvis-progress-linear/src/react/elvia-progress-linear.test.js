import ProgressLinear from './elvia-progress-linear.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Progress Linear', () => {
  let wrapper;
  let progressWrapper;
  let progressLinearElement;
  let progressLinearProgressElement;

  describe('Value = 48', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear value="48"></ProgressLinear>);
      progressLinearProgressElement = wrapper.find({ 'data-testid': 'progress-linear-progress' }).at(0);
    });
    it('should have value 48', function (done) {
      expect(progressLinearProgressElement.getDOMNode()).toHaveStyle('width: 48%');
      done();
    });
  });
  describe('Indeterminate', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear isIndeterminate></ProgressLinear>);
      progressLinearElement = wrapper.find({ 'data-testid': 'progress-linear-progress' }).at(0);
    });
    it('should have color green', function (done) {
      expect(progressLinearElement.getDOMNode()).toHaveStyle('background-color: #29d305');
      done();
    });
  });
  describe('Error', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear isError></ProgressLinear>);
      progressLinearElement = wrapper.find({ 'data-testid': 'progress-linear-progress' }).at(0);
    });
    it('should have color red', function (done) {
      expect(progressLinearElement.getDOMNode()).toHaveStyle('background-color: #ee0701');
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <ProgressLinear value="48" className="test-class" inlineStyle={{ margin: '24px' }}></ProgressLinear>,
      );
      progressWrapper = wrapper.find({ 'data-testid': 'progress-wrapper' }).at(0);
    });
    it('should have className and inlineStyle', function (done) {
      expect(progressWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      expect(progressWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
