import { getThemeColor } from '@elvia/elvis-colors';
import styled, { keyframes } from 'styled-components';

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
`;

export const FormFieldError = styled.span`
  color: ${getThemeColor('text-1')};
  font-family: 'Red Hat Text', Verdana, sans-serif;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* ≈ 140% */
  white-space: nowrap;
`;
