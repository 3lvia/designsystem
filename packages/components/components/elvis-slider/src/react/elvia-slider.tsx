import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import React, { CSSProperties, useEffect, useState, useRef } from 'react';
import { SliderType } from './elvia-slider.types';
import { StyledSlider, SliderTrack, SliderWrapper, SliderFilledTrack } from './styledComponents';

export interface SliderProps {
  sliderType?: SliderType;
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
  min: number;
  max: number;
  disabled: boolean;
}

export const Slider: React.FC<SliderProps> = ({
  sliderType = 'simple',
  disabled = false,
  min,
  max,
  className,
  inlineStyle,
  webcomponent,
  ...rest
}) => {
  const sliderTitleRef = useRef<HTMLDivElement>(null);

  /* Setting the min and max values of the slider. */
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  /* Setting the state of the left and right values. */
  const [leftValue, setLeftValue] = useState(min + 20);
  const [rightValue, setRightValue] = useState(max - 20);

  useEffect(() => {
    // Web component - Placing slots at the right place
    if (!webcomponent) {
      return;
    }
    // Get slotted items from web component
    if (sliderTitleRef.current && webcomponent.getSlot('title')) {
      sliderTitleRef.current.innerHTML = '';
      sliderTitleRef.current.appendChild(webcomponent.getSlot('title'));
    }
  });

  /**
   * If the slider type is range, set the left value to the minimum of the value or the right value minus one.
   * Otherwise, set the left value to the value. Used to prevent the left value from being bigger than the right value.
   */
  /* ↓ Work in progress ↓ */
  const onLeftChange = ({ target: { value } }: any) => {
    if (sliderType === 'range') {
      setLeftValue(Math.min(value, rightValue - 1));
    } else {
      setLeftValue(value);
    }
  };

  /**
   * If the user enters a value that's less than the left value, set the right value to the left value plus one.
   * Used to prevent the right value from being smaller than the left value.
   */
  /* ↓ Work in progress ↓ */
  const onRightChange = ({ target: { value } }: any) => {
    setRightValue(Math.max(value, leftValue + 1));
    console.log(getRightPercent());
  };

  /* ↓ Work in progress ↓ */
  const getLeftPercent: () => string = () => {
    const percent = ((leftValue - minVal) / (maxVal - minVal)) * 100;
    return percent <= 50 ? `${Math.ceil(percent)}%` : `${Math.floor(percent)}%`;
  };

  const getRightPercent: () => string = () => {
    const percent = ((rightValue - maxVal) / (maxVal - minVal)) * -100;
    return percent <= 50 ? `${Math.ceil(percent)}%` : `${Math.floor(percent)}%`;
  };

  const getRangeTrackWidth: () => string = () => {
    const left = ((leftValue - minVal) / (maxVal - minVal)) * 100;
    const right = ((rightValue - maxVal) / (maxVal - minVal)) * -100;
    return `${100 - left - right}%`;
  };

  return (
    <>
      <SliderWrapper>
        {/* The actual HTML input type=range */}
        <StyledSlider
          sliderType={sliderType}
          type="range"
          min={minVal}
          max={maxVal}
          value={leftValue}
          onChange={onLeftChange}
          disabled={disabled}
        />
        {sliderType === 'range' && (
          <StyledSlider
            sliderType={sliderType}
            type="range"
            min={minVal}
            max={maxVal}
            value={rightValue}
            onChange={onRightChange}
            disabled={disabled}
          />
        )}

        {/* Our custom track */}
        <SliderTrack></SliderTrack>
        <SliderFilledTrack
          trackWidth={getLeftPercent()}
          sliderType={sliderType}
          rangeTrackWidth={getRangeTrackWidth()}
          disabled={disabled}
        ></SliderFilledTrack>
      </SliderWrapper>
      <p>The left value is: {leftValue}</p>
      {sliderType === 'range' && <p>The right value is: {rightValue}</p>}
    </>
  );
};

export default Slider;
