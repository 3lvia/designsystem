import Accordion from './elvia-accordion.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Accordion', () => {
  let wrapper;
  let accordionArea;
  let accordionButton;
  let accordionContentNormal;
  let accordionContentOverflow;

  describe('Type = normal', () => {
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
      accordionButton = wrapper.find({ 'data-testid': 'accordion-button-label' }).at(0);
      accordionContentNormal = wrapper.find({ 'data-testid': 'accordion-content-normal' }).at(0);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should show open label if not opened', function (done) {
      expect(accordionButton.text()).toBe('open');
      done();
    });

    it('should show close label if opened', function (done) {
      accordionButton.simulate('click');
      expect(accordionButton.text()).toBe('close');
      done();
    });

    it('should not show content if not opened', function (done) {
      expect(accordionContentNormal.getDOMNode()).toHaveStyle('opacity: 0');
      done();
    });

    it('should show content if opened', function (done) {
      accordionButton.simulate('click');
      expect(accordionContentNormal.getDOMNode()).toHaveStyle('opacity: 1');
      done();
    });
  });

  describe('Type = overflow', () => {
    beforeEach(() => {
      wrapper = mount(
        <Accordion
          labelPosition="center"
          openLabel="open"
          closeLabel="close"
          content="TextContent"
          type="overflow"
        ></Accordion>,
      );
      accordionButton = wrapper.find({ 'data-testid': 'accordion-button-label' }).at(0);
      accordionContentOverflow = wrapper.find({ 'data-testid': 'accordion-content-overflow' }).at(0);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should show content if not opened', function (done) {
      expect(accordionContentOverflow.getDOMNode()).toHaveStyle('opacity: 1');
      done();
    });

    it('should show content if opened', function (done) {
      accordionButton.simulate('click');
      expect(accordionContentOverflow.getDOMNode()).toHaveStyle('opacity: 1');
      done();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Accordion content="TextContent" className="test-class" inlineStyle={{ margin: '24px' }}></Accordion>,
      );
      accordionArea = wrapper.find({ 'data-testid': 'accordion-area' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have className and inlineStyle', function (done) {
      expect(accordionArea.getDOMNode()).toHaveStyle('margin: 24px');
      expect(accordionArea.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
