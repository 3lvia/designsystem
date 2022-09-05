import Timepicker from './elvia-timepicker.tsx';
import React from 'react';
import { mount } from 'enzyme';

const getElement = (wrapper, elementType, dataAttribute) => {
  return wrapper.find(`${elementType}[data-test="${dataAttribute}"]`);
};

describe('Elvis Timepicker', () => {
  describe('Basic', () => {
    let wrapper;
    let label;
    let input;
    let popoverToggle;
    let popover;

    beforeEach(() => {
      wrapper = mount(<Timepicker></Timepicker>);
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

      it('the popover opens', () => {
        expect(popover.getDOMNode()).toBeDefined();
      });

      it('the popover contains an hours list', () => {
        expect(hoursList.getDOMNode()).toBeDefined();
      });

      it('the popover contains an minutes list', () => {
        expect(minutesList.getDOMNode()).toBeDefined();
      });

      it('the popover contains 28 hour buttons', () => {
        // 24 + 2 duplicates on each side for looping
        expect(hourButtons.length).toBe(28);
      });

      it('the popover contains 8 minute buttons', () => {
        // 4 + 2 duplicates on each side for looping
        expect(minuteButtons.length).toBe(8);
      });

      describe('and the next-hour button is clicked', () => {
        beforeEach(() => {
          nextHourButton.simulate('click');
        });

        it('the value in the input goes to the default setting', () => {
          expect(input.getDOMNode().value).toBe('00.00');
        });

        describe('and clicked again', () => {
          beforeEach(() => {
            nextHourButton.simulate('click');
          });

          it('the hour increases by one', () => {
            expect(input.getDOMNode().value).toBe('01.00');
          });
        });

        describe('and the minute button is clicked', () => {
          beforeEach(() => {
            nextMinuteButton.simulate('click');
          });

          it('the minute increases by 15', () => {
            expect(input.getDOMNode().value).toBe('00.15');
          });
        });
      });

      describe('and the hour button 01 is clicked', () => {
        beforeEach(() => {
          hourButtons.at(3).simulate('click');
        });

        it('the hour is set to 01.00', () => {
          expect(input.getDOMNode().value).toBe('01.00');
        });
      });

      describe('and the backdrop is clicked', () => {
        beforeEach(() => {
          backdrop.simulate('click');
          popover = getElement(wrapper, 'div', 'popover');
        });

        it('the popover is closed', () => {
          expect(popover.length).toBe(0);
        });
      });
    });

    describe('When the input is changed and blurred', () => {
      beforeEach(() => {
        // 26 hours wraps around the clock to 02
        input.simulate('change', { target: { value: '26' }, nativeEvent: { data: '26' } });
        input.simulate('blur');
      });

      it('the input value wraps to the correct hour', () => {
        expect(input.getDOMNode().value).toBe('02.00');
      });
    });
  });

  describe('Disabled', () => {
    let wrapper;
    let input;
    let popoverToggle;
    let popover;

    beforeEach(() => {
      wrapper = mount(<Timepicker disabled={true}></Timepicker>);
      input = getElement(wrapper, 'input', 'input');
      popoverToggle = getElement(wrapper, 'button', 'popover-toggle');
      popover = getElement(wrapper, 'div', 'popover');
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it('should have an disabled input field', () => {
      expect(input.getDOMNode().disabled).toBe(true);
    });

    it('should have an disabled button', () => {
      expect(popoverToggle.getDOMNode().disabled).toBe(true);
    });

    describe('When the popover trigger is clicked', () => {
      beforeEach(() => {
        popoverToggle.simulate('click');
      });

      it('the popover does not open', () => {
        expect(popover.length).toBe(0);
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

    it('should have a small popover toggle', () => {
      expect(popoverToggle.parent().prop('size')).toBe('small');
    });
  });
});
