import Divider from './elvia-divider.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey90: getColor('grey-90'),
};

describe('Elvis Divider', () => {
  let wrapper;
  let dividerArea;
  let dividerTitle;

  describe('Type = Simple', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="simple"></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
    });
    it('should have border-bottom 1px solid', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle('border-bottom: 1px solid');
      done();
    });
    it('should have color grey10', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.grey10}`);
      done();
    });
  });
  describe('Type = Simple, Orientation = Vertical', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="simple" orientation="vertical"></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
    });
    it('should show vertical border', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle('border-left: 1px solid');
      done();
    });
    it('should have color grey10', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.grey10}`);
      done();
    });
  });
  describe('Type = Simple, Inverted', () => {
    it('should have color grey90', function (done) {
      wrapper = mount(<Divider type="simple" isInverted={true}></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.grey90}`);
      done();
    });
  });
  describe('Type = Curved', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="curved"></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
    });
    it('should not have border-bottom at dividerarea', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-bottom: none;`);
      done();
    });
    // TODO: Find out how to test ::after elements is possible
    // it('should have color grey20', function (done) {
    // 	expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.grey20};`);
    //   done();
    // });
  });
  describe('Type = Curved, Inverted', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="curved" isInverted={true}></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
    });
    it('should have color grey90', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.grey90}`);
      done();
    });
  });
  describe('Type = Title', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="title" title={<h2>Title</h2>}></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
      dividerTitle = wrapper.find({ 'data-testid': 'divider-title' }).at(0);
    });
    it('should have border-bottom 1px solid', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle('border-bottom: 1px solid');
      done();
    });
    it('should have color black', function (done) {
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.elviaBlack}`);
      done();
    });
    it('should have md typography', function (done) {
      expect(dividerTitle.getDOMNode()).toHaveStyle('text-transform: unset');
      expect(dividerTitle.getDOMNode()).toHaveStyle('font-size: 30px');
      done();
    });
  });
  describe('Type = Title, Typography = Caps', () => {
    beforeEach(() => {
      wrapper = mount(<Divider type="title" title={<h2>Title</h2>} typography="caps"></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
      dividerTitle = wrapper.find({ 'data-testid': 'divider-title' }).at(0);
    });
    it('should have caps typography', function (done) {
      expect(dividerTitle.getDOMNode()).toHaveStyle('text-transform: uppercase');
      expect(dividerTitle.getDOMNode()).toHaveStyle('font-size: 14px');
      done();
    });
  });
  describe('Type = Title, Inverted', () => {
    it('should have color white', function (done) {
      wrapper = mount(<Divider type="title" title={<h2>Title</h2>} isInverted={true}></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
      expect(dividerArea.getDOMNode()).toHaveStyle(`border-color: ${colors.elviaWhite}`);
      done();
    });
  });
  describe('className and style passed to wrapper', () => {
    it('should have className and style', function (done) {
      wrapper = mount(<Divider className="test-class" style={{ margin: '24px' }}></Divider>);
      dividerArea = wrapper.find({ 'data-testid': 'divider-area' }).at(0);
      expect(dividerArea.getDOMNode()).toHaveStyle(`margin: 24px`);
      expect(dividerArea.getDOMNode()).toHaveClass(`test-class`);
      done();
    });
  });
});
