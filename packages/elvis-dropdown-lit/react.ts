import { EventName, createComponent } from '@lit/react';
import * as React from 'react';

import { EDropdown, EOption } from './dist/index';

export const EDropdownComponent = createComponent({
  tagName: 'e-dropdown',
  elementClass: EDropdown,
  react: React,
  events: {
    onValueChange: 'valueChange' as EventName<CustomEvent<{ value: string }>>,
  },
});

export const EOptionComponent = createComponent({
  tagName: 'e-option',
  elementClass: EOption,
  react: React,
  events: {},
});
