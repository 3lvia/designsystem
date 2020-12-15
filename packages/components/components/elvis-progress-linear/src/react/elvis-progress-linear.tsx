import * as React from 'react';
import './style.scss';
import classnames from 'classnames'

export interface ProgressbarProps {
  value: number;
  isIndeterminate: boolean ;
  isError: boolean;
}

const ProgressLinear: React.FC<ProgressbarProps> = ({ value , isIndeterminate , isError }) => {
  const classes = classnames({
    ['ewc-progress-linear--range']: !isIndeterminate && !isError,
    ['ewc-progress-linear--indeterminate']: isIndeterminate &&  !isError,
    ['ewc-progress-linear--error']: isError,
  });

  return (
      <div className='ewc-progress-linear'>
          <div
            className={classes}
            style={{width: `${value}%`}}
            ></div>
      </div>
  );
};

export default ProgressLinear;
