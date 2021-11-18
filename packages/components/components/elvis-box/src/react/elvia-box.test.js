import 'jsdom-global/register';
import '@testing-library/jest-dom';
import { Box } from '@elvia/elvis-box/react';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enzyme from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

describe('Elvis Box ', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.mount(
      <Box
        hasBorder={true}
        isColored={true}
        title={<h1>Box title</h1>}
        content={<div>Box content</div>}
      ></Box>,
    );
  });

  it('should show title "Box title"', function (done) {
    expect(wrapper.find('div').at(1).text()).toBe('Box title');
    done();
  });

  it('should show content of "Box content"', function (done) {
    expect(wrapper.find('div').at(2).text()).toBe('Box content');
    done();
  });

  it('should have a div with elvia green background color"', function (done) {
    expect(wrapper.find('div').at(2).find('div').at(1).getDOMNode()).toHaveStyle('background: #29d305');
    done();
  });

  it('should show border', function (done) {
    expect(wrapper.find('div').at(2).getDOMNode()).toHaveStyle('border: 1px solid #E9E9E9');
    done();
  });
});

describe('Elvis Box with no border & color', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = enzyme.mount(
      <Box
        hasBorder={false}
        isColored={false}
        title={<h1>Box title</h1>}
        content={<div>Box content</div>}
      ></Box>,
    );
  });

  it('should have a div with elvia green background color"', function (done) {
    expect(wrapper.find('div').at(2).find('div').at(1).getDOMNode()).not.toHaveStyle('background: #29d305');
    done();
  });

  it('should not show border', function (done) {
    expect(wrapper.find('div').at(2).getDOMNode()).not.toHaveStyle('border: 1px solid #E9E9E9');
    done();
  });
});
