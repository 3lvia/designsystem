import * as React from 'react';
import { useEffect, useRef } from 'react';
import './style.scss';
import classnames from 'classnames'

export interface ProgressbarProps {
  range_value?: number;
  indeterminate?: boolean ;
  error?: boolean;
}
// validate if progressrange is between 0 & 100
const isValid = (value: number) => value >= 0 && value <= 100 ;

const ProgressLinear: React.FC<ProgressbarProps> = (props) => {
  // check indeterminate props in case from webcomponent, convert string to boolean
  // TODO: check stringified inputs from webcomponent in wrapper.
  let isIndeterminate = false;
  if (props.indeterminate !== null) {
    if (props.indeterminate !== undefined) {
      if (props.indeterminate.toString() === 'false') {
        isIndeterminate = false;
      } else {
        isIndeterminate = props.indeterminate;
      }
    }
  }
  // // check error props in case from webcomponent, convert string to boolean
  let isError = false;
  if (props.error !== null) {
    if (props.error !== undefined) {
      if (props.error.toString() === 'false') {
        isError = false;
      } else {
        isError = props.error;
      }
    }
  }


  // check on props when webcomp stringified props are dealed with.
  const classes = classnames({
    ['ewc-progress-linear--range']: !isIndeterminate && !isError,
    ['ewc-progress-linear--indeterminate']: isIndeterminate &&  !isError,
    ['ewc-progress-linear--error']: isError,
  });

 // error handling on invalid input
  useEffect(() => {
    if (props.range_value !== undefined) {
      if (!isValid(props.range_value)){
        throw new Error('<elvis-progressbar>: inputRange value ' + props.range_value + ' is invalid! Must be between 0 and 100.');
      }
    }
  }, [props.range_value]);

  return (
    <span>
      <div className='ewc-progress-linear'>
          <div
            className={classes}
            style={{width: `${props.range_value === null ? 0 : props.range_value}%`}}
            ></div>
      </div>
    </span>
  );
};

export default ProgressLinear;
