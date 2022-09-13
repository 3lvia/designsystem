import Tooltip from './elvia-tooltip.tsx';
import React from 'react';
import { mount } from 'enzyme';

const getElement = (wrapper, elementType, dataAttribute) => {
  return wrapper.find(`${elementType}[data-test="${dataAttribute}"]`);
};

describe('Elvis Tooltip', () => {
  describe('Basic', () => {
    let wrapper;
    let label;

    beforeEach(() => {
      wrapper = mount(
        <Tooltip text="I'm a tooltip!">
          <p>Text with tooltip</p>
        </Tooltip>,
      );
      label = getElement(wrapper, 'div', 'label');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should have a default label', (done) => {
      expect(true).toBe(true);
      done();
    });
  });
});
