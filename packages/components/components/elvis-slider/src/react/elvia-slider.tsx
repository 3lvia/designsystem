import React, { useState, useEffect, useRef } from 'react';
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
  value = 0,
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
  const [rangeValue, setValue] = useState(0);
  const sliderRef = useRef<HTMLElement>(null);

  console.log('value is :' + value);
  console.log('Inputvalue is :' + inputValue);

  //initate value and slider
  useEffect(() => {
    setValue(value);
  }, []);

  // Updating selected value
  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [rangeValue]);

  // listen to value changes from input fields. Seperated from value due to amount of rerenders if value is in dependecy array of useEffect
  useEffect(() => {
    if (inputValue) {
      setValue(inputValue);
    }
  }, [inputValue]);

  const onSliderChange = (event: React.ChangeEvent, newValue: number | number[]) => {
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
        ref={sliderRef}
        value={rangeValue}
        onChange={handleChange}
        disabled={isDisabled}
        min={minValue}
        max={maxValue}
        step={step}
        name={name}
        aria-labelledby="continuous-slider"
        valueLabelDisplay={'off'}
        marks={false}
      ></Slider>
    </div>
  );
};

export default ElviaSlider;
