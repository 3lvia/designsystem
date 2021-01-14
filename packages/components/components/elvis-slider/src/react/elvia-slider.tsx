import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import './style.scss';

export interface SliderInput {
  step?: number;
  min: number;
  max: number;
  // vurder type: string om det er andre ting enn numbers som kan brukes
}

export interface SliderProps {
  value: number | number[];
  // inputField?: SliderInput;
  valueOnChange?: (value: number | number[]) => void;
  webcomponent?: any;
}

const ElvisSlider = withStyles({
  root: {
    color: 'black',
    display: 'inline-block !important',
  },
  thumb: {
    height: 17,
    width: 17,
    backgroundColor: 'black',
    marginTop: -7,
    '&:hover': {
      boxShadow: 'none',
      height: 20,
      width: 20,
      marginTop: -8.5,
      backgroundColor: '#29d305',
      // Reset on touch devices, it doesn't add specificity
      // Todo, check hover states on tablets and phone
      '@media (hover: none)': {},
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#29d305',
    },
    '&:focus': {
      boxShadow: 'none',
    },
  },
  track: {
    height: 5,
    marginTop: -1,
    borderRadius: 25,
  },
  rail: {
    height: 3,
    backgroundColor: 'grey',
  },
})(Slider);

const ElviaSlider: React.FC<SliderProps> = ({ value, valueOnChange, webcomponent }) => {
  const [rangeValue, setValue] = useState(value);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  // Updating selected value
  useEffect(() => {
    updateReactComponent();
    updateWebcomponent();
  }, [rangeValue]);

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

  // useEffect(() => {
  //   setValue(value);
  // }, [value])

  // todo
  // - send date back
  // - states: disbaled, invalid ++
  // check react ui -API if there is more we want to offer in the elvia component.

  return (
    <div>
      <ElvisSlider
        value={rangeValue}
        onChange={handleChange}
        aria-labelledby="continuous-slider"
      ></ElvisSlider>
    </div>
  );
};

export default ElviaSlider;
