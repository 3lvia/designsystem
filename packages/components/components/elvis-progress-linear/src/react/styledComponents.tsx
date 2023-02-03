import styled, { css, keyframes } from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
import { ProgressLinearSize } from './elvia-progress-linear.types';

const loading = keyframes`
	0% { width: 0%; margin-left: 0%; }
	15% { width: 15%; margin-left: 0%; }
	85% { width: 15%; }
	100% { width: 0; margin-left: 100%; }
`;

type ProgressLinearWrapperProps = {
  currSize: ProgressLinearSize;
};

export const ProgressLinearWrapper = styled.div<ProgressLinearWrapperProps>`
  display: flex;
  width: 100%;
  height: ${(props) => (props.currSize === 'medium' ? '8px' : '4px')};
  border-radius: 50px;
  background-color: ${getThemeColor('background-accent')};
  margin: 0;
`;

type ProgressLinearProgressProps = {
  isIndeterminate?: boolean;
  isError?: boolean;
  currSize?: ProgressLinearSize;
};

export const ProgressLinearProgress = styled.div<ProgressLinearProgressProps>`
  border-radius: 50px;
  align-self: center;
  height: ${(props) => (props.currSize === 'medium' ? '16px' : '8px')};
  margin-left: 0;
  background-color: ${(props) => (props.isError ? getThemeColor('state-error') : getThemeColor('state-on'))};
  transition: ${(props) => (props.isIndeterminate ? 'none' : 'width 0.3s ease-in;')};
  ${(props) => decideProgressValue(props.isIndeterminate, props.isError)};
  // Indeterminate
  ${(props) =>
    props.isIndeterminate && !props.isError
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
