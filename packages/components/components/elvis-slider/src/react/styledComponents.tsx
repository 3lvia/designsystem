import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { TooltipPopupSides } from './elvia-slider.types';

//#region Helpers
const colors = {
  disabled: getColor('disabled'),
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  elviaWhite: getColor('white'),
  error: getColor('red'),
  grey20: getColor('grey-20'),
  grey30: getColor('grey-30'),
};

const typography = {
  textInput: getTypographyCss('text-sm'),
};
//#endregion

//#region Types
type StyledSliderProps = {
  sliderType: string;
};

type SliderFilledTrackProps = {
  disabled: boolean;
  rangeTrackWidth?: number;
  sliderType: string;
  trackWidth: number;
};

type NumberInputProps = {
  max: number;
};

type SliderWrapperProps = {
  leftOnTop: boolean;
};

type InputFieldsContainerProps = {
  sliderType: string;
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
  background-color: ${colors.elviaBlack};
  border-radius: 50%;
  border: solid 1.5px ${colors.elviaWhite};
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
    border: solid 2px ${colors.elviaWhite};
    height: 25px;
    width: 25px;
  }
`;

const ACTIVE_THUMB = css`
  background-color: ${colors.elviaCharge};
  border: solid 1px ${colors.elviaWhite};
  cursor: -webkit-grabbing;
  cursor: grabbing;
`;

const FOCUS_OUTLINE_THUMB = css`
  outline: 3px solid #0064fa;
  outline-offset: 1px;
`;

const HOVER_THUMB = css`
  border: solid 1px ${colors.elviaWhite};
  height: 20px;
  width: 20px;
`;

const DISABLED_THUMB = css`
  background-color: ${colors.grey30};
  opacity: 1;
  border: solid 1.5px ${colors.elviaWhite};
  cursor: -webkit-not-allowed;
  cursor: not-allowed;
`;
//#endregion

export const SliderContainer = styled.div`
  box-sizing: border-box;
  text-align: left;
  width: 100%;
`;

export const InputFieldsContainer = styled.div<InputFieldsContainerProps>`
  align-items: flex-start;
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  & > div:last-child {
    ${(props) => {
      if (props.sliderType === 'range') {
        return 'align-items: flex-end;';
      }
      return '';
    }}
  }
`;

export const LabelText = styled.div`
  background-color: ${colors.elviaWhite};
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 10px;
  font-weight: 500;
  line-height: 100%;
  margin-left: 7px;
  padding: 0 3px;
  position: absolute;
  text-transform: capitalize;
  top: -7px;
  z-index: 1;
`;

export const NumberInputContainer = styled.div`
  box-sizing: border-box;
  display: block;
  margin-top: 7px;
  position: relative;
  text-align: left;
`;

export const NumberInput = styled.input.attrs(() => ({
  inputMode: 'decimal',
  pattern: '[-]?[0-9]*',
  type: 'number',
}))<NumberInputProps>`
  ${typography.textInput}
  -moz-appearance: textfield;
  align-items: center;
  background-color: ${colors.elviaWhite};
  border-radius: 4px;
  border: 1px solid ${colors.elviaBlack};
  box-sizing: border-box;
  display: flex;
  max-width: 448px;
  min-height: 34px;
  min-width: 40px;
  padding: 4px 10px;
  position: relative;
  text-align: left;
  text-transform: unset;
  width: ${(props) => props.max && props.max.toString().length * 17}px;

  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  :focus {
    border: 2px solid ${colors.elviaCharge};
    padding: 3px 9px;
  }

  :disabled {
    border-color: ${colors.disabled};
    color: ${colors.disabled};
    cursor: not-allowed;
    user-select: none;
  }

  :disabled {
    border-color: ${colors.disabled};
    color: ${colors.disabled};
    cursor: not-allowed;
    user-select: none;
  }

  &[aria-invalid='true'] {
    border: 2px solid ${colors.error};
  }
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
  background-color: ${colors.grey20};
  border-radius: 50px;
  height: 3px;
  position: absolute;
  width: 100%;
  z-index: 1;
`;

export const SliderFilledTrack = styled.div.attrs<SliderFilledTrackProps>((props) => ({
  style: {
    left: props.sliderType === 'range' ? `${props.trackWidth}px` : undefined,
    width: props.sliderType === 'simple' ? `${props.trackWidth}px` : `${props.rangeTrackWidth}px`,
  },
}))<SliderFilledTrackProps>`
  background-color: ${(props) => (props.disabled ? colors.grey30 : colors.elviaBlack)};
  border-radius: 50px;
  height: 5px;
  position: absolute;
  z-index: 2;
`;

export const TooltipFadeIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
  `;

export const TooltipFadeOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`;

export interface TooltipPopupProps {
  position: 'top';
  fadeOut: boolean;
  side: TooltipPopupSides;
}

export const TooltipPopup = styled.div<TooltipPopupProps>`
  ${getTypographyCss('text-sm')}
  align-items: center;
  animation: ${TooltipFadeIn} 200ms 1ms forwards;
  background: ${colors.elviaBlack};
  border-radius: 0.25rem;
  color: ${colors.elviaWhite};
  display: flex;
  justify-content: center;
  max-width: min(350px, 96%);
  opacity: 0;
  padding: 0.5rem 0.625rem;
  position: absolute;
  top: -46px;
  user-select: none;

  transform: ${(props) => (props.side === 'left' ? 'translateX(-50%)' : 'translateX(50%)')};
  width: max-content;
  min-width: 1.5rem;

  &::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
  }

  ${(props) => {
    switch (props.position) {
      case 'top': {
        return css`
          transform-origin: center bottom;

          &::after {
            border-left: 6px solid transparent;
            border-right: 6px solid transparent;
            border-top: 6px solid ${colors.elviaBlack};
            top: 100%;
          }
        `;
      }
    }
  }}

  ${(props) => {
    if (props.fadeOut) {
      return css`
        animation: ${TooltipFadeOut} 200ms ease;
      `;
    }
    return '';
  }}
`;

/*
Note that while we’re repeating code in this file, that’s necessary as you can’t comma-separate the sliders pseudo elements type of selectors. 
Browsers will drop the entire selector if it doesn’t understand a part of it.

https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
*/
