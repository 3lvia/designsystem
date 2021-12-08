import Carousel from './elvia-carousel.tsx';
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

describe('Elvis Carousel', () => {
  let wrapper;
  let carouselListOfDots;
  let carouselListOfDotsNodes;
  let carouselElementTitle;
  let carouselElement;
  let carouselLeftArrow;
  let carouselRightArrow;
  const elementsNum = 5;
  const elements = [
    {
      title: 'Element 1',
      element: <p>Body text 1</p>,
    },
    {
      title: 'Element 2',
      element: <p>Body text 2</p>,
    },
    {
      title: 'Element 3',
      element: <p>Body text 3</p>,
    },
    {
      title: 'Element 4',
      element: <p>Body text 4</p>,
    },
  ];

  describe('Default', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elements}></Carousel>);
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
    // it('should update selected element using dots ', function (done) {
    // 	act(() => {
    //     carouselListOfDots.at(2).simulate('click');
    //   });
    //   expect(carouselElementTitle.text()).toBe('Element 3');
    //   expect(carouselElement.text()).toBe('Body text 3');
    //   done();
    // });
    // it('should update selected element using right arrow', function (done) {
    // 	act(() => {
    // 		carouselRightArrow.simulate('click');
    // 	});
    // 	expect(carouselElementTitle.text()).toBe('Element 2');
    // });
    // it('should update selected element using left arrow', function (done) {
    // 	carouselLeftArrow.simulate('click');
    // 	expect(carouselElementTitle.text()).toBe('Element 4');
    // 	done();
    // });
  });
  describe('Elements = number', () => {
    beforeEach(() => {
      wrapper = mount(<Carousel elements={elementsNum}></Carousel>);
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
      wrapper = mount(<Carousel elements={elements} value={2}></Carousel>);
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
      wrapper = mount(<Carousel elements={elements} hideArrows={true}></Carousel>);
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
    });

    it('should hide arrow at the left end', function (done) {
      expect(carouselLeftArrow.getDOMNode()).toHaveAttribute('hidden');
      expect(carouselRightArrow.getDOMNode()).not.toHaveAttribute('hidden');
      done();
    });
    // it('should hide arrow at the right end', function (done) {
    //   act(() => {
    //     carouselListOfDots.at(carouselListOfDots.length - 1).simulate('click');
    //   });
    //   expect(carouselRightArrow.getDOMNode()).toHaveAttribute('hidden');
    //   expect(carouselLeftArrow.getDOMNode()).not.toHaveAttribute('hidden');
    //   done();
    // });
  });
  // describe('Onboarding Checkmark  = true', () => {
  //   beforeEach(() => {
  //     wrapper = mount(
  //       <Carousel
  // 				elements={elements}
  //         useOnboardingCheckmark
  //       ></Carousel>,
  //     );
  //     accordionButton = wrapper.find({ 'data-testid': 'accordion-button-label' }).at(0);
  //     accordionContentNormal = wrapper.find({ 'data-testid': 'accordion-content-normal' }).at(0);
  //   });

  //   afterEach(() => {
  //     wrapper.unmount();
  //   });

  // it('should show onboarding checkmark at right end', function (done) {
  //   expect(accordionButton.text()).toBe('open');
  //   done();
  // });
  // });
});
