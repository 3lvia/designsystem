import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  grey10: getColor('grey-10'),
  grey20: getColor('grey-20'),
  grey30: getColor('grey-30'),
  grey90: getColor('grey-90'),
};

type StylesSliderProps = {
  sliderType: string;
};

type SliderFilledTrackProps = {
  trackWidth: string;
  sliderType: string;
  rangeTrackWidth: string;
  disabled: boolean;
};

const REMOVE_DEFAULT_STYLES = `
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  margin: 0;
  padding: 0;
`;

const THUMB = `
  background-color: ${colors.elviaBlack};
  border: solid 1.5px ${colors.elviaWhite};
  border-radius: 50%;
  cursor: pointer;
  height: 17px;
  width: 17px;
  pointer-events: all;
  position: relative;
  transition-property: height, width;
  transition-duration: .15s;
  z-index: 3;

  @media (hover: none) and (pointer: coarse) {
    border: solid 2px ${colors.elviaWhite};
    height: 25px;
    width: 25px;
}
`;

const ACTIVE_THUMB = `
background-color: ${colors.elviaCharge};
border: solid 1px ${colors.elviaWhite};
cursor: -webkit-grabbing;
cursor: grabbing;
  `;

const FOCUS_OUTLINE_THUMB = `
outline: 3px solid #0064fa;
outline-offset: 1px;
  `;

const HOVER_THUMB = `
border: solid 1px ${colors.elviaWhite};
height: 20px;
width: 20px;
`;

const DISABLED_THUMB = `
background-color: ${colors.grey30};
border: solid 1.5px ${colors.elviaWhite};
cursor: -webkit-not-allowed;
cursor: not-allowed;
`;

export const SliderWrapper = styled.div`
  align-items: center;
  display: flex;
  position: relative;

  > * {
    width: 100%;
  }
`;

export const StyledSlider = styled.input<StylesSliderProps>`
  /* remove default styles */
  ${REMOVE_DEFAULT_STYLES}

  ::-webkit-slider-thumb {
    ${REMOVE_DEFAULT_STYLES}
  }

  pointer-events: none;
  position: absolute;
  height: 0;
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
`;

export const SliderTrack = styled.div`
  position: absolute;
  border-radius: 50px;
  height: 3px;
  background-color: ${colors.grey20};
  width: 100%;
  z-index: 1;
`;
export const SliderFilledTrack = styled.div<SliderFilledTrackProps>`
  position: absolute;
  border-radius: 50px;
  height: 5px;
  background-color: ${colors.elviaBlack};
  background: ${(props) => (props.disabled ? colors.grey30 : colors.elviaBlack)};
  width: ${(props) => (props.sliderType === 'simple' ? props.trackWidth : props.rangeTrackWidth)};
  z-index: 2;

  left: ${(props) => props.sliderType === 'range' && props.trackWidth};
`;

/*
Note that while we’re repeating code here, that’s necessary as you can’t comma-separate these type of selectors. 
Browsers will drop the entire selector if it doesn’t understand a part of it.

https://css-tricks.com/styling-cross-browser-compatible-range-inputs-css/
*/
