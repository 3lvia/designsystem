import styled from 'styled-components';
// import { getColor } from '@elvia/elvis-colors';
// import { getTypographyCss } from '@elvia/elvis-typography';

interface DatepickerRangeWrapperProps {
  isCompact?: boolean;
  isFullWidth?: boolean;
}

export const DatepickerRangeWrapper = styled.div<DatepickerRangeWrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 16px;
  box-sizing: border-box;
`;
