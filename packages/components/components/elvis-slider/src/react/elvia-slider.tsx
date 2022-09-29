import React, { FormEvent, useEffect, useState, useRef, useLayoutEffect } from 'react';
import {
  Extrema,
  SliderErrors,
  SliderProps,
  SliderValues,
  TextFieldsValues,
  ToolTipState,
} from './elvia-slider.types';
import {
  InputFieldsContainer,
  LabelText,
  NumberInput,
  NumberInputContainer,
  SliderContainer,
  SliderFilledTrack,
  SliderTrack,
  SliderWrapper,
  StyledSlider,
  TooltipPopup,
} from './styledComponents';

import { SliderError } from './error/sliderError';

export const Slider: React.FC<SliderProps> = ({
  className,
  disabled = false,
  displayTooptip = true,
  hasInputField = false,
  inlineStyle,
  label,
  max = 100,
  min = 1,
  percent = false,
  type = 'simple',
  unit = '',
  value,
  valueOnChange,
  webcomponent,
  ...rest
}) => {
  const leftTextInput = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const labelTextRef = useRef<HTMLInputElement>(null);

  const EXTREMA: Extrema = {
    minimum: +min,
    maximum: +max,
  };

  /* Used to set the z-index for the left thumb. */
  const [leftOnTop, setLeftOnTop] = useState<boolean>(false);

  /* The actual values of the HTML Range input(s) */
  const [sliderValues, setSliderValues] = useState<SliderValues>({ left: +min, right: +max });

  /* Setting the state of the left and right number input fields. */
  const [textFieldsValues, setTextFieldsValues] = useState<TextFieldsValues>({
    left: sliderValues.left,
    right: sliderValues.right,
  });

  /* Setting the state of the left and right tooltips. */
  const [showTooltip, setShowTooltip] = useState<ToolTipState>({
    left: false,
    right: false,
  });

  /* The width of the entire slider in the DOM. Used to calculate the size of our custom track */
  const [sliderWidth, setSliderWidth] = useState(0);

  /*   The width of the text label. Used to make the compact number input field shrink to fit the label. */
  const [textLabelWidth, setTextLabelWidth] = useState(0);

  const [errors, setErrors] = useState<SliderErrors>({
    leftTextfield: undefined,
    rightTextfield: undefined,
  });

  /**
   * If the device is a touch device, return true
   * @returns A boolean value.
   */
  const isTouchDevice = () => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      return true;
    }
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      return true;
    }
    return false;
  };

  /* percentValue is the percentage relative to the min and max values. Used when the "percent" prop is true. */
  let percentValue: number | undefined;
  if (type === 'simple' && percent) {
    percentValue = Math.round(
      ((sliderValues.left - EXTREMA.minimum) / (EXTREMA.maximum - EXTREMA.minimum)) * 100,
    );
  }

  /** CALCULATIONS FOR THE CUSTOM TRACK
   * - thumbWidth: Used to horizontally center the tooltip over the "thumb" of the slider.
   * - left: The amount of pixels the left thumb is from the left side of the slider.
   * - right: The amount of pixels the right thumb is from the right side of the slider (only used in type range).
   * - middleFilled: The filled track between the two thumbs (only used in type range).
   * - resizeObserver: update the width of the slider if it changes because of window resize or parent elements.
   * - useLayoutEffect is used here to get the width after the DOM is finished rendering
   * Read more: https://stackoverflow.com/a/61665977/14447555 and https://stackoverflow.com/a/73248253/14447555
   */
  const thumbWidth = 20;
  const left =
    ((sliderValues.left - EXTREMA.minimum) / (EXTREMA.maximum - EXTREMA.minimum)) *
      (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
    thumbWidth / 2;

  let right: number | undefined;
  let middleFilled: number | undefined;

  if (type === 'range' && sliderValues.right) {
    right =
      ((sliderValues.right - EXTREMA.maximum) / (EXTREMA.minimum - EXTREMA.maximum)) *
        (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
      thumbWidth / 2;

    middleFilled = sliderWidth - left - right;
  }

  /* SHRINKING INPUT FIELDS */
  const resizeObserver = new ResizeObserver(() => {
    if (sliderRef.current !== null) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
    if (labelTextRef.current !== null) {
      setTextLabelWidth(labelTextRef.current.offsetWidth);
    }
  });

  useLayoutEffect(() => {
    if (sliderRef.current !== null) {
      resizeObserver.observe(sliderRef.current);
    }
    if (labelTextRef.current !== null) {
      resizeObserver.observe(labelTextRef.current);
    }
    return function cleanup() {
      resizeObserver.disconnect();
    };
  });

  /* Used for the web component to extract values. Also updates SliderValues state */
  const updateValue = (newSliderValues: SliderValues): void => {
    const newValue = {
      min: newSliderValues.left,
      max: newSliderValues.right,
    };

    setSliderValues(newSliderValues);
    if (!webcomponent && valueOnChange) {
      valueOnChange(type === 'simple' ? newValue.min : newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ value: type === 'simple' ? newValue.min : newValue }, true);
    }
  };

  /* To avoid that text fields "are a step behind" */
  useEffect(() => {
    if (hasInputField) {
      setTextFieldsValues({ ...textFieldsValues, left: sliderValues.left, right: sliderValues.right });
    }
  }, [sliderValues]);

  useEffect(() => {
    setSliderValues({ left: +min, right: +max });
  }, [min, max]);

  /** Used to set the default value of the slider.
   * If only a single number is given, give the number to the left thumb.
   * If an Object is given, set the values to left and right. */
  useEffect(() => {
    if (value) {
      if (typeof value === 'number') {
        setSliderValues({ left: +value, right: +max });
        return;
      } else {
        setSliderValues({ left: +value.min, right: +value.max });
        return;
      }
    }

    /* If the user does not given a default value, set the value to the min and max. */
    setSliderValues({ left: +min, right: +max });
  }, [value]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

  /**
   * Function to check if a input currently has errors assigned to it.
   * @param {'left' | 'right'} input - 'left' | 'right'
   * @returns A boolean value.
   */
  const inputFieldIsInvalid = (input: 'left' | 'right') => {
    if (input === 'left' && errors.leftTextfield) {
      return true;
    }
    if (input === 'right' && errors.rightTextfield) {
      return true;
    }
    return false;
  };

  const isNumericValue = (value: string): boolean => {
    return /^\d+$/.test(value);
  };

  /**
   * on change handler for the sliders.
   * Used to update the values when the users use the thumbs on the slider to change values.
   * Includes validation for range type.
   * @param event - React.FormEvent<HTMLInputElement>
   */
  const handleSliderValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    name === 'left' ? setLeftOnTop(true) : setLeftOnTop(false);
    setErrors({ leftTextfield: undefined, rightTextfield: undefined });

    if (type === 'range') {
      /* Thumbs can not cross */
      if (name === 'left') {
        const newValue: number = Math.min(+value, sliderValues.right - 1);
        updateValue({ ...sliderValues, ['left']: +newValue });
        return;
      }

      if (name === 'right') {
        const newValue: number = Math.max(+value, sliderValues.left + 1);
        updateValue({ ...sliderValues, ['right']: +newValue });
        return;
      }
    }

    //used to prevent a bug where if the user changes the slider very fast it can give negative values
    if (+value > EXTREMA.maximum || +value < EXTREMA.minimum) {
      return;
    }

    //update slider values if all validation passes.
    updateValue({ ...sliderValues, [name]: +value });
  };

  /**
   * onChange handler to update the values in the number input fields. Only allow numeric values.
   * Bug: allows non-numeric values in Firefox
   */
  const handleNumberInputValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (event.nativeEvent as InputEvent).inputType,
    );

    /* Set the left thumb on top of the right thumb when the left input field is changed */
    name === 'left' ? setLeftOnTop(true) : setLeftOnTop(false);
    setErrors({ leftTextfield: undefined, rightTextfield: undefined });

    if (!(isNumericValue(value) || isModifierKey)) {
      return;
    }

    setTextFieldsValues({ ...textFieldsValues, [name]: value });
  };

  /**
   * OnBlur handler for the number input fields.
   * Validates the input of the fields before sending the values to the Slider if validation passes.
   * Generates error messages if validation fails.
   * @param event - React.FormEvent<HTMLInputElement>
   */
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, validity } = event.target as HTMLInputElement;
    let errorMessage: string;

    if (type === 'range') {
      if (textFieldsValues.left == textFieldsValues.right) {
        errorMessage = 'Verdiene kan ikke være like.';
        setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
        return;
      }

      if (name === 'left') {
        if (+value > sliderValues.right) {
          errorMessage = 'Den nedre verdien kan ikke være større enn den øvre verdien.';
          setErrors({ ...errors, leftTextfield: errorMessage });
          return;
        }
      }

      if (name === 'right') {
        if (+value < sliderValues.left) {
          errorMessage = 'Den øvre verdien kan ikke være mindre enn den nedre verdien.';
          console.error(errorMessage);
          setErrors({ ...errors, rightTextfield: errorMessage });
          return;
        }
      }
    }

    if (validity.rangeOverflow) {
      errorMessage = `Verdien kan ikke være større enn ${EXTREMA.maximum}.`;
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    if (validity.rangeUnderflow) {
      errorMessage = `Verdien kan ikke være mindre enn ${EXTREMA.minimum}.`;
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    if (value === '' || !value) {
      errorMessage = 'Verdien kan ikke være tom.';
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    if (!validity.valid || validity.badInput || validity.stepMismatch) {
      errorMessage = 'Ugyldig verdi.';
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    //if input passes all validation
    updateValue({ ...sliderValues, [name]: +value });
  };

  const getLabel = (inputSide: 'left' | 'right') => {
    if (label) {
      return label;
    }

    if (inputSide === 'left' && type === 'range') {
      return 'Fra';
    }
    return 'Verdi';
  };

  return (
    <SliderContainer
      className={className ?? ''}
      style={{ ...inlineStyle }}
      {...rest}
      data-testid="slider-container"
    >
      <form onSubmit={handleSubmit}>
        <SliderWrapper leftOnTop={leftOnTop}>
          {/* ↓ The actual HTML input type=range ↓*/}
          <StyledSlider
            aria-label="Range start"
            disabled={disabled}
            max={EXTREMA.maximum}
            min={EXTREMA.minimum}
            name="left"
            onChange={handleSliderValueChange}
            ref={sliderRef}
            sliderType={type}
            value={+sliderValues.left}
            onTouchStart={() => setShowTooltip({ ...showTooltip, left: true })}
            onTouchEnd={() => setShowTooltip({ ...showTooltip, left: false })}
            onMouseOver={() => setShowTooltip({ ...showTooltip, left: true })}
            onMouseLeave={() => setShowTooltip({ ...showTooltip, left: false })}
            onFocus={() => setShowTooltip({ ...showTooltip, left: true })}
            onBlur={() => setShowTooltip({ ...showTooltip, left: false })}
            data-testid="left-slider"
          />

          {/* ↓ Show the left tooltip if the user hovers or clicks on the thumb ↓*/}
          {showTooltip.left && !disabled && (displayTooptip || isTouchDevice()) && (
            <TooltipPopup
              data-testid="left-tooltip-popup"
              position="top"
              side="left"
              fadeOut={false}
              style={{
                left: `${left}px`,
              }}
            >
              {type === 'simple' && percent ? `${percentValue} %` : `${sliderValues.left}${unit}`}
            </TooltipPopup>
          )}

          {type === 'range' && (
            <>
              {/* ↓ The actual HTML input type=range ↓*/}
              <StyledSlider
                aria-label="Range end"
                disabled={disabled}
                max={EXTREMA.maximum}
                min={EXTREMA.minimum}
                name="right"
                onChange={handleSliderValueChange}
                sliderType={type}
                value={+sliderValues.right}
                onTouchStart={() => setShowTooltip({ ...showTooltip, right: true })}
                onTouchEnd={() => setShowTooltip({ ...showTooltip, right: false })}
                onMouseOver={() => setShowTooltip({ ...showTooltip, right: true })}
                onMouseLeave={() => setShowTooltip({ ...showTooltip, right: false })}
                onFocus={() => setShowTooltip({ ...showTooltip, right: true })}
                onBlur={() => setShowTooltip({ ...showTooltip, right: false })}
                data-testid="right-slider"
              />

              {/* ↓ Show the right tooltip if the user hovers or click on the thumb ↓*/}
              {showTooltip.right && !disabled && (displayTooptip || isTouchDevice()) && (
                <TooltipPopup
                  data-testid="right-tooltip-popup"
                  position="top"
                  side="right"
                  fadeOut={false}
                  style={{
                    right: `${right}px`,
                  }}
                >
                  {`${sliderValues.right} ${unit}`}
                </TooltipPopup>
              )}
            </>
          )}

          {/* ↓ Our custom styled track ↓ */}
          <SliderTrack></SliderTrack>
          <SliderFilledTrack
            trackWidth={left}
            type={type}
            rangeTrackWidth={middleFilled}
            disabled={disabled}
          ></SliderFilledTrack>
        </SliderWrapper>

        {hasInputField && (
          /* ↓ HTML number input fields ↓ */
          <InputFieldsContainer type={type}>
            <NumberInputContainer>
              <label>
                <LabelText data-testid="left-label" ref={labelTextRef}>
                  {label ? label : type === 'range' ? 'Fra' : 'Verdi'}
                  {getLabel('left')}
                </LabelText>
                {/* LEFT INPUT */}
                <NumberInput
                  disabled={disabled}
                  max={EXTREMA.maximum}
                  min={EXTREMA.minimum}
                  name="left"
                  onBlur={handleBlur}
                  onChange={handleNumberInputValueChange}
                  ref={leftTextInput}
                  value={textFieldsValues.left}
                  aria-invalid={`${inputFieldIsInvalid('left')}`}
                  aria-errormessage={errors.rightTextfield ? 'left-error' : undefined}
                  width={textLabelWidth ? textLabelWidth : 40}
                  data-testid="left-number-input"
                ></NumberInput>
              </label>
            </NumberInputContainer>

            {type === 'range' && (
              <NumberInputContainer>
                <label>
                  <LabelText data-testid="right-label" ref={labelTextRef}>
                    {label ? label : 'Til'}
                  </LabelText>
                  {/* RIGHT INPUT */}
                  <NumberInput
                    disabled={disabled}
                    max={EXTREMA.maximum}
                    min={EXTREMA.minimum}
                    name="right"
                    onBlur={handleBlur}
                    onChange={handleNumberInputValueChange}
                    value={textFieldsValues.right}
                    aria-invalid={`${inputFieldIsInvalid('right')}`}
                    aria-errormessage={errors.rightTextfield ? 'right-error' : undefined}
                    width={textLabelWidth ? textLabelWidth : 40}
                    data-testid="right-number-input"
                  ></NumberInput>
                </label>
              </NumberInputContainer>
            )}
          </InputFieldsContainer>
        )}
        {/* Show errors if they exist ↓ */}
        {errors.leftTextfield && <SliderError id="left-error" errorMessage={errors.leftTextfield} />}
        {errors.rightTextfield && <SliderError id="right-error" errorMessage={errors.rightTextfield} />}
      </form>
    </SliderContainer>
  );
};

export default Slider;
