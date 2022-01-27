import ProgressLinear from './elvia-progress-linear.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Progress Linear', () => {
  let wrapper;
  let progressWrapper;
  let progressLinear;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear></ProgressLinear>);
      progressLinear = wrapper.find({ 'data-testid': 'progress-linear' }).at(0);
    });
    it('should have class ewc-progress-linear--range', function (done) {
      expect(progressLinear.getDOMNode()).toHaveClass('ewc-progress-linear--range');
      done();
    });
    it('should default value 0', function (done) {
      expect(progressLinear.getDOMNode()).toHaveStyle('width: 0%');
      done();
    });
  });
  describe('Value = 48', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear value="48"></ProgressLinear>);
      progressLinear = wrapper.find({ 'data-testid': 'progress-linear' }).at(0);
    });
    it('should have value 48', function (done) {
      expect(progressLinear.getDOMNode()).toHaveStyle('width: 48%');
      done();
    });
  });
  describe('Indeterminate', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear isIndeterminate></ProgressLinear>);
      progressLinear = wrapper.find({ 'data-testid': 'progress-linear' }).at(0);
    });
    it('should have class ewc-progress-linear--indeterminate', function (done) {
      expect(progressLinear.getDOMNode()).toHaveClass('ewc-progress-linear--indeterminate');
      done();
    });
  });
  describe('Error', () => {
    beforeEach(() => {
      wrapper = mount(<ProgressLinear isError></ProgressLinear>);
      progressLinear = wrapper.find({ 'data-testid': 'progress-linear' }).at(0);
    });
    it('should have class ewc-progress-linear--error', function (done) {
      expect(progressLinear.getDOMNode()).toHaveClass('ewc-progress-linear--error');
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
    it('should have class ewc-progress-linear', function (done) {
      expect(progressWrapper.getDOMNode()).toHaveClass('ewc-progress-linear');
      done();
    });
    it('should have className and inlineStyle', function (done) {
      expect(progressWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      expect(progressWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
