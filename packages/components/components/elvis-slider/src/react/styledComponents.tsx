import styled, { css } from 'styled-components';
import { getThemeColor, getBaseColor } from '@elvia/elvis-colors';
import {
  FormFieldInput as FormFieldInputBase,
  FormFieldSizes,
  FormFieldLabel as FormFieldLabelBase,
} from '@elvia/elvis-toolbox';
import { BothSliders, Side, SliderType } from './elvia-slider.types';
import { Hint } from './hint/styledHint';

type SliderFilledTrackProps = {
  isDisabled: boolean;
  rangeTrackWidth?: number;
  trackWidth: number;
  $type: SliderType;
};

type InputFieldsContainerProps = {
  replaceHintValueWithInput: BothSliders<boolean>;
  fullWithRangeInputs: boolean;
  hasInputField: boolean;
  $type: SliderType;
  hasHints: boolean;
};

const removeDefaultStyles = css`
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  appearance: none;
  background: transparent;
  box-shadow: none;
  margin: 0;
  padding: 0;
`;

const defaultThumb = css`
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
  outline: 3px solid ${getBaseColor('focus-outline')};
`;

const srOnlyBase = css`
  border: 0 !important;
  clip-path: inset(50%) !important;
  clip: rect(0 0 0 0) !important;
  height: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  padding: 0 !important;
  position: absolute !important;
  white-space: nowrap !important;
  width: 0 !important;
`;

export const SliderContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  min-width: 80px;
  position: relative;
  width: 100%;
`;

type FormFieldInputProps = {
  $width?: number | null;
  $side?: Side;
  $isFullWidth?: boolean;
};

export const FormFieldInput = styled(FormFieldInputBase)<FormFieldInputProps>`
  width: ${({ $width }) => ($width ? `${$width}px` : '100%')};
  min-width: 16px;
  text-align: ${({ $side = 'left', $isFullWidth = false }) =>
    $side === 'left' || $isFullWidth ? 'left' : 'right'};
`;

export const FormFieldLabel = styled(FormFieldLabelBase)`
  ${srOnlyBase}
`;

export const InputFieldsContainer = styled.div<InputFieldsContainerProps>`
  margin-top: 8px;
  justify-content: space-between;
  align-items: end;
  gap: 8px;
  display: grid;
  grid-auto-flow: ${({ fullWithRangeInputs }) => (fullWithRangeInputs ? 'row' : 'column')};
  grid-auto-columns: ${({ fullWithRangeInputs }) => (fullWithRangeInputs ? '1fr' : 'auto')};

  ${({ replaceHintValueWithInput = {}, hasInputField, $type }) => {
    const { left, right } = replaceHintValueWithInput;
    if (hasInputField && $type === 'simple') {
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
    grid-column: ${({ hasHints: hasHintValues, $type }) =>
      hasHintValues && $type === 'simple' ? '2 / 3' : 'auto'};
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
          grid-column: 2 / 4;
        `;
      }
      return null;
    }}
  }

  ${Hint}:first-of-type {
    grid-column: ${({ hasInputField, $type }) => (hasInputField && $type === 'simple' ? '1 / 2' : 'auto')};
    grid-row: 1 / 2;
    visibility: ${({ replaceHintValueWithInput }) => (replaceHintValueWithInput.left ? 'hidden' : 'initial')};
  }

  ${Hint}:last-of-type {
    grid-column: ${({ hasInputField, $type }) => (hasInputField && $type === 'simple' ? '3 / 4' : 'auto')};
    grid-row: 1 / 2;
    visibility: ${({ replaceHintValueWithInput }) =>
      replaceHintValueWithInput.right ? 'hidden' : 'initial'};
  }
`;

export const StyledSlider = styled.input<{ $type: SliderType }>`
  ${removeDefaultStyles};

  &::-webkit-slider-thumb {
    ${removeDefaultStyles}
    ${defaultThumb}
  }

  height: 0;
  pointer-events: ${({ $type }) => ($type === 'simple' ? 'auto' : 'none')};
  position: absolute;
  z-index: 3;

  &::-moz-range-thumb {
    ${defaultThumb}
  }

  /***** Focus Styles *****/
  &:focus {
    outline: none;
  }

  &:focus-visible::-webkit-slider-thumb {
    ${focusOutlineThumb}
  }

  &:focus-visible::-moz-range-thumb {
    ${focusOutlineThumb}
  }

  /***** Hover Styles *****/
  &:hover:enabled::-webkit-slider-thumb {
    ${hoverThumb}
  }

  &:hover:enabled::-moz-range-thumb {
    ${hoverThumb}
  }

  /***** Disabled Styles *****/
  &:disabled::-webkit-slider-thumb {
    ${disabledThumb}
  }

  &:disabled {
    opacity: 1; // to keep the thumb opaque in Safari iOS (16) Do not move to ":disabled::-webkit-slider-thumb"
  }

  &:disabled::-moz-range-thumb {
    ${disabledThumb}
  }

  /***** Active Styles *****/
  &:active:enabled::-webkit-slider-thumb {
    ${activeThumb}
  }

  &:active:enabled::-moz-range-thumb {
    ${activeThumb}
  }
`;

type SliderWrapperProps = {
  size: FormFieldSizes;
  isLeftSliderOnTop: boolean;
};

export const SliderWrapper = styled.div<SliderWrapperProps>`
  align-items: center;
  display: flex;
  height: 52px;
  position: relative;
  padding: 12px 0 4px 0;

  ${({ size }) =>
    size === 'small' &&
    css`
      height: 36px;
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
  ({ $type, trackWidth, rangeTrackWidth }) => ({
    style: {
      left: $type === 'range' ? `${trackWidth}px` : undefined,
      width: $type === 'simple' ? `${trackWidth}px` : `${rangeTrackWidth}px`,
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
