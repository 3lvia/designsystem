import RadioFilter from './elvia-radio-filter.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis RadioFilter', () => {
  const items = [
    { label: 'All', value: 'all' },
    { label: 'Read', value: 'read' },
    { label: 'Unread', value: 'unread' },
  ];
  let wrapper;
  let radioFilterElements;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<RadioFilter items={items} />);
      radioFilterElements = wrapper.find({ 'data-testid': 'radio-filter-group' }).at(0).children().children();
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have correct number of items', function (done) {
      expect(radioFilterElements.length).toEqual(3);
      done();
    });
    it('should have correct labels', function (done) {
      expect(radioFilterElements.at(0).text()).toEqual('All');
      expect(radioFilterElements.at(1).text()).toEqual('Read');
      expect(radioFilterElements.at(2).text()).toEqual('Unread');
      done();
    });
  });
  describe('Value = Unread', () => {
    beforeEach(() => {
      wrapper = mount(<RadioFilter items={items} value={'unread'} />);
      radioFilterElements = wrapper.find({ 'data-testid': 'radio-filter-group' }).at(0).children().children();
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have new default value 2', function (done) {
      expect(radioFilterElements.at(2).children().at(0).children().at(0).getDOMNode()).toBeChecked();
      done();
    });
  });
  describe('className and style passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(<RadioFilter items={items} className="test-class" style={{ margin: '24px' }} />);
      radioFilterElements = wrapper.find({ 'data-testid': 'radio-filter-group' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have className and style', function (done) {
      expect(radioFilterElements.getDOMNode()).toHaveStyle('margin: 24px');
      expect(radioFilterElements.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
