import Tabs from './elvia-tabs.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Accordion', () => {
  let wrapper;
  let items = ['Oranges', 'Apples', 'Pears'];
  let tabsElements;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} />);
      tabsElements = wrapper.find('.ewc-tabs__label');
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
  });
  describe('Value = 2', () => {
    beforeEach(() => {
      wrapper = mount(<Tabs items={items} value={2}></Tabs>);
      tabsElements = wrapper.find('.ewc-tabs__label');
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
    it('should have class inverted', function (done) {
      expect(tabsContainer.getDOMNode().classList.contains('ewc-tabs--inverted')).toBe(true);
      done();
    });
  });
});
