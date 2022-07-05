import changelogJson from 'src/assets/changelogs/elvis-datepicker-range/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

const datepickerRangeData: ComponentData = {
  name: 'elvis-datepicker-range',
  elementNameW: 'elvia-datepicker-range',
  elementNameR: 'Datepicker',
  attributes: {
    value: {
      isRequired: false,
      type: '{start: Date | null, end: Date | null}',
      description: 'Preselected date.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: {start: Date | null, end: Date | null}) => CustomEvent',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    labelOptions: {
      isRequired: false,
      type: '{start: string; end: string}',
      description: 'Labels of inputs.',
    },
    isCompact: {
      isRequired: false,
      type: 'boolean',
      description: 'Compact size.',
      default: 'false',
      cegDisplayName: 'Compact',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Size',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: 'Gives the input 100% width (max = 448px).',
      default: 'false',
      cegDisplayName: 'Full width',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Size',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Disabled datepicker.',
      default: 'false',
      cegDisplayName: 'Disabled',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    isRequired: {
      isRequired: false,
      type: 'boolean',
      description: 'Required datepicker-fields cannot be empty.',
      default: 'false',
      cegDisplayName: 'Required',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    hasSelectDateOnOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the current date to selected when opening the datepicker.',
      default: 'true',
      cegDisplayName: 'Select today on open',
      cegType: 'boolean',
      cegDefault: true,
      cegFormType: 'checkbox',
      cegOption: 'false',
      cegDisplayGroup: 'Options',
    },
    minDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes date before this date disabled.',
      cegDisplayName: 'Min date',
    },
    maxDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes date after this date disabled.',
      cegDisplayName: 'Max date',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the date picker range.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the date picker range. Example: {marginTop: '8px', width: '100%'}",
    },
    disableDates: {
      isRequired: false,
      type: '{start: (day: Date) => boolean; end: (day: Date) => boolean}',
      description: 'Object containing functions that set dates as disabled. Return true to disable a date.',
    },
  },
  package: 'npm install @elvia/elvis-datepicker-range',
  codeImportReact: `import { DatepickerRange } from '@elvia/elvis-datepicker-range/react';`,
  codeImportWebComponent: `import '@elvia/elvis-datepicker-range';`,
  codeReact: `<DatepickerRange
  valueOnChange={(event) => handleOnChange(event)}
></DatepickerRange>
`,
  codeAngular: `<elvia-datepicker-range
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-datepicker-range>
`,
  codeVue: `<elvia-datepicker-range
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-datepicker-range>
`,
  codeNativeHTML: `<elvia-datepicker-range
  id="example-elvia-datepicker-range"
></elvia-datepicker-range>
`,
  codeNativeScript: `  const datepicker = document.getElementById('example-elvia-datepicker-range');
  datepicker.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with date range: ', event.detail.value)
  });
`,
  changelog: changelogJson.content,
};

export { datepickerRangeData };
