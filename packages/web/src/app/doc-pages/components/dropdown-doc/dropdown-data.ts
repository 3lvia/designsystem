export const dropdownData = {
  name: 'elvis-dropdown',
  elementNameW: 'elvia-dropdown',
  elementNameR: 'Dropdown',
  attributes: {
    defaultValue: {
      isRequired: false,
      type: 'object',
      description:
        'Set a defualt value to the dropdown. Has same key value pairs as an option object: {value: string, label: string}',
      displayName: 'defaultValue',
      default: 'undefined',
    },
    errorMessage: {
      isRequired: false,
      type: 'string',
      description: 'Display a error message and red border on dropdown.',
      default: `''`,
    },
    isCompact: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to a smaller elvia compact style',
      default: 'false',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set dropdown to a disabled state',
      default: 'false',
    },
    isMulti: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to accept multiple values',
      default: 'false',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label value for the dropdown element',
    },
    menuPosition: {
      isRequired: false,
      type: 'string',
      description: `Set the position of the dropdown menu, can be either 'top', 'bottom' or 'auto'`,
      default: `'auto'`,
    },
    noOptionsMessage: {
      isRequired: false,
      type: 'string',
      description: 'Text to display when there are no options',
      default: `'Ingen tilgjengelige valg'`,
    },
    options: {
      isRequired: true,
      type: 'Array<object>',
      description: 'Options available in the dropdown menu',
      displayName: 'Options',
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      description: 'Placeholder value for the dropdown menu',
      default: `'Placeholder'`,
    },
    valueOnChange: {
      isRequired: false,
      type: 'function',
      description: `Gets called every time an option(s) is selected and return an array of selected objects`,
    },
  },
  package: 'npm install @elvia/elvis-dropdown',
  codeImportReact: `import { Dropdown } from '@elvia/elvis-dropdown/react';`,
  codeImportWebComponent: `import '@elvia/elvis-dropdown';`,
  codeReact: `<Dropdown options={options} label="Label" valueOnchange={setSelectedOption}></Dropdown>`,
  codeWebComponent: `<elvia-dropdown
  [options]='dropdownOptions'
  label="Label"
  (valueOnChange)="selectedOptions = $event.detail.value"
></elvia-dropdown>
<!-- in TS -->
selectedOptions = [];
exampleOptions = [
  {
    value: '1',
    label: 'Option 1',
  },
  {
    value: '2',
    label: 'Option 2',
  },
  {
    value: '3',
    label: 'Option 3',
  },
];`,
  does: [
    'Use sparingly: use dropdowns only when the user have 5-15 options and you have limited space to display it all open.',
  ],
  donts: [
    'Fewer than 5 options (consider radio filter or radio buttons)',
    'More than 15 options(consider autocomplete)',
  ],
};
