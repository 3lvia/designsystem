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
      description: 'Gets called every time the value is changed.',
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
      cegDisplayGroup: 'State',
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
