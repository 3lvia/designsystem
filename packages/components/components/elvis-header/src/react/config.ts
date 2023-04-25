import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Header',
  attributes: [
    { name: 'appContent', type: 'string' },
    { name: 'appTitle', type: 'string' },
    { name: 'className', type: 'string' },
    { name: 'email', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    { name: 'navItems', type: 'string' },
    { name: 'pageTitle', type: 'string' },
    { name: 'username', type: 'string' },
  ],
};
