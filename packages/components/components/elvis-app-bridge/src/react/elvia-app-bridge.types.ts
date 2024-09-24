import { BaseProps } from '@elvia/elvis-toolbox';
import { ComponentPropsWithoutRef } from 'react';

export interface BaseAppBridgeProps extends BaseProps {
  targetId: string;
  activeApps?: string[];
}

export interface AppBridgeProps extends BaseAppBridgeProps, ComponentPropsWithoutRef<'div'> {}
