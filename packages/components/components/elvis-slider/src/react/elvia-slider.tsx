import React, { useEffect, useState } from 'react';
import {
  FormFieldContainer,
  FormFieldInputContainer,
  FormFieldInputSuffixText,
  useInputModeDetection,
} from '@elvia/elvis-toolbox';
import { Tooltip } from './tooltip/tooltip';
import { FormFieldInputValue, Side, SliderProps, BothSliders, ErrorType } from './elvia-slider.types';
import {
  FormFieldInput,
  FormFieldLabel,
  InputFieldsContainer,
  SliderContainer,
  SliderFilledTrack,
  SliderTrack,
  SliderWrapper,
  StyledSlider,
} from './styledComponents';
import { calculateThumbPosition } from './utils/calculateThumbPosition';
import { getAriaLabel } from './utils/getAriaLabel';
import {
  getAriaErrorMessage,
  getHasErrorPlaceholder,
  getHasErrorText,
  getInternalErrorText,
  getIsErrorState,
  getMergedErrorOptions,
  getShowErrorText,
} from './utils/getError';
import { SliderError } from './error/sliderError';
import { isOnlyNumbers, isValidNumber } from './utils/validators';
import { useContentRectWidth } from './utils/useContentRectWidth';
import { Hint } from './hint/hint';
import { Label } from './label/label';
import { calculateHintReplacement } from './utils/calculateHintReplacement';
import { Measurement } from './measurement/measurement';
export * from './elvia-slider.types';

let elvisSliderUniqueId = 0;

