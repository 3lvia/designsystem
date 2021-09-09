const datepickerData = {
  name: 'elvis-datepicker',
  elementNameW: 'elvia-datepicker',
  elementNameR: 'Datepicker',
  attributes: {
    value: {
      isRequired: false,
      type: 'Date',
      description: 'Preselected date',
      displayName: 'Value',
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
      displayName: 'Label',
    },
    isCompact: {
      isRequired: false,
      type: 'boolean',
      description: 'Compact size',
      default: 'false',
      displayName: 'Compact',
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
      displayName: 'Full width',
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
      displayName: 'Disabled',
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
      displayName: 'Required',
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
      displayName: 'Error',
    },
    minDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes date before this date disabled.',
      displayName: 'Min date',
    },
    maxDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes date after this date disabled.',
      displayName: 'Max date',
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


