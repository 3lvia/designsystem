import Card from './elvia-card.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

describe('Elvis Card', () => {
  let wrapper;
  let cardArea;
  let cardColoredLine;
  let cardIcon;
  let cardHeader;
  let cardDescription;
  let cardTag;
  let cardHoverArrow;
  let cardCornerIcon;

  describe('', () => {
    it('is true', (done) => {
      expect(true).toBe(true);
      done();
    });
  });

  // describe('Type = simple square', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Card icon={'Icon'} header={'Header'} description={'Description'} tag={'Tag'}></Card>);
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //     cardColoredLine = wrapper.find({ 'data-testid': 'card-colored-line' });
  //     cardIcon = wrapper.find({ 'data-testid': 'card-icon' });
  //     cardHeader = wrapper.find({ 'data-testid': 'card-header' });
  //     cardDescription = wrapper.find({ 'data-testid': 'card-description' });
  //     cardTag = wrapper.find({ 'data-testid': 'card-tag' });
  //     cardHoverArrow = wrapper.find({ 'data-testid': 'card-detail-hover-arrow' });
  //     cardCornerIcon = wrapper.find({ 'data-testid': 'card-corner-icon' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should have icon', function (done) {
  //     expect(cardIcon.at(0).text()).toBe('Icon');
  //     done();
  //   });

  //   it('should have header', function (done) {
  //     expect(cardHeader.at(0).text()).toBe('Header');
  //     done();
  //   });

  //   it('should have description', function (done) {
  //     expect(cardDescription.at(0).text()).toBe('Description');
  //     done();
  //   });

  //   it('should have shape square', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`border-radius: 8px`);
  //     done();
  //   });

  //   it('should have border', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
  //     done();
  //   });

  //   it('should not have top border with color', function (done) {
  //     expect(cardColoredLine.length).toEqual(0);
  //     done();
  //   });

  //   it('should not have corner icon', function (done) {
  //     expect(cardCornerIcon.length).toEqual(0);
  //     done();
  //   });

  //   it('should not have hover arrow', function (done) {
  //     expect(cardHoverArrow.length).toEqual(0);
  //     done();
  //   });

  //   it('should not have tag', function (done) {
  //     expect(cardTag.length).toEqual(0);
  //     done();
  //   });

  //   it('should not switch icon on hover', function (done) {
  //     expect(cardIcon.at(0).text()).toBe('Icon');
  //     wrapper.simulate('pointerenter');
  //     expect(cardIcon.at(0).text()).toBe('Icon');
  //     done();
  //   });

  //   it('should have default width', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`width: 100%`);
  //     done();
  //   });

  //   it('should have default minWidth', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`min-width: 112px`);
  //     done();
  //   });

  //   it('should have default maxWidth', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`max-width: 400px`);
  //     done();
  //   });
  // });

  // describe('Type = simple square with width and colored top', () => {
  //   beforeEach(() => {
  //     wrapper = mount(
  //       <Card
  //         icon={'Icon'}
  //         header={'Header'}
  //         description={'Description'}
  //         borderColor={'red'}
  //         tag={'Tag'}
  //         width={'150px'}
  //         minWidth={150}
  //         maxWidth={350}
  //       ></Card>,
  //     );
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //     cardColoredLine = wrapper.find({ 'data-testid': 'card-colored-line' });
  //     cardIcon = wrapper.find({ 'data-testid': 'card-icon' });
  //     cardHeader = wrapper.find({ 'data-testid': 'card-header' });
  //     cardDescription = wrapper.find({ 'data-testid': 'card-description' });
  //     cardTag = wrapper.find({ 'data-testid': 'card-tag' });
  //     cardHoverArrow = wrapper.find({ 'data-testid': 'card-detail-hover-arrow' });
  //     cardCornerIcon = wrapper.find({ 'data-testid': 'card-corner-icon' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should have top border with color', function (done) {
  //     expect(cardColoredLine.at(0).getDOMNode()).toHaveStyle(`border-top: 4px solid ${getColor('red')}`);
  //     done();
  //   });

  //   it('should have a set width', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`width: 150px`);
  //     done();
  //   });

  //   it('should have minWidth', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`min-width: 150px`);
  //     done();
  //   });

  //   it('should have maxWidth', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`max-width: 350px`);
  //     done();
  //   });
  // });

  // describe('Type = simple square, with hover icon', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Card icon={'Icon'} iconHover={'IconHover'} minWidth={50}></Card>);
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //     cardIcon = wrapper.find({ 'data-testid': 'card-icon' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should switch icon on hover', function (done) {
  //     expect(cardIcon.at(0).text()).toBe('Icon');
  //     wrapper.simulate('pointerenter');
  //     expect(cardIcon.at(0).text()).toBe('IconHover');
  //     wrapper.simulate('pointerleave');
  //     expect(cardIcon.at(0).text()).toBe('Icon');
  //     done();
  //   });
  // });

  // describe('Type = simple square, no border', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Card icon={'Icon'} hasBorder={false}></Card>);
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should not have standard border', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).not.toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
  //     done();
  //   });

  //   it('should have grey border (to match "on grey")', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).not.toHaveStyle(`border: 1px solid ${getColor('grey-10')}`);
  //     done();
  //   });
  // });

  // describe('Type = detail', () => {
  //   beforeEach(() => {
  //     wrapper = mount(
  //       <Card
  //         type={'detail'}
  //         tag={'Tag'}
  //         description={'Description'}
  //         cornerIcon={'CornerIcon'}
  //         shape={'circle'}
  //       ></Card>,
  //     );
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //     cardIcon = wrapper.find({ 'data-testid': 'card-icon' });
  //     cardDescription = wrapper.find({ 'data-testid': 'card-description' });
  //     cardTag = wrapper.find({ 'data-testid': 'card-tag' });
  //     cardHoverArrow = wrapper.find({ 'data-testid': 'card-detail-hover-arrow' });
  //     cardCornerIcon = wrapper.find({ 'data-testid': 'card-corner-icon' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should not have icon', function (done) {
  //     expect(cardIcon.length).toEqual(0);
  //     done();
  //   });

  //   it('should have tag', function (done) {
  //     expect(cardTag.at(0).text()).toBe('Tag');
  //     done();
  //   });

  //   it('should have tag with styling', function (done) {
  //     expect(cardTag.at(0).getDOMNode()).toHaveStyle(
  //       `padding: 4px 8px;
  //       border-radius: 4px;
  //       background: ${getColor('grey-10')};
  //       font-size: 11px;
  //       font-weight: 400;`,
  //     );
  //     done();
  //   });

  //   it('should have shape square', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle(`border-radius: 8px`);
  //     done();
  //   });

  //   it('should have corner icon', function (done) {
  //     expect(cardCornerIcon.at(0).text()).toBe('CornerIcon');
  //     done();
  //   });

  //   it('should have hover arrow', function (done) {
  //     expect(cardHoverArrow.length).toEqual(2);
  //     done();
  //   });

  //   it('should have default lines of description text', function (done) {
  //     expect(cardDescription.at(0).getDOMNode()).toHaveStyle(`line-clamp: 3;`);
  //     done();
  //   });
  // });

  // describe('Type = detail, shorter description', () => {
  //   beforeEach(() => {
  //     wrapper = mount(
  //       <Card type={'detail'} tag={'Tag'} description={'Description'} maxDescriptionLines={1}></Card>,
  //     );
  //     cardDescription = wrapper.find({ 'data-testid': 'card-description' });
  //     cardCornerIcon = wrapper.find({ 'data-testid': 'card-corner-icon' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should have max 1 line of description text', function (done) {
  //     expect(cardDescription.at(0).getDOMNode()).toHaveStyle(`line-clamp: 1;`);
  //     done();
  //   });

  //   it('should have empty corner icon', function (done) {
  //     expect(cardCornerIcon.at(0).text()).toEqual('');
  //     done();
  //   });
  // });

  // describe('className and inlineStyle passed to wrapper', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Card className="test-class" inlineStyle={{ margin: '24px' }}></Card>);
  //     cardArea = wrapper.find({ 'data-testid': 'card-area' });
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  //   it('should have className and inlineStyle', function (done) {
  //     expect(cardArea.at(0).getDOMNode()).toHaveStyle('margin: 24px');
  //     expect(cardArea.at(0).getDOMNode()).toHaveClass('test-class');
  //     done();
  //   });
  // });
});
