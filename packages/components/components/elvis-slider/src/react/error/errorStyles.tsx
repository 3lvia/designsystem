import { getColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import styled, { keyframes } from 'styled-components';

export const colors = {
  error: getColor('error'),
};

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const ErrorContainer = styled.div`
  animation: ${fadeIn} 200ms;
  display: flex;
  gap: 8px;
  margin: 8px 0;
  width: 100%;
  position: absolute;
`;

export const ErrorText = styled.span`
  ${getTypographyCss('text-micro')};
  color: ${colors.error};
`;
