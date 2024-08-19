import { createComponent } from '@lit/react';
import * as React from 'react';

import { ElvisIcon as ElvisIconClass } from './dist/index';

export { addIcons } from './dist/index';

export const Icon = createComponent({
  tagName: 'e-icon',
  elementClass: ElvisIconClass,
  react: React,
});
