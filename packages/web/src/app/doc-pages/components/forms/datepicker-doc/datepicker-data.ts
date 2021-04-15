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
      type: '(value: Date) => void',
      description: 'Gets called every time the value is changed.',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label of input',
      displayName: 'Label',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: 'Velg dato',
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
      cegDisplayGroup: 'State',
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
    errorMessage: {
      isRequired: false,
      type: 'string',
      description: 'Determines if the close button in the upper right corner should be visible',
      displayName: 'Error message',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'false',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: 'Gives the input 100% width (max = ...)',
      default: 'false',
      displayName: 'Full width',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
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
  label="Velg dato"
></Datepicker>`,
  codeWebComponent: `<elvia-datepicker
  label="Velg dato"
></elvia-datepicker>`,
};

export { datepickerData };
