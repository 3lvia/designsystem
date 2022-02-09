const radioFilterData = {
  name: 'elvis-radio-filter',
  elementNameW: 'elvia-radio-filter',
  elementNameR: 'RadioFilter',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'Options available in the radio-filter component, set as array of objects with keys of :  {label: string, value: string} ',
      cegDisplayName: 'Items',
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'Value of selected filter.',
      cegDisplayName: 'Name',
    },
    name: {
      isRequired: true,
      type: 'string',
      description: 'Name of inputs',
      cegDisplayName: 'Name',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Arialabel of radiogroup',
      default: '{value} filtrering valgt',
    },
    valueOnChange: {
      isRequired: true,
      type: '(options: Array<object>) => CustomEvent',
      description:
        'Gets called every time a new filter is selected and returns the value of the selected filter. To make radio-filters to work it is necessary to update value when this callback function is triggered.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the radio filter.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the radio filter.',
    },
  },
  package: 'npm install @elvia/elvis-radio-filter',
  codeImportReact: `import { RadioFilter } from '@elvia/elvis-radio-filter/react';`,
  codeImportWebComponent: `import '@elvia/elvis-radio-filter';`,
  codeReact: `<RadioFilter
  items={[
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
  ]}
  value={"read"}
  name={"readRadioFilters"}
  ariaLabel={"{value} filtrering valgt"}
  valueOnChange={(event) => updateSelectedFilter(event)}
></RadioFilter>
`,
  codeAngular: `<elvia-radio-filter 
  [items]="[
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
  ]"
  [value]="'read'"
  [name]="'readRadioFilters'"
  [ariaLabel]="'{value} filtrering valgt'"
  (valueOnChange)="updateSelectedFilter($event.detail.value)"
></elvia-radio-filter>
`,
  codeVue: `<elvia-radio-filter 
  :items="[
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
  ]"
  :value="'read'"
  :name="'readRadioFilters'"
  :ariaLabel="'{value} filtrering valgt'"
  @value-on-change="updateSelectedFilter($event.detail.value)"
></elvia-radio-filter>
`,
  codeNativeHTML: `<elvia-radio-filter 
  id="example-elvia-radio-filter"
></elvia-radio-filter>
`,
  codeNativeScript: `  const radioFilter = document.getElementById('example-elvia-radio-filter');
  const filters = [
    { label: "All", value: "all" },
    { label: "Read", value: "read" },
    { label: "Unread", value: "unread" }
  ];
  let value = 'read';
  radioFilter.setProps({items: filters});
  radioFilter.setProps({value: value});
  radioFilter.setProps({name: 'readRadioFilters'});
  radioFilter.setProps({ariaLabel: value + ' filtrering valgt'});
  radioFilter.addEventListener('valueOnChange', (event) => {
    radioFilter.setProps({ariaLabel: event.detail.value + ' filtrering valgt'});
    radioFilter.setProps({value: event.detail.value});
  });
`,
};

export { radioFilterData };
