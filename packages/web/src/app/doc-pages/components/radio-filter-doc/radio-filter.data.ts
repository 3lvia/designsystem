import changelogJson from '@elvia/elvis-radio-filter/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseRadioFilterProps } from '@elvia/elvis-radio-filter/react';

const radioFilterData: ComponentData<BaseRadioFilterProps> = {
  changelog: changelogJson.content,
  name: 'RadioFilter',
  attributes: {
    items: {
      isRequired: true,
      type: 'object[]',
      description: 'Options available in the radio-filter component, set as array of objects.',
      children: {
        label: {
          type: 'string',
          description:
            'The label for the radio filter item. Will be injected as innerHTML to allow icon support',
        },
        value: {
          type: 'string',
          description: 'The value for the radio filter item.',
        },
      },
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'Value of selected filter.',
    },
    name: {
      isRequired: true,
      type: 'string',
      description:
        'The HTML attribute "name" is used for radio button group input elements in the Radio Filter component. Each name must be unique for each Radio Filter on the page and is not visible to the user.',
      example: /* ts */ `name = "messageFilter"`,
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Aria-label for each filter button.',
      default: '{value} filtrering valgt',
    },
    groupAriaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Aria label for the whole radio filter group.',
      default: '"Filtreringsknapper"',
    },
    valueOnChange: {
      isEvent: true,
      isRequired: true,
      type: '(value: string) => void',
      description:
        'Gets called every time a new filter is selected and returns the value of the selected filter.',
    },
  },
};

export { radioFilterData };
