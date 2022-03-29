import changelogJson from 'src/assets/changelogs/elvis-datepicker/CHANGELOG.json';

const datepickerData = {
  name: 'elvis-datepicker',
  elementNameW: 'elvia-datepicker',
  elementNameR: 'Datepicker',
  attributes: {
    value: {
      isRequired: false,
      type: 'Date',
      description: 'Preselected date',
      cegDisplayName: 'Value',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Date) => CustomEvent',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label of input',
      cegDisplayName: 'Label',
    },
    isCompact: {
      isRequired: false,
      type: 'boolean',
      description: 'Compact size',
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
      description: 'Gives the input 100% width (max = 343px)',
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
      description: 'Disabled datepicker',
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
      description: 'Required datepicker-fields cannot be empty',
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
    showValidation: {
      isRequired: false,
      type: 'boolean',
      description:
        'Shows validations when sent in as true, e.g. "Velg en dato" error when date is required. Otherwise this will only be triggered after the input has had focus.',
      default: 'false',
    },
    showValidationState: {
      isRequired: false,
      type: 'boolean',
      description:
        'Shows validation text under datepicker if there is an error with the chosen date. NB: customError has higher priority.',
      default: 'true',
    },
    customError: {
      isRequired: false,
      type: 'string',
      description:
        'Optional prop for adding an error-message. This prop will overwrite built-in error-messages and is always visible when sent in.',
      cegDisplayName: 'Error',
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
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the modal is being closed.',
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
      description: 'Controlled picker open state',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the datepicker.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the datepicker.',
    },
    isErrorState: {
      isRequired: false,
      type: 'boolean',
      description: 'Force datepicker to be in error state (i.e. red border). ',
    },
    hasValidation: {
      isRequired: false,
      default: 'true',
      type: 'boolean',
      description: 'Can be used to turn off all internal validation of the chosen date. ',
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
      description: 'Text to display in clear button.',
    },
    disableDate: {
      isRequired: false,
      type: '(day: Date) => boolean',
      description: 'Function that sets dates as disabled. Return true to disable a date.',
    },
  },
  package: 'npm install @elvia/elvis-datepicker',
  codeImportReact: `import { Datepicker } from '@elvia/elvis-datepicker/react';`,
  codeImportWebComponent: `import '@elvia/elvis-datepicker';`,
  codeReact: `<Datepicker
  valueOnChange={(event) => handleOnChange(event)}
></Datepicker>
`,
  codeAngular: `<elvia-datepicker
  (valueOnChange)="handleOnChange(event.detail.value)"
></elvia-datepicker>
`,
  codeVue: `<elvia-datepicker
  @value-on-change="handleOnChange(event.detail.value)"
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
  changelog: changelogJson.content,
};

export { datepickerData };
