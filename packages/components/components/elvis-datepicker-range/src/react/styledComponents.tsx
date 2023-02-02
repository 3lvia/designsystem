import styled, { css } from 'styled-components';

interface DatepickerRangeWrapperProps {
  readonly isVertical: boolean;
  readonly isFullWidth: boolean;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 16px;

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
      ${RowContainer} {
        flex: 1;
        width: 100%;
      }
    `};
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 0 8px;
  align-items: flex-end;
`;
