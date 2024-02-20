import { ComponentPropsWithoutRef } from 'react';

import { BaseProps, HasTransitionDuration } from '@elvia/elvis-toolbox';

export type SpotlightShape = 'circle' | 'rectangle';

export interface SpotlightPosition {
  vertical: number;
  horizontal: number;
}

export interface SpotlightRectangleProps {
  width?: number;
  height?: number;
  borderRadius?: number;
}

export interface BaseSpotlightProps extends BaseProps, HasTransitionDuration {
  position?: SpotlightPosition;
  shape?: SpotlightShape;
  radius?: number;
  rectangleProps?: SpotlightRectangleProps;
  hasLockBodyScroll?: boolean;
}

export interface SpotlightProps extends BaseSpotlightProps, ComponentPropsWithoutRef<'div'> {}
