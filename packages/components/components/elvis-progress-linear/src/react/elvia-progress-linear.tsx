import React, { CSSProperties, FC } from 'react';
import './style.scss';
import classnames from 'classnames';

export interface ProgressbarProps {
  value: number;
  isIndeterminate: boolean;
  isError: boolean;
  className?: string;
  inlineStyle?: { [style: string]: CSSProperties };
}

const ProgressLinear: FC<ProgressbarProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  className,
  inlineStyle,
}) => {
  const classes = classnames({
    ['ewc-progress-linear--range']: !isIndeterminate && !isError,
    ['ewc-progress-linear--indeterminate']: isIndeterminate && !isError,
    ['ewc-progress-linear--error']: isError,
  });

  return (
    <div
      className={'ewc-progress-linear' + (className ? ' ' + className : '')}
      style={inlineStyle}
      data-testid="progress-wrapper"
    >
      <div className={classes} style={{ width: `${value}%` }} data-testid="progress-linear"></div>
    </div>
  );
};

export default ProgressLinear;
