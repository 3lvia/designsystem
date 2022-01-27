import Chip from './elvia-chip.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  green: getColor('green-apple'),
  blue: getColor('blue-berry'),
};

describe('Elvis Chip', () => {
  let wrapper;
  let chipLabel;
  let chipButton;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Chip value="chip value"></Chip>);
      chipLabel = wrapper.find({ 'data-testid': 'chip-label' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have label "chip value"', function (done) {
      expect(chipLabel.text()).toBe('chip value');
      done();
    });
    it('should have default type Removable"', function (done) {
      expect(chipLabel.text()).toBe('chip value');
      done();
    });
  });

  describe('Type = Legend', () => {
    beforeEach(() => {
      wrapper = mount(<Chip type="legend" value="chip value"></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should not be selected', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: transparent;');
      done();
    });
    it('should be selectable', function (done) {
      chipButton.simulate('click');
      expect(chipButton.getDOMNode()).toHaveStyle(`background-color: ${colors.green}40;`);
      done();
    });
    it('should be unselectable', function (done) {
      chipButton.simulate('click');
      chipButton.simulate('click');
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: transparent;');
      done();
    });
  });

  describe('Type = Legend, Selected by default', () => {
    beforeEach(() => {
      wrapper = mount(<Chip type="legend" value="chip value" selected></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should be selected', function (done) {
      const color = expect(chipButton.getDOMNode()).toHaveStyle(`background-color: ${colors.green}40;`);
      done();
    });
  });

  describe('Type = Choice', () => {
    beforeEach(() => {
      wrapper = mount(<Chip type="choice" value="chip value"></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should not be selected', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: transparent;');
      done();
    });
    it('should be selectable', function (done) {
      chipButton.simulate('click');
      expect(chipButton.getDOMNode()).toHaveStyle(`background-color: ${colors.green}40;`);
      done();
    });
    it('should be unselectable', function (done) {
      chipButton.simulate('click');
      chipButton.simulate('click');
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: transparent;');
      done();
    });
  });

  describe('Type = Choice, Selected by default', () => {
    beforeEach(() => {
      wrapper = mount(<Chip type="choice" value="chip value" selected></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should be selected', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle(`background-color: ${colors.green}40;`);
      done();
    });
  });

  describe('Color = blue', () => {
    beforeEach(() => {
      wrapper = mount(<Chip value="chip value" color="blue" selected></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have color blue', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle(`background-color: ${colors.blue}40;`);
      done();
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      wrapper = mount(<Chip value="chip value" disabled></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
      chipLabel = wrapper.find({ 'data-testid': 'chip-label' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have text with opacity 0.3', function (done) {
      expect(chipLabel.getDOMNode()).toHaveStyle(`opacity: 0.3;`);
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Chip value="chip value" className="test-class" inlineStyle={{ margin: '24px' }}></Chip>,
      );
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have className and inlineStyle', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle('margin: 24px');
      expect(chipButton.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
