import 'jsdom-global/register';
import '@testing-library/jest-dom';
import { Accordion } from '@elvia/elvis-accordion/react';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enzyme from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

describe('Elvis Accordion', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.mount(
      <Accordion
        labelPosition="center"
        openLabel="open"
        closeLabel="close"
        content="TextContent"
      ></Accordion>,
    );
  });

  it('should show open label', function (done) {
    expect(wrapper.find('div').at(1).text()).toBe('open');
    done();
  });

  it('should show close label', function (done) {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('div').at(1).text()).toBe('close');
    done();
  });

  it('should not show content', function (done) {
    expect(wrapper.find('div').at(2).getDOMNode()).toHaveStyle('opacity: 0');
    done();
  });

  it('should show content', function (done) {
    wrapper.find('button').simulate('click');
    expect(wrapper.find('div').at(2).getDOMNode()).toHaveStyle('opacity: 1');
    done();
  });
});
