import { Accordion } from '@elvia/elvis-accordion/react';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Accordion', () => {
  let wrapper;
  let accordionButton;

  beforeEach(() => {
    wrapper = mount(
      <Accordion
        labelPosition="center"
        openLabel="open"
        closeLabel="close"
        content="TextContent"
        type="normal"
      ></Accordion>,
    );
    accordionButton = wrapper.find({ dataTestId: 'accordion-button-label' });
  });

  it('should show open label', function (done) {
    expect(accordionButton.text()).toBe('open');
    done();
  });

  it('should show close label', function (done) {
    accordionButton.simulate('click');
    expect(accordionButton.text()).toBe('close');
    done();
  });

  it('should not show content', function (done) {
    const accordionContent = wrapper.find({ dataTestId: 'accordion-content-normal' });
    expect(accordionContent.getDOMNode()).toHaveStyle('opacity: 0');
    done();
  });

  it('should show content', function (done) {
    accordionButton.simulate('click');
    const accordionContent = wrapper.find({ dataTestId: 'accordion-content-normal' });
    expect(accordionContent.getDOMNode()).toHaveStyle('opacity: 1');
    done();
  });
});
