import styled, { css } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TooltipPopup as TooltipPopupBase } from '@elvia/elvis-toolbox';
export { TooltipPopupProps } from '@elvia/elvis-toolbox';
import { TooltipPopupSides, SliderType } from './elvia-slider.types';

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

//#region Slider + Slider pseudo elements
const REMOVE_DEFAULT_STYLES = css`
  -moz-box-shadow: none;
  -webkit-appearance: none;
  -webkit-box-shadow: none;
  -webkit-tap-highlight-color: transparent;
  box-shadow: none;
  margin: 0;
  padding: 0;
`;

const THUMB = css`
  background-color: ${getColor('black')};
  border-radius: 50%;
  border: solid 1.5px ${getColor('white')};
  cursor: pointer;
  height: 17px;
  opacity: 1;
  pointer-events: all;
  position: relative;
  transition-duration: 0.15s;
  transition-property: height, width;
  width: 17px;
  z-index: 3;

  @media (hover: none) and (pointer: coarse) {
    height: 25px;
    width: 25px;
    border: solid 2px ${getColor('white')};
  }
`;

const ACTIVE_THUMB = css`
  cursor: -webkit-grabbing;
  background-color: ${getColor('green')};
  border: solid 1px ${getColor('white')};
  cursor: grabbing;
`;

const FOCUS_OUTLINE_THUMB = css`
  outline: 3px solid #0064fa;
  outline-offset: 1px;
`;

const HOVER_THUMB = css`
  border: solid 1px ${getColor('white')};
  height: 20px;
  width: 20px;
`;

const DISABLED_THUMB = css`
  cursor: -webkit-not-allowed;
  background-color: ${getColor('grey-30')};
  border: solid 1.5px ${getColor('white')};
  cursor: not-allowed;
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
  width: ${(props) => Math.max(props.label.length, props.max.toString().length) + 2}ch;

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

//Styling the helpVales and the inputs
export const InputFieldsContainer = styled.div<InputFieldsContainerProps>`
  display: grid;
  grid-auto-flow: column;
  gap: 8px;
  align-items: baseline;
  justify-items: stretch;

  ${(props) => {
    return !props.leftInputPriority ? 'grid-auto-columns: 1fr;' : ''; //Keep all columns the same width, used to center the input field.
  }}

  p:first-child {
    text-align: left;
    grid-column: 1 / 2;
    grid-row: 1 / 2;
    ${(props) => {
      return props.leftInputPriority ? 'visibility: hidden;' : '';
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

  ${(props) => {
    return props.isDisabled
      ? css`
          user-select: none;
        `
      : '';
  }}
  ${getTypographyCss('text-sm')}
  color: ${getColor('placeholder')};
  color: ${getColor('disabled')};
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
    z-index: ${(props) => (props.leftOnTop ? 5 : 3)};
  }
`;

export const StyledSlider = styled.input.attrs(() => ({
  type: 'range',
}))<StyledSliderProps>`
  ${REMOVE_DEFAULT_STYLES}

  ::-webkit-slider-thumb {
    ${REMOVE_DEFAULT_STYLES}
  }

  height: 0;
  pointer-events: ${(props) => (props.sliderType === 'simple' ? 'auto' : 'none')};
  position: absolute;
  transition-duration: 3s;
  z-index: 3;

  ::-webkit-slider-thumb {
    ${THUMB};
  }

  ::-moz-range-thumb {
    ${THUMB}
  }

  /***** Active Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  :active:enabled::-webkit-slider-thumb {
    ${ACTIVE_THUMB}
  }

  /******** Firefox ********/
  :active:enabled::-moz-range-thumb {
    ${ACTIVE_THUMB}
  }

  /***** Focus Styles *****/
  /* Removes default focus */
  :focus {
    outline: none;
  }

  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  :focus-visible::-webkit-slider-thumb {
    ${FOCUS_OUTLINE_THUMB}
  }

  /******** Firefox ********/
  :focus-visible::-moz-range-thumb {
    ${FOCUS_OUTLINE_THUMB}
  }

  /***** Hover Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  :hover:enabled::-webkit-slider-thumb {
    ${HOVER_THUMB}
  }

  /******** Firefox ********/
  :hover:enabled::-moz-range-thumb {
    ${HOVER_THUMB}
  }

  /***** Disabled Styles *****/
  /***** Chrome, Safari, Opera, and Edge Chromium *****/
  :disabled::-webkit-slider-thumb {
    ${DISABLED_THUMB}
  }

  /* to keep the thumb opaque in Safari iOS (16) Do not move to ":disabled::-webkit-slider-thumb"  */
  :disabled {
    -webkit-opacity: 1;
    opacity: 1;
  }

  /******** Firefox ********/
  :disabled::-moz-range-thumb {
    ${DISABLED_THUMB}
  }

  @media (hover: none) and (pointer: coarse) {
    :active:enabled::-webkit-slider-thumb {
      ${ACTIVE_THUMB}
      height: 28px;
      width: 28px;
    }

    /******** Firefox ********/
    :active:enabled::-moz-range-thumb {
      ${ACTIVE_THUMB}
      height: 28px;
      width: 28px;
    }
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

export const SliderFilledTrack = styled.div.attrs<SliderFilledTrackProps>((props) => ({
  style: {
    left: props.type === 'range' ? `${props.trackWidth}px` : undefined,
    width: props.type === 'simple' ? `${props.trackWidth}px` : `${props.rangeTrackWidth}px`,
  },
}))<SliderFilledTrackProps>`
  background-color: ${({ isDisabled }) => (isDisabled ? getColor('grey-30') : getColor('black'))};
  border-radius: 50px;
  height: 5px;
  position: absolute;
  z-index: 2;
`;

interface TooltipWrapperProps {
  side: TooltipPopupSides;
}

export const TooltipWrapper = styled.div<TooltipWrapperProps>`
  position: absolute;
  transform: ${(props) => (props.side === 'left' ? 'translateX(-50%)' : 'translateX(50%)')};
  top: -46px;
`;

export const TooltipPopup = styled(TooltipPopupBase)`
  max-width: unset;
  position: relative;
`;

/*
Note that while we’re repeating code in this file, that’s necessary as you can’t comma-separate the sliders pseudo elements type of selectors. 
Browsers will drop the entire selector if it doesn’t understand a part of it.

https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
*/
