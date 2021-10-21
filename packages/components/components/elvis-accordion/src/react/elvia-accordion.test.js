import 'jsdom-global/register';
import '@testing-library/jest-dom';
import { Accordion } from '@elvia/elvis-accordion/react';
import React from 'react';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import enzyme from 'enzyme';
enzyme.configure({ adapter: new Adapter() });

describe('Elvis Accordion', function () {
  it('should render my component', () => {
    const wrapper = enzyme.shallow(<Accordion />);
  });

  // it('should not show content', function (done) {
  //   const wrapper = enzyme.mount(<Accordion
  //     labelPosition="center"
  //     openLabel="open"
  //     closeLabel="close"
  //     content="TextContent"
  //   ></Accordion>)
  //   expect(wrapper.find('div').at(2)).not.toBeVisible();
  //   done();
  // });

  it('should show content', function (done) {
    const wrapper = enzyme.mount(
      <Accordion
        labelPosition="center"
        openLabel="open"
        closeLabel="close"
        content="TextContent"
      ></Accordion>,
    );
    wrapper.find('button').simulate('click');
    expect(wrapper.find('div').at(2).text()).toBe('TextContent');
    done();
  });
});
