import changelogJson from 'src/assets/changelogs/elvis-datepicker-range/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

const datepickerRangeData: ComponentData = {
  changelog: changelogJson.content,
  name: 'elvis-datepicker-range',
  elementNameW: 'elvia-datepicker-range',
  elementNameR: 'DatepickerRange',
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
    handleValueOnChangeISOString: {
      isRequired: false,
      type: '(value: {start: string | null, end: string | null}) => CustomEvent',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    labelOptions: {
      isRequired: false,
      type: '{start?: string; end?: string}',
      description: 'Labels of inputs.',
      default: '{start: "Fra dato", end: "Til dato"}',
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
      description: 'Gives the input 100% width (max = 912px).',
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
      type: 'boolean | {start?: boolean; end?: boolean}',
      description:
        'Required datepicker-fields cannot be empty. If a boolean is passed, it will apply to both fields.',
      default: 'false',
      cegDisplayName: 'Required',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
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
    hasAutoOpenEndDatepicker: {
      isRequired: false,
      type: 'boolean',
      description: 'Auto opens the end datepicker when the start datepicker is closed.',
      default: 'false',
      cegDisplayName: 'Auto open end datepicker',
      cegType: 'boolean',
      cegDefault: false,
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    isVertical: {
      isRequired: false,
      type: 'boolean',
      description:
        'Set to true to force datepickers to stack vertically instead of horizontally. This is useful for devices with limited screen space.',
      default: 'false',
      cegDisplayName: 'Vertical Stacking',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Options',
    },
    minDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes dates before the provided minimum date disabled.',
      cegDisplayName: 'Min date',
    },
    maxDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes dates after the provided maximum date disabled.',
      cegDisplayName: 'Max date',
    },
    disableDates: {
      isRequired: false,
      type: '{start: (day: Date) => boolean; end: (day: Date) => boolean}',
      description: 'Object containing functions that set dates as disabled. Return true to disable a date.',
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean }>',
      description: 'An object that allows for custom configuration of the error handling.',
    },
    errorOnChange: {
      isRequired: false,
      type: '(errors: {start?: string; end?: string}) => CustomEvent',
      description: 'Gets called every time the internal date validation error is changed.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the datepicker range.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the datepicker range. Example: {marginTop: '8px', width: '100%'}",
    },
  },
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
};

export { datepickerRangeData };
