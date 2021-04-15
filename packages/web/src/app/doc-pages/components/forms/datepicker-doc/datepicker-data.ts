const datepickerData = {
  name: 'elvis-date-picker',
  elementNameW: 'elvia-date-picker',
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
      cegDisplayGroup: 'Modifiers',
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
      cegDisplayGroup: 'Modifiers',
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
      cegDisplayGroup: 'Modifiers',
    },
    minDate: {
      isRequired: false,
      type: 'Date',
      description: 'Gives the input 100% width (max = ...)',
      displayName: 'Min date',
    },
    maxDate: {
      isRequired: false,
      type: 'Date',
      description: 'Gives the input 100% width (max = ...)',
      displayName: 'Max date',
    },
  },
  package: 'npm install @elvia/elvis-datepicker',
  codeImportReact: `import { Popover } from '@elvia/elvis-date-picker/react';`,
  codeImportWebComponent: `import '@elvia/elvis-date-picker';`,
  codeReact: `<Date-picker
  label="Velg dato"
></Date-picker>`,
  codeWebComponent: `<elvia-date-picker
  label="Velg dato"
></elvia-popover>`,
};

export { datepickerData };
