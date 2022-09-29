import { OverlayHorizontalPosition, OverlayVerticalPosition } from '@elvia/elvis-toolbox';
import { TooltipPosition } from './elviaTooltip.types';

export const mapPositionToVerticalPosition = (position: TooltipPosition): OverlayVerticalPosition => {
  if (position === 'left' || position === 'right') {
    return 'center';
  }

  return position;
};

export const mapPositionToHorizontalPosition = (position: TooltipPosition): OverlayHorizontalPosition => {
  if (position === 'bottom' || position === 'top') {
    return 'center';
  }

  return position;
};
