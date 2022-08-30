import React, { CSSProperties, FC } from 'react';
import { ProgressLinearSize } from './elvia-progress-linear.types';
import { ProgressLinearWrapper, ProgressLinearProgress } from './styledComponents';

export interface ProgressLinearProps {
  value?: number;
  isIndeterminate?: boolean;
  isError?: boolean;
  ariaValueText?: string;
  size?: ProgressLinearSize;
  className?: string;
  inlineStyle?: CSSProperties;
}

const ProgressLinear: FC<ProgressLinearProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  ariaValueText,
  size = 'small',
  className,
  inlineStyle,
  ...rest
}) => {
  return (
    <ProgressLinearWrapper
      currSize={size}
      style={inlineStyle}
      data-testid="progress-wrapper"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={ariaValueText ? ariaValueText : 'Progresjonen er nå på ' + value + '%.'}
      className={className ? className : ''}
      {...rest}
    >
      <ProgressLinearProgress
        isIndeterminate={isIndeterminate}
        isError={isError}
        currSize={size}
        style={{ width: `${value}%` }}
        data-testid="progress-linear-progress"
      ></ProgressLinearProgress>
    </ProgressLinearWrapper>
  );
};

export default ProgressLinear;
