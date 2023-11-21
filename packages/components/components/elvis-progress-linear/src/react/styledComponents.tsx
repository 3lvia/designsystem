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
  $size: ProgressLinearSize;
};

const getBarHeight = (size: ProgressLinearSize) => {
  switch (size) {
    case 'large':
      return '8px';
    case 'medium':
      return '4px';
    case 'small':
      return '2px';
  }
};

export const ProgressLinearWrapper = styled.div<ProgressLinearWrapperProps>`
  display: flex;
  width: 100%;
  height: ${({ $size }) => getBarHeight($size)};
  border-radius: 50px;
  background-color: ${getThemeColor('background-element-3')};
  margin: 0;
`;

type ProgressLinearProgressProps = {
  isIndeterminate?: boolean;
  isError?: boolean;
  $size: ProgressLinearSize;
  transitionDuration: string;
};

const getProgressHeight = (size: ProgressLinearSize) => {
  switch (size) {
    case 'large':
      return '16px';
    case 'medium':
      return '8px';
    case 'small':
      return '4px';
  }
};

export const ProgressLinearProgress = styled.div<ProgressLinearProgressProps>`
  border-radius: 50px;
  align-self: center;
  height: ${({ $size }) => getProgressHeight($size)};
  margin-left: 0;
  background-color: ${({ isError }) => getThemeColor(isError ? 'signal-danger' : 'brand-accent')};
  transition: ${({ isIndeterminate, transitionDuration }) =>
    isIndeterminate ? 'none' : `width ${transitionDuration} ease-in;`};
  ${({ isIndeterminate, isError }) => decideProgressValue(isIndeterminate, isError)};

  ${({ isIndeterminate, isError }) =>
    isIndeterminate && !isError
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
