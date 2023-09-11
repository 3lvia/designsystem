import { BadgeColor } from './elvia-badge.types';
import styled from 'styled-components';
import { getThemeColor, getThemeColorContrast } from '@elvia/elvis-colors';
interface BadgeCircleProps {
  readonly $badgeColor: BadgeColor;
  readonly $count: string | undefined;
}

const getTextColor = ($color: BadgeColor) => {
  switch ($color) {
    case 'green':
      return getThemeColorContrast('signal-positive');
    case 'red':
      return getThemeColorContrast('signal-danger');
    default:
      return getThemeColor('text-4');
  }
};

const getBadgeColor = ($color: BadgeColor) => {
  switch ($color) {
    case 'green':
      return getThemeColor('signal-positive');
    case 'red':
      return getThemeColor('signal-danger');
    default:
      return getThemeColor('background-element-5');
  }
};

export const BadgeContainer = styled.div`
  width: fit-content;
  position: relative;
`;

export const BadgeCircle = styled.div<BadgeCircleProps>`
  background-color: ${({ $badgeColor }) => getBadgeColor($badgeColor)};
  border-radius: 50px;
  color: ${({ $badgeColor }) => getTextColor($badgeColor)};
  display: grid;
  font-size: 9px;
  font-weight: 600;
  height: 16px;
  line-height: 9px;
  padding: ${({ $count }) => ($count === '99+' ? '4px' : '4px 0')};
  place-items: center;
  position: absolute;
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  user-select: none;
  width: ${({ $count }) => ($count === '99+' ? 'unset' : '16px')};
  z-index: 10;
`;
