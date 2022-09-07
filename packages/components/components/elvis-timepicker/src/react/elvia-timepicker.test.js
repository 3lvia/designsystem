import Timepicker from './elvia-timepicker.tsx';
import React from 'react';
import { mount } from 'enzyme';

const getElement = (wrapper, elementType, dataAttribute) => {
  return wrapper.find(`${elementType}[data-test="${dataAttribute}"]`);
};

export const padDigit = (d) => {
  const paddedNumber = `0${d}`;
  return paddedNumber.substring(paddedNumber.length - 2);
};

describe('Elvis Timepicker', () => {
  describe('Basic', () => {
    let wrapper;
    let label;
    let input;
    let popoverToggle;
    let popover;

    beforeEach(() => {
      wrapper = mount(<Timepicker selectNowOnOpen={false}></Timepicker>);
      label = getElement(wrapper, 'div', 'label');
      input = getElement(wrapper, 'input', 'input');
      popoverToggle = getElement(wrapper, 'button', 'popover-toggle');
      popover = getElement(wrapper, 'div', 'popover');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should have a default label', (done) => {
      expect(label.text()).toBe('Velg tid');
      done();
    });

    it('should not have a default value', (done) => {
      expect(input.getDOMNode().value).toBe('');
      done();
    });

    it('should have a placeholder', (done) => {
      expect(input.getDOMNode().placeholder).toBe('tt.mm');
      done();
    });

    it('should have a toggle button', (done) => {
      expect(popoverToggle.getDOMNode()).toBeDefined();
      done();
    });

    it('should not have a popover visible by default', (done) => {
      expect(popover).toEqual({});
      done();
    });

    describe('When the popover trigger is clicked', () => {
      let backdrop;
      let hoursList;
      let minutesList;
      let nextHourButton;
      let nextMinuteButton;
      let hourButtons;
      let minuteButtons;

      beforeEach(() => {
        popoverToggle.simulate('click');
        popover = getElement(wrapper, 'div', 'popover');
        backdrop = getElement(wrapper, 'div', 'backdrop');
        hoursList = getElement(popover, 'div', 'Time-number-list');
        minutesList = getElement(popover, 'div', 'Minutt-number-list');
        nextHourButton = getElement(popover, 'button', 'Time-next-value-button');
        nextMinuteButton = getElement(popover, 'button', 'Minutt-next-value-button');
        hourButtons = getElement(popover, 'button', 'Time-number-button');
        minuteButtons = getElement(popover, 'button', 'Minutt-number-button');
      });

      it('the popover opens', (done) => {
        expect(popover.getDOMNode()).toBeDefined();
        done();
      });

      it('the popover contains an hours list', (done) => {
        expect(hoursList.getDOMNode()).toBeDefined();
        done();
      });

      it('the popover contains an minutes list', (done) => {
        expect(minutesList.getDOMNode()).toBeDefined();
        done();
      });

      it('the popover contains 28 hour buttons', (done) => {
        // 24 + 2 duplicates on each side for looping
        done();
        expect(hourButtons.length).toBe(28);
      });

      it('the popover contains 8 minute buttons', (done) => {
        // 4 + 2 duplicates on each side for looping
        expect(minuteButtons.length).toBe(8);
        done();
      });

      describe('and the next-hour button is clicked', () => {
        beforeEach(() => {
          nextHourButton.simulate('click');
        });

        it('the value in the input goes to the default setting', (done) => {
          expect(input.getDOMNode().value).toBe('00.00');
          done();
        });

        describe('and clicked again', () => {
          beforeEach(() => {
            nextHourButton.simulate('click');
          });

          it('the hour increases by one', (done) => {
            expect(input.getDOMNode().value).toBe('01.00');
            done();
          });
        });

        describe('and the minute button is clicked', () => {
          beforeEach(() => {
            nextMinuteButton.simulate('click');
          });

          it('the minute increases by 15', (done) => {
            expect(input.getDOMNode().value).toBe('00.15');
            done();
          });
        });
      });

      describe('and the hour button 01 is clicked', () => {
        beforeEach(() => {
          hourButtons.at(3).simulate('click');
        });

        it('the hour is set to 01.00', (done) => {
          expect(input.getDOMNode().value).toBe('01.00');
          done();
        });
      });
    });

    describe('When the input is changed and blurred', () => {
      beforeEach(() => {
        // 26 hours wraps around the clock to 02
        input.simulate('change', { target: { value: '26' }, nativeEvent: { data: '26' } });
        input.simulate('blur');
      });

      it('a validation error is shown', (done) => {
        expect(getElement(wrapper, 'span', 'error').text()).toBe('Ugyldig tid');
        done();
      });
    });
  });

  describe('Disabled', () => {
    let wrapper;
    let input;
    let popoverToggle;
    let popover;

    beforeEach(() => {
      wrapper = mount(<Timepicker isDisabled={true}></Timepicker>);
      input = getElement(wrapper, 'input', 'input');
      popoverToggle = getElement(wrapper, 'button', 'popover-toggle');
      popover = getElement(wrapper, 'div', 'popover');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should have an disabled input field', (done) => {
      expect(input.getDOMNode().disabled).toBe(true);
      done();
    });

    it('should have an disabled button', (done) => {
      expect(popoverToggle.getDOMNode().disabled).toBe(true);
      done();
    });

    describe('When the popover trigger is clicked', () => {
      beforeEach(() => {
        popoverToggle.simulate('click');
      });

      it('the popover does not open', (done) => {
        expect(popover.length).toBe(0);
        done();
      });
    });
  });

  describe('Compact', () => {
    let wrapper;
    let popoverToggle;

    beforeEach(() => {
      wrapper = mount(<Timepicker isCompact={true}></Timepicker>);
      popoverToggle = getElement(wrapper, 'button', 'popover-toggle');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should have a small popover toggle', (done) => {
      expect(popoverToggle.parent().prop('size')).toBe('small');
      done();
    });
  });

  describe('With default select on open', () => {
    let wrapper;
    let popoverToggle;

    beforeEach(() => {
      wrapper = mount(<Timepicker selectNowOnOpen={true}></Timepicker>);
      popoverToggle = getElement(wrapper, 'button', 'popover-toggle');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    describe('When the popover trigger is clicked', () => {
      let input;

      beforeEach(() => {
        popoverToggle.simulate('click');
        input = getElement(wrapper, 'input', 'input');
      });

      it('the input receives a default value', (done) => {
        const now = new Date();
        expect(input.getDOMNode().value).toBe(`${padDigit(now.getHours())}.${padDigit(now.getMinutes())}`);
        done();
      });
    });
  });
});
