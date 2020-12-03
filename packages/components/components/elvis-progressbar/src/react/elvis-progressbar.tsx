import * as React from 'react';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './style.scss';

export interface ProgressbarProps {
  rangeValue: number;
  indeterminate?: boolean;
  error?: boolean;
  changeHandler?: any;
  webcomponent?: any;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value >= 0 && value <= 100;

const Progressbar: React.FC<ProgressbarProps> = forwardRef((props, ref: any) => {
  // inital state
  const [percentRange, setProgress] = useState(0);
  const classes = [
    props.indeterminate === false || props.indeterminate === null || props.indeterminate === undefined  && props.error === false || props.error === null || props.error === undefined  ? 'ewc-progress--linear__range' : '',
    props.indeterminate && props.error === false || props.indeterminate && props.error === null ? 'ewc-progress--linear--indeterminate' : '',
    props.error ? 'ewc-progress--linear--error' : '' 
  ].join(' ');
  const didMountRef = useRef(false);


  useEffect(() => {
    // Adding font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Red+Hat+Text:wght@400;500&display=swap';
    link.rel = 'stylesheet';
    link.type = 'text/css';
    document.head.appendChild(link);
  });

  const updateRangeValue = (progressInput: number | undefined) => {

    if(progressInput !== undefined) {
      if(!isValid(progressInput)) {
        console.error('<elvis-progressbar>: inputRange value ' + props.rangeValue + ' is invalid! Must be between 0 and 100.')
      } else {
        setProgress(progressInput)
      }
    }
  }

  useEffect(() => {
    updateRangeValue(props.rangeValue)
  }, [props.rangeValue] )

  useEffect(() => {
    updateRangeValue(props.rangeValue)
    updateReactComponent(),
    updateWebcomponent()
  }, [percentRange])



  function updateReactComponent() {
    if(!props.webcomponent && props.changeHandler) {
      // Small hack temporarily, because state not reflected correct on mount making infinite loop
      if(didMountRef.current) {
        props.changeHandler(true);
        didMountRef.current = true;
      } else {
        props.changeHandler(percentRange)
      }
    }
  }

  function updateWebcomponent() {
    if (props.webcomponent) {
      // True -> Prevents rerender
      props.webcomponent.setProps({ rangeValue : percentRange })
    }
  }


 useImperativeHandle(ref, () => {
     return {
      updateRangeValue: updateRangeValue,
     }
  });

  return (
    <span ref={ref}>
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
