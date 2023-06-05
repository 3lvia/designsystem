import React, { useEffect, useState, useRef, useLayoutEffect, useMemo } from 'react';
import {
  FormFieldContainer,
  FormFieldError,
  FormFieldErrorContainer,
  IconWrapper,
  useInputModeDetection,
} from '@elvia/elvis-toolbox';

import { Tooltip } from './tooltip/tooltip';

import removeCircle from '@elvia/elvis-assets-icons/dist/icons/removeCircle';

import {
  FormFieldInputValues,
  Sides,
  SliderProps,
  SliderValues,
  ErrorOptionKeys,
  BothSliders,
} from './elvia-slider.types';

import {
  FormFieldInput,
  FormFieldInputContainer,
  FormFieldLabel,
  HintValue,
  InputFieldsContainer,
  MaxValueLengthMeasurement,
  SliderContainer,
  SliderFilledTrack,
  SliderTrack,
  SliderWrapper,
  StyledSlider,
  Heading,
} from './styledComponents';
import { calculateThumbPosition } from './utils/calculateThumbPosition';

let uniqueSliderId = 0;

const Slider: React.FC<SliderProps> = ({
  ariaLabel,
  className,
  errorOptions,
  hasHintValues = false,
  hasInputField = false,
  hasPercent = false,
  hasTooltip = true,
  inlineStyle,
  isCompact = false,
  isDisabled = false,
  label,
  max = 100,
  min = 0,
  heading,
  type = 'simple',
  unit,
  value,
  valueOnChange,
  webcomponent,
  ...rest
}) => {
  const [sliderValues, setSliderValues] = useState<SliderValues>({ left: min, right: max });
  const [formFieldInputValues, setFormFieldInputValues] = useState<FormFieldInputValues>({
    left: sliderValues.left.toString(),
    right: sliderValues.right.toString(),
  });
  const [showTooltip, setShowTooltip] = useState<BothSliders<boolean>>({ left: false, right: false });
  const [id] = useState(`ewc-slider-${uniqueSliderId++}`);
  const [isLeftSliderOnTop, setIsLeftSliderOnTop] = useState(false);
  const [totalSliderWidth, setTotalSliderWidth] = useState(0);
  const [preferredInputLength, setPreferredInputLength] = useState(0);

  const [inputFieldsContainerWidth, setInputFieldsContainerWidth] = useState(0);
  const [leftInputFieldWidth, setLeftInputFieldWidth] = useState(0);
  const [leftHintValueWidth, setLeftHintValueWidth] = useState(0);
  const [rightHintValueWidth, setRightHintValueWidth] = useState(0);

  const [replaceHintValueWithInput, setReplaceHintValueWithInput] = useState<BothSliders<boolean>>({
    left: false,
    right: false,
  });

  const [fullWithRangeInputs, setFullWithRangeInputs] = useState(false);

  const inputFieldsContainerRef = useRef<HTMLDivElement>(null);
  const leftFormFieldInputRef = useRef<HTMLLabelElement>(null);
  const leftHintTextRef = useRef<HTMLParagraphElement>(null);
  const leftInputLabelLengthMeasurementRef = useRef<HTMLSpanElement>(null);
  const maxValueLengthMeasurementRef = useRef<HTMLSpanElement>(null);
  const rightHintTextRef = useRef<HTMLParagraphElement>(null);
  const rightInputLabelLengthMeasurementRef = useRef<HTMLSpanElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const { inputMode } = useInputModeDetection();

  const percentValue = useMemo(() => {
    if (type === 'simple' && hasPercent) {
      const { left: currentValue } = sliderValues;
      return Math.round(((currentValue - min) / (max - min)) * 100);
    }
    return undefined;
  }, [sliderValues.left, min, max, hasPercent, type]);

  /* thumbWidth: Used to horizontally center the tooltip over the "thumb" of the slider. */
  const thumbWidth = inputMode === 'touch' ? 28 : 20;

  const leftThumbPosition = calculateThumbPosition({
    side: 'left',
    sliderValues: sliderValues,
    min: min,
    max: max,
    totalSliderWidth: totalSliderWidth,
    thumbWidth: thumbWidth,
  });

  const rightThumbPosition = calculateThumbPosition({
    side: 'right',
    sliderValues: sliderValues,
    min: min,
    max: max,
    totalSliderWidth: totalSliderWidth,
    thumbWidth: thumbWidth,
  });

  /** The width in px of the filled track between the two thumbs */
  const getFilledMiddleTrackWidth = () => {
    if (type !== 'range' || sliderValues.right === sliderValues.left) {
      return 0;
    }

    return totalSliderWidth - leftThumbPosition - rightThumbPosition;
  };

  useLayoutEffect(() => {
    const elementsToObserve: (HTMLElement | null)[] = [sliderRef.current, inputFieldsContainerRef.current];

    elementsToObserve.forEach((element) => {
      if (element) {
        resizeObserver.observe(element);
      }
    });

    return function cleanup() {
      resizeObserver.disconnect();
    };
  }, [sliderRef.current, inputFieldsContainerRef.current]);

  //static widths
  useLayoutEffect(() => {
    if (hasHintValues) {
      if (leftHintTextRef.current) {
        setLeftHintValueWidth(leftHintTextRef.current.offsetWidth);
      }

      if (rightHintTextRef.current) {
        setRightHintValueWidth(rightHintTextRef.current.offsetWidth);
      }
    }

    if (hasInputField) {
      if (leftFormFieldInputRef.current) {
        setLeftInputFieldWidth(leftFormFieldInputRef.current.offsetWidth);
      }

      const measurements = [
        maxValueLengthMeasurementRef.current?.offsetWidth,
        leftInputLabelLengthMeasurementRef.current?.offsetWidth,
        rightInputLabelLengthMeasurementRef.current?.offsetWidth,
      ].filter((measurement) => measurement !== null && measurement !== undefined) as number[];
      setPreferredInputLength(Math.max(...measurements, 0));
    }
  }, [
    maxValueLengthMeasurementRef.current,
    leftHintTextRef.current,
    rightHintTextRef.current,
    leftInputLabelLengthMeasurementRef.current,
    rightInputLabelLengthMeasurementRef.current,
    leftFormFieldInputRef.current,
    hasInputField,
    hasHintValues,
  ]);

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
    setSliderValues({ left: min, right: max });
  }, [value, min, max]);

  useEffect(() => {
    if (hasInputField) {
      setFormFieldInputValues({
        ...formFieldInputValues,
        left: sliderValues.left.toString().replace('.', ','),
        right: sliderValues.right.toString().replace('.', ','),
      });
    }
  }, [sliderValues]);

  //check overflow (Simple Slider only)
  useEffect(() => {
    if (type === 'simple') {
      const inputAndHintsWidth = leftInputFieldWidth + leftHintValueWidth + rightHintValueWidth + 16; //8*2 for grid gap
      const isOverflowing = inputAndHintsWidth > inputFieldsContainerWidth;

      const newReplaceHintValueWithInput = { left: false, right: false };

      if (isOverflowing && hasHintValues && min === 0) {
        // Check if we need to replace _left_ hint value with input
        if (leftInputFieldWidth + rightHintValueWidth + 8 < inputFieldsContainerWidth) {
          newReplaceHintValueWithInput.left = true;
        } else {
          newReplaceHintValueWithInput.left = true;
          newReplaceHintValueWithInput.right = true;
        }
      } else if (isOverflowing && hasHintValues && min !== 0) {
        // Check if we need to replace _right_ hint value with input
        if (leftInputFieldWidth + leftHintValueWidth + 8 < inputFieldsContainerWidth) {
          newReplaceHintValueWithInput.right = true;
        } else {
          newReplaceHintValueWithInput.left = true;
          newReplaceHintValueWithInput.right = true;
        }
      }

      setReplaceHintValueWithInput(newReplaceHintValueWithInput);
    }
  }, [
    leftInputFieldWidth,
    leftHintValueWidth,
    rightHintValueWidth,
    inputFieldsContainerWidth,
    hasHintValues,
    hasInputField,
  ]);

  //check overflow (Range Slider only)
  useEffect(() => {
    if (type === 'range' && hasInputField) {
      setFullWithRangeInputs(leftInputFieldWidth * 2 + 8 > inputFieldsContainerWidth);
    }
  }, [leftInputFieldWidth, inputFieldsContainerWidth, hasHintValues, hasInputField]);

  //dynamic widths
  const resizeObserver = new ResizeObserver(() => {
    if (sliderRef.current) {
      setTotalSliderWidth(sliderRef.current.offsetWidth);
    }

    if (inputFieldsContainerRef.current) {
      setInputFieldsContainerWidth(inputFieldsContainerRef.current.offsetWidth);
    }
  });

  const updateValue = (newSliderValues: SliderValues) => {
    const newValue = {
      left: newSliderValues.left,
      right: newSliderValues.right,
    };

    setSliderValues(newValue);

    const newValueToEmit = type === 'simple' ? newValue.left : newValue;
    if (!webcomponent && valueOnChange) {
      valueOnChange(newValueToEmit);
    } else if (webcomponent) {
      webcomponent.setProps({ value: newValueToEmit }, true);
      webcomponent.triggerEvent('valueOnChange', newValueToEmit);
    }
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

  const handleFormFieldInputValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value: incomingValue } = event.target as HTMLInputElement;
    name === 'left' ? setIsLeftSliderOnTop(true) : setIsLeftSliderOnTop(false);

    const isModifierKey = ['deleteContentBackward', 'deleteContentForward'].includes(
      (event.nativeEvent as InputEvent).inputType,
    );

    //only digits. optional minus sign. optional comma or period. optional digits after comma or period
    const incomingValueWithoutSpaces = incomingValue.replace(/\s/g, '');
    const isValidNumber = /^-?\d*(?:[.,]\d*)?$/.test(incomingValueWithoutSpaces);

    if (incomingValue === '' || isModifierKey || isValidNumber) {
      setFormFieldInputValues({ ...formFieldInputValues, [name]: incomingValueWithoutSpaces });
    }
  };

  const handleFormFieldInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const name = event.target.name as Sides;
    const { value: incomingValue } = event.target as HTMLInputElement;
    const newValue = Number(incomingValue.replace(',', '.').replace(/,$/g, ''));

    if (!newValue) {
      updateValue({ ...sliderValues, [name]: name === 'left' ? min : max });
      return;
    }

    if (type === 'range') {
      if (name === 'left') {
        if (newValue >= sliderValues.right) {
          updateValue({ ...sliderValues, [name]: sliderValues.right });
          return;
        }
      } else {
        if (newValue <= sliderValues.left) {
          updateValue({ ...sliderValues, [name]: sliderValues.left });
          return;
        }
      }
    }

    if (newValue > max) {
      updateValue({ ...sliderValues, [name]: max });
      return;
    }

    if (newValue < min) {
      updateValue({ ...sliderValues, [name]: min });
      return;
    }

    updateValue({ ...sliderValues, [name]: newValue });
  };

  const getLabel = (side: Sides): string => {
    if (label) {
      if (typeof label === 'object') {
        return label[side];
      }
      if (typeof label === 'string') {
        return label;
      }
    }
    if (type === 'range') {
      return side === 'left' ? 'Fra' : 'Til';
    }
    return 'Verdi';
  };

  const getAriaLabel = (side: Sides): string => {
    if (ariaLabel) {
      return returnAriaLabelFromProp(side);
    } else {
      return generateAutomaticAriaLabel(side);
    }
  };

  const returnAriaLabelFromProp = (side: Sides): string => {
    if (typeof ariaLabel === 'object') {
      return ariaLabel[side];
    }

    if (typeof ariaLabel === 'string') {
      return ariaLabel;
    }

    return 'Glidebryter';
  };

  const generateAutomaticAriaLabel = (side: Sides): string => {
    let newAriaLabel = '';
    if (type === 'range') {
      const prefix = side === 'left' ? 'Startverdi' : 'Sluttverdi';
      newAriaLabel = `${prefix} ${heading ?? ''} rekkeviddeglidebryter ${
        unit ? ' med verdi ' + sliderValues[side] + unit : ''
      }`;
    }

    if (type === 'simple' && (heading || unit)) {
      newAriaLabel = `${heading ?? ''} ${unit ? 'skyveknapp, ' + sliderValues.left + unit : ''}`;
    }

    return newAriaLabel ? newAriaLabel.replace(/\s+/g, ' ').trim() : 'Glidebryter';
  };

  const getTooltipContent = (side: Sides) => {
    const value = side === 'left' ? sliderValues.left.toLocaleString() : sliderValues.right.toLocaleString();

    if (type === 'range') {
      return `${value}${unit || ''}`;
    }

    if (type === 'simple') {
      if (hasPercent) {
        return `${percentValue} %`;
      }
      return `${value}${unit || ''}`;
    }

    return value;
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

  const getErrorOptionValue = (side: Sides, key: ErrorOptionKeys) => {
    if (errorOptions) {
      errorOptions.type = type;

      switch (errorOptions.type) {
        case 'simple':
          return errorOptions[key] ?? false;
        case 'range':
          return errorOptions[side][key] ?? false;
      }
    } else {
      return false;
    }
  };

  const getShowErrorText = () => {
    return !getErrorOptionValue('left', 'hideText') || !getErrorOptionValue('right', 'hideText');
  };

  const getHasErrorPlaceholder = () => {
    return (getErrorOptionValue('left', 'hasErrorPlaceholder') ||
      getErrorOptionValue('right', 'hasErrorPlaceholder')) as boolean;
  };

  const getHasErrorText = () => {
    return (getErrorOptionValue('left', 'text') || getErrorOptionValue('right', 'text')) as boolean;
  };

  const getErrorText = (): string => {
    const leftText = getErrorOptionValue('left', 'text') as string;
    const leftHideText = getErrorOptionValue('left', 'hideText');
    if (leftText && !leftHideText) {
      return leftText;
    }

    const rightText = getErrorOptionValue('right', 'text') as string;
    const rightHideText = getErrorOptionValue('right', 'hideText');
    if (rightText && !rightHideText) {
      return rightText;
    }

    return '';
  };

  return (
    <>
      <SliderContainer
        aria-disabled={isDisabled}
        className={className ?? ''}
        style={{ ...inlineStyle }}
        {...rest}
      >
        {heading && (
          <Heading id={`${id}-heading`} isCompact={isCompact}>
            {heading}
          </Heading>
        )}
        <SliderWrapper isLeftSliderOnTop={isLeftSliderOnTop} isCompact={isCompact}>
          {/* ↓ The actual HTML input type=range ↓*/}
          <StyledSlider
            aria-label={getAriaLabel('left')}
            aria-valuemax={max}
            aria-valuemin={min}
            disabled={isDisabled}
            max={max}
            min={min}
            name="left"
            onChange={handleSliderValueChange}
            ref={sliderRef}
            sliderType={type}
            value={sliderValues.left}
            {...createHandleTooltipEvents('left')}
          />

          {showTooltip.left && !isDisabled && (hasTooltip || inputMode === 'touch') && (
            <Tooltip content={getTooltipContent('left')} position={leftThumbPosition} />
          )}

          {type === 'range' && (
            <>
              {/* ↓ The actual HTML input type=range ↓*/}
              <StyledSlider
                aria-label={getAriaLabel('right')}
                aria-valuemax={max}
                aria-valuemin={min}
                disabled={isDisabled}
                max={max}
                min={min}
                name="right"
                onChange={handleSliderValueChange}
                sliderType={type}
                value={sliderValues.right}
                {...createHandleTooltipEvents('right')}
              />

              {showTooltip.right && !isDisabled && (hasTooltip || inputMode === 'touch') && (
                <Tooltip side={'right'} content={getTooltipContent('right')} position={rightThumbPosition} />
              )}
            </>
          )}

          {/* ↓ Custom styled track ↓ */}
          <SliderTrack />
          <SliderFilledTrack
            isDisabled={isDisabled}
            rangeTrackWidth={getFilledMiddleTrackWidth()}
            trackWidth={leftThumbPosition}
            type={type}
          />
        </SliderWrapper>

        {/* ↓ The input fields  */}
        {hasInputField && (
          //hidden
          <MaxValueLengthMeasurement ref={maxValueLengthMeasurementRef} isCompact={isCompact}>
            {max}
          </MaxValueLengthMeasurement>
        )}
        <InputFieldsContainer
          ref={inputFieldsContainerRef}
          replaceHintValueWithInput={replaceHintValueWithInput}
          fullWithRangeInputs={fullWithRangeInputs}
          type={type}
          hasInputField={hasInputField}
          hasHintValues={hasHintValues}
        >
          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HintValue
              hasErrorPlaceholder={getHasErrorPlaceholder()}
              isCompact={isCompact}
              isDisabled={isDisabled}
              side={'left'}
            >
              <span ref={leftHintTextRef}>{min.toLocaleString()}</span>
            </HintValue>
          )}

          {hasInputField && (
            <FormFieldContainer
              isCompact={isCompact}
              isDisabled={isDisabled}
              isInvalid={getErrorOptionValue('left', 'isErrorState') as boolean}
              isFullWidth={Object.values(replaceHintValueWithInput).includes(true) || fullWithRangeInputs}
              hasErrorPlaceholder={getHasErrorPlaceholder()}
              ref={leftFormFieldInputRef}
            >
              <FormFieldLabel side={'left'} isCompact={isCompact} id={`${id}-left-label`}>
                <span ref={leftInputLabelLengthMeasurementRef}>{getLabel('left')}</span>
              </FormFieldLabel>
              <FormFieldInputContainer isCompact={isCompact} maxValueLength={preferredInputLength}>
                <FormFieldInput
                  aria-invalid={getErrorOptionValue('left', 'isErrorState') as boolean}
                  aria-disabled={isDisabled}
                  aria-labelledby={heading ? `${id}-heading ${id}-left-label` : undefined}
                  autoComplete="off"
                  disabled={isDisabled}
                  name="left"
                  side="left"
                  isFullWidth={fullWithRangeInputs}
                  onBlur={handleFormFieldInputBlur}
                  onChange={handleFormFieldInputValueChange}
                  value={formFieldInputValues.left}
                />
              </FormFieldInputContainer>
            </FormFieldContainer>
          )}

          {hasHintValues && !(type === 'range' && hasInputField) && (
            <HintValue
              hasErrorPlaceholder={getHasErrorPlaceholder()}
              isCompact={isCompact}
              isDisabled={isDisabled}
              side={'right'}
            >
              <span ref={rightHintTextRef}>{max.toLocaleString()}</span>
            </HintValue>
          )}

          {hasInputField && type === 'range' && (
            <FormFieldContainer
              isCompact={isCompact}
              isDisabled={isDisabled}
              isInvalid={getErrorOptionValue('right', 'isErrorState') as boolean}
              hasErrorPlaceholder={getHasErrorPlaceholder()}
              isFullWidth={fullWithRangeInputs}
            >
              <FormFieldLabel
                side={'right'}
                isFullWidth={fullWithRangeInputs}
                isCompact={isCompact}
                id={`${id}-right-label`}
              >
                <span ref={rightInputLabelLengthMeasurementRef}>{getLabel('right')}</span>
              </FormFieldLabel>

              <FormFieldInputContainer isCompact={isCompact} maxValueLength={preferredInputLength}>
                <FormFieldInput
                  aria-disabled={isDisabled}
                  aria-labelledby={heading ? `${id}-heading ${id}-right-label` : undefined}
                  aria-invalid={getErrorOptionValue('right', 'isErrorState') as boolean}
                  aria-errormessage={`${id}-error-text`}
                  disabled={isDisabled}
                  name="right"
                  side="right"
                  isFullWidth={fullWithRangeInputs}
                  onBlur={handleFormFieldInputBlur}
                  onChange={handleFormFieldInputValueChange}
                  value={formFieldInputValues.right}
                />
              </FormFieldInputContainer>
            </FormFieldContainer>
          )}
          {hasInputField && getShowErrorText() && getHasErrorPlaceholder() && getHasErrorText() && (
            <FormFieldErrorContainer>
              <IconWrapper icon={removeCircle} color="error" size="xs" />
              <FormFieldError data-testid="error" id={`${id}-error-text`}>
                {getErrorText()}
              </FormFieldError>
            </FormFieldErrorContainer>
          )}
        </InputFieldsContainer>
      </SliderContainer>
    </>
  );
};

export default Slider;
