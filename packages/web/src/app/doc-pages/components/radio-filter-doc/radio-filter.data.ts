import changelogJson from 'src/assets/changelogs/elvis-radio-filter/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const radioFilterData: ComponentData = {
  changelog: changelogJson.content,
  name: 'RadioFilter',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'Options available in the radio-filter component, set as array of objects with keys of :  {label: string, value: string} ',
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'Value of selected filter.',
    },
    name: {
      isRequired: true,
      type: 'string',
      description: 'The HTML attribute name for the radio button group input elements.',
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
      default: 'Filtreringsknapper',
    },
    valueOnChange: {
      isRequired: true,
      type: '(value: string) => void',
      description:
        'Gets called every time a new filter is selected and returns the value of the selected filter.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the radio filter.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the radio filter. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  codeReact: `<RadioFilter
  items={[
    { label: 'All', value: 'all'},
    { label: 'Read', value: 'read'},
    { label: 'Unread', value: 'unread'},
  ]}
  value={"read"}
  name={"readRadioFilters"}
  ariaLabel={"{value} filtrering valgt"}
  valueOnChange={(event) => handleValueChange(event)}
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
  (valueOnChange)="handleValueChange($event.detail.value)"
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
  @value-on-change="handleValueChange($event.detail.value)"
></elvia-radio-filter>
`,
  codeNativeHTML: `<elvia-radio-filter 
  id="example-elvia-radio-filter"
  name="readRadioFilters"
  value="read"
></elvia-radio-filter>
`,
  codeNativeScript: `  const radioFilter = document.getElementById('example-elvia-radio-filter');
  const filters = [
    { label: "All", value: "all" },
    { label: "Read", value: "read" },
    { label: "Unread", value: "unread" }
  ];
  radioFilter.setProps({items: filters});
  radioFilter.addEventListener('valueOnChange', (event) => {
    console.log('Do something with the new value: ', event.detail.value);
  });
`,
};

export { radioFilterData };
