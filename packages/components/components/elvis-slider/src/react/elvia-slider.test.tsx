import '@testing-library/jest-dom';
import React from 'react';
import Slider from './elvia-slider';
import userEvent from '@testing-library/user-event';
import { axe } from 'jest-axe';
import { render, screen, fireEvent, act } from '@testing-library/react';

// Simple Slider
describe('Elvia Slider', () => {
  describe('The default simple slider', () => {
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

    test('should not have a input field', () => {
      const inputField = screen.queryByRole('textbox');

      expect(inputField).not.toBeInTheDocument();
    });

    test('should display the tooltip containing the value on hover', async () => {
      const user = userEvent.setup();
      const sliderInput = screen.getByRole('slider');

      await user.hover(sliderInput);

      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent('0');
    });

    /* Using FireEvent here as type=range is not fully supported by UserEvent (?): https://github.com/testing-library/user-event/issues/871 */
    test('should update the value when the slider is changed', async () => {
      const sliderInput = screen.getByRole('slider');

      fireEvent.change(sliderInput, { target: { value: 50 } });
      expect(sliderInput).toHaveValue('50');
    });
  });

  describe('The simple slider with the "hasPercent" prop', () => {
    test('should display a tooltip containing the percentage between min and max', async () => {
      const user = userEvent.setup();
      render(<Slider value={10} hasPercent />);

      const sliderInput = screen.getByRole('slider');

      await user.hover(sliderInput);

      const tooltip = screen.getByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(`${10} %`);
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
      expect(tooltip).toHaveTextContent(`${10} kWh`);
    });
  });

  describe('The simple slider with the "hasHintValues" prop', () => {
    test('should display two strings equal to the min and max value', () => {
      render(<Slider hasHints />);

      const leftHintValue = screen.getByText('0');
      const rightHintValue = screen.getByText('100');

      expect(leftHintValue).toBeInTheDocument();
      expect(rightHintValue).toBeInTheDocument();
    });
  });

  describe('The simple slider with the "heading" prop', () => {
    test('should display a custom heading', () => {
      render(<Slider heading={'kilovolt'} />);

      const sliderHeading = screen.queryByText('kilovolt');

      expect(sliderHeading).toBeInTheDocument();
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
          hasInputField
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

  describe('The simple slider with a input field', () => {
    beforeEach(() => {
      render(<Slider hasInputField />);
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

    test('should have a label that says "Verdi"', () => {
      const inputLabel = screen.queryByLabelText('Verdi');
      expect(inputLabel).toBeInTheDocument();
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

    /* Using FireEvent here as type=range is not fully supported by UserEvent (?): https://github.com/testing-library/user-event/issues/871 */
    test('should update the text input when the slider value changes', () => {
      const slider = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      fireEvent.change(slider, { target: { value: 50 } });
      expect(inputField).toHaveValue('50');
    });

    test('set the value to the minimum if the user inputs a number below the minimum', async () => {
      const user = userEvent.setup();

      const slider = screen.getByRole('slider');
      const inputField = screen.getByRole('textbox');

      await user.click(inputField);
      await user.keyboard('{Backspace}');
      await user.type(inputField, '-10');
      act(() => {
        inputField.blur(); //the input field needs to be blurred to trigger the onBlur event to validate the input
      });

      expect(slider).toHaveValue('0'); //default min
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
  });

  describe('The simple slider with a input field and custom label', () => {
    test('should have a label that is equal to the custom label ("kWh")', () => {
      render(<Slider hasInputField label={'kWh'} />);

      const customInputLabel = screen.queryByLabelText('kWh');
      expect(customInputLabel).toBeInTheDocument();
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

    test('should not display the tooltip on hover', async () => {
      const user = userEvent.setup();
      const slider = screen.getByRole('slider');

      await user.hover(slider);

      const tooltip = screen.queryByRole('tooltip');

      expect(tooltip).not.toBeInTheDocument();
    });
  });

  describe('The disabled simple slider with a input field', () => {
    test('should have a input field that is disabled', () => {
      render(<Slider isDisabled hasInputField />);
      const inputField = screen.getByRole('textbox');

      expect(inputField).toBeDisabled();
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
  });

  describe('The range slider with input fields', () => {
    beforeEach(() => {
      render(<Slider type={'range'} hasInputField />);
    });

    test('should contain two inputs type=text', () => {
      expect(screen.getAllByRole('textbox')).toHaveLength(2);
    });

    test('should have a right input type=text with a default value loosely equal to the "max" attribute', () => {
      const rightInput = screen.getAllByRole('textbox')[1];

      expect(rightInput).toHaveValue('100');
    });

    test('should have two type=text enabled', () => {
      const rightInput = screen.getAllByRole('textbox')[1];

      expect(rightInput).toBeEnabled();
    });

    test('should labels that say "Fra" and "Til" by default', () => {
      const leftLabel = screen.queryByLabelText('Fra');
      const rightLabel = screen.queryByLabelText('Til');

      expect(leftLabel).toBeInTheDocument();
      expect(rightLabel).toBeInTheDocument();
    });
  });

  describe('The range slider with input fields interactions', () => {
    test('if user sets left slider to higher value than  right slider, make the left slider equal to the right slider', async () => {
      render(<Slider type={'range'} hasInputField value={{ left: 0, right: 80 }} />);

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
      render(<Slider type={'range'} hasInputField value={{ left: 20, right: 100 }} />);

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
          hasInputField
          errorOptions={{
            left: { text: '', isErrorState: false, hasErrorPlaceholder: false, hideText: false },
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
      render(<Slider type="range" isDisabled hasInputField />);

      const [leftSlider, rightSlider] = screen.getAllByRole('slider');
      const [leftInput, rightInput] = screen.getAllByRole('textbox');

      expect(leftSlider).toBeDisabled();
      expect(rightSlider).toBeDisabled();
      expect(leftInput).toBeDisabled();
      expect(rightInput).toBeDisabled();
    });
  });

  describe('the accessibility', () => {
    test('of sliders should have no axe violations', async () => {
      render(
        <div data-testid="sliders">
          <Slider type={'range'} />
          <Slider type={'range'} hasInputField={true} />
          <Slider type={'simple'} />
          <Slider type={'simple'} hasHints />
          <Slider type={'simple'} isCompact />
          <Slider type={'simple'} isDisabled />
          <Slider type={'simple'} heading={'temperatur'} />
          <Slider type={'simple'} unit={' grader'} />
        </div>,
      );

      const sliders = screen.getByTestId('sliders');
      const results = await axe(sliders);

      expect(results).toHaveNoViolations();
    });
  });
});
