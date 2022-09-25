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
  hasInputField = false,
  inlineStyle,
  max,
  min,
  max = 100,
  min = 0,
  sliderType = 'simple',
  step = 1,
  webcomponent,
  ...rest
}) => {
  const leftTextInput = useRef<HTMLInputElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);

  const EXTREMA: Extrema = {
    minimum: +min,
    maximum: +max,
  };

  /* Used to set the z-index for the left thumb. */
  const [leftOnTop, setLeftOnTop] = useState<boolean>(false);

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

  const [sliderWidth, setSliderWidth] = useState(0);

  const [errors, setErrors] = useState<SliderErrors>({
    leftTextfield: undefined,
    rightTextfield: undefined,
  });

  /* https://stackoverflow.com/a/61665977/14447555 */
  const thumbWidth = 20;
  const left =
    ((sliderValues.left - EXTREMA.minimum) / (EXTREMA.maximum - EXTREMA.minimum)) *
      (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
    thumbWidth / 2;

  let right: number | undefined;
  let middleFilled: number | undefined;

  if (sliderType === 'range' && sliderValues.right) {
    right =
      ((sliderValues.right - EXTREMA.maximum) / (EXTREMA.minimum - EXTREMA.maximum)) *
        (sliderWidth - thumbWidth / 2 - thumbWidth / 2) +
      thumbWidth / 2;

    middleFilled = sliderWidth - left - right;
  }

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    /* if (sliderTitleRef.current && webcomponent.getSlot('title')) {
      sliderTitleRef.current.innerHTML = '';
      sliderTitleRef.current.appendChild(webcomponent.getSlot('title'));
    } */
  });

  /* For å unngå at state ligger et skritt bak */
  useEffect(() => {
    setTextFieldsValues({ ...textFieldsValues, left: sliderValues.left, right: sliderValues.right });
  }, [sliderValues]);

  /* https://stackoverflow.com/a/73248253/14447555 */
  const resizeObserver = new ResizeObserver(() => {
    if (sliderRef.current !== null) {
      setSliderWidth(sliderRef.current.offsetWidth);
    }
  });

  useLayoutEffect(() => {
    if (sliderRef.current !== null) {
      resizeObserver.observe(sliderRef.current);
    }
    return function cleanup() {
      resizeObserver.disconnect();
    };
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

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

  /* Fungerer som forventet */
  const handleSliderValueChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { name, value } = event.target as HTMLInputElement;

    name === 'left' ? setLeftOnTop(true) : setLeftOnTop(false);
    setErrors({ leftTextfield: undefined, rightTextfield: undefined });

    if (sliderType === 'range') {
      if (name === 'left') {
        const newValue: number = Math.min(+value, sliderValues.right - step);
        setSliderValues({ ...sliderValues, ['left']: newValue });
        return;
      }

      if (name === 'right') {
        const newValue: number = Math.max(+value, sliderValues.left + step);
        setSliderValues({ ...sliderValues, ['right']: newValue });
        return;
      }
    }

    if (+value > EXTREMA.maximum || +value < EXTREMA.minimum) {
      return;
    }

    setSliderValues({ ...sliderValues, [name]: +value });
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
    const { name, value } = event.target as HTMLInputElement;
    let errorMessage: string;

    if (sliderType === 'range') {
      if (textFieldsValues.left == textFieldsValues.right) {
        errorMessage = 'Verdiene kan ikke være like';
        setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
        return;
      }

      if (name === 'left') {
        if (+value > sliderValues.right) {
          errorMessage = 'Den nedre verdien kan ikke være større enn den øvre verdien';
          setErrors({ ...errors, leftTextfield: errorMessage });
          return;
        }
      }

      if (name === 'right') {
        if (+value < sliderValues.left) {
          errorMessage = 'Den øvre verdien kan ikke være mindre enn den nedre verdien';
          console.error(errorMessage);
          setErrors({ ...errors, rightTextfield: errorMessage });
          return;
        }
      }
    }

    if (+value > EXTREMA.maximum) {
      errorMessage = 'Verdien kan ikke være større enn maksimumsverdien';
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    if (+value < EXTREMA.minimum) {
      errorMessage = 'Verdien kan ikke være mindre enn minimumsverdien';
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    if (value === '' || !value) {
      errorMessage = 'Verdien kan ikke være tom';
      setErrors({ ...errors, [`${name}Textfield`]: errorMessage });
      return;
    }

    //if input passes validation
    setSliderValues({ ...sliderValues, [name]: +value });
  };

  return (
    <>
      <SliderContainer className={className ?? ''} style={{ ...inlineStyle }} {...rest}>
        <form onSubmit={handleSubmit}>
          <SliderWrapper leftOnTop={leftOnTop}>
            {/* The actual HTML input type=range ↓ 
            Gjør det til eget komponent! */}
            <StyledSlider
              aria-label="Range start"
              disabled={disabled}
              max={EXTREMA.maximum}
              min={EXTREMA.minimum}
              name="left"
              onChange={handleSliderValueChange}
              ref={sliderRef}
              sliderType={sliderType}
              step={step}
              value={sliderValues.left}
              onTouchStart={() => setShowTooltip({ ...showTooltip, left: true })}
              onTouchEnd={() => setShowTooltip({ ...showTooltip, left: false })}
              onMouseOver={() => setShowTooltip({ ...showTooltip, left: true })}
              onMouseLeave={() => setShowTooltip({ ...showTooltip, left: false })}
              onFocus={() => setShowTooltip({ ...showTooltip, left: true })}
              onBlur={() => setShowTooltip({ ...showTooltip, left: false })}
            />

            {showTooltip.left && !disabled && (
              <TooltipPopup
                position="top"
                side="left"
                fadeOut={false}
                style={{
                  left: `${left}px`,
                }}
              >
                {sliderValues.left}
              </TooltipPopup>
            )}

            {sliderType === 'range' && (
              <>
                <StyledSlider
                  aria-label="Range end"
                  disabled={disabled}
                  max={EXTREMA.maximum}
                  min={EXTREMA.minimum}
                  name="right"
                  onChange={handleSliderValueChange}
                  sliderType={sliderType}
                  step={step}
                  value={sliderValues.right}
                  onTouchStart={() => setShowTooltip({ ...showTooltip, right: true })}
                  onTouchEnd={() => setShowTooltip({ ...showTooltip, right: false })}
                  onMouseOver={() => setShowTooltip({ ...showTooltip, right: true })}
                  onMouseLeave={() => setShowTooltip({ ...showTooltip, right: false })}
                  onFocus={() => setShowTooltip({ ...showTooltip, right: true })}
                  onBlur={() => setShowTooltip({ ...showTooltip, right: false })}
                />

                {showTooltip.right && !disabled && (
                  <TooltipPopup
                    position="top"
                    side="right"
                    fadeOut={false}
                    style={{
                      right: `${right}px`,
                    }}
                  >
                    {sliderValues.right}
                  </TooltipPopup>
                )}
              </>
            )}

            {/* Our custom track */}
            <SliderTrack></SliderTrack>
            <SliderFilledTrack
              trackWidth={left}
              sliderType={sliderType}
              rangeTrackWidth={middleFilled}
              disabled={disabled}
            ></SliderFilledTrack>
          </SliderWrapper>

          {hasInputField && (
            /* Simple flex container for the input fields */
            <InputFieldsContainer sliderType={sliderType}>
              <div>
                <NumberInputContainer>
                  <label>
                    <LabelText>{sliderType === 'simple' ? 'verdi' : 'fra'}</LabelText>
                    {/* LEFT */}
                    <NumberInput
                      disabled={disabled}
                      max={EXTREMA.maximum}
                      min={EXTREMA.minimum}
                      name="left"
                      onBlur={handleBlur}
                      onChange={handleNumberInputValueChange}
                      ref={leftTextInput}
                      step={step}
                      value={textFieldsValues.left}
                      aria-invalid={`${inputFieldIsInvalid('left')}`}
                      aria-errormessage={errors.rightTextfield}
                    ></NumberInput>
                  </label>
                </NumberInputContainer>
                {errors.leftTextfield && <SliderError errorMessage={errors.leftTextfield} />}
              </div>

              {sliderType === 'range' && (
                <div>
                  <NumberInputContainer>
                    <label>
                      <LabelText>til</LabelText>
                      {/* RIGHT */}
                      <NumberInput
                        disabled={disabled}
                        max={EXTREMA.maximum}
                        min={EXTREMA.minimum}
                        name="right"
                        onBlur={handleBlur}
                        onChange={handleNumberInputValueChange}
                        step={step}
                        value={textFieldsValues.right}
                        aria-invalid={`${inputFieldIsInvalid('right')}`}
                        aria-errormessage={errors.rightTextfield}
                      ></NumberInput>
                    </label>
                  </NumberInputContainer>
                  {errors.rightTextfield && <SliderError errorMessage={errors.rightTextfield} />}
                </div>
              )}
            </InputFieldsContainer>
          )}
        </form>
      </SliderContainer>
    </>
  );
};

export default Slider;
