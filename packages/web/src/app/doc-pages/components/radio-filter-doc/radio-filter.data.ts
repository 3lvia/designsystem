import changelogJson from '@elvia/elvis-radio-filter/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const radioFilterData: ComponentData = {
  changelog: changelogJson.content,
  name: 'RadioFilter',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'Options available in the radio-filter component, set as array of objects with keys: {label: string, value: string}. The label will be injected as innerHTML to allow support for icons.',
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
        'The HTML attribute "name" is used for radio button group input elements in the Radio Filter component. Each name must be unique for each Radio Filter on the page and is not visible to the user. e.g "messageFilter".',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Arialabel for each filter button.',
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
