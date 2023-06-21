import React, { useEffect, useState } from 'react';
import {
  FormFieldContainer,
  FormFieldInputContainer,
  FormFieldInputSuffixText,
  useInputModeDetection,
  warnDeprecatedProps,
} from '@elvia/elvis-toolbox';
import { Tooltip } from './tooltip/tooltip';
import { FormFieldInputValues, Sides, SliderProps, BothSliders, ErrorType } from './elvia-slider.types';
import {
  FormFieldInput,
  HintValue,
  InputFieldsContainer,
  BoundaryWidthMeasurement,
  SliderContainer,
  SliderFilledTrack,
  SliderTrack,
  SliderWrapper,
  StyledSlider,
} from './styledComponents';
import { calculateThumbPosition } from './utils/calculateThumbPosition';
import { getAriaLabel } from './utils/getAriaLabel';
import { config } from './config';
import {
  getHasErrorPlaceholder,
  getHasErrorText,
  getInternalErrorText,
  getIsErrorState,
  getShowErrorText,
} from './utils/getError';
import { SliderError } from './error/sliderError';
import { isOnlyNumbers, isValidNumber } from './utils/validators';
import { useContentRectWidth } from './utils/useContentRectWidth';
import { Heading } from './heading/heading';

let uniqueId = 0;

