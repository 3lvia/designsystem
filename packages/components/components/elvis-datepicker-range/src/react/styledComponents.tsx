import styled from 'styled-components';

interface DatepickerRangeWrapperProps {
  readonly isVertical: boolean;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  box-sizing: border-box;
  display: flex;
  flex-direction: ${(props) => (props.isVertical ? 'column' : 'row')};
  align-items: top;
  gap: 16px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`;
