import DatepickerRange from './elvia-datepicker-range.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Datepicker', () => {
  let wrapper;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<DatepickerRange></DatepickerRange>);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('true', function (done) {
      expect(true).toBe(true);
      done();
    });
  });
});
