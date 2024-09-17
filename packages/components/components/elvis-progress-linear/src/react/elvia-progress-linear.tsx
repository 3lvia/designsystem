import { useLanguage } from '@elvia/elvis-toolbox';
import React, { FC, useEffect, useState } from 'react';

import { ProgressLinearProps } from './elvia-progress-linear.types';
import { ProgressLinearProgress, ProgressLinearWrapper } from './styledComponents';

export const ProgressLinear: FC<ProgressLinearProps> = ({
  value = 0,
  isIndeterminate,
  isError,
  ariaValueText,
  size = 'medium',
  ariaRole = 'progressbar',
  ariaLabel,
  componentId,
  transitionDuration = '300ms',
  className,
  inlineStyle,
  ...rest
}) => {
  const lang = useLanguage();

  return (
    <ProgressLinearWrapper
      $size={size}
      style={inlineStyle}
      data-testid="progress-wrapper"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      role={ariaRole}
      id={componentId}
      aria-label={ariaLabel ?? (lang === 'no' ? 'Progresjon' : 'Progress')}
      aria-valuetext={ariaValueText ?? (lang === 'no' ? 'Progresjonen er nå på ' : 'The progress is now at ')}
      className={className ?? ''}
      {...rest}
    >
      <ProgressLinearProgress
        isIndeterminate={isIndeterminate}
        isError={isError}
        $size={size}
        style={{ width: `${value}%` }}
        data-testid="progress-linear-progress"
        transitionDuration={transitionDuration}
      ></ProgressLinearProgress>
    </ProgressLinearWrapper>
  );
};

export default ProgressLinear;
