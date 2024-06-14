import { createComponent } from '@lit/react';
import * as React from 'react';

import { ElviaBreadcrumb, ElviaBreadcrumbs } from './dist/index';

export const EBreadcrumbs = createComponent({
  tagName: 'e-breadcrumbs',
  elementClass: ElviaBreadcrumbs,
  react: React,
});

export const EBreadcrumb = createComponent({
  tagName: 'e-breadcrumb',
  elementClass: ElviaBreadcrumb,
  react: React,
});
