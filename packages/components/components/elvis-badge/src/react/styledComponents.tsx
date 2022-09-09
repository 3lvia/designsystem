import { BadgeColor } from './elvia-badge.types';
import styled from 'styled-components';
import { getColor } from '@elvia/elvis-colors';

//To-do: add colors for dark mode
const colors = {
  elviaBlack: getColor('black'),
  elviaCharge: getColor('green'),
  elviaRed: getColor('red'),
  elviaWhite: getColor('white'),
};

interface BadgeCircleProps {
  readonly badgeColor: BadgeColor;
  readonly count: string | undefined;
}

// detemine the text color based on the background color
//to-do: add colors for dark mode
const getTextColor = (badgeColor: BadgeColor) => {
  if (badgeColor === 'green' || badgeColor === 'white') {
    return colors.elviaBlack;
  }

  return colors.elviaWhite;
};

export const BadgeCircle = styled.div<BadgeCircleProps>`
  background-color: ${({ badgeColor }) => getColor(badgeColor)};
  border-radius: 50px;
  color: ${({ badgeColor }) => getTextColor(badgeColor)}; //to-do add support for dark mode
  display: grid;
  font-size: 9px;
  font-weight: 600;
  height: 16px;
  line-height: 12px;
  padding: ${({ count }) => (count === '99+' ? '2px 4px' : '2px 0px')};
  place-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  user-select: none;
  width: ${({ count }) => (count === '99+' ? 'unset' : '16px')};
  z-index: 10;
`;
