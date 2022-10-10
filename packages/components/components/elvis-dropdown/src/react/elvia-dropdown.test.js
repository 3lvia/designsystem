import Dropdown from './elvia-dropdown.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Dropdown', () => {
  let wrapper;
  let dropdownWrapper;
  let dropdownLabel;
  let dropdownError;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(
        <Dropdown
          label={'Label'}
          items={[
            { value: '1', label: 'Option 1' },
            { value: '2', label: 'Option 2' },
            { value: '3', label: 'Option 3' },
          ]}
        ></Dropdown>,
      );
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' });
      dropdownLabel = wrapper.find({ 'data-testid': 'label' });
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should have label', function (done) {
      expect(dropdownLabel.at(0).text()).toBe('Label');
      done();
    });
    it('should not be disabled', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).toHaveStyle('cursor: pointer');
      done();
    });
    it('should not be compact', function (done) {
      expect(dropdownLabel.at(0).getDOMNode()).not.toHaveStyle(`position: absolute; top: -5px; left: 8px;`);
      expect(dropdownLabel.at(0).getDOMNode()).toHaveStyle(`font-size: 16px; line-height: 23px`);
      done();
    });
    it('should not have error message', function (done) {
      expect(dropdownError.length).toEqual(0);
      done();
    });
    it('should not be full width', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).toHaveStyle('max-width: 448px');
      done();
    });
  });

  describe('Compact, disabled', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown isCompact isDisabled></Dropdown>);
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' });
      dropdownLabel = wrapper.find({ 'data-testid': 'label' });
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should be disabled', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).toHaveStyle('cursor: not-allowed');
      done();
    });
    it('should be compact', function (done) {
      expect(dropdownLabel.at(0).getDOMNode()).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
      done();
    });
    it('should not have error message', function (done) {
      expect(dropdownError.length).toEqual(0);
      done();
    });
  });

  describe('Error', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown errorMessage="Error"></Dropdown>);
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should have error message', function (done) {
      expect(dropdownError.at(0).text()).toBe('Error');
      done();
    });
  });

  describe('Full width', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown isFullWidth></Dropdown>);
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' });
      dropdownLabel = wrapper.find({ 'data-testid': 'label' });
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should be full width', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).not.toHaveStyle('max-width: 448px');
      done();
    });
    it('should not be disabled', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).not.toHaveStyle('cursor: not-allowed');
      done();
    });
    it('should not be compact', function (done) {
      expect(dropdownLabel.at(0).getDOMNode()).not.toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
      done();
    });
    it('should not have error message', function (done) {
      expect(dropdownError.length).toEqual(0);
      done();
    });
  });

  describe('Full width, compact', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown isFullWidth isCompact></Dropdown>);
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' });
      dropdownLabel = wrapper.find({ 'data-testid': 'label' });
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should be full width', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).not.toHaveStyle('max-width: 448px');
      done();
    });
    it('should not be disabled', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).not.toHaveStyle('cursor: not-allowed');
      done();
    });
    it('should be compact', function (done) {
      expect(dropdownLabel.at(0).getDOMNode()).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
      done();
    });
    it('should not have error message', function (done) {
      expect(dropdownError.length).toEqual(0);
      done();
    });
  });

  describe('Full width, compact, disabled', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown isFullWidth isCompact isDisabled></Dropdown>);
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' });
      dropdownLabel = wrapper.find({ 'data-testid': 'label' });
      dropdownError = wrapper.find({ 'data-testid': 'error' });
    });
    it('should be full width', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).not.toHaveStyle('max-width: 448px');
      done();
    });
    it('should be disabled', function (done) {
      expect(dropdownWrapper.at(0).getDOMNode()).toHaveStyle('cursor: not-allowed');
      done();
    });
    it('should be compact', function (done) {
      expect(dropdownLabel.at(0).getDOMNode()).toHaveStyle(
        `position: absolute; top: 0; left: 8px; font-size: 10px; line-height: 10px`,
      );
      done();
    });
    it('should not have error message', function (done) {
      expect(dropdownError.length).toEqual(0);
      done();
    });
  });

  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(<Dropdown className="test-class" inlineStyle={{ margin: '24px' }}></Dropdown>);
      dropdownWrapper = wrapper.find({ 'data-testid': 'wrapper' }).at(0).closest('div').at(0);
    });
    it('should have className and inlineStyle', function (done) {
      expect(dropdownWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      expect(dropdownWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
