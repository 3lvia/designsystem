import changelogJson from 'src/assets/changelogs/elvis-datepicker/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

const datepickerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Datepicker',
  attributes: {
    value: {
      isRequired: false,
      type: 'Date',
      description: 'Preselected date.',
      cegDisplayName: 'Value',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Date) => CustomEvent',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    valueOnChangeISOString: {
      isRequired: false,
      type: '(value: string | null) => CustomEvent',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label of input.',
      cegDisplayName: 'Label',
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
      description: 'Gives the input 100% width.',
      default: 'false',
      cegDisplayName: 'Full width',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'Size',
      cegDefault: false,
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
    hasOptionalText: {
      isRequired: false,
      type: 'boolean',
      description:
        'An optional prop that adds the text "(valgfri)" behind the label, once set to true, to signalize that the input is optional to fill.',
      default: 'true',
      cegDisplayName: '"(valgfri)"',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
      cegDependency: [{ name: 'isRequired', value: 'false' }],
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
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker is being closed.',
    },
    onReset: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker reset button is clicked.',
    },
    resetTime: {
      isRequired: false,
      type: 'boolean',
      description: 'Whether to reset the time value in the emitted Date object to 00:00:00.',
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      default: 'dd.mm.åååå',
      description: 'A short hint displayed in the input before the user enters a value.',
    },
    isOpen: {
      isRequired: false,
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the datepicker.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the datepicker. Example: {marginTop: '8px', width: '100%'}",
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description: 'An object that allows for custom configuration of the error handling in the date picker.',
    },
    errorOnChange: {
      isRequired: false,
      default: 'true',
      type: '(error: string) => void',
      description: 'Gets called every time the internal date validation error is changed. ',
    },
    clearButtonText: {
      isRequired: false,
      type: 'string',
      default: 'Nullstill',
      description: 'Text to display in clear date-button.',
    },
    disableDate: {
      isRequired: false,
      type: '(day: Date) => boolean',
      description: 'Function that sets dates as disabled. Return true to disable a date.',
    },
  },
  codeReact: `<Datepicker
  valueOnChange={(event) => handleOnChange(event)}
></Datepicker>
`,
  codeAngular: `<elvia-datepicker
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-datepicker>
`,
  codeVue: `<elvia-datepicker
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-datepicker>
`,
  codeNativeHTML: `<elvia-datepicker
  id="example-elvia-datepicker"
></elvia-datepicker>
`,
  codeNativeScript: `  const datepicker = document.getElementById('example-elvia-datepicker');
  datepicker.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with date: ', event.detail.value)
  });
`,
};

export { datepickerData };
