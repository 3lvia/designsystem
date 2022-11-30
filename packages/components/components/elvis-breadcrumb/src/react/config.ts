import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Breadcrumb',
  attributes: [
    { name: 'items', type: 'object' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    // Deprecated attributes
    {
      name: 'breadcrumbs',
      type: 'object',
      deprecatedDetails: { version: '2.0.0', newProp: 'items', isDirectReplacement: true },
    },
    {
      name: 'breadcrumbsOnChange',
      type: 'event',
      deprecatedDetails: { version: '2.0.0', newProp: 'onLinkClick', isDirectReplacement: true },
    },
  ],
};
