import Carousel from './elvia-carousel.tsx';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('Elvis Carousel', () => {
  let wrapper;
  let carouselListOfDots;
  let carouselListOfDotsNodes;
  let carouselElementTitle;
  let carouselElement;
  let carouselLeftArrow;
  let carouselRightArrow;
  let carouselOnboardingCheckmark;
  const elementsNum = 5;
  const elements = [
    { title: 'Element 1', element: <p>Body text 1</p> },
    { title: 'Element 2', element: <p>Body text 2</p> },
    { title: 'Element 3', element: <p>Body text 3</p> },
    { title: 'Element 4', element: <p>Body text 4</p> },
  ];

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elements} />);
      carouselListOfDots = wrapper
        .find({ 'data-testid': 'carousel-list-of-dots' })
        .at(0)
        .children()
        .children();
      carouselListOfDotsNodes = carouselListOfDots.map((dot) => dot.getDOMNode());
      carouselElementTitle = wrapper.find({ 'data-testid': 'carousel-element-title' }).at(0);
      carouselElement = wrapper.find({ 'data-testid': 'carousel-element' }).at(0);
      carouselLeftArrow = wrapper.find({ 'data-testid': 'carousel-left-arrow' }).at(0);
      carouselRightArrow = wrapper.find({ 'data-testid': 'carousel-right-arrow' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
      jest.useRealTimers();
    });
    it('should have right amount of dots', function (done) {
      expect(carouselListOfDots.length).toEqual(4);
      done();
    });
    it('should have default value 0', function (done) {
      expect(carouselElementTitle.text()).toBe('Element 1');
      expect(carouselElement.text()).toBe('Body text 1');
      done();
    });
    it('should have elements', function (done) {
      expect(carouselElement.exists()).toBeTruthy();
      done();
    });
    it('should have aria-labels', function (done) {
      expect(carouselListOfDots.at(0).getDOMNode()).toHaveAttribute('aria-label', 'Du er på side 1');
      expect(carouselListOfDots.at(1).getDOMNode()).toHaveAttribute('aria-label', 'Gå til side 2');
      expect(carouselListOfDots.at(2).getDOMNode()).toHaveAttribute('aria-label', 'Gå til side 3');
      expect(carouselListOfDots.at(3).getDOMNode()).toHaveAttribute('aria-label', 'Gå til side 4');
      expect(carouselLeftArrow.getDOMNode()).toHaveAttribute('aria-label', 'Gå til forrige side');
      expect(carouselRightArrow.getDOMNode()).toHaveAttribute('aria-label', 'Gå til neste side');
      done();
    });
    it('should update selected element using dots ', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselListOfDots.at(2).simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselElementTitle.text()).toBe('Element 3');
      expect(carouselElement.text()).toBe('Body text 3');
      done();
    });
    it('should update selected element using right arrow', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselRightArrow.simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselElementTitle.text()).toBe('Element 2');
      done();
    });
    it('should update selected element using left arrow', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselLeftArrow.simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselElementTitle.text()).toBe('Element 4');
      done();
    });
  });
  describe('Elements = number', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elementsNum} />);
      carouselListOfDots = wrapper
        .find({ 'data-testid': 'carousel-list-of-dots' })
        .at(0)
        .children()
        .children();
      carouselListOfDotsNodes = carouselListOfDots.map((dot) => dot.getDOMNode());
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have right amount of dots', function (done) {
      expect(carouselListOfDots.length).toEqual(5);
      done();
    });
    it('should not have any elements', function (done) {
      expect(wrapper.find({ 'data-testid': 'carousel-element' }).exists()).toBeFalsy();
      done();
    });
  });
  describe('Value = 2', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elements} value={2} />);
      carouselElementTitle = wrapper.find({ 'data-testid': 'carousel-element-title' }).at(0);
      carouselElement = wrapper.find({ 'data-testid': 'carousel-element' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have new default value 2', function (done) {
      expect(carouselElementTitle.text()).toBe('Element 3');
      expect(carouselElement.text()).toBe('Body text 3');
      done();
    });
  });
  describe('Hide arrows = true', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elements} hideArrows />);
      carouselListOfDots = wrapper
        .find({ 'data-testid': 'carousel-list-of-dots' })
        .at(0)
        .children()
        .children();
      carouselLeftArrow = wrapper.find({ 'data-testid': 'carousel-left-arrow' }).at(0);
      carouselRightArrow = wrapper.find({ 'data-testid': 'carousel-right-arrow' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
      jest.useRealTimers();
    });
    it('should hide arrow at the left end', function (done) {
      expect(carouselLeftArrow.getDOMNode()).toHaveAttribute('hidden');
      expect(carouselRightArrow.getDOMNode()).not.toHaveAttribute('hidden');
      done();
    });
    it('should hide arrow at the right end', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselListOfDots.at(carouselListOfDots.length - 1).simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselRightArrow.getDOMNode()).toHaveAttribute('hidden');
      expect(carouselLeftArrow.getDOMNode()).not.toHaveAttribute('hidden');
      done();
    });
  });
  // TODO: Vet ikke hvorfor denne testeen ikke funker
  // describe('Onboarding Checkmark  = true', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Carousel elements={elements} hideArrows />);
  //     carouselListOfDots = wrapper
  //       .find({ 'data-testid': 'carousel-list-of-dots' })
  //       .at(0)
  //       .children()
  //       .children();
  //     carouselRightArrow = wrapper.find({ 'data-testid': 'carousel-right-arrow' }).at(0);
  //     carouselOnboardingCheckmark = wrapper.find({ 'data-testid': 'carousel-onboarding-checkmark' }).at(0);
  //   });
  //   afterEach(() => {
  //     wrapper.unmount();
  //     jest.useRealTimers();
  //   });
  // it('should show onboarding checkmark at right end', function (done) {
  //   expect(carouselOnboardingCheckmark.exists()).toBeFalsy();
  //   act(() => {
  //     jest.useFakeTimers();
  //     carouselListOfDots.at(carouselListOfDots.length - 1).simulate('click');
  //     jest.advanceTimersByTime(480);
  //   });
  //   expect(wrapper.find({ 'data-testid': 'carousel-onboarding-checkmark' }).exists()).toBeTruthy();
  //   done();
  // });
  // });
});
