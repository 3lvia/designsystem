import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Header',
  attributes: [
    { name: 'appTitle', type: 'string' },
    { name: 'pageTitle', type: 'string' },
    { name: 'navItems', type: 'string' },
    { name: 'username', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'appContent', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
  ],
};
