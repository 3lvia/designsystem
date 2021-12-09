import Chip from './elvia-chip.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Chip', () => {
  let wrapper;
  let chipLabel;
  let chipButton;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Chip value="chip value" onDelete={console.log('delete')}></Chip>);
      chipLabel = wrapper.find({ 'data-testid': 'chip-label' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should have label "chip value"', function (done) {
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
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #21ac0440;');
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
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #21ac0440;');
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
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #21ac0440;');
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
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #21ac0440;');
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
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #006ddb40;');
      done();
    });
  });

  describe('Disabled', () => {
    beforeEach(() => {
      wrapper = mount(<Chip value="chip value" color="purple" disabled></Chip>);
      chipButton = wrapper.find({ 'data-testid': 'chip-button' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });

    it('should be disabled', function (done) {
      expect(chipButton.getDOMNode()).toHaveStyle('background-color: #b66dff40');
      done();
    });
  });
});
