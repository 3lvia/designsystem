import styled from 'styled-components';
/* import { DividerType, DividerTypography, DividerOrientation } from './elvia-badge.types'; */
import { getColor } from '@elvia/elvis-colors';

const colors = {
  elviaWhite: getColor('white'),
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  elviaRed: getColor('red'),
};

interface DatepickerRangeWrapperProps {
  readonly badgeColor: string;
  readonly count: string | undefined;
}

// detemine the text color based on the background color
const getTextColor = (badgeColor: string): string => {
  if (badgeColor === 'green' || badgeColor === 'white') {
    return colors.elviaBlack;
  }

  return colors.elviaWhite;
};

export const BadgeCircle = styled.div<DatepickerRangeWrapperProps>`
  text-align: center;
  height: 16px;
  min-width: 16px;
  background-color: ${({ badgeColor }) => getColor(badgeColor)};
  border-radius: 50px;
  font-size: 9px;
  font-weight: 600;
  line-height: 12px;
  padding: ${({ count }) => (count === '99+' ? '2px 4px' : '2px 0px')};
  user-select: none;
  position: absolute;
  z-index: 5; /* Endre denne og notere det i Z-index-filen */
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  color: ${({ badgeColor }) => getTextColor(badgeColor)};
`;
