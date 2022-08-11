import React, { CSSProperties, FC } from 'react';
import './style.scss';
import classnames from 'classnames';

export interface ProgressbarProps {
  value?: number;
  isIndeterminate?: boolean;
  isError?: boolean;
  className?: string;
  ariaValueText?: string;
  inlineStyle?: CSSProperties;
}

const ProgressLinear: FC<ProgressbarProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  ariaValueText,
  className,
  inlineStyle,
  ...rest
}) => {
  const classes = classnames({
    ['ewc-progress-linear--range']: !isIndeterminate && !isError,
    ['ewc-progress-linear--indeterminate']: isIndeterminate && !isError,
    ['ewc-progress-linear--error']: isError,
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
      <div className={'ewc-progress-linear'}>
        <div className={classes} style={{ width: `${value}%` }} data-testid="progress-linear"></div>
      </div>
    </div>
  );
};

export default ProgressLinear;
