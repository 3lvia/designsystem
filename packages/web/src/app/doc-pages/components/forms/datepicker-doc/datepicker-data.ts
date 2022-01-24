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
    customError: {
      isRequired: false,
      type: 'string',
      description:
        'Optional prop for adding an error-message. This prop will overwrite built-in error-messages.',
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
    initialFocusedDate: {
      isRequired: false,
      type: 'Date',
      description: 'Date that will be initially highlighted if null was passed.',
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      default: 'dd.mm.yyyy',
      description: 'A short hint displayed in the input before the user enters a value.',
    },
    open: {
      isRequired: false,
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state',
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
};

export { datepickerData };
