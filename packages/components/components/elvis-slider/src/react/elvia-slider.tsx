import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
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
  SliderLabel,
  TooltipWrapper,
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

  const [leftOnTop, setLeftOnTop] = useState<boolean>(false);
  const [leftInputReplacesHelp, setLeftInputReplacesHelp] = useState<boolean>(false);

  const [sliderValues, setSliderValues] = useState<SliderValues>({ left: +min, right: +max });

  const [textFieldsValues, setTextFieldsValues] = useState<TextFieldsValues>({
    left: sliderValues.left,
    right: sliderValues.right,
  });

  const [showTooltip, setShowTooltip] = useState<ToolTipState>({
    left: false,
    right: false,
  });

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

  const percentValue = useMemo(() => {
    if (type === 'simple' && hasPercent) {
      const percent = ((sliderValues.left - Extremum.minimum) / (Extremum.maximum - Extremum.minimum)) * 100;
      return Math.round(percent);
    } else {
      return undefined;
    }
  }, [sliderValues.left, Extremum]);

  const thumbWidth = 20;
  const leftThumbPosition =
    ((sliderValues.left - Extremum.minimum) / (Extremum.maximum - Extremum.minimum)) *
      (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
    thumbWidth / 2;

  let rightThumbPosition: number | undefined;
  let middleFilled: number | undefined;

  if (type === 'range' && sliderValues.right) {
    rightThumbPosition =
      ((sliderValues.right - Extremum.maximum) / (Extremum.minimum - Extremum.maximum)) *
        (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
      thumbWidth / 2;

    middleFilled = sliderWidth - leftThumbPosition - rightThumbPosition;
  }

  /* measuring DOM elements */
  const resizeObserver = new ResizeObserver(() => {
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

  useLayoutEffect(() => {
    const observedElements: (HTMLDivElement | null)[] = [
      sliderRef.current,
      leftHelpTextRef.current,
      rightHelpTextRef.current,
      leftTextInputRef.current,
    ];

    observedElements.forEach((observedElement) => {
      if (observedElement !== null) {
        resizeObserver.observe(observedElement);
      }
    });

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [sliderRef.current, leftHelpTextRef.current, rightHelpTextRef.current, leftTextInputRef.current]);

  const updateValue = (newSliderValues: SliderValues): void => {
    const newValue = {
      left: newSliderValues.left,
      right: newSliderValues.right,
    };

    setSliderValues(newSliderValues);
    const newValueToEmit = type === 'simple' ? newValue.left : newValue;
    if (!webcomponent && valueOnChange) {
      valueOnChange(newValueToEmit);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValueToEmit }, true);
      webcomponent.triggerEvent('valueOnChange', newValueToEmit);
    }
  };

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

  const handleSliderValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value: incomingValue } = event.target as HTMLInputElement;
    let newSliderValue = +incomingValue;

    //Prevents negative values from fast slider changes (bug).
    if (+incomingValue > max || +incomingValue < min) {
      return;
    }

    // Thumbs can not cross, but can be alike
    if (type === 'range') {
      if (name === 'left') {
        newSliderValue = Math.min(+incomingValue, sliderValues.right);
      }

      if (name === 'right') {
        newSliderValue = Math.max(+incomingValue, sliderValues.left);
      }

      setIsLeftSliderOnTop(name === 'left');
    }

    updateValue({ ...sliderValues, [name]: newSliderValue });
  };

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
            <TooltipWrapper
              side="left"
              style={{
                left: `${left}px`,
              }}
            >
              <TooltipPopup data-testid="left-tooltip-popup" position="top" fadeOut={false}>
                {type === 'simple' && hasPercent
                  ? `${percentValue} %`
                  : `${sliderValues.left.toLocaleString()}${unit}`}
              </TooltipPopup>
            </TooltipWrapper>
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
                <TooltipWrapper
                  side="right"
                  style={{
                    right: `${right}px`,
                  }}
                >
                  <TooltipPopup data-testid="right-tooltip-popup" position="top" fadeOut={false}>
                    {`${sliderValues.right.toLocaleString()}${unit}`}
                  </TooltipPopup>
                </TooltipWrapper>
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
              <SliderLabel>
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
                  label={getLabel('left')}
                  data-testid="left-number-input"
                />
              </SliderLabel>
            </NumberInputContainer>
          )}

          {hasInputField && type === 'range' && (
            <NumberInputContainer>
              <SliderLabel>
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
              </SliderLabel>
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
