import changelogJson from 'src/assets/changelogs/elvis-dropdown/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const dropdownData: ComponentData = {
  name: 'elvis-dropdown',
  elementNameW: 'elvia-dropdown',
  elementNameR: 'Dropdown',
  attributes: {
    defaultValue: {
      isRequired: false,
      type: 'object',
      description:
        'Set a defualt value to the dropdown. Has same key value pairs as an option object: {value: string, label: string}',
      cegDisplayName: 'defaultValue',
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
      cegDisplayName: 'Compact',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Size',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set dropdown to a disabled state',
      default: 'false',
      cegDisplayName: 'Disabled',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    isSearchable: {
      isRequired: false,
      type: 'boolean',
      description:
        'Set the dropdown to accept text input that filters possible options based an the search term.',
      default: 'false',
      cegDisplayName: 'Searchable',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    isMulti: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to accept multiple values',
      default: 'false',
      cegDisplayName: 'Multiselect',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    hasSelectAllOption: {
      isRequired: false,
      type: 'boolean',
      description: 'Add a select all-option to the dropdown. Only available in multiselect dropdown.',
      default: 'false',
      cegDisplayName: 'Select all option',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
      cegDependency: [{ name: 'isMulti', value: 'true' }],
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
      description:
        'Options available in the dropdown menu, set as array of objects with keys of :  {value: string, label: string} ',
      cegDisplayName: 'Options',
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      description: 'Placeholder value for the dropdown menu',
    },
    valueOnChange: {
      isRequired: false,
      type: '(options: Array<object>) => CustomEvent',
      description: `Gets called every time an option(s) is selected and return an array of selected objects`,
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the dropdown.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the dropdown.',
    },
  },
  package: 'npm install @elvia/elvis-dropdown',
  codeImportReact: `import { Dropdown } from '@elvia/elvis-dropdown/react';`,
  codeImportWebComponent: `import '@elvia/elvis-dropdown';`,
  codeReact: `<Dropdown 
  options={[
    { value: 'Norge', label: 'Norge' },
    { value: 'Sverige', label: 'Sverige' },
    { value: 'Danmark', label: 'Danmark' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Island', label: 'Island' }
  ]} 
  label={"Label"}
  placeholder={"Placeholder"}
  valueOnChange={(event) => updateSelectedList(event)}
></Dropdown>
`,
  codeAngular: `<elvia-dropdown
  [options]="[
    { value: 'Norge', label: 'Norge' },
    { value: 'Sverige', label: 'Sverige' },
    { value: 'Danmark', label: 'Danmark' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Island', label: 'Island' }
  ]"
  [label]="'Label'"
  [placeholder]="'Placeholder'"
  (valueOnChange)="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeVue: `<elvia-dropdown
  :options="[
    { value: 'Norge', label: 'Norge' },
    { value: 'Sverige', label: 'Sverige' },
    { value: 'Danmark', label: 'Danmark' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Island', label: 'Island' }
  ]"
  :label="'Label'"
  :placeholder="'Placeholder'"
  @value-on-change="updateSelectedList($event.detail.value)"
></elvia-dropdown>
`,
  codeNativeHTML: `<elvia-dropdown
  id="example-elvia-dropdown"
></elvia-dropdown>
`,
  codeNativeScript: `  const dropdown = document.getElementById('example-elvia-dropdown');
  const options = [
    { value: 'Norge', label: 'Norge' },
    { value: 'Sverige', label: 'Sverige' },
    { value: 'Danmark', label: 'Danmark' },
    { value: 'Finland', label: 'Finland' },
    { value: 'Island', label: 'Island' }
  ];
  dropdown.setProps({label: 'Label' });
  dropdown.setProps({placeholder: 'Placeholder' });
  dropdown.setProps({options: options});
  dropdown.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected elements: ', event.detail.value);
  });
`,
  changelog: changelogJson.content,

  does: [
    'Use dropdowns sparingly - only when the user has 5-15 options and you have limited space to display all options.',
  ],
  donts: [
    'Fewer than 5 options (consider radio filter or radio buttons)',
    'More than 15 options (consider autocomplete)',
  ],
};
