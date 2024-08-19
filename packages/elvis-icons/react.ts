import { createComponent } from '@lit/react';
import * as React from 'react';

import { ElvisIcon } from './dist/index';

export { add } from './dist/index';

export const EIcon = createComponent({
  tagName: 'e-icon',
  elementClass: ElvisIcon,
  react: React,
});
