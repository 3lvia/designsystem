import styled, { css, keyframes } from 'styled-components';
import { getColor } from '@elvia/elvis-colors';
import { ProgressLinearSize } from './elvia-progress-linear.types';

export const colors = {
  Grey10: getColor('grey-10'),
  ElviaCharge: getColor('elvia-charge'),
  Red: getColor('red'),
};
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
  height: ${(props: { currSize: ProgressLinearSize }) => (props.currSize === 'medium' ? '8px' : '4px')};
  border-radius: 50px;
  background-color: ${colors.Grey10};
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
  height: ${(props: { currSize?: ProgressLinearSize }) => (props.currSize === 'medium' ? '16px' : '8px')};
  margin-left: 0;
  background-color: ${(props: { isError?: boolean }) => (props.isError ? colors.Red : colors.ElviaCharge)};
  transition: ${(props: { isIndeterminate?: boolean }) =>
    props.isIndeterminate ? 'none' : 'width 0.3s ease-in;'};
  ${(props: { isIndeterminate?: boolean; isError?: boolean }) =>
    decideProgressValue(props.isIndeterminate, props.isError)};
  // Indeterminate
  ${(props: { isIndeterminate?: boolean; isError?: boolean }) =>
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