const Slider: React.FC<SliderProps> = function ({
  ariaLabel,
  className,
  errorOnChange,
  errorOptions,
  hasHints = true,
  hasInputField = true,
  inlineStyle,
  isDisabled = false,
  label,
  max = 100,
  min = 0,
  size = 'medium',
  type = 'simple',
  unit,
  value,
  valueOnChange,
  webcomponent,
  ...rest
}) {
  const [id] = useState(`ewc-slider-${elvisSliderUniqueId++}`);

  const [sliderValue, setSliderValue] = useState({ left: min, right: max });
  const [formFieldInputValues, setFormFieldInputValues] = useState<FormFieldInputValue>({
    left: sliderValue.left.toString(),
    right: sliderValue.right.toString(),
  });
  const [error, setError] = useState<Partial<BothSliders<ErrorType>>>();

  const [showTooltip, setShowTooltip] = useState({ left: false, right: false });
  const [isLeftSliderOnTop, setIsLeftSliderOnTop] = useState(false);

  //Responsive input fields
  const [inputFieldsContainerRectWidth, inputFieldsContainerRectWidthRef] =
    useContentRectWidth<HTMLDivElement>();
  const [isFullWidthRangeInput, setIsFullWidthRangeInput] = useState(false);
  const [leftHintRectWidth, leftHintRectWidthRef] = useContentRectWidth<HTMLSpanElement>();
  const [rightHintRectWidth, rightHintRectWidthRef] = useContentRectWidth<HTMLSpanElement>();

  const [totalSliderWidth, sliderRef] = useContentRectWidth<HTMLInputElement>();
  const [optimalInputWidth, setOptimalInputWidth] = useState(0);
  const [replaceHintValueWithInput, setReplaceHintValueWithInput] = useState({
    left: false,
    right: false,
  });

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

  const mergedErrorOptions = getMergedErrorOptions(type, errorOptions);
  const hasErrorPlaceholder = getHasErrorPlaceholder(error, mergedErrorOptions);
  const hasErrorText = getHasErrorText({ error: error, errorOptions: mergedErrorOptions });
  const hasHideText = getShowErrorText(mergedErrorOptions);

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
    if (type === 'simple' && hasInputField) {
      const newReplaceHintValueWithInput = calculateHintReplacement({
        inputLength: optimalInputWidth,
        leftHintWidth: leftHintRectWidth,
        rightHintWidth: rightHintRectWidth,
        inputContainerWidth: inputFieldsContainerRectWidth,
        hasHints: hasHints,
        min: min,
      });
      setReplaceHintValueWithInput(newReplaceHintValueWithInput);
    }
  }, [
    optimalInputWidth,
    leftHintRectWidth,
    rightHintRectWidth,
    inputFieldsContainerRectWidth,
    hasHints,
    hasInputField,
  ]);

  //check overflow (Range Slider only)
  useEffect(() => {
    if (type === 'range' && hasInputField) {
      setIsFullWidthRangeInput(optimalInputWidth * 2 + 8 > inputFieldsContainerRectWidth);
    }
  }, [optimalInputWidth, inputFieldsContainerRectWidth, hasInputField]);

  const updateValue = (newSliderValue: BothSliders<number>) => {
    const newValue = {
      left: newSliderValue.left,
      right: newSliderValue.right,
    };

    setSliderValue(newValue);
    if (newValue.left === sliderValue.left && newValue.right === sliderValue.right) {
      return;
    }

    const isSimpleSlider = (
      valueOnChange: SliderProps['valueOnChange'],
    ): valueOnChange is (val: number) => void => type === 'simple';

    if (isSimpleSlider(valueOnChange)) {
      valueOnChange?.(newValue.left);
    } else {
      valueOnChange?.(newValue);
    }
    const newValueToEmit = type === 'simple' ? newValue.left : newValue;
    webcomponent?.setProps({ value: newValueToEmit }, true);
    webcomponent?.triggerEvent('valueOnChange', newValueToEmit);
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

  const handleFormFieldInputOnChange = (value: string, side: Side) => {
    setIsLeftSliderOnTop(side === 'left');
    setFormFieldInputValues({ ...formFieldInputValues, [side]: value.replace(/\s/g, '') });
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, side: Side) => {
    if (e.key === 'Enter') {
      handleFormFieldInputOnBlur(e.currentTarget.value, side);
    }
  };

  const handleFormFieldInputOnBlur = (value: string, side: Side) => {
    if (value && !validateInputValue(value, side)) {
      return;
    } else {
      setError(undefined);
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

  const handleTooltip = (side?: Side) => {
    setShowTooltip({ left: side === 'left', right: side === 'right' });
  };

  const getHandleTooltipEvents = (side: Side) => ({
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

  const validateInputValue = (value: string, side: Side): boolean => {
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
    <SliderContainer
      aria-disabled={isDisabled}
      className={className ?? ''}
      style={{ ...inlineStyle }}
      {...rest}
    >
      {label && <Label size={size} value={label} />}
      <SliderWrapper isLeftSliderOnTop={isLeftSliderOnTop} size={size} isDisabled={isDisabled}>
        <StyledSlider
          type={'range'}
          role={'slider'}
          aria-label={getAriaLabel({
            side: 'left',
            sliderValue: sliderValue,
            type,
            ariaLabel,
            label,
            unit,
          })}
          aria-valuemax={max}
          aria-valuemin={min}
          disabled={isDisabled}
          isDisabled={isDisabled}
          max={max}
          min={min}
          name="left"
          onChange={handleSliderValueChange}
          ref={sliderRef}
          $type={type}
          value={sliderValue.left}
          {...getHandleTooltipEvents('left')}
        />

        {showTooltip.left && !isDisabled && (
          <Tooltip value={sliderValue} position={leftThumbPosition} side={'left'} unit={unit} size={size} />
        )}

        {type === 'range' && (
          <>
            <StyledSlider
              aria-label={getAriaLabel({
                side: 'right',
                sliderValue: sliderValue,
                type,
                ariaLabel,
                label,
                unit,
              })}
              type={'range'}
              role={'slider'}
              aria-valuemax={max}
              aria-valuemin={min}
              disabled={isDisabled}
              isDisabled={isDisabled}
              max={max}
              min={min}
              name="right"
              onChange={handleSliderValueChange}
              $type={type}
              value={sliderValue.right}
              {...getHandleTooltipEvents('right')}
            />

            {showTooltip.right && !isDisabled && (
              <Tooltip
                value={sliderValue}
                position={rightThumbPosition}
                side={'right'}
                unit={unit}
                size={size}
              />
            )}
          </>
        )}

        <SliderTrack isDisabled={isDisabled} />
        <SliderFilledTrack
          isDisabled={isDisabled}
          rangeTrackWidth={getFilledMiddleTrackWidth()}
          trackWidth={leftThumbPosition}
          $type={type}
        />
      </SliderWrapper>

      {hasInputField && (
        <Measurement min={min} max={max} unit={unit} size={size} setWidth={setOptimalInputWidth} />
      )}

      <InputFieldsContainer
        ref={inputFieldsContainerRectWidthRef}
        replaceHintValueWithInput={replaceHintValueWithInput}
        fullWithRangeInputs={isFullWidthRangeInput}
        $type={type}
        hasInputField={hasInputField}
        hasHints={hasHints}
      >
        {hasHints && !(type === 'range' && hasInputField) && (
          <Hint
            hasErrorPlaceholder={hasErrorPlaceholder}
            isDisabled={isDisabled}
            ref={leftHintRectWidthRef}
            side={'left'}
            size={size}
            value={min}
            aria-hidden={true}
          />
        )}

        {hasInputField && (
          <FormFieldContainer
            size={size}
            isDisabled={isDisabled}
            isInvalid={getIsErrorState({ side: 'left', error: error, errorOptions: mergedErrorOptions })}
            isFullWidth={hintValueHasBeenReplaced || isFullWidthRangeInput}
            hasErrorPlaceholder={hasErrorPlaceholder && !(type === 'range' && isFullWidthRangeInput)}
          >
            <FormFieldLabel>{label ? label : 'juster glidebryter'}</FormFieldLabel>
            <FormFieldInputContainer
              style={{
                width:
                  hintValueHasBeenReplaced || isFullWidthRangeInput ? 'initial' : `${optimalInputWidth}px`,
              }}
            >
              <FormFieldInput
                $side="left"
                aria-errormessage={getAriaErrorMessage({
                  error: error,
                  errorOptions: mergedErrorOptions,
                  id: id,
                  side: 'left',
                })}
                aria-invalid={getIsErrorState({
                  side: 'left',
                  error: error,
                  errorOptions: mergedErrorOptions,
                })}
                autoComplete="off"
                disabled={isDisabled}
                $isFullWidth={isFullWidthRangeInput}
                onBlur={(e) => handleFormFieldInputOnBlur(e.target.value, 'left')}
                onChange={(e) => handleFormFieldInputOnChange(e.target.value, 'left')}
                onKeyDown={(e) => handleOnKeyDown(e, 'left')}
                value={formFieldInputValues.left}
                inputMode="numeric"
              />
              {unit && <FormFieldInputSuffixText>{unit}</FormFieldInputSuffixText>}
            </FormFieldInputContainer>
          </FormFieldContainer>
        )}

        {hasHints && !(type === 'range' && hasInputField) && (
          <Hint
            hasErrorPlaceholder={hasErrorPlaceholder}
            isDisabled={isDisabled}
            ref={rightHintRectWidthRef}
            side={'right'}
            size={size}
            value={max}
          />
        )}

        {hasInputField && type === 'range' && (
          <FormFieldContainer
            size={size}
            isDisabled={isDisabled}
            isInvalid={getIsErrorState({
              side: 'right',
              error: error,
              errorOptions: mergedErrorOptions,
            })}
            hasErrorPlaceholder={hasErrorPlaceholder}
            isFullWidth={isFullWidthRangeInput}
          >
            <FormFieldLabel>{label ? label : 'juster glidebryter'}</FormFieldLabel>
            <FormFieldInputContainer
              style={{
                width:
                  hintValueHasBeenReplaced || isFullWidthRangeInput ? 'initial' : `${optimalInputWidth}px`,
              }}
            >
              <FormFieldInput
                $side="right"
                aria-errormessage={getAriaErrorMessage({
                  error: error,
                  errorOptions: mergedErrorOptions,
                  id: id,
                  side: 'right',
                })}
                aria-invalid={getIsErrorState({
                  side: 'right',
                  error: error,
                  errorOptions: mergedErrorOptions,
                })}
                disabled={isDisabled}
                $isFullWidth={isFullWidthRangeInput}
                onBlur={(e) => handleFormFieldInputOnBlur(e.target.value, 'right')}
                onChange={(e) => handleFormFieldInputOnChange(e.target.value, 'right')}
                onKeyDown={(e) => handleOnKeyDown(e, 'right')}
                value={formFieldInputValues.right}
                inputMode="numeric"
              />
              {unit && <FormFieldInputSuffixText>{unit}</FormFieldInputSuffixText>}
            </FormFieldInputContainer>
          </FormFieldContainer>
        )}
        {hasInputField && !hasHideText && hasErrorPlaceholder && hasErrorText && (
          <SliderError id={id} errorOptions={mergedErrorOptions} errorType={error} />
        )}
      </InputFieldsContainer>
    </SliderContainer>
  );
};

export default Slider;
