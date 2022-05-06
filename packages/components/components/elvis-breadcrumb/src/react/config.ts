import { ComponentConfig } from '@elvia/elvis-toolbox';

const config: ComponentConfig = {
  componentName: 'Breadcrumb',
  deprecatedProps: {
    // Rule 1.12: List of elements
    breadcrumbs: {
      version: '2.0.0',
      newProp: 'items',
      isDirectReplacement: true,
    },
    // Rule 1.4, event handlers
    breadcrumbsOnChange: {
      version: '2.0.0',
      newProp: 'itemsOnChange',
      isDirectReplacement: true,
    },
  },
};

export default config;
