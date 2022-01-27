import Popover from './elvia-popover.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Popover', () => {
  let wrapper;
  let popoverWrapper;
  let popoverTrigger;
  let popoverContainer;
  let popoverCloseBtn;
  let popoverHeader;
  let popoverText;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Popover trigger={<button>Trigger</button>} header="Header" content="Content" />);
      popoverTrigger = wrapper.find({ 'data-testid': 'popover-trigger' }).at(0);
      popoverContainer = wrapper.find({ 'data-testid': 'popover-container' }).at(0);
      popoverCloseBtn = wrapper.find({ 'data-testid': 'popover-close-btn' }).at(0);
      popoverHeader = wrapper.find({ 'data-testid': 'popover-header' }).at(0);
      popoverText = wrapper.find({ 'data-testid': 'popover-text' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should be closed by default', function (done) {
      expect(popoverContainer.getDOMNode().classList.contains('ewc-popover--hide')).toBe(true);
      done();
    });
    it('should be able to open popover', function (done) {
      popoverTrigger.simulate('click');
      expect(popoverContainer.getDOMNode().classList.contains('ewc-popover--hide')).toBe(false);
      done();
    });
    it('should be able to close popover', function (done) {
      popoverTrigger.simulate('click');
      popoverTrigger.simulate('click');
      expect(popoverContainer.getDOMNode().classList.contains('ewc-popover--hide')).toBe(true);
      done();
    });
    it('should have close btn', function (done) {
      expect(popoverCloseBtn.exists()).toBeTruthy();
      done();
    });
    it('should close popover when clicking close btn', function (done) {
      popoverTrigger.simulate('click');
      popoverCloseBtn.simulate('click');
      expect(popoverContainer.getDOMNode().classList.contains('ewc-popover--hide')).toBe(true);
      done();
    });
    it('should have correct header', function (done) {
      expect(popoverHeader.text()).toBe('Header');
      done();
    });
    it('should have correct content', function (done) {
      expect(popoverText.text()).toBe('Content');
      done();
    });
  });
  describe('Showing = True', () => {
    beforeEach(() => {
      wrapper = mount(
        <Popover trigger={<button>Trigger</button>} header="Header" content="Content" isShowing />,
      );
      popoverContainer = wrapper.find({ 'data-testid': 'popover-container' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should be open by default', function (done) {
      expect(popoverContainer.getDOMNode().classList.contains('ewc-popover--hide')).toBe(false);
      done();
    });
  });
  describe('Close button', () => {
    beforeEach(() => {
      wrapper = mount(
        <Popover trigger={<button>Trigger</button>} header="Header" content="Content" hasCloseBtn="false" />,
      );
      popoverCloseBtn = wrapper.find({ 'data-testid': 'popover-close-btn' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should not have close btn', function (done) {
      expect(popoverCloseBtn.exists()).toBeFalsy();
      done();
    });
  });
  describe('className and style passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Popover
          trigger={<button>Trigger</button>}
          header="Header"
          content="Content"
          className="test-class"
          style={{ margin: '24px' }}
        />,
      );
      popoverWrapper = wrapper.find({ 'data-testid': 'popover-wrapper' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have className and style', function (done) {
      expect(popoverWrapper.at(0).getDOMNode()).toHaveStyle('margin: 24px');
      expect(popoverWrapper.at(0).getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
