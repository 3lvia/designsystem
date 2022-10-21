import styled from 'styled-components';

interface DatepickerRangeWrapperProps {
  readonly isVertical: boolean;
  readonly isFullWidth: boolean;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) => (props.isVertical ? 'column' : 'row')};
  width: ${(props) => (props.isFullWidth ? '100%' : 'auto')};
  align-items: top;
  gap: 16px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
