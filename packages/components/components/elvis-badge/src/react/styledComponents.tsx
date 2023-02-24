import { BadgeColor } from './elvia-badge.types';
import styled from 'styled-components';
import { getThemeColor } from '@elvia/elvis-colors';
interface BadgeCircleProps {
  readonly badgeColor: BadgeColor;
  readonly count: string | undefined;
}

const getTextColor = (color: BadgeColor) => {
  switch (color) {
    case 'green':
      return getThemeColor('static-black');
    case 'red':
      return getThemeColor('text-primary');
    default:
      return getThemeColor('background-header');
  }
};

const getBadgeColor = (color: BadgeColor) => {
  switch (color) {
    case 'green':
      return getThemeColor('state-on');
    case 'red':
      return getThemeColor('state-error');
    default:
      return getThemeColor('text-primary');
  }
};

export const BadgeContainer = styled.div`
  width: fit-content;
  position: relative;
`;

export const BadgeCircle = styled.div<BadgeCircleProps>`
  background-color: ${({ badgeColor }) => getBadgeColor(badgeColor)};
  border-radius: 50px;
  color: ${({ badgeColor }) => getTextColor(badgeColor)};
  display: grid;
  font-size: 0.5625rem;
  font-weight: 600;
  height: 16px;
  line-height: 0.75rem;
  padding: ${({ count }) => (count === '99+' ? '2px 4px' : '2px 0')};
  place-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  user-select: none;
  width: ${({ count }) => (count === '99+' ? 'unset' : '16px')};
  z-index: 10;
`;