const Slider: React.FC<SliderProps> = function ({
  ariaLabel,
  className,
  errorOptions,
  hasHintValues = true,
  hasInputField = true,
  heading,
  inlineStyle,
  isDisabled = false,
  max = 100,
  min = 0,
  size = 'medium',
  suffix,
  type = 'simple',
  unit,
  value,
  valueOnChange,
  errorOnChange,
  webcomponent,
  ...rest
}) {
  warnDeprecatedProps(config, arguments[0]);
  const [id] = useState(`ewc-slider-${uniqueId++}`);

  const [sliderValue, setSliderValue] = useState({ left: min, right: max });
  const [formFieldInputValues, setFormFieldInputValues] = useState<FormFieldInputValues>({
    left: sliderValue.left.toString(),
    right: sliderValue.right.toString(),
  });
  const [error, setError] = useState<Partial<BothSliders<ErrorType>>>();

  const [showTooltip, setShowTooltip] = useState({ left: false, right: false });
  const [isLeftSliderOnTop, setIsLeftSliderOnTop] = useState(false);

  //Responsive input fields
  const [isFullWidthRangeInput, setIsFullWidthRangeInput] = useState(false);
  const [minValueRectWidth, minValueRectRef] = useContentRectWidth<HTMLSpanElement>();
  const [maxValueRectWidth, maxValueRectRef] = useContentRectWidth<HTMLSpanElement>();
  const [measurementInputRectWidth, measurementInputRectWidthRef] = useContentRectWidth<HTMLLabelElement>();
  const [totalSliderWidth, sliderRef] = useContentRectWidth<HTMLInputElement>();

  const [leftHintRectWidth, leftHintRectWidthRef] = useContentRectWidth<HTMLSpanElement>();
  const [rightHintRectWidth, rightHintRectWidthRef] = useContentRectWidth<HTMLSpanElement>();
  const [inputFieldsContainerRectWidth, inputFieldsContainerRectWidthRef] =
    useContentRectWidth<HTMLDivElement>();
  const [replaceHintValueWithInput, setReplaceHintValueWithInput] = useState({
    left: false,
    right: false,
  });
  const inputMinWidth = Math.max(minValueRectWidth, maxValueRectWidth);
  const hintValueHasBeenReplaced = replaceHintValueWithInput.left || replaceHintValueWithInput.right;

  const { inputMode } = useInputModeDetection();
  const thumbWidth = inputMode === 'touch' ? 28 : 20;

  const leftThumbPosition = calculateThumbPosition({
    side: 'left',
    sliderValue: sliderValue,
    min,
    max,
    totalSliderWidth,
    thumbWidth,
  });

  const rightThumbPosition = calculateThumbPosition({
    side: 'right',
    sliderValue: sliderValue,
    min,
    max,
    totalSliderWidth,
    thumbWidth,
  });

  const hasErrorPlaceholder: boolean = getHasErrorPlaceholder(error, errorOptions);
  const hasErrorText: boolean = getHasErrorText({ error: error, errorOptions: errorOptions });
  const hasHideText: boolean = getShowErrorText(errorOptions);

  /** The width in px of the filled track between the two thumbs */
  const getFilledMiddleTrackWidth = () => {
    if (type !== 'range' || sliderValue.right === sliderValue.left) {
      return 0;
    }
    return totalSliderWidth - leftThumbPosition - rightThumbPosition;
  };

  useEffect(() => {
    if (value) {
      if (typeof value === 'number') {
        setSliderValue({ ...sliderValue, left: value });
        return;
      } else {
        setSliderValue({ left: value.left, right: value.right });
        return;
      }
    }

    setSliderValue({ left: min, right: max });
  }, [value, min, max]);

  useEffect(() => {
    if (hasInputField) {
      setFormFieldInputValues({
        left: sliderValue.left.toString().replace('.', ','),
        right: sliderValue.right.toString().replace('.', ','),
      });
    }
  }, [sliderValue, hasInputField]);

  //check overflow (Simple Slider only)
  useEffect(() => {
    if (type === 'simple') {
      const inputAndHintsWidth = measurementInputRectWidth + leftHintRectWidth + rightHintRectWidth + 16; //8*2 for grid gap
      const isOverflowing = inputAndHintsWidth > inputFieldsContainerRectWidth;

      const newReplaceHintValueWithInput = { left: false, right: false };

      if (isOverflowing && hasHintValues && min === 0) {
        // Check if we need to replace _left_ hint value with input
        if (measurementInputRectWidth + rightHintRectWidth + 8 < inputFieldsContainerRectWidth) {
          newReplaceHintValueWithInput.left = true;
        } else {
          newReplaceHintValueWithInput.left = true;
          newReplaceHintValueWithInput.right = true;
        }
      } else if (isOverflowing && hasHintValues && min !== 0) {
        // Check if we need to replace _right_ hint value with input
        if (measurementInputRectWidth + leftHintRectWidth + 8 < inputFieldsContainerRectWidth) {
          newReplaceHintValueWithInput.right = true;
        } else {
          newReplaceHintValueWithInput.left = true;
          newReplaceHintValueWithInput.right = true;
        }
      }

      setReplaceHintValueWithInput(newReplaceHintValueWithInput);
    }
  }, [
    measurementInputRectWidth,
    leftHintRectWidth,
    rightHintRectWidth,
    inputFieldsContainerRectWidth,
    hasHintValues,
    hasInputField,
  ]);

  //check overflow (Range Slider only)
  useEffect(() => {
    if (type === 'range' && hasInputField) {
      setIsFullWidthRangeInput(measurementInputRectWidth * 2 + 8 > inputFieldsContainerRectWidth);
    }
  }, [measurementInputRectWidth, inputFieldsContainerRectWidth, hasInputField]);

  const updateValue = (newSliderValue: BothSliders<number>) => {
    const newValue = {
      left: newSliderValue.left,
      right: newSliderValue.right,
    };

    setSliderValue(newValue);
    if (newValue.left === sliderValue.left && newValue.right === sliderValue.right) {
      return;
    }

    const newValueToEmit = type === 'simple' ? newValue.left : newValue;
    if (!webcomponent && valueOnChange) {
      valueOnChange(newValueToEmit);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValueToEmit }, true);
      webcomponent.triggerEvent('valueOnChange', newValueToEmit);
    }
  };

  const handleSliderValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;
    let newValue = +value;

    if (newValue > max || newValue < min) {
      return;
    }

    // Thumbs can't cross, but can be alike
    if (type === 'range') {
      if (name === 'left') {
        newValue = Math.min(newValue, sliderValue.right);
      } else if (name === 'right') {
        newValue = Math.max(newValue, sliderValue.left);
      }

      setIsLeftSliderOnTop(name === 'left');
    }

    updateValue({ ...sliderValue, [name]: newValue });
  };

  const handleFormFieldInputOnChange = (event: React.FormEvent<HTMLInputElement>, side: Sides) => {
    const { value } = event.target as HTMLInputElement;
    setIsLeftSliderOnTop(side === 'left');
    setFormFieldInputValues({ ...formFieldInputValues, [side]: value.replace(/\s/g, '') });
  };

  const handleFormFieldInputOnBlur = (e: React.FocusEvent<HTMLInputElement>, side: Sides) => {
    const value = e.target.value;

    if (value && !validateInputValue(value, side)) {
      console.log('value invalid');
      return;
    }

    // If empty, set to min or max
    let newValue: number;
    if (value) {
      newValue = Number(value.replace(',', '.'));
    } else {
      newValue = side === 'left' ? min : max;
    }

    if (side === 'left') {
      if (newValue >= sliderValue.right) {
        updateValue({ ...sliderValue, [side]: sliderValue.right });
        return;
      }
    } else {
      if (newValue <= sliderValue.left) {
        updateValue({ ...sliderValue, [side]: sliderValue.left });
        return;
      }
    }

    if (newValue > max) {
      updateValue({ ...sliderValue, [side]: max });
      return;
    }

    if (newValue < min) {
      updateValue({ ...sliderValue, [side]: min });
      return;
    }

    updateValue({ ...sliderValue, [side]: newValue });
  };

  const handleTooltip = (side?: Sides) => {
    setShowTooltip({ left: side === 'left', right: side === 'right' });
  };

  const createHandleTooltipEvents = (side: Sides) => ({
    onBlur: () => handleTooltip(),
    onFocus: () => handleTooltip(side),
    onPointerLeave: () => handleTooltip(),
    onPointerOver: () => handleTooltip(side),
  });

  const onError = (newError?: Partial<BothSliders<ErrorType>>) => {
    if (newError === error) {
      return;
    }
    setError(newError);

    const errorText = getInternalErrorText(newError);
    errorOnChange?.(errorText);
    webcomponent?.triggerEvent('errorOnChange', errorText);
  };

  const validateInputValue = (value: string, side: Sides): boolean => {
    if (!isOnlyNumbers(value)) {
      onError({ ...error, [side]: 'NaN' });
      return false;
    } else if (!isValidNumber(value)) {
      onError({ ...error, [side]: 'invalidValue' });
      return false;
    } else {
      setError(undefined);
      return true;
    }
  };

  return (
    <>
      <SliderContainer
        aria-disabled={isDisabled}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        {...rest}
      >
        {heading && <Heading id={`${id}-heading`} size={size} value={heading} />}
        <SliderWrapper isLeftSliderOnTop={isLeftSliderOnTop} size={size}>
          <StyledSlider
            type={'range'}
            role={'slider'}
            aria-label={getAriaLabel({
              side: 'left',
              sliderValue: sliderValue,
              type,
              ariaLabel,
              heading,
              unit,
            })}
            aria-valuemax={max}
            aria-valuemin={min}
            disabled={isDisabled}
            max={max}
            min={min}
            name="left"
            onChange={handleSliderValueChange}
            ref={sliderRef}
            $type={type}
            value={sliderValue.left}
            {...createHandleTooltipEvents('left')}
          />

          {showTooltip.left && !isDisabled && (
            <Tooltip value={sliderValue} suffix={suffix} unit={unit} position={leftThumbPosition} />
          )}

          {type === 'range' && (
            <>
              <StyledSlider
                aria-label={getAriaLabel({
                  side: 'right',
                  sliderValue: sliderValue,
                  type,
                  ariaLabel,
                  heading,
                  unit,
                })}
                aria-valuemax={max}
                aria-valuemin={min}
                disabled={isDisabled}
                max={max}
                min={min}
                name="right"
                onChange={handleSliderValueChange}
                $type={type}
                value={sliderValue.right}
                {...createHandleTooltipEvents('right')}
              />

              {showTooltip.right && !isDisabled && (
                <Tooltip
                  value={sliderValue}
                  position={rightThumbPosition}
                  side={'right'}
                  suffix={suffix}
                  unit={unit}
                />
              )}
            </>
          )}

          <SliderTrack />
          <SliderFilledTrack
            isDisabled={isDisabled}
            rangeTrackWidth={getFilledMiddleTrackWidth()}
            trackWidth={leftThumbPosition}
            type={type}
          />
        </SliderWrapper>

        {hasInputField && (
          <>
            {/* hidden */}
            <BoundaryWidthMeasurement ref={minValueRectRef} size={size}>
              {min}
            </BoundaryWidthMeasurement>
            <BoundaryWidthMeasurement ref={maxValueRectRef} size={size}>
              {max}
            </BoundaryWidthMeasurement>
            <FormFieldContainer
              size={size}
              style={{
                height: '0',
                margin: 0,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                whiteSpace: 'pre',
                visibility: 'hidden',
              }}
              aria-hidden={true}
              ref={measurementInputRectWidthRef}
            >
              <FormFieldInputContainer>
                <FormFieldInput
                  disabled={true}
                  value={formFieldInputValues.left}
                  style={{
                    width: inputMinWidth,
                  }}
                />
                {suffix && <FormFieldInputSuffixText>{suffix}</FormFieldInputSuffixText>}
              </FormFieldInputContainer>
            </FormFieldContainer>
          </>
        )}

        <InputFieldsContainer
          ref={inputFieldsContainerRectWidthRef}
          replaceHintValueWithInput={replaceHintValueWithInput}
          fullWithRangeInputs={isFullWidthRangeInput}
          type={type}
          hasInputField={hasInputField}
          hasHintValues={hasHintValues}
        >
          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HintValue
              hasErrorPlaceholder={hasErrorPlaceholder}
              size={size}
              isDisabled={isDisabled}
              side={'left'}
            >
              <span ref={leftHintRectWidthRef}>{min.toLocaleString()}</span>
            </HintValue>
          )}

          {hasInputField && (
            <FormFieldContainer
              size={size}
              isDisabled={isDisabled}
              isInvalid={getIsErrorState({ side: 'left', error, errorOptions })}
              isFullWidth={hintValueHasBeenReplaced || isFullWidthRangeInput}
              hasErrorPlaceholder={hasErrorPlaceholder && !(type === 'range' && isFullWidthRangeInput)}
            >
              <FormFieldInputContainer>
                <FormFieldInput
                  aria-invalid={getIsErrorState({ side: 'left', error, errorOptions })}
                  aria-labelledby={heading ?? `${id}-heading`}
                  autoComplete="off"
                  disabled={isDisabled}
                  name="left"
                  side="left"
                  isFullWidth={isFullWidthRangeInput}
                  onBlur={(e) => handleFormFieldInputOnBlur(e, 'left')}
                  onChange={(e) => handleFormFieldInputOnChange(e, 'left')}
                  value={formFieldInputValues.left}
                  style={{
                    width: hintValueHasBeenReplaced || isFullWidthRangeInput ? '' : inputMinWidth,
                  }}
                />
                {suffix && <FormFieldInputSuffixText>{suffix}</FormFieldInputSuffixText>}
              </FormFieldInputContainer>
            </FormFieldContainer>
          )}

          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HintValue
              hasErrorPlaceholder={hasErrorPlaceholder}
              isDisabled={isDisabled}
              side={'right'}
              size={size}
            >
              <span ref={rightHintRectWidthRef}>{max.toLocaleString()}</span>
            </HintValue>
          )}

          {hasInputField && type === 'range' && (
            <FormFieldContainer
              size={size}
              isDisabled={isDisabled}
              isInvalid={getIsErrorState({ side: 'right', error, errorOptions })}
              hasErrorPlaceholder={hasErrorPlaceholder}
              isFullWidth={isFullWidthRangeInput}
            >
              <FormFieldInputContainer>
                <FormFieldInput
                  aria-labelledby={heading ?? `${id}-heading`}
                  aria-invalid={getIsErrorState({ side: 'right', error, errorOptions })}
                  aria-errormessage={`${id}-error-text`}
                  disabled={isDisabled}
                  side="right"
                  isFullWidth={isFullWidthRangeInput}
                  onBlur={(e) => handleFormFieldInputOnBlur(e, 'right')}
                  onChange={(e) => handleFormFieldInputOnChange(e, 'right')}
                  value={formFieldInputValues.right}
                  style={{
                    width: hintValueHasBeenReplaced || isFullWidthRangeInput ? '' : inputMinWidth,
                  }}
                />
                {suffix && <FormFieldInputSuffixText>{suffix}</FormFieldInputSuffixText>}
              </FormFieldInputContainer>
            </FormFieldContainer>
          )}
          {hasInputField && !hasHideText && hasErrorPlaceholder && hasErrorText && (
            <SliderError errorOptions={errorOptions} errorType={error} />
          )}
        </InputFieldsContainer>
      </SliderContainer>
    </>
  );
};

export default Slider;
