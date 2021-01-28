import React, { useState, useEffect } from 'react';
import './style.scss';
import Slider from '@material-ui/core/Slider';
import classnames from 'classnames';
import toolbox from '@elvia/elvis-toolbox';

export interface SliderProps {
  value: number | number[];
  inputValue: number | number[];
  step: number;
  name: string;
  minValue: number;
  maxValue: number;
  isDisabled: boolean;
  valueOnChange?: (value: number | number[]) => void;
  webcomponent?: any;
}

const ElviaSlider: React.FC<SliderProps> = ({
  value,
  inputValue,
  step,
  name,
  minValue,
  maxValue,
  isDisabled,
  valueOnChange,
  webcomponent,
}) => {
  const classes = classnames(['ewc-elvis-slider']);

  const [rangeValue, setValue] = useState(value);

  // Updating selected value
  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [rangeValue]);

  // OLD = TODO: make slider update on other way than on value, creates too many rerenders in some cases
  // New solution: seperated value and external input values. Now only updates prop value on input changes.
  useEffect(() => {
    setValue(inputValue);
    console.log('I RAN!');
  }, [inputValue]);

  const onSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  // throttling to ease some of the renders on sliderchange
  const handleChange = toolbox.throttle(onSliderChange, 10);
  function updateReactComponent() {
    if (!webcomponent && valueOnChange) {
      valueOnChange(rangeValue);
    }
  }

  function updateWebcomponent() {
    if (webcomponent) {
      // True -> Prevents rerender
      webcomponent.setProps({ value: rangeValue }, true);
    }
  }

  return (
    <div className={classes}>
      <Slider
        value={rangeValue}
        onChange={handleChange}
        disabled={isDisabled}
        min={minValue}
        max={maxValue}
        step={step}
        name={name}
        aria-labelledby="continuous-slider"
      ></Slider>
    </div>
  );
};

export default ElviaSlider;
