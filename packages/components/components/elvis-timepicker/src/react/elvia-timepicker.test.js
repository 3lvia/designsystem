import Timepicker from './elvia-timepicker.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey90: getColor('grey-90'),
};

describe('Elvis Timepicker', () => {
  let wrapper;

  describe('Basic', () => {
    beforeEach(() => {
      wrapper = mount(<Timepicker></Timepicker>);
    });

    it('should exist', (done) => {
      expect(wrapper).toBeDefined();
      done();
    });
  });
});
