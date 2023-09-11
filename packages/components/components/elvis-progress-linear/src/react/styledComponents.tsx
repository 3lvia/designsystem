import styled, { css, keyframes } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { ProgressLinearSize } from './elvia-progress-linear.types';

const loading = keyframes`
	0% { width: 0; margin-left: 0; }
	15% { width: 15%; margin-left: 0; }
	85% { width: 15%; }
	100% { width: 0; margin-left: 100%; }
`;

type ProgressLinearWrapperProps = {
  $currSize: ProgressLinearSize;
};

export const ProgressLinearWrapper = styled.div<ProgressLinearWrapperProps>`
  display: flex;
  width: 100%;
  height: ${({ $currSize }) => ($currSize === 'medium' ? '8px' : '4px')};
  border-radius: 50px;
  background-color: ${getThemeColor('background-element-3')};
  margin: 0;
`;

type ProgressLinearProgressProps = {
  $isIndeterminate?: boolean;
  $isError?: boolean;
  $currSize?: ProgressLinearSize;
  $transitionDuration: string;
};

export const ProgressLinearProgress = styled.div<ProgressLinearProgressProps>`
  border-radius: 50px;
  align-self: center;
  height: ${({ $currSize }) => ($currSize === 'medium' ? '16px' : '8px')};
  margin-left: 0;
  background-color: ${({ $isError }) =>
    $isError ? getThemeColor('signal-danger') : getThemeColor('brand-accent')};
  transition: ${({ $isIndeterminate, $transitionDuration }) =>
    $isIndeterminate ? 'none' : `width ${$transitionDuration} ease-in;`};
  ${({ $isIndeterminate, $isError }) => decideProgressValue($isIndeterminate, $isError)};
  // Indeterminate
  ${({ $isIndeterminate, $isError }) =>
    $isIndeterminate && !$isError
      ? css`
          animation: ${loading} 1s infinite;
        `
      : 'animation: none;'}
`;

const decideProgressValue = (isIndeterminate?: boolean, isError?: boolean): string => {
  if (isError) {
    return 'width: 100% !important;';
  } else if (isIndeterminate) {
    return 'width: 15%;';
  } else {
    return '';
  }
};
