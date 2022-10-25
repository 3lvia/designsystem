import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';
import { CSSProperties } from 'react';

export interface BaseProps {
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent: ElvisComponentWrapper;
}
