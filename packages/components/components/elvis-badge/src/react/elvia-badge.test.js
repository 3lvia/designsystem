import Badge from './elvia-badge.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  elviaRed: getColor('red'),
  elviaWhite: getColor('white'),
};

describe('Elvis Badge', () => {
  let wrapper;
  let badgeCircle;

  //COLOR
  describe('the default background color of the badge', () => {
    beforeEach(() => {
      wrapper = mount(
        <Badge
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
      badgeCircle = wrapper.find({ 'data-testid': 'badge-circle' }).at(0);
    });

    it('is green', (done) => {
      expect(badgeCircle.getDOMNode()).toHaveStyle(`background-color: ${colors.elviaCharge}`);
      done();
    });
  });

  //NUMBERED under 100
  describe('the number inside the badge circle when it is under 100', () => {
    beforeEach(() => {
      wrapper = mount(
        <Badge
          count={53}
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
      badgeCircle = wrapper.find({ 'data-testid': 'badge-circle' }).at(0);
    });

    it('should display the actual number', (done) => {
      expect(badgeCircle.at(0).text()).toBe('53');
      done();
    });

    it('should have normal padding', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`padding: 2px 0px`);
      done();
    });

    it('should have a fixed width to stay round', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`width: 16px`);
      done();
    });
  });

  //NUMBERED over 100
  describe('the number inside the badge circle when it is over 100', () => {
    beforeEach(() => {
      wrapper = mount(
        <Badge
          count={101}
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
      badgeCircle = wrapper.find({ 'data-testid': 'badge-circle' }).at(0);
    });

    it('should display "99+"', (done) => {
      expect(badgeCircle.at(0).text()).toBe('99+');
      done();
    });

    it('have some extra padding', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`padding: 2px 4px`);
      done();
    });

    it('should not have a fixed width', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`width: unset`);
      done();
    });
  });

  //NUMBERED with red color
  describe('the text color when the badge is red', () => {
    beforeEach(() => {
      wrapper = mount(
        <Badge
          count={101}
          badgeColor="red"
          content={
            <span className="e-btn__icon">
              <i className="e-icon e-icon--upload" aria-hidden="true"></i>
            </span>
          }
        />,
      );
      badgeCircle = wrapper.find({ 'data-testid': 'badge-circle' }).at(0);
    });

    it('should have a red background color', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`background-color: ${colors.elviaRed}`);
      done();
    });

    it('should have a white text color', (done) => {
      expect(badgeCircle.at(0).getDOMNode()).toHaveStyle(`color: ${colors.elviaWhite}`);
      done();
    });
  });
});
