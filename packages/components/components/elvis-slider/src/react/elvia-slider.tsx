import * as React from 'react';
import './style.scss';
import Slider from '@material-ui/core/Slider';
import { useState, useEffect } from 'react';
import classnames from 'classnames';

export interface SliderProps {
  value: number | number[];
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

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  // Updating selected value
  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [rangeValue]);

  useEffect(() => {
    componentWillReceiveProps(value);
    handleChange;
  }, [value]);

  // for handling new value props from input fields
  const componentWillReceiveProps = (newValue: any) => {
    setValue(newValue);
  };

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
