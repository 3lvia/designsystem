import changelogJson from 'src/assets/changelogs/elvis-tabs/CHANGELOG.json';
import { exampleContents } from 'src/app/shared/example-contents';
import ComponentData from '../component-data.interface';

export const tabsData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Tabs',
  attributes: {
    items: {
      isRequired: true,
      type: 'string[]',
      description: 'Items shown as tabs.',
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected tab.',
      default: '0',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Aria label that describes the tablist. Aria label should be added for accessibility.',
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if tabs should be inverted.',
      default: 'false',
    },
    hasManualActivation: {
      isRequired: false,
      type: 'boolean',
      description:
        'Activates the tab when user hits either space, enter or a mouse click. Manual activation is usually necessary when panels cannot be displayed instantly.',
      default: 'false',
    },
    tabIdPrefix: {
      isRequired: false,
      type: 'string',
      description:
        'If you have more than one set of tabs on your page you need to add a prefix for the tab-ids so that the sets can be differentiated.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description:
        'Gets called every time the value is changed. Value is the index of the clicked tab in items.',
    },
  },
};
