import { FormFieldSizes } from '@elvia/elvis-toolbox';
import styled, { css } from 'styled-components';

interface DatepickerRangeWrapperProps {
  readonly isVertical: boolean;
  readonly isFullWidth: boolean;
  readonly size?: FormFieldSizes;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ size }) => (size === 'small' ? '8px' : '16px')};

  @media (max-width: 767px) {
    flex-direction: column;
  }

  ${({ isVertical }) =>
    isVertical &&
    css`
      flex-direction: column;

      ${RowContainer} {
        flex-wrap: wrap;
      }
    `};

  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;

      ${RowContainer} {
        flex: 1;
        width: 100%;
      }
    `};
`;

export const RowContainer = styled.div<{ size?: FormFieldSizes }>`
  display: flex;
  gap: 0 ${({ size }) => (size === 'small' ? '4px' : '8px')};
  align-items: flex-end;
`;
