import styled, { css } from 'styled-components';

import { getThemeColor, getShadow } from '@elvia/elvis-colors';
import { getTypographyCss } from '@elvia/elvis-typography';

export const OverlayContainer = styled.div`
  background-color: ${getThemeColor('background-overlay-1')};
  border-radius: 4px;
  box-shadow: ${getShadow('medium')};
  min-width: 304px;
`;

export const PopoverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 8px 24px;
  border-bottom: 1px solid ${getThemeColor('border-2')};
  margin-bottom: 8px;
`;

export const SelectedDateName = styled.div`
  ${getTypographyCss('text-md')};
  white-space: nowrap;

  &::first-letter {
    text-transform: capitalize;
  }

  // If no text content, insert empty before-element to ensure
  // element height still equals line-height
  &:empty::before {
    content: '';
    display: inline-block;
  }
`;

export const PopoverBody = styled.div`
  position: relative;
`;

export interface RotatingContainerProps {
  isRotated: boolean;
}

export const RotatingContainer = styled.div<RotatingContainerProps>`
  transition: transform 250ms ease;

  ${(props) =>
    props.isRotated &&
    css`
      transform: rotate(180deg);
    `}
`;
