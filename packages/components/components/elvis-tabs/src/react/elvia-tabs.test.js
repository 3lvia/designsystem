import Tabs from './elvia-tabs.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Tabs', () => {
  let wrapper;
  let items = ['Oranges', 'Apples', 'Pears'];
  let tabsElements;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} />);
      tabsElements = wrapper.find('.ewc-tabs__label');
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have correct number of tabs', function (done) {
      expect(tabsElements.length).toEqual(3);
      done();
    });
    it('should have default value 0', function (done) {
      const selectedTab = wrapper.find('.ewc-tabs__label--selected');
      expect(tabsElements.at(0).getDOMNode()).toEqual(selectedTab.getDOMNode());
      done();
    });
    it('should update value when clicking new tab', function (done) {
      tabsElements.at(1).simulate('click');
      expect(tabsElements.at(1).getDOMNode().classList.contains('ewc-tabs__label--selected')).toBe(true);
      done();
    });
    it('should have correct labels', function (done) {
      expect(tabsElements.at(0).text()).toBe('Oranges');
      expect(tabsElements.at(1).text()).toBe('Apples');
      expect(tabsElements.at(2).text()).toBe('Pears');
      done();
    });
  });
  describe('Value = 2', () => {
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} value={2}></Tabs>);
      tabsElements = wrapper.find('.ewc-tabs__label');
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have new default value 2', function (done) {
      expect(tabsElements.at(2).getDOMNode().classList.contains('ewc-tabs__label--selected')).toBe(true);
      done();
    });
  });
  describe('Inverted', () => {
    let tabsContainer;
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} isInverted={true}></Tabs>);
      tabsContainer = wrapper.find({ 'data-testid': 'tabs-container' });
      tabsElements = wrapper.find('.ewc-tabs__label');
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have class inverted', function (done) {
      expect(tabsContainer.getDOMNode().classList.contains('ewc-tabs--inverted')).toBe(true);
      done();
    });
  });
  describe('className and style passed to wrapper', () => {
    let tabsContainer;
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} className="test-class" style={{ margin: '24px' }}></Tabs>);
      tabsContainer = wrapper.find({ 'data-testid': 'tabs-container' });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have class ewc-tabs', function (done) {
      expect(tabsContainer.getDOMNode()).toHaveClass('ewc-tabs');
      done();
    });
    it('should have className and style', function (done) {
      expect(tabsContainer.getDOMNode()).toHaveStyle('margin: 24px');
      expect(tabsContainer.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
