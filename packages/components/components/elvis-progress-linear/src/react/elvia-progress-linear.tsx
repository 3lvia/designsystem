import React, { CSSProperties, FC } from 'react';
import './style.scss';
import classnames from 'classnames';

export interface ProgressLinearProps {
  value?: number;
  isIndeterminate?: boolean;
  isError?: boolean;
  ariaValueText?: string;
  size?: 'medium' | 'large';
  className?: string;
  inlineStyle?: CSSProperties;
}

const ProgressLinear: FC<ProgressLinearProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  ariaValueText,
  size = 'medium',
  className,
  inlineStyle,
  ...rest
}) => {
  const classes = classnames('ewc-progress-linear', {
    ['ewc-progress-linear--range']: !isIndeterminate && !isError,
    ['ewc-progress-linear--indeterminate']: isIndeterminate && !isError,
    ['ewc-progress-linear--error']: isError,
    ['ewc-progress-linear--lg']: size === 'large',
  });

  return (
    <div
      className={className ? className : ''}
      style={inlineStyle}
      data-testid="progress-wrapper"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={ariaValueText ? ariaValueText : 'Progresjonen er nå på ' + value + '%.'}
      {...rest}
    >
      <div className={classes} data-testid="progress-linear">
        <div
          className="ewc-progress-linear__progress"
          style={{ width: `${value}%` }}
          data-testid="progress-linear-progress"
        ></div>
      </div>
    </div>
  );
};

export default ProgressLinear;
