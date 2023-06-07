import styled, { css } from 'styled-components';
import { getThemeColor, getBaseColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import {
  FormFieldInput as FormFieldInputBase,
  FormFieldInputContainer as FormFieldInputContainerBase,
  FormFieldLabel as FormFieldLabelBase,
  FormFieldSizes,
} from '@elvia/elvis-toolbox';
import { BothSliders, Sides, SliderType } from './elvia-slider.types';

//#region Types
type StyledSliderProps = {
  sliderType: SliderType;
};

type SliderFilledTrackProps = {
  isDisabled: boolean;
  rangeTrackWidth?: number;
  trackWidth: number;
  type: SliderType;
};

type SliderWrapperProps = {
  size: FormFieldSizes;
  isLeftSliderOnTop: boolean;
};

type FormFieldInputContainerProps = {
  size: FormFieldSizes;
  maxValueLength: number;
};

type HintValueProps = {
  hasErrorPlaceholder: boolean;
  size: FormFieldSizes;
  isDisabled: boolean;
  side: Sides;
};

type HeadingProps = {
  size: FormFieldSizes;
};

type MaxValueLengthMeasurementProps = {
  size: FormFieldSizes;
};

type FormFieldLabelProps = {
  size: FormFieldSizes;
  side: Sides;
  isFullWidth?: boolean;
};

type InputFieldsContainerProps = {
  replaceHintValueWithInput: BothSliders<boolean>;
  fullWithRangeInputs: boolean;
  hasInputField: boolean;
  type: SliderType;
  hasHintValues: boolean;
};

type FormFieldInputProps = {
  side: Sides;
  isFullWidth: boolean;
};

//#endregion

//#region Slider + Slider Thumbs
const removeDefaultStyles = css`
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  box-shadow: none;
  margin: 0;
  padding: 0;
`;

const defaultThumb = css`
  aspect-ratio: 1/1;
  background-color: ${getThemeColor('color-text-1')};
  border-radius: 50%;
  border: solid 1.5px ${getThemeColor('color-background-1')};
  cursor: pointer;
  height: 16px;
  opacity: 1;
  pointer-events: all;
  position: relative;
  transition-duration: 0.25s;
  transition-property: height, width;
  width: 16px;
  z-index: 3;

  @media (hover: none) and (pointer: coarse) {
    border: solid 2px ${getThemeColor('color-background-1')};
    height: 24px;
    width: 24px;
  }
`;

const activeThumb = css`
  background-color: ${getThemeColor('color-background-hover-1')};
  border: solid 1px ${getThemeColor('color-background-1')};
  cursor: grabbing;
  height: 20px;
  transition: background-color 0.1s;
  width: 20px;

  @media (hover: none) and (pointer: coarse) {
    border: solid 2px ${getThemeColor('color-background-1')};
    height: 28px;
    width: 28px;
  }
`;

const hoverThumb = css`
  border: solid 1px ${getThemeColor('color-background-1')};
  height: 20px;
  width: 20px;
`;

const disabledThumb = css`
  opacity: 1;
  background-color: ${getThemeColor('color-text-disabled-1')};
  border: solid 1.5px ${getThemeColor('color-background-1')};
  cursor: not-allowed;
`;

const focusOutlineThumb = css`
  outline-offset: 1px;
  outline: 3px solid ${getColor('focus-outline')};
`;
//#endregion

export const SliderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 112px;
  position: relative;
  row-gap: 4px;
  width: 100%;
`;

export const Heading = styled.p<HeadingProps>`
  align-items: center;
  display: flex;
  margin: 0;
  padding: 0;

  ${({ size }) => {
    return size === 'small'
      ? css`
          font-family: 'Red Hat Text', Verdana, sans-serif;
          font-size: 10px;
          font-weight: 500;
          height: 10px;
          letter-spacing: 0;
          line-height: 10px;
          margin-bottom: -6px;
          text-align: left;
        `
      : css`
          height: 22px;
          ${getTypographyCss('text-md-strong')}
        `;
  }}
`;

export const MaxValueLengthMeasurement = styled.span.attrs({
  'aria-hidden': 'true',
})<MaxValueLengthMeasurementProps>`
  padding: 0;
  position: absolute;
  margin: 0;
  height: 0;
  overflow: hidden;
  white-space: pre;
  ${getTypographyCss('text-md')}

  ${({ size }) =>
    size === 'small' &&
    css`
      font-size: 0.875rem;
    `}
`;

export const FormFieldInputContainer = styled(FormFieldInputContainerBase)<FormFieldInputContainerProps>`
  min-width: ${({ size }) => (size === 'small' ? '56px' : '80px')};
  width: ${({ maxValueLength }) => (maxValueLength ? `${maxValueLength + 26}px` : 'unset')};
`;

export const FormFieldInput = styled(FormFieldInputBase)<FormFieldInputProps>`
  width: 100%;
  text-align: ${({ side, isFullWidth }) => (side === 'left' || isFullWidth ? 'left' : 'right')};
`;

export const FormFieldLabel = styled(FormFieldLabelBase)<FormFieldLabelProps>`
  text-align: ${({ side, isFullWidth }) => (side === 'left' || isFullWidth ? 'left' : 'right')};

  ${({ size, side, isFullWidth }) =>
    !isFullWidth &&
    size === 'small' &&
    side === 'right' &&
    css`
      margin-right: 7px;
      right: 0;
    `}
`;

export const HintValue = styled.p.attrs({
  'aria-hidden': 'true',
})<HintValueProps>`
  display: inline-flex;
  align-items: center;
  margin: 0;
  ${getTypographyCss('text-sm')}
  color: ${getThemeColor('color-text-3')};
  height: ${({ size }) => (size === 'small' ? '32px' : '48px')};
  margin-bottom: ${({ hasErrorPlaceholder }) => (hasErrorPlaceholder ? '1.5rem' : '0')};
  width: 100%;
  justify-content: ${({ side }) => (side === 'left' ? 'start' : 'end')};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${getThemeColor('color-text-disabled-1')};
      user-select: none;
    `}
`;

export const InputFieldsContainer = styled.div<InputFieldsContainerProps>`
  justify-content: space-between;
  align-items: end;
  gap: 8px;
  display: grid;
  grid-auto-flow: ${({ fullWithRangeInputs }) => (fullWithRangeInputs ? 'row' : 'column')};
  grid-auto-columns: ${({ fullWithRangeInputs }) => (fullWithRangeInputs ? '1fr' : 'auto')};

  ${({ replaceHintValueWithInput = {}, hasInputField, type }) => {
    const { left, right } = replaceHintValueWithInput;
    if (hasInputField && type === 'simple') {
      if (left && right) {
        return css`
          grid-auto-columns: 1fr;
        `;
      } else if (left || right) {
        return css`
          grid-auto-columns: auto 1fr;
        `;
      } else {
        return css`
          grid-auto-columns: 1fr auto 1fr;
        `;
      }
    } else {
      return null;
    }
  }}

  label:first-of-type {
    grid-column: ${({ hasHintValues, type }) => (hasHintValues && type === 'simple' ? '2 / 3' : 'auto')};
    grid-row: 1 / 2;

    ${({ replaceHintValueWithInput = {} }) => {
      const { left, right } = replaceHintValueWithInput;

      if (left && right) {
        return css`
          grid-column: 1 / 4;
        `;
      } else if (left) {
        return css`
          grid-column: 1 / 3;
        `;
      } else if (right) {
        return css`
          grid-column: 3 / 4;
        `;
      }
      return null;
    }}
  }

  ${HintValue}:first-of-type {
    grid-column: ${({ hasInputField, type }) => (hasInputField && type === 'simple' ? '1 / 2' : 'auto')};
    grid-row: 1 / 2;
    ${({ replaceHintValueWithInput }) =>
      replaceHintValueWithInput.left &&
      css`
        visibility: hidden;
        width: 0;
      `}
  }

  ${HintValue}:last-of-type {
    grid-column: ${({ hasInputField, type }) => (hasInputField && type === 'simple' ? '3 / 4' : 'auto')};
    grid-row: 1 / 2;
    ${({ replaceHintValueWithInput }) =>
      replaceHintValueWithInput.right &&
      css`
        visibility: hidden;
        width: 0;
      `}
  }
`;

export const StyledSlider = styled.input.attrs(() => ({
  type: 'range',
  role: 'slider',
}))<StyledSliderProps>`
  ${removeDefaultStyles}

  ::-webkit-slider-thumb {
    ${removeDefaultStyles}
  }

  height: 0;
  pointer-events: ${({ sliderType }) => (sliderType === 'simple' ? 'auto' : 'none')};
  position: absolute;
  z-index: 3;

  ::-webkit-slider-thumb {
    ${defaultThumb};
  }

  ::-moz-range-thumb {
    ${defaultThumb}
  }

  /***** Focus Styles *****/
  :focus {
    outline: none;
  }

  :focus-visible::-webkit-slider-thumb {
    ${focusOutlineThumb}
  }

  :focus-visible::-moz-range-thumb {
    ${focusOutlineThumb}
  }

  /***** Hover Styles *****/
  :hover:enabled::-webkit-slider-thumb {
    ${hoverThumb}
  }

  :hover:enabled::-moz-range-thumb {
    ${hoverThumb}
  }

  /***** Disabled Styles *****/
  :disabled::-webkit-slider-thumb {
    ${disabledThumb}
  }

  :disabled {
    opacity: 1; // to keep the thumb opaque in Safari iOS (16) Do not move to ":disabled::-webkit-slider-thumb"
  }

  :disabled::-moz-range-thumb {
    ${disabledThumb}
  }

  /***** Active Styles *****/
  :active:enabled::-webkit-slider-thumb {
    ${activeThumb}
  }

  :active:enabled::-moz-range-thumb {
    ${activeThumb}
  }
`;

export const SliderWrapper = styled.div<SliderWrapperProps>`
  align-items: center;
  display: flex;
  height: 52px;
  position: relative;

  ${({ size }) =>
    size === 'small' &&
    css`
      height: 36px;
      padding: 12px 0 4px;
    `}

  ${StyledSlider} {
    width: 100%;
  }

  ${StyledSlider}:first-child {
    z-index: ${({ isLeftSliderOnTop }) => (isLeftSliderOnTop ? 5 : 3)};
  }
`;

export const SliderTrack = styled.div`
  background-color: ${getBaseColor('grey-20')};
  border-radius: 50px;
  height: 3px;
  position: absolute;
  width: 100%;
  z-index: 1;

  .e-theme-dark && {
    background-color: ${getBaseColor('grey-20', 'dark')};
  }
`;

//`left` and `width` are as inline styles to avoid creating new classnames on every change
export const SliderFilledTrack = styled.div.attrs<SliderFilledTrackProps>(
  ({ type, trackWidth, rangeTrackWidth }) => ({
    style: {
      left: type === 'range' ? `${trackWidth}px` : undefined,
      width: type === 'simple' ? `${trackWidth}px` : `${rangeTrackWidth}px`,
    },
  }),
)<SliderFilledTrackProps>`
  background-color: ${({ isDisabled }) =>
    isDisabled ? getThemeColor('color-border-disabled-1') : getThemeColor('color-text-1')};
  border-radius: 50px;
  height: 5px;
  position: absolute;
  z-index: 2;
`;

/**
 * Developer note: Repeating css in this file is necessary as comma-separating sliders pseudo-element selectors is not supported by browsers and may cause the entire selector to be dropped.
 * See: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
 */
