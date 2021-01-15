import * as React from 'react';
import Slider from '@material-ui/core/Slider';
import { withStyles } from '@material-ui/core/styles';
import './style.scss';
import { useState, useEffect } from 'react';

// style override of default react ui slider
// TODO: check if we can do this in a more elequent way ;)
// YESYESYEYS THIS EXIST! : https://material-ui.com/api/slider/#css
// create classes and send them in with classnames to the classes prop to react ui slider
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
      backgroundColor: '#29d305',
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
    <div>
      <ElvisSlider
        value={rangeValue}
        onChange={handleChange}
        disabled={isDisabled}
        min={minValue}
        max={maxValue}
        step={step}
        name={name}
        aria-labelledby="continuous-slider"
      ></ElvisSlider>
    </div>
  );
};

export default ElviaSlider;
