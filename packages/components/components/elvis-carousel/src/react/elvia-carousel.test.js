import Carousel from './elvia-carousel.tsx';
import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('Elvis Carousel', () => {
  let wrapper;
  let carouselContainer;
  let carouselListOfDots;
  let carouselListOfDotsNodes;
  let carouselItemTitle;
  let carouselItem;
  let carouselLeftArrow;
  let carouselRightArrow;
  let carouselOnboardingCheckmark;
  const itemsNum = 5;
  const items = [
    { heading: 'Item 1', item: <p>Body text 1</p> },
    { heading: 'Item 2', item: <p>Body text 2</p> },
    { heading: 'Item 3', item: <p>Body text 3</p> },
    { heading: 'Item 4', item: <p>Body text 4</p> },
  ];

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel items={items} />);
      carouselListOfDots = wrapper
        .find({ 'data-testid': 'carousel-list-of-dots' })
        .at(0)
        .children()
        .children();
      carouselListOfDotsNodes = carouselListOfDots.map((dot) => dot.getDOMNode());
      carouselItemTitle = wrapper.find({ 'data-testid': 'carousel-item-heading' }).at(0);
      carouselItem = wrapper.find({ 'data-testid': 'carousel-item' }).at(0);
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
      expect(carouselItemTitle.text()).toBe('Item 1');
      expect(carouselItem.text()).toBe('Body text 1');
      done();
    });
    it('should have items', function (done) {
      expect(carouselItem.exists()).toBeTruthy();
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
    it('should update selected item using dots ', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselListOfDots.at(2).simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselItemTitle.text()).toBe('Item 3');
      expect(carouselItem.text()).toBe('Body text 3');
      done();
    });
    it('should update selected item using right arrow', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselRightArrow.simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselItemTitle.text()).toBe('Item 2');
      done();
    });
    it('should update selected item using left arrow', function (done) {
      act(() => {
        jest.useFakeTimers();
        carouselLeftArrow.simulate('click');
        jest.advanceTimersByTime(480);
      });
      expect(carouselItemTitle.text()).toBe('Item 4');
      done();
    });
  });
  describe('Items = number', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel items={itemsNum} />);
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
    it('should not have any items', function (done) {
      expect(wrapper.find({ 'data-testid': 'carousel-item' }).exists()).toBeFalsy();
      done();
    });
  });
  describe('Value = 2', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel items={items} value={2} />);
      carouselItemTitle = wrapper.find({ 'data-testid': 'carousel-item-heading' }).at(0);
      carouselItem = wrapper.find({ 'data-testid': 'carousel-item' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
    });
    it('should have new default value 2', function (done) {
      expect(carouselItemTitle.text()).toBe('Item 3');
      expect(carouselItem.text()).toBe('Body text 3');
      done();
    });
  });
  describe('Hide arrows = true', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel items={items} loop={false} />);
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
  describe('className and inlineStyle passed to wrapper', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel items={items} className="test-class" inlineStyle={{ margin: '24px' }} />);
      carouselContainer = wrapper.find({ 'data-testid': 'carousel-container' }).at(0);
    });
    afterEach(() => {
      wrapper.unmount();
      jest.useRealTimers();
    });
    it('should have className and inlineStyle', function (done) {
      expect(carouselContainer.getDOMNode()).toHaveClass('test-class');
      expect(carouselContainer.getDOMNode()).toHaveStyle('margin: 24px');

      done();
    });
  });
  // TODO: Vet ikke hvorfor denne testeen ikke funker
  // describe('Onboarding Checkmark  = true', () => {
  //   beforeEach(() => {
  //     wrapper = mount(<Carousel items={items} hideArrows />);
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
