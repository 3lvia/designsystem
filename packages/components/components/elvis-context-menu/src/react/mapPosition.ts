import { OverlayHorizontalPosition } from '@elvia/elvis-toolbox';
import { HorizontalPosition } from './elviaContextMenu.types';

export const mapPositionToHorizontalPosition = (position: HorizontalPosition): OverlayHorizontalPosition => {
  if (position === 'left') return 'left-inside';
  if (position === 'right') return 'right-inside';

  return position;
};
