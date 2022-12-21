import '@testing-library/jest-dom';
import React from 'react';
import Slider from './elvia-slider';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, fireEvent, act } from '@testing-library/react';

//====================
// Simple Slider
//====================
describe('Elvia Slider', () => {
  describe('The default simple slider', () => {
    const type = 'simple';
    const min = 1;
    const max = 100;

    //==================== RENDERING ====================
    test('should contain a single input type=range', () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeInTheDocument();
      expect(leftSliderInput).toHaveAttribute('type', 'range');
      expect(screen.getAllByRole('slider')).toHaveLength(1);
    });

    test('should have a "min" attribute with the value 1', () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toHaveAttribute('min', '1');
    });

    test('should have a "max" attribute with the value 100', () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toHaveAttribute('max', '100');
    });

    test('should have a default equal to the "min" attribute', () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toHaveValue('1');
    });

    test('should be enabled', () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeEnabled();
    });

    test('should not have a input field', () => {
      render(<Slider type={type} min={min} max={max} />);
      const sliderContainer = screen.getByTestId('slider-container');
      const leftNumberInput = screen.queryByTestId('left-number-input');

      expect(sliderContainer).not.toContainElement(leftNumberInput);
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should display the tooptip containing the value on hover', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeEnabled();

      await user.hover(leftSliderInput);
      const leftTooltipPopup = await screen.findByTestId('left-tooltip-popup');
      expect(leftTooltipPopup).toBeInTheDocument();
      expect(leftTooltipPopup).toHaveTextContent(min.toString());
    });

    test('should display the tooptip containing the percentage between min and max if percent is true', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} hasPercent={true} value={11} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      await user.hover(leftSliderInput);

      const leftTooltipPopup = await screen.findByTestId('left-tooltip-popup');
      expect(leftTooltipPopup).toBeInTheDocument();
      expect(leftTooltipPopup).toHaveTextContent(`${10} %`);
    });

    test('should display the tooptip containing a custom unit if defined', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} unit={' dB'} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      await user.hover(leftSliderInput);

      const leftTooltipPopup = await screen.findByTestId('left-tooltip-popup');
      expect(leftTooltipPopup).toBeInTheDocument();
      expect(leftTooltipPopup).toHaveTextContent(`${min} dB`);
    });

    /* Using FireEvent here as type=range is not fully supported by UserEvent (?): https://github.com/testing-library/user-event/issues/871 */
    test('should update the value when the slider is changed', async () => {
      render(<Slider type={type} min={min} max={max} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      fireEvent.change(leftSliderInput, { target: { value: 50 } });
      expect(leftSliderInput).toHaveValue('50');
    });
  });

  describe('The simple slider with a input field', () => {
    const type = 'simple';
    const min = 1;
    const max = 100;
    const hasInputField = true;

    //==================== RENDERING ====================
    test('should have input type=number with a "min" attribute with the value 1', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftNumberInput = screen.getByTestId('left-number-input');

      expect(leftNumberInput).toHaveAttribute('min', '1');
    });

    test('should have input type=number with a "max" attribute with the value 100', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftNumberInput = screen.getByTestId('left-number-input');

      expect(leftNumberInput).toHaveAttribute('max', '100');
    });

    test('should have input type=number with a default value loosely equal to the "min" attribute', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftNumberInput = screen.getByTestId('left-number-input');

      expect(leftNumberInput).toHaveValue(min);
    });

    test('should have one enabled type=number ', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftNumberInput = screen.getByTestId('left-number-input');

      expect(leftNumberInput).toBeEnabled();
    });

    test('should have a label that says "Verdi"', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftLabel = screen.getByTestId('left-label');

      expect(leftLabel).toHaveTextContent('Verdi');
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should update the slider when the number input changes by typing', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftSliderInput = screen.getByTestId('left-slider');
      const leftNumberInput = screen.getByTestId('left-number-input');

      await user.click(leftNumberInput);
      await user.keyboard('{Backspace}');
      await user.type(leftNumberInput, '20');
      act(() => {
        leftNumberInput.blur();
      });

      expect(leftNumberInput).toBeEnabled();
      expect(leftSliderInput).toHaveValue('20'); //see if the value was updated or not (it should update from 1 to 20)
    });

    /* Using FireEvent here as type=range is not fully supported by UserEvent (?): https://github.com/testing-library/user-event/issues/871 */
    test('should update the number input when the slider value changes', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftSliderInput = screen.getByTestId('left-slider');
      const leftNumberInput = screen.getByTestId('left-number-input');

      fireEvent.change(leftSliderInput, { target: { value: 50 } });
      expect(leftNumberInput).toHaveValue(50);
    });

    test('should not update the slider if the input value is less than minimum', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftSliderInput = screen.getByTestId('left-slider');
      const leftNumberInput = screen.getByTestId('left-number-input');

      await user.click(leftNumberInput);
      await user.keyboard('{Backspace}');
      await user.type(leftNumberInput, '0');
      act(() => {
        leftNumberInput.blur(); //the input field needs to be blurred to trigger the onBlur event to validate the input
      });
      expect(leftNumberInput).toBeInvalid();
      expect(leftSliderInput).toHaveValue('1'); //see if the value was updated or not (it should not)
    });

    test('should not update the slider if the input value is greater than maximum', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftSliderInput = screen.getByTestId('left-slider');
      const leftNumberInput = screen.getByTestId('left-number-input');

      await user.click(leftNumberInput);
      await user.keyboard('{Backspace}');
      await user.type(leftNumberInput, '200');
      act(() => {
        leftNumberInput.blur();
      });

      expect(leftNumberInput).toBeInvalid();
      expect(leftSliderInput).toHaveValue('1');
    });
  });

  describe('The simple slider with a input field and custom label', () => {
    const type = 'simple';
    const min = 1;
    const max = 100;
    const hasInputField = true;
    const label = 'kWh';

    test('should have a label that is equal to the custom label ("kWh")', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} label={label} />);
      const leftLabel = screen.getByTestId('left-label');

      expect(leftLabel).toHaveTextContent('kWh');
    });
  });

  describe('The disabled simple slider', () => {
    const type = 'simple';
    const min = 1;
    const max = 100;
    const isDisabled = true;

    test('should be disabled', () => {
      render(<Slider type={type} min={min} max={max} isDisabled={isDisabled} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeDisabled();
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should not display the tooptip on hover', async () => {
      const user = userEvent.setup();
      render(<Slider type={type} min={min} max={max} isDisabled={isDisabled} />);
      const leftSliderInput = screen.getByTestId('left-slider');

      expect(leftSliderInput).toBeDisabled();

      await user.hover(leftSliderInput);

      const leftTooltipPopup = await screen.queryByTestId('left-tooltip-popup');

      //it is not in the document
      expect(leftTooltipPopup).toBe(null);
    });
  });

  describe('The disabled simple slider with a input field', () => {
    const type = 'simple';
    const min = 1;
    const max = 100;
    const hasInputField = true;
    const isDisabled = true;

    test('should have a input field that is disabled', () => {
      render(
        <Slider type={type} min={min} max={max} isDisabled={isDisabled} hasInputField={hasInputField} />,
      );
      const leftNumberInput = screen.getByTestId('left-number-input');

      expect(leftNumberInput).toBeDisabled();
    });
  });

  //====================
  // Range Slider
  //====================

  describe('The default range slider', () => {
    const type = 'range';
    const min = 1;
    const max = 100;

    test('should contain two inputs type=range', () => {
      render(<Slider type={type} min={min} max={max} />);

      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });

    //not testing the left slider because it is the same as the simple slider
    test('should have a "min" attribute with the value 1 on the right slider', () => {
      render(<Slider type={type} min={min} max={max} />);
      const rightSliderInput = screen.getByTestId('right-slider');

      expect(rightSliderInput).toHaveAttribute('min', '1');
    });

    test('should have a "max" attribute with the value 100 on the right slider', () => {
      render(<Slider type={type} min={min} max={max} />);
      const rightSliderInput = screen.getByTestId('right-slider');

      expect(rightSliderInput).toHaveAttribute('max', '100');
    });

    test('should have a right slider that is enabled', () => {
      render(<Slider type={type} min={min} max={max} />);
      const rightSliderInput = screen.getByTestId('right-slider');

      expect(rightSliderInput).toBeEnabled();
    });
  });

  describe('The range slider with input fields', () => {
    const type = 'range';
    const min = 1;
    const max = 100;
    const hasInputField = true;

    test('should contain two inputs type=number', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);

      expect(screen.getAllByRole('spinbutton')).toHaveLength(2);
    });

    test('should have a right input type=number with a "max" attribute with the value 100', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const rightNumberInput = screen.getByTestId('right-number-input');

      expect(rightNumberInput).toHaveAttribute('max', '100');
    });

    test('should have a right input type=number with a default value loosely equal to the "max" attribute', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const rightNumberInput = screen.getByTestId('right-number-input');

      expect(rightNumberInput).toHaveValue(100);
    });

    test('should have two type=number enabled', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const rightNumberInput = screen.getByTestId('right-number-input');

      expect(rightNumberInput).toBeEnabled();
    });

    test('should labels that say "Fra" and "Til"', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} />);
      const leftLabel = screen.getByTestId('left-label');
      const rightLabel = screen.getByTestId('right-label');

      expect(leftLabel).toHaveTextContent('Fra');
      expect(rightLabel).toHaveTextContent('Til');
    });

    //========== MIMICKING USER INTERACTIONS ==========

    test('should not update the sliders if the left input is greater than the right input', async () => {
      const user = userEvent.setup();
      render(
        <Slider
          type={type}
          min={min}
          max={max}
          hasInputField={hasInputField}
          value={{ left: min, right: 80 }}
        />,
      );
      const leftSliderInput = screen.getByTestId('left-slider');
      const leftNumberInput = screen.getByTestId('left-number-input');

      await user.click(leftNumberInput);
      await user.keyboard('{Backspace}');
      await user.type(leftNumberInput, '81');
      act(() => {
        leftNumberInput.blur();
      });

      expect(leftNumberInput).toBeInvalid();
      expect(leftSliderInput).toHaveValue('1');
    });

    test('should not update the sliders if the right input is smaller than the left input', async () => {
      const user = userEvent.setup();
      render(
        <Slider
          type={type}
          min={min}
          max={max}
          hasInputField={hasInputField}
          value={{ left: 20, right: max }}
        />,
      );
      const rightSliderInput = screen.getByTestId('right-slider');
      const rightNumberInput = screen.getByTestId('right-number-input');

      await user.click(rightNumberInput);
      await user.keyboard('{Backspace}');
      await user.type(rightNumberInput, '19');
      act(() => {
        rightNumberInput.blur();
      });

      expect(rightNumberInput).toBeInvalid();
      expect(rightSliderInput).toHaveValue('100'); //see if the value was updated or not (it should not)
    });
  });

  describe('The range slider with input fields and a custom label', () => {
    const type = 'range';
    const min = 1;
    const max = 100;
    const hasInputField = true;
    const label = 'GB';

    test('should have labels that are equal to the custom label ("GB")', () => {
      render(<Slider type={type} min={min} max={max} hasInputField={hasInputField} label={label} />);
      const rightLabel = screen.getByTestId('right-label');

      expect(rightLabel).toHaveTextContent('GB');
    });
  });

  describe('The disabled range slider', () => {
    const type = 'range';
    const min = 1;
    const max = 100;
    const isDisabled = true;

    test('should be disabled', () => {
      render(<Slider type={type} min={min} max={max} isDisabled={isDisabled} />);
      const leftSliderInput = screen.getByTestId('left-slider');
      const rightSliderInput = screen.getByTestId('right-slider');

      expect(leftSliderInput).toBeDisabled();
      expect(rightSliderInput).toBeDisabled();
    });
  });

  describe('The disabled range slider with input fields', () => {
    const type = 'range';
    const min = 1;
    const max = 100;
    const hasInputField = true;
    const isDisabled = true;

    test('should have two input fields that are disabled', () => {
      render(
        <Slider type={type} min={min} max={max} isDisabled={isDisabled} hasInputField={hasInputField} />,
      );
      const rightNumberInput = screen.getByTestId('right-number-input');

      expect(rightNumberInput).toBeDisabled();
    });
  });

  describe('the accessibility', () => {
    test('of sliders should have no axe violations', async () => {
      render(
        <div data-testid="sliders">
          <Slider type={'simple'} min={0} max={100} />
          <Slider type={'range'} min={0} max={100} />
          <Slider type={'range'} min={0} max={100} hasInputField={true} />
        </div>,
      );

      const sliders = screen.getByTestId('sliders');
      const results = await axe(sliders);

      expect(results).toHaveNoViolations();
    });
  });
});
