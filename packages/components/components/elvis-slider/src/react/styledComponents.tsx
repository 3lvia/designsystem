import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

//#region Types
type StyledSliderProps = {
  sliderType: SliderType;
};

type SliderFilledTrackProps = {
  isDisabled: boolean;
  rangeTrackWidth?: number;
  type: SliderType;
  trackWidth: number;
};

type NumberInputProps = {
  max: number;
  label: string;
};

type SliderWrapperProps = {
  leftOnTop: boolean;
};

type InputFieldsContainerProps = {
  leftInputPriority: boolean;
  type: SliderType;
  hasHintValues: boolean;
};

type HelperTextProps = {
  isDisabled: boolean;
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
  background-color: ${getColor('black')};
  border-radius: 50%;
  border: solid 1.5px ${getColor('white')};
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
    border: solid 2px ${getColor('white')};
    height: 24px;
    width: 24px;
  }
`;

const activeThumb = css`
  background-color: ${getColor('green')};
  border: solid 1px ${getColor('white')};
  cursor: grabbing;
  height: 20px;
  transition: background-color 0.1s;
  width: 20px;

  @media (hover: none) and (pointer: coarse) {
    border: solid 2px ${getColor('white')};
    height: 28px;
    width: 28px;
  }
`;

const hoverThumb = css`
  border: solid 1px ${getColor('white')};
  height: 20px;
  width: 20px;
`;

const disabledThumb = css`
  opacity: 1;
  background-color: ${getColor('grey-30')};
  border: solid 1.5px ${getColor('white')};
  cursor: not-allowed;
`;

const focusOutlineThumb = css`
  outline-offset: 1px;
  outline: 3px solid ${getColor('focus-outline')};
`;
//#endregion

export const SliderContainer = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: 112px;
  position: relative;
  margin-bottom: 24px;
`;

export const NumberInput = styled.input.attrs(() => ({
  inputMode: 'decimal',
  type: 'number',
  novalidate: true,
}))<NumberInputProps>`
  -moz-appearance: textfield;
  ${getTypographyCss('text-sm')}
  align-items: center;
  background-color: ${getColor('white')};
  border-radius: 4px;
  border: 1px solid ${getColor('black')};
  box-sizing: border-box;
  display: flex;
  max-width: 448px;
  min-height: 34px;
  min-width: 50px;
  padding: 4px 10px;
  position: relative;
  text-transform: unset;
  width: ${({ label, max }) => Math.max(label.length, max.toString().length) + 2}ch;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :focus {
    border: 2px solid ${getColor('green')};
    padding: 3px 9px;
  }

  :disabled {
    border-color: ${getColor('disabled')};
    color: ${getColor('disabled')};
    cursor: not-allowed;
    user-select: none;
  }

  &[aria-invalid='true'] {
    border: 2px solid ${getColor('red')};
  }
`;

export const SliderLabel = styled.label`
  display: flex;
`;

export const InputFieldsContainer = styled.div<InputFieldsContainerProps>`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  align-items: baseline;
  justify-items: stretch;

  ${({ leftInputPriority }) => {
    return !leftInputPriority ? 'grid-auto-columns: 1fr;' : ''; //Keep all columns the same width, used to center the input field.
  }}

  p:first-child {
    text-align: left;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    ${({ leftInputPriority }) => {
      return leftInputPriority ? 'visibility: hidden;' : '';
    }}
  }

  p:last-child {
    text-align: right;
    justify-self: end;
  }

  //the first number input field
  div:first-of-type {
    grid-row: 1 / 2;

    ${(props) => {
      if (props.leftInputPriority && props.type === 'simple') {
        return css`
          grid-column: 1 / 3;

          /* for aligning text text to the left */
          ${NumberInput} {
            text-align: left;
          }
          ${SliderLabel} {
            justify-content: flex-start;
          }
        `;
      } else if (props.type === 'simple' && props.hasHintValues) {
        return css`
          /* for aligning label text to the center */
          ${NumberInput} {
            text-align: center;
          }
          ${SliderLabel} {
            justify-content: center;
          }

          justify-self: center;
        `;
      }
      return '';
    }}
  }

  div:not(:first-child):last-child {
    /* for aligning label text to the right */
    ${NumberInput} {
      text-align: right;
    }
    ${SliderLabel} {
      justify-content: flex-end;
    }
    justify-self: end;
  }
`;

export const NumberInputContainer = styled.div`
  box-sizing: border-box;
  display: block;
  padding-top: 8px;
  position: relative;
  width: fit-content;
`;

export const LabelText = styled.div`
  box-sizing: border-box;
  background-color: ${getColor('white')};
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 100%;
  margin: 0 8px;
  padding: 0 2px;
  position: absolute;
  top: 0;
  user-select: none;
  z-index: 1;
  white-space: nowrap;
  border-bottom: 1px solid ${getColor('white')}; //to remove overflowing greenborder Safari iOS (16)
`;

export const HelpValue = styled.p<HelperTextProps>`
  display: inline;
  width: fit-content;
  margin: 0;
  ${getTypographyCss('text-sm')}
  color: ${getColor('placeholder')};

  ${({ isDisabled }) =>
    isDisabled &&
    css`
      color: ${getColor('disabled')};
      user-select: none;
    `}
`;

export const SliderWrapper = styled.div<SliderWrapperProps>`
  align-items: center;
  display: flex;
  height: 2rem;
  position: relative;

  input[type='range'] {
    width: 100%;
  }

  input[type='range']:first-child {
    z-index: ${({ leftOnTop }) => (leftOnTop ? 5 : 3)};
  }
`;

export const StyledSlider = styled.input.attrs(() => ({
  type: 'range',
}))<StyledSliderProps>`
  ${removeDefaultStyles}

  ::-webkit-slider-thumb {
    ${removeDefaultStyles}
  }

  height: 0;
  pointer-events: ${({ sliderType }) => (sliderType === 'simple' ? 'auto' : 'none')};
  position: absolute;
  transition-duration: 3s;
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

  }
`;

export const SliderTrack = styled.div`
  background-color: ${getColor('grey-20')};
  border-radius: 50px;
  height: 3px;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const SliderFilledTrack = styled.div.attrs<SliderFilledTrackProps>(
  ({ type, trackWidth, rangeTrackWidth }) => ({
    style: {
      left: type === 'range' ? `${trackWidth}px` : undefined,
      width: type === 'simple' ? `${trackWidth}px` : `${rangeTrackWidth}px`,
    },
  }),
)<SliderFilledTrackProps>`
  background-color: ${({ isDisabled }) => (isDisabled ? getColor('grey-30') : getColor('black'))};
  border-radius: 50px;
  height: 5px;
  position: absolute;
  z-index: 2;
`;

/**
 * Developer note: Repeating css in this file is necessary as comma-separating sliders pseudo-element selectors is not supported by browsers and may cause the entire selector to be dropped.
 * See: https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
 */
