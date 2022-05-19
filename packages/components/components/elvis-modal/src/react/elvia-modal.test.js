import Modal from './elvia-modal.tsx';
import React from 'react';
import { mount } from 'enzyme';

describe('Elvis Modal', () => {
  let wrapper;
  let modalWrapper;
  let modalPrimaryBtn;
  let modalSecondaryBtn;
  let modalHeading;
  let modalContent;
  let modalIllustration;
  let modalCloseBtn;

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(
        <Modal heading="Title" content="Content" primaryButton={<button>Primary</button>}></Modal>,
      );
      modalWrapper = wrapper.find({ 'data-testid': 'modal-container' }).at(0);
      modalPrimaryBtn = wrapper.find({ 'data-testid': 'modal-primary-btn' }).at(0);
      modalSecondaryBtn = wrapper.find({ 'data-testid': 'modal-secondary-btn' }).at(0);
      modalHeading = wrapper.find({ 'data-testid': 'modal-heading' }).at(0);
      modalContent = wrapper.find({ 'data-testid': 'modal-content' }).at(0);
      modalIllustration = wrapper.find({ 'data-testid': 'modal-illustration' }).at(0);
      modalCloseBtn = wrapper.find({ 'data-testid': 'modal-close-btn' }).at(0);
    });
    it('should not be visible', function (done) {
      expect(modalWrapper.getDOMNode()).toHaveStyle('display: none');
      done();
    });
    it('should have primary btn', function (done) {
      expect(modalPrimaryBtn.exists()).toBeTruthy();
      done();
    });
    it('should not have secondary btn', function (done) {
      expect(modalSecondaryBtn.exists()).toBeFalsy();
      done();
    });
    it('should have heading', function (done) {
      expect(modalHeading.text()).toEqual('Title');
      done();
    });
    it('should have content', function (done) {
      expect(modalContent.text()).toEqual('Content');
      done();
    });
    it('should not have illustration', function (done) {
      expect(modalIllustration.exists()).toBeFalsy();
      done();
    });
    it('should not have close btn', function (done) {
      expect(modalCloseBtn.exists()).toBeFalsy();
      done();
    });
  });
  describe('Visible', () => {
    beforeEach(() => {
      wrapper = mount(
        <Modal
          heading="Title"
          content="Content"
          primaryButton={<button>Primary</button>}
          secondaryButton={<button>Secondary</button>}
          illustration={<svg />}
          hasCloseButton
          isShowing
        ></Modal>,
      );
      modalWrapper = wrapper.find({ 'data-testid': 'modal-container' }).at(0);
      modalSecondaryBtn = wrapper.find({ 'data-testid': 'modal-secondary-btn' }).at(0);
      modalIllustration = wrapper.find({ 'data-testid': 'modal-illustration' }).at(0);
      modalCloseBtn = wrapper.find({ 'data-testid': 'modal-close-btn' }).at(0);
    });
    it('should be visible', function (done) {
      expect(modalWrapper.getDOMNode()).not.toHaveStyle('display: none');
      done();
    });
    it('should have secondary btn', function (done) {
      expect(modalSecondaryBtn.exists()).toBeTruthy();
      done();
    });
    it('should have illustration', function (done) {
      expect(modalIllustration.exists()).toBeTruthy();
      done();
    });
    it('should have close btn', function (done) {
      expect(modalCloseBtn.exists()).toBeTruthy();
      done();
    });
  });
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(
        <Modal
          heading="Title"
          content="Content"
          primaryButton={<button>Primary</button>}
          className="test-class"
          inlineStyle={{ margin: '24px' }}
        ></Modal>,
      );
      modalWrapper = wrapper.find({ 'data-testid': 'modal-wrapper' }).at(0);
    });
    it('should have className and inlineStyle', function (done) {
      expect(modalWrapper.getDOMNode()).toHaveStyle('margin: 24px');
      expect(modalWrapper.getDOMNode()).toHaveClass('test-class');
      done();
    });
  });
});
