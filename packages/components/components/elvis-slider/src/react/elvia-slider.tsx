import * as React from 'react';
import './style.scss';

export interface SliderProps {
  test: string;
}

const Slider: React.FC<SliderProps> = ({ test }) => {

  return (
    <span>
      <h2>TESTING SLIDER</h2>
      <div>{test}</div>
    </span>
  );
};

export default Slider;
