export const componentData = {
  name: 'elvis-tabs',
  elementNameW: 'elvia-tabs',
  elementNameR: 'Tabs',
  attributes: {
    items: {
      isRequired: true,
      type: 'string[]',
      description: 'Items getting converted to tabs.',
      displayName: 'Tabs',
      // cegType: 'string',
      // cegFormType: 'counter',
      // cegDefault: 3,
      // cegCounterMax: 5,
      // cegCounterMin: 2,
      // cegStepValue: 1,
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected tab.',
      default: '0',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => void',
      description: 'Gets called every time the value is changed.',
    },
  },
  codeInstallation: `//REACT
import { Tabs } from '@elvia/elvis-tabs/react';

// WEBCOMPONENT
import '@elvia/elvis-tabs';`,
  codeReact: `<Tabs 
  items={'items', 'item2'}
  value={1}
></Tabs>`,
  codeWebComponent: `<elvia-tabs 
  [items]="['items', 'items', 'items']" 
  value="1"
></elvia-tabs>`,
};
