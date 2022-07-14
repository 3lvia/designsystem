import Datepicker from './elvia-datepicker.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Datepicker', () => {
  const minDate = new Date('1/1/30');
  const maxDate = new Date('1/1/10');
  const customValue = new Date('4/2/24');
  let wrapper;
  let datepickerWrapper;
  let datepickerLabel;
  let datepickerInput;
  let datepickerButton;
  let datepickerErrorPlaceholder;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker></Datepicker>);
      datepickerLabel = wrapper.find({ 'data-testid': 'datepicker-label' }).at(0);
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' });
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
      datepickerButton = wrapper.find('.MuiIconButton-root').at(0);
      datepickerErrorPlaceholder = wrapper.find({ 'data-testid': 'datepicker-error-placeholder' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have default label = Velg dato', function (done) {
      expect(datepickerLabel.text()).toBe('Velg dato');
      done();
    });
    it('should have class unselected', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker--unselected');
      done();
    });
    it('should not have date selected when untouched', function (done) {
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '');
      done();
    });
    it('should have date selected when button is clicked', function (done) {
      datepickerButton.simulate('click');
      expect(datepickerInput.getDOMNode()).not.toHaveProperty('value', '');
      done();
    });
    it('should have error placeholder element', function (done) {
      expect(datepickerErrorPlaceholder.getDOMNode()).toHaveClass('ewc-datepicker__error-placeholder');
      done();
    });
  });
  describe('Value = custom', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker value={customValue}></Datepicker>);
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have value = 02.04.2024', function (done) {
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '02.04.2024');
      done();
    });
  });
  describe('Label = Custom label', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker label="Custom label"></Datepicker>);
      datepickerLabel = wrapper.find({ 'data-testid': 'datepicker-label' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have label = Custom label', function (done) {
      expect(datepickerLabel.text()).toBe('Custom label');
      done();
    });
  });
  describe('Compact, Full width', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker isCompact isFullWidth></Datepicker>);
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' });
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have compact class', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker--compact');
      done();
    });
    it('should have full width class', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker--full-width');
      done();
    });
  });
  describe('Disabled', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker isDisabled></Datepicker>);
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
      datepickerButton = wrapper.find('.MuiIconButton-root').at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have disabled class', function (done) {
      expect(datepickerInput.getDOMNode()).toHaveClass('Mui-disabled');
      done();
    });
    it('should not be clickable', function (done) {
      datepickerButton.simulate('click');
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '');
      done();
    });
  });
  describe('Required', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker isRequired></Datepicker>);
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' });
      datepickerButton = wrapper.find('.MuiIconButton-root').at(0);
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
      datepickerLabel = wrapper.find({ 'data-testid': 'datepicker-label' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should not have error class when untouched', function (done) {
      expect(datepickerWrapper.getDOMNode()).not.toHaveClass('ewc-datepicker--error');
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '');
      done();
    });
    it('should not have error class when filled ', function (done) {
      datepickerButton.simulate('click');
      expect(datepickerWrapper.getDOMNode()).not.toHaveClass('ewc-datepicker--error');
      done();
    });
  });
  describe('Does not have error placeholder element', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker hasErrorPlaceholderElement={false}></Datepicker>);
      datepickerErrorPlaceholder = wrapper.find({ 'data-testid': 'datepicker-error-placeholder' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should not have error placeholder element', function (done) {
      expect(datepickerErrorPlaceholder.length).toBe(0);
      done();
    });
  });
  describe('Custom error = Feil', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker customError="Feil"></Datepicker>);
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' });
      datepickerErrorPlaceholder = wrapper.find({ 'data-testid': 'datepicker-error-placeholder' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have error class', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker--error');
      done();
    });
    it('should not have error placeholder element when custom error', function (done) {
      expect(datepickerErrorPlaceholder.length).toBe(0);
      done();
    });
  });
  describe('Min date', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker minDate={minDate}></Datepicker>);
      datepickerButton = wrapper.find('.MuiIconButton-root').at(0);
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should pick minimum date when opened', function (done) {
      datepickerButton.simulate('click');
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '01.01.2030');
      done();
    });
  });
  describe('Max date', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker maxDate={maxDate}></Datepicker>);
      datepickerButton = wrapper.find('.MuiIconButton-root').at(0);
      datepickerInput = wrapper.find('.MuiInputBase-input.MuiInput-input.MuiInputBase-inputAdornedEnd').at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should pick maximum date when opened', function (done) {
      datepickerButton.simulate('click');
      expect(datepickerInput.getDOMNode()).toHaveProperty('value', '01.01.2010');
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Datepicker maxDate={maxDate} className="test-class" inlineStyle={{ margin: '24px' }}></Datepicker>,
      );
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have className', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker');
      expect(datepickerWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
    it('should have inlineStyle', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      done();
    });
  });
  describe('Error state from prop', () => {
    beforeEach(() => {
      wrapper = mount(<Datepicker isErrorState></Datepicker>);
      datepickerWrapper = wrapper.find({ 'data-testid': 'datepicker-wrapper' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have error state', function (done) {
      expect(datepickerWrapper.getDOMNode()).toHaveClass('ewc-datepicker--error');
      done();
    });
  });
});
