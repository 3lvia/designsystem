import * as React from 'react';
import './style.scss';
import classnames from 'classnames'

export interface ProgressbarProps {
  rangeValue: number;
  indeterminate: boolean ;
  error: boolean;
}

const ProgressLinear: React.FC<ProgressbarProps> = (props) => {
  const classes = classnames({
    ['ewc-progress-linear--range']: !props.indeterminate && !props.error,
    ['ewc-progress-linear--indeterminate']: props.indeterminate &&  !props.error,
    ['ewc-progress-linear--error']: props.error,
  });

  return (
    <span>
      <div className='ewc-progress-linear'>
          <div
            className={classes}
            style={{width: `${props.rangeValue === null ? 0 : props.rangeValue}%`}}
            ></div>
      </div>
    </span>
  );
};

export default ProgressLinear;
