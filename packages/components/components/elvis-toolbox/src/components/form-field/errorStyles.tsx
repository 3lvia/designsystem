import { getThemeColor } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';

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

export const FormFieldErrorContainer = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  gap: 8px;
  align-items: center;
  animation: ${fadeIn} 200ms;
  margin-top: 2px;
`;

export const FormFieldError = styled.span`
  ${getTypographyCss('text-sm')};
  color: ${getThemeColor('text-1')};
  white-space: nowrap;
`;
