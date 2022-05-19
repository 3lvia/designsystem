import { ComponentConfig } from '@elvia/elvis-toolbox';

export const breadcrumbConfig: ComponentConfig = {
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
      newProp: 'onLinkClick',
      isDirectReplacement: true,
    },
  },
};

export const breadcrumbLinkConfig: ComponentConfig = {
  componentName: 'Breadcrumb',
  deprecatedProps: {
    // Rule 1.14: HTML-attributes
    url: {
      version: '2.0.0',
      newProp: 'href',
      isDirectReplacement: true,
    },
    // Rule 1.14: HTML-attributes / Rule 1.8: Do not use title
    title: {
      version: '2.0.0',
      newProp: 'text',
      isDirectReplacement: true,
    },
  },
};
