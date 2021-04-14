export const dropdownData = {
  name: 'elvis-dropdown',
  elementNameW: 'elvia-dropdown',
  elementNameR: 'Dropdown',
  attributes: {
    options: {
      isRequired: true,
      type: 'Array<object>',
      description: 'Options available in the dropdown menu',
      displayName: 'Options',
    },
    defaultValue: {
      isRequired: false,
      type: 'object',
      description:
        'Set a defualt value to the dropdown. Has same key value pairs as an option object: {value: string, label: string}',
      displayName: 'defaultValue',
    },
    errormsg: {
      isRequired: false,
      type: 'string',
      description: 'Error message that appears if isError prop is set to true',
      default: `'Help text'`,
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
    placeholder: {
      isRequired: false,
      type: 'string',
      description: 'Placeholder value for the dropdown menu',
      default: `'Placeholder'`,
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
    isError: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to have a 2px red border style to indicate an error',
      default: 'false',
    },
    isMulti: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to accept multiple values',
      default: 'false',
    },
    valueOnChange: {
      isRequired: false,
      type: ' function',
      description: `Gets called every time an option(s) is selected and return an array of objects`,
    },
  },
  package: 'npm install @elvia/elvis-dropdown',
  codeImportReact: `import { Dropdown } from '@elvia/elvis-dropdown/react';`,
  codeImportWebComponent: `import '@elvia/elvis-dropdown';`,
  codeReact: `const [selectedOption, setSelectedOption] = useState([]);

const options = [
    {
        value: 'norge',
        label: 'Norge',
    },
    {
        value: 'sverige',
        label: 'Sverige',
    },
    {
        value: 'danmark',
        label: 'Danmark',
    },
];

<Dropdown options={options} valueOnChange={setSelectedOption}></Dropdown>`,
  codeWebComponent: `<!-- in HTML -->
<elvia-dropdown
    [options]='dropdownOptions'
    [isError]='isDropdownError'
    [isCompact]='isDropdownSmall'
    (valueOnChange)="selectedOptions = $event.detail.value"
></elvia-dropdown>


<!-- in TS -->
selectedOptions = [];

isDropdownError = false;
isDropdownSmall = false;

dropdownOptions = [
    {
        value: 'norge',
        label: 'Norge',
    },
    {
        value: 'sverige',
        label: 'Sverige',
    },
    {
        value: 'danmark',
        label: 'Danmark',
    },
];`,
  does: [
    'Use sparingly - use dropdowns only when the user have 5-10 options and you have limited space to display it all open.',
  ],
  donts: ['Fewer than 5 options.', 'More than 15 options.'],
};
