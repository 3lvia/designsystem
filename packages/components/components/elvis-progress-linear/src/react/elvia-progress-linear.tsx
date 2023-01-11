import React, { FC } from 'react';
import { ProgressLinearProps } from './elvia-progress-linear.types';
import { ProgressLinearWrapper, ProgressLinearProgress } from './styledComponents';

const ProgressLinear: FC<ProgressLinearProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  ariaValueText,
  size = 'small',
  ariaRole = 'progressbar',
  ariaLabel,
  componentId,
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
      role={ariaRole}
      id={componentId}
      aria-label={ariaLabel ?? 'Progresjon'}
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
