import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseBridgeProps extends BaseProps {
  targetId: string;
}

export interface AppBridgeProps extends BaseBridgeProps, ComponentPropsWithoutRef<'div'> {}
