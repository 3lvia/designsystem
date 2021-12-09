import ProgressLinear from './elvia-progress-linear.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  red: getColor('red'),
};

describe('Elvis Divider', () => {
  let wrapper;
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
});
