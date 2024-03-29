import changelogJson from '@elvia/elvis-tabs/CHANGELOG.json';
import { BaseTabsProps } from '@elvia/elvis-tabs/react';

import ComponentData from '../component-data.interface';

export const tabsData: ComponentData<BaseTabsProps> = {
  changelog: changelogJson.content,
  name: 'Tabs',
  attributes: {
    items: {
      isRequired: true,
      type: 'string[]',
      description: 'Items shown as tabs.',
    },
    value: {
      type: 'number',
      description: 'Index of selected tab.',
      default: '0',
    },
    ariaLabel: {
      type: 'string',
      description: 'Aria label that describes the tab list. Aria label should be added for accessibility.',
    },
    isInverted: {
      type: 'boolean',
      description: 'Decides if tabs should be inverted.',
      default: 'false',
    },
    hasManualActivation: {
      type: 'boolean',
      description:
        'Activates the tab when user hits either space, enter or a mouse click. Manual activation is usually necessary when panels cannot be displayed instantly.',
      default: 'false',
    },
    tabIdPrefix: {
      type: 'string',
      description:
        'If you have more than one set of tabs on your page you need to add a prefix for the tab-ids so that the sets can be differentiated.',
    },
    valueOnChange: {
      specialType: 'event',
      type: '(value: number) => void',
      description:
        'Gets called every time the value is changed. Value is the index of the clicked tab in items.',
    },
  },
};
