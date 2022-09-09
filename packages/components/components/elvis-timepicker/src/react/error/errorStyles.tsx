import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { keyframes } from 'styled-components';

export const colors = {
  disabled: getColor('error'),
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ErrorContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  animation: ${fadeIn} 200ms;
`;

interface ErrorTextProps {
  isCompact: boolean;
}

export const ErrorText = styled.span<ErrorTextProps>`
  ${getTypographyCss('text-sm')}
  white-space: nowrap;

  ${(props) => {
    if (props.isCompact) {
      return getTypographyCss('text-micro');
    }
    return '';
  }}
`;
