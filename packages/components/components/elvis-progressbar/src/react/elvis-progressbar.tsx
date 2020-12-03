import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './style.scss';

export interface ProgressbarProps {
  rangeValue: number;
  indeterminate?: boolean;
  error?: boolean;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value >= 0 && value <= 100;

const Progressbar: React.FC<ProgressbarProps> = forwardRef((props, ref: any) => {
  // inital state
  const [percentRange, setProgress] = useState(0);
  const progressRef = useRef(null);
    const classes = [
    props.indeterminate === false && props.error === false ? 'ewc-progress--linear__range' : '',
    props.indeterminate && props.error === false ? 'ewc-progress--linear--indeterminate' : '',
    props.error ? 'ewc-progress--linear--error' : '' ].join(' ');


  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  });

  const updateRangeValue = () => {
    if(props.rangeValue !== undefined) {

      if(!isValid(props.rangeValue)) {
        console.error('<elvis-progressbar>: inputRange value ' + props.rangeValue + ' is invalid! Must be between 0 and 100.')
        return;
      } else {
        setProgress(props.rangeValue)
      }
    }
  }

  useEffect(() => {
      updateRangeValue();
  }, [props.rangeValue])




 useImperativeHandle(ref, () => {
     return {
      updateRangeValue: updateRangeValue,
     }
  });

  return (
    <span ref={progressRef}>
      <div className="ewc-progress--linear">
          <div 
            className={classes} 
            style={{width: `${percentRange}%`}}
            ></div>
      </div>
    </span>
  );
});

export default Progressbar;
