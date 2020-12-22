import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';

import { useState, useEffect } from 'react';
import './style.scss';

export interface SliderProps {
  value: number | number[];
}

const ElvisSlider = withStyles({
  root: {
    color: 'black',
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
      '@media (hover: none)': {
      },
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#29d305',
    },
    '&:focus': {
      boxShadow: 'none',
    }

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

const ElviaSlider: React.FC<SliderProps> = ({ value }) => {

  const [rangeValue, setValue] = useState(value);

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(value);

  }, [value])

  // todo
  // - send date back
  // - states: disbaled, invalid ++
  // check react ui -API if there is more we want to offer in the elvia component. 


  return (
    <div>
      <ElvisSlider value={rangeValue} onChange={handleChange} aria-labelledby="continuous-slider"></ElvisSlider>
    </div>
  );
};

export default ElviaSlider;
