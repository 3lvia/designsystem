import '@testing-library/jest-dom';
import React from 'react';
import Slider from './elvia-slider';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';

// Simple Slider
describe('Elvia Slider', () => {
  describe('The default slider', () => {
    beforeEach(() => {
      render(<Slider />);
    });

    test('should contain a single input type=range', () => {
      const sliderInput = screen.getByRole('slider');
      expect(sliderInput).toBeInTheDocument();
    });

    test('should have a "min" attribute with the value 0', () => {
      const sliderInput = screen.getByRole('slider');

      expect(sliderInput).toHaveAttribute('min', '0');
    });

    test('should have a "max" attribute with the value 100', () => {
      const sliderInput = screen.getByRole('slider');

      expect(sliderInput).toHaveAttribute('max', '100');
    });

    test('should have a default equal to the "min" attribute', () => {
      const sliderInput = screen.getByRole('slider');

      expect(sliderInput).toHaveValue('0');
    });

    test('should be enabled', () => {
      const sliderInput = screen.getByRole('slider');

      expect(sliderInput).toBeEnabled();
    });

    test('should have one enabled input type=text', () => {
      const inputField = screen.getByRole('textbox');

      expect(inputField).toBeInTheDocument();
      expect(inputField).toBeEnabled();
    });

    test('should have input type=text with a default value loosely equal to the "min" attribute', () => {
      const inputField = screen.getByRole('textbox');

      expect(inputField).toHaveValue('0');
    });

    test('should update the slider when the number input changes by typing', async () => {
      const user = userEvent.setup();
      const sliderInput = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      await user.click(inputField);
      await user.keyboard('{Backspace}');
      await user.type(inputField, '20');
      act(() => {
        inputField.blur();
      });

      expect(inputField).toBeEnabled();
      expect(sliderInput).toHaveValue('20'); //see if the value was updated or not (it should update from 0 to 20)
    });

    test('set the value to the maximum if the user inputs a number above the maximum', async () => {
      const user = userEvent.setup();

      const slider = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      await user.click(inputField);
      await user.keyboard('{Backspace}');
      await user.type(inputField, '10000');
      act(() => {
        inputField.blur();
      });

      expect(slider).toHaveValue('100'); //default max
    });

    test('set the value to the minimum if the user inputs a number below the minimum', async () => {
      const user = userEvent.setup();

      const slider = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      await user.click(inputField);
      await user.keyboard('{Backspace}');
      await user.type(inputField, '-10000');
      act(() => {
        inputField.blur();
      });

      expect(slider).toHaveValue('0'); //default min
    });

    /* Using FireEvent here as type=range is not fully supported by UserEvent (?): https://github.com/testing-library/user-event/issues/871 */
    test('should update the text input when the slider value changes', () => {
      const slider = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      fireEvent.change(slider, { target: { value: 50 } });
      expect(inputField).toHaveValue('50');
    });

    test('should display two hints equal to min and max', () => {
      const leftHint = screen.getByTestId('left-hint');
      const rightHint = screen.getByTestId('right-hint');

      expect(leftHint).toBeInTheDocument();
      expect(leftHint).toHaveTextContent('0');
      expect(rightHint).toBeInTheDocument();
      expect(rightHint).toHaveTextContent('100');
    });

    test('should display the tooltip containing the value on hover', async () => {
      const user = userEvent.setup();
      const sliderInput = screen.getByRole('slider');

      await user.hover(sliderInput);

      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('0');
    });

    /* Using FireEvent here as type=range is not fully supported by UserEvent: https://github.com/testing-library/user-event/issues/871 */
    test('should update the value when the slider is changed', async () => {
      const sliderInput = screen.getByRole('slider');

      fireEvent.change(sliderInput, { target: { value: 50 } });
      expect(sliderInput).toHaveValue('50');
    });
  });

  describe('The simple slider with the "unit" prop', () => {
    test('should display the tooltip containing a custom unit', async () => {
      const user = userEvent.setup();
      render(<Slider value={10} unit={' kWh'} />);

      const sliderInput = screen.getByRole('slider');

      await user.hover(sliderInput);

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('10 kWh');
    });
  });

  describe('The simple slider with the "label" prop', () => {
    test('should display a custom label', () => {
      render(<Slider label={'kilovolt'} />);

      expect(screen.getByTestId('label')).toBeInTheDocument();
    });
  });

  describe('The simple slider with the "ariaLabel" prop', () => {
    test('should contain a custom aria label', () => {
      render(<Slider ariaLabel={'ampere'} />);

      const customAriaLabel = screen.queryByLabelText('ampere');

      expect(customAriaLabel).toBeInTheDocument();
    });
  });

  describe('The simple slider with the "errorOptions" prop', () => {
    beforeEach(() => {
      render(
        <Slider
          errorOptions={{ text: 'jordfeil', isErrorState: true, hasErrorPlaceholder: true, hideText: false }}
        />,
      );
    });

    test('should have a custom error message', () => {
      const customErrorText = screen.queryByText('jordfeil');
      expect(customErrorText).toBeInTheDocument();
    });

    test('should have a invalid input type="text"', () => {
      const inputField = screen.getByRole('textbox');
      expect(inputField).toBeInvalid();
    });
  });

  describe('The simple slider with the "value" prop', () => {
    beforeEach(() => {
      render(<Slider value={10} />);
    });

    test('should have a slider with a value equal to the "value" prop', () => {
      const slider = screen.getByRole('slider');
      expect(slider).toHaveValue('10');
    });
  });

  describe('The disabled simple slider', () => {
    beforeEach(() => {
      render(<Slider isDisabled />);
    });

    test('should be disabled', () => {
      const slider = screen.getByRole('slider');

      expect(slider).toBeDisabled();
    });

    test('should have a text input field that is disabled', () => {
      const inputField = screen.getByRole('textbox');

      expect(inputField).toBeDisabled();
    });

    test('should not display the tooltip on hover', async () => {
      const user = userEvent.setup();
      const slider = screen.getByRole('slider');

      await user.hover(slider);

      const tooltip = screen.queryByRole('tooltip');

      expect(tooltip).not.toBeInTheDocument();
    });
  });

  // Range Slider
  describe('The default range slider', () => {
    beforeEach(() => {
      render(<Slider type={'range'} />);
    });

    test('should contain two inputs type=range', () => {
      expect(screen.getAllByRole('slider')).toHaveLength(2);
    });

    test('should contain two inputs type=text', () => {
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });

    test('should have a "min" attribute with the value 0 on the right slider', () => {
      const rightSlider = screen.getAllByRole('slider')[1];

      expect(rightSlider).toHaveAttribute('min', '0');
    });

    test('should have a "max" attribute with the value 100 on the right slider', () => {
      const rightSlider = screen.getAllByRole('slider')[1];

      expect(rightSlider).toHaveAttribute('max', '100');
    });

    test('should have a right slider that is enabled', () => {
      const rightSlider = screen.getAllByRole('slider')[1];

      expect(rightSlider).toBeEnabled();
    });

    test('should have a right input type=text with a default value loosely equal to the "max" attribute', () => {
      const rightInput = screen.getAllByRole('textbox')[1];

      expect(rightInput).toHaveValue('100');
    });
  });

  describe('The range slider with input fields interactions', () => {
    test('if user sets left slider to higher value than right slider, make the left slider equal to the right slider', async () => {
      render(<Slider type={'range'} value={{ left: 0, right: 80 }} />);

      const user = userEvent.setup();

      const [leftSlider, rightSlider] = screen.getAllByRole('slider');

      const leftInput = screen.getAllByRole('textbox')[0];

      await user.click(leftInput);
      await user.keyboard('{Backspace}');
      await user.type(leftInput, '91');
      act(() => {
        leftInput.blur();
      });

      expect(leftSlider).toHaveValue('80');
      expect(rightSlider).toHaveValue('80');
    });

    test('if user sets  right slider to lower value than the left slider, make the right slider equal to the left slider', async () => {
      render(<Slider type={'range'} value={{ left: 20, right: 100 }} />);

      const user = userEvent.setup();

      const [leftSlider, rightSlider] = screen.getAllByRole('slider');

      const rightInput = screen.getAllByRole('textbox')[1];

      await user.click(rightInput);
      await user.keyboard('{Backspace} {Backspace} {Backspace}');
      await user.type(rightInput, '10');
      act(() => {
        rightInput.blur();
      });

      expect(leftSlider).toHaveValue('20');
      expect(rightSlider).toHaveValue('20');
    });
  });

  describe('Range slider with errorOptions', () => {
    beforeEach(() => {
      render(
        <Slider
          type="range"
          errorOptions={{
            left: { text: '', isErrorState: false, hasErrorPlaceholder: true, hideText: false },
            right: { text: 'Error message', isErrorState: true, hasErrorPlaceholder: true, hideText: false },
          }}
        />,
      );
    });

    test('displays custom error message', () => {
      const customError = screen.queryByText('Error message');
      expect(customError).toBeInTheDocument();
    });

    test('input fields have correct validation state', () => {
      const [leftInput, rightInput] = screen.getAllByRole('textbox');
      expect(leftInput).toBeValid();
      expect(rightInput).toBeInvalid();
    });
  });

  describe('Disabled range slider', () => {
    test('all components are disabled', () => {
      render(<Slider type="range" isDisabled />);

      const [leftSlider, rightSlider] = screen.getAllByRole('slider');
      const [leftInput, rightInput] = screen.getAllByRole('textbox');

      expect(leftSlider).toBeDisabled();
      expect(rightSlider).toBeDisabled();
      expect(leftInput).toBeDisabled();
      expect(rightInput).toBeDisabled();
    });
  });

  describe('Events', () => {
    let valueOnChangeEvent: jest.Mock;
    let errorOnChangeEvent: jest.Mock;

    beforeEach(() => {
      valueOnChangeEvent = jest.fn();
      errorOnChangeEvent = jest.fn();

      render(<Slider valueOnChange={valueOnChangeEvent} errorOnChange={errorOnChangeEvent} />);
    });

    it('should not emit any events on init', async () => {
      await waitFor(() => expect(valueOnChangeEvent).not.toHaveBeenCalled());
      await waitFor(() => expect(errorOnChangeEvent).not.toHaveBeenCalled());
    });

    it('valueOnChange: should emit when the values changes', async () => {
      const inputField = screen.getByRole('textbox');

      await userEvent.click(inputField);
      await userEvent.keyboard('{Backspace}');
      await userEvent.type(inputField, '20');
      await userEvent.tab();
      await waitFor(() => expect(valueOnChangeEvent).toHaveBeenCalled());
    });

    it('errorOnChange: should emit when the error changes', async () => {
      const inputField = screen.getByRole('textbox');

      await userEvent.click(inputField);
      await userEvent.keyboard('{Backspace}');
      await userEvent.type(inputField, 'abc'); //invalid input -> only numbers allowed
      await userEvent.tab();
      await waitFor(() => expect(errorOnChangeEvent).toHaveBeenCalled());
    });
  });

  describe('the accessibility', () => {
    test('of sliders should have no axe violations', async () => {
      render(
        <div data-testid="sliders">
          <Slider type={'range'} />
          <Slider type={'range'} hasInputField={false} />
          <Slider type={'simple'} />
          <Slider type={'simple'} hasHints />
          <Slider type={'simple'} size="small" />
          <Slider type={'simple'} isDisabled />
          <Slider type={'simple'} label={'temperatur'} />
          <Slider type={'simple'} unit={' grader'} />
        </div>,
      );

      const sliders = screen.getByTestId('sliders');
      const results = await axe(sliders);

      expect(results).toHaveNoViolations();
    });
  });
});
