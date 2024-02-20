import { CSSProperties } from 'react';

import type { ElvisComponentWrapper } from '@elvia/elvis-component-wrapper';

export interface BaseProps {
  className?: string;
  inlineStyle?: CSSProperties;
  webcomponent?: ElvisComponentWrapper;
}
