import styled, { css } from 'styled-components';

interface DatepickerRangeWrapperProps {
  readonly isVertical: boolean;
  readonly isFullWidth: boolean;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  width: ${(props) => (props.isFullWidth ? '100%' : 'auto')};
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
    `}
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 0 16px;
  align-items: flex-end;
`;
