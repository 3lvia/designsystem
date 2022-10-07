import React, { useEffect, useState, useRef, useMemo } from 'react';
import { isSsr } from '@elvia/elvis-toolbox';
import {
  Extremum,
  SliderErrors,
  SliderProps,
  SliderValues,
  TextFieldsValues,
  ToolTipState,
} from './elvia-slider.types';
import {
  HelpValue,
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

const Slider: React.FC<SliderProps> = ({
  className,
  hasHintValues = false,
  hasInputField = false,
  hasPercent = false,
  hasTooltip = true,
  inlineStyle,
  isDisabled = false,
  label,
  max = 100,
  min = 1,
  type = 'simple',
  unit = '',
  value,
  valueOnChange,
  webcomponent,
  ...rest
}) => {
  const leftTextInputRef = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const leftHelpTextRef = useRef<HTMLInputElement>(null);
  const rightHelpTextRef = useRef<HTMLInputElement>(null);

  const EXTREMUM: Extremum = {
    minimum: +min,
    maximum: +max,
  };

  /* Used to set the z-index for the left thumb. */
  const [leftOnTop, setLeftOnTop] = useState<boolean>(false);
  const [leftInputReplacesHelp, setLeftInputReplacesHelp] = useState<boolean>(false);

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
  const [numberInputFieldContainerWidth, setNumberInputFieldContainerWidth] = useState(0);

  const [errors, setErrors] = useState<SliderErrors>({
    leftTextfield: undefined,
    rightTextfield: undefined,
  });

  //If the device is a touch device, return true
  const isTouchDevice = () => {
    if (isSsr()) return false;

    if (!isSsr()) {
      if (window.matchMedia('(pointer: coarse)').matches) {
        return true;
      }
      if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return true;
      }
    }

    return false;
  };

  /* percentValue is the percentage relative to the min and max values. Used when the "hasPercent" prop is true. */
  const percentValue = useMemo(() => {
    if (type === 'simple' && hasPercent) {
      return Math.round(
        ((sliderValues.left - EXTREMUM.minimum) / (EXTREMUM.maximum - EXTREMUM.minimum)) * 100,
      );
    }
    return undefined;
  }, [sliderValues.left, EXTREMUM]);

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
    ((sliderValues.left - EXTREMUM.minimum) / (EXTREMUM.maximum - EXTREMUM.minimum)) *
      (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
    thumbWidth / 2;

  let right: number | undefined;
  let middleFilled: number | undefined;

  if (type === 'range' && sliderValues.right) {
    right =
      ((sliderValues.right - EXTREMUM.maximum) / (EXTREMUM.minimum - EXTREMUM.maximum)) *
        (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
      thumbWidth / 2;

    middleFilled = sliderWidth - left - right;
  }

  /* measuring DOM elements */
  const [resizeObserver] = useState(() => {
    if (isSsr()) return null;

    return new ResizeObserver(() => {
      if (sliderRef.current !== null) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }

      if (
        leftHelpTextRef.current !== null &&
        rightHelpTextRef.current !== null &&
        leftTextInputRef.current !== null &&
        sliderRef.current !== null
      ) {
        const total = Math.ceil(
          leftHelpTextRef.current.offsetWidth +
            rightHelpTextRef.current.offsetWidth +
            leftTextInputRef.current.offsetWidth +
            2 * 8, // 2 * 4px for Grid gap
        );

        setNumberInputFieldContainerWidth(total);
      }
    });
  });

  useEffect(() => {
    if (sliderRef.current !== null) {
      resizeObserver !== null && resizeObserver.observe(sliderRef.current);
    }

    if (leftHelpTextRef.current !== null) {
      resizeObserver !== null && resizeObserver.observe(leftHelpTextRef.current);
    }

    if (rightHelpTextRef.current !== null) {
      resizeObserver !== null && resizeObserver.observe(rightHelpTextRef.current);
    }

    if (leftTextInputRef.current !== null) {
      resizeObserver !== null && resizeObserver.observe(leftTextInputRef.current);
    }

    return function cleanup() {
      resizeObserver !== null && resizeObserver.disconnect();
    };
  }, [sliderRef.current, leftHelpTextRef.current, rightHelpTextRef.current, leftTextInputRef.current]);

  /* Used for the web component to extract values. Also updates SliderValues state */
  const updateValue = (newSliderValues: SliderValues): void => {
    const newValue = {
      left: newSliderValues.left,
      right: newSliderValues.right,
    };

    setSliderValues(newSliderValues);
    if (!webcomponent && valueOnChange) {
      valueOnChange(type === 'simple' ? newValue.left : newValue);
    } else if (webcomponent) {
      webcomponent.setProps({ value: type === 'simple' ? newValue.left : newValue }, true);
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

  useEffect(() => {
    if (sliderWidth < numberInputFieldContainerWidth) {
      setLeftInputReplacesHelp(true);
    } else {
      setLeftInputReplacesHelp(false);
    }
  }, [sliderWidth, numberInputFieldContainerWidth]);

  /** Used to set the default value of the slider.
   * If only a single number is given, give the number to the left thumb.
   * If an Object is given, set the values to left and right. */
  useEffect(() => {
    if (value) {
      if (typeof value === 'number') {
        setSliderValues({ left: +value, right: +max });
        return;
      } else {
        setSliderValues({ left: +value.left, right: +value.right });
        return;
      }
    }

    /* If the user does not give a default value, set the value to the min and max. */
    setSliderValues({ left: +min, right: +max });
  }, [value]);

  //Function to check if a input currently has errors assigned to it.
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
    if (+value > EXTREMUM.maximum || +value < EXTREMUM.minimum) {
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
   */
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value, validity } = event.target as HTMLInputElement;

    if (value === '' || !value) {
      updateValue({ ...sliderValues, [name]: name === 'left' ? +min : +max });
      return;
    }

    if (type === 'range') {
      if (textFieldsValues.left == textFieldsValues.right) {
        setErrors({ ...errors, [`${name}Textfield`]: 'Verdiene kan ikke være like.' });
        return;
      }

      if (name === 'left') {
        if (+value > sliderValues.right) {
          setErrors({
            ...errors,
            leftTextfield: 'Den nedre verdien kan ikke være større enn den øvre verdien.',
          });
          return;
        }
      }

      if (name === 'right') {
        if (+value < sliderValues.left) {
          setErrors({
            ...errors,
            rightTextfield: 'Den øvre verdien kan ikke være mindre enn den nedre verdien.',
          });
          return;
        }
      }
    }

    if (validity.rangeOverflow) {
      setErrors({
        ...errors,
        [`${name}Textfield`]: `Verdien kan ikke være større enn ${EXTREMUM.maximum.toLocaleString()}.`,
      });
      return;
    }

    if (validity.rangeUnderflow) {
      setErrors({
        ...errors,
        [`${name}Textfield`]: `Verdien kan ikke være mindre enn ${EXTREMUM.minimum.toLocaleString()}.`,
      });
      return;
    }

    if (!validity.valid || validity.badInput || validity.stepMismatch) {
      setErrors({ ...errors, [`${name}Textfield`]: 'Ugyldig verdi.' });
      return;
    }

    //if input passes all validation
    updateValue({ ...sliderValues, [name]: +value });
  };

  const getLabel = (inputSide: 'left' | 'right') => {
    if (label) {
      if (typeof label === 'string') {
        return label;
      }

      if (typeof label === 'object') {
        return inputSide === 'left' ? label.left : label.right;
      }
    }

    if (type === 'range') {
      return inputSide === 'left' ? 'Fra' : 'Til';
    }

    return 'Verdi';
  };

  return (
    <SliderContainer
      className={className ?? ''}
      style={{ ...inlineStyle }}
      {...rest}
      data-testid="slider-container"
      aria-disabled={isDisabled}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <SliderWrapper leftOnTop={leftOnTop}>
          {/* ↓ The actual HTML input type=range ↓*/}
          <StyledSlider
            aria-label="Slider start"
            disabled={isDisabled}
            max={EXTREMUM.maximum}
            min={EXTREMUM.minimum}
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
          {showTooltip.left && !isDisabled && (hasTooltip || isTouchDevice()) && (
            <TooltipPopup
              data-testid="left-tooltip-popup"
              position="top"
              side="left"
              fadeOut={false}
              style={{
                left: `${left}px`,
              }}
            >
              {type === 'simple' && hasPercent
                ? `${percentValue} %`
                : `${sliderValues.left.toLocaleString()}${unit}`}
            </TooltipPopup>
          )}

          {type === 'range' && (
            <>
              {/* ↓ The actual HTML input type=range ↓*/}
              <StyledSlider
                aria-label="Slider end"
                disabled={isDisabled}
                max={EXTREMUM.maximum}
                min={EXTREMUM.minimum}
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
              {showTooltip.right && !isDisabled && (hasTooltip || isTouchDevice()) && (
                <TooltipPopup
                  data-testid="right-tooltip-popup"
                  position="top"
                  side="right"
                  fadeOut={false}
                  style={{
                    right: `${right}px`,
                  }}
                >
                  {`${sliderValues.right.toLocaleString()}${unit}`}
                </TooltipPopup>
              )}
            </>
          )}

          {/* ↓ Our custom styled track ↓ */}
          <SliderTrack />
          <SliderFilledTrack
            trackWidth={left}
            type={type}
            rangeTrackWidth={middleFilled}
            isDisabled={isDisabled}
          ></SliderFilledTrack>
        </SliderWrapper>

        <InputFieldsContainer
          leftInputPriority={leftInputReplacesHelp}
          type={type}
          hasHintValues={hasHintValues}
        >
          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HelpValue isDisabled={isDisabled} ref={leftHelpTextRef}>
              {EXTREMUM.minimum.toLocaleString()}
            </HelpValue>
          )}
          {hasInputField && (
            /* ↓ HTML number input fields ↓ */
            <NumberInputContainer>
              <label>
                <LabelText data-testid="left-label">{getLabel('left')}</LabelText>
                {/* LEFT INPUT */}
                <NumberInput
                  disabled={isDisabled}
                  max={EXTREMUM.maximum}
                  min={EXTREMUM.minimum}
                  name="left"
                  title=" "
                  onBlur={handleBlur}
                  onChange={handleNumberInputValueChange}
                  ref={leftTextInputRef}
                  value={textFieldsValues.left}
                  aria-invalid={`${inputFieldIsInvalid('left')}`}
                  aria-errormessage={errors.rightTextfield ? 'left-error' : undefined}
                  /* width={textLabelWidth ? textLabelWidth : 40} */
                  label={getLabel('left')}
                  data-testid="left-number-input"
                />
              </label>
            </NumberInputContainer>
          )}

          {hasInputField && type === 'range' && (
            <NumberInputContainer>
              <label>
                <LabelText data-testid="right-label">{getLabel('right')}</LabelText>
                {/* RIGHT INPUT */}
                <NumberInput
                  title=" "
                  disabled={isDisabled}
                  max={EXTREMUM.maximum}
                  min={EXTREMUM.minimum}
                  name="right"
                  onBlur={handleBlur}
                  onChange={handleNumberInputValueChange}
                  value={textFieldsValues.right}
                  aria-invalid={`${inputFieldIsInvalid('right')}`}
                  aria-errormessage={errors.rightTextfield ? 'right-error' : undefined}
                  label={getLabel('right')}
                  data-testid="right-number-input"
                />
              </label>
            </NumberInputContainer>
          )}
          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HelpValue isDisabled={isDisabled} ref={rightHelpTextRef}>
              {EXTREMUM.maximum.toLocaleString()}
            </HelpValue>
          )}
        </InputFieldsContainer>
        {errors.leftTextfield && <SliderError id="left-error" errorMessage={errors.leftTextfield} />}
        {errors.rightTextfield && <SliderError id="right-error" errorMessage={errors.rightTextfield} />}
      </form>
    </SliderContainer>
  );
};

export default Slider;
