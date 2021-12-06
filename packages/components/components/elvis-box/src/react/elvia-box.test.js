import Box from './elvia-box.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  green: getColor('green'),
  grey10: getColor('grey-10'),
};

const htmlCode = <div>Html content</div>;

describe('Elvis Box', () => {
  let wrapper;
  let boxtitle;
  let boxContent;
  let boxColoredLineWithContent;

  describe('Title = Hello', () => {
    beforeEach(() => {
      wrapper = mount(<Box title="Hello Box"></Box>);
      boxtitle = wrapper.find({ 'data-testid': 'box-title' }).at(0);
    });
    it('should have title containing "Hello Box"', function (done) {
      expect(boxtitle.text()).toBe('Hello Box');
      done();
    });
  });
  describe('Content = "Some content", isColored = true', () => {
    beforeEach(() => {
      wrapper = mount(<Box isColored content="Some content"></Box>);
      boxContent = wrapper.find({ 'data-testid': 'box-content' }).at(0);
      boxColoredLineWithContent = wrapper.find({ 'data-testid': 'box-colored-line' }).at(0);
    });
    it('should show content of string "Some content"', function (done) {
      expect(boxContent.text()).toBe('Some content');
      done();
    });
    it('should have green boxColored line', function (done) {
      expect(boxColoredLineWithContent.getDOMNode()).toHaveStyle(`background: ${colors.green}`);
      done();
    });
  });
  describe('Content = html', () => {
    beforeEach(() => {
      wrapper = mount(<Box isColored content={htmlCode}></Box>);
      boxContent = wrapper.find({ 'data-testid': 'box-content' }).at(0);
    });
    it('should show content of html code containing "Html content"', function (done) {
      expect(boxContent.text()).toBe('Html content');
      done();
    });
  });
  describe('hasBorder = true', () => {
    beforeEach(() => {
      wrapper = mount(<Box hasBorder></Box>);
      boxContent = wrapper.find({ 'data-testid': 'box-no-content' }).at(0);
    });
    it('should show box content with a grey border', function (done) {
      expect(boxContent.getDOMNode()).toHaveStyle(`border: 1px solid ${colors.grey10}`);
      done();
    });
  });
});
