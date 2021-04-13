const datepickerData = {
  name: 'elvis-date-picker',
  elementNameW: 'elvia-date-picker',
  elementNameR: 'Datepicker',
  attributes: {
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
      default: 'true',
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
      default: 'true',
      displayName: 'Disabled',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    errorMessage: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
      displayName: 'Error message',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: 'false',
    },
  },
  package: 'npm install @elvia/elvis-datepicker',
  codeImportReact: `import { Popover } from '@elvia/elvis-datepicker/react';`,
  codeImportWebComponent: `import '@elvia/elvis-datepicker';`,
  codeReact: `<Date-picker
  label="Velg dato"
></Date-picker>`,
  codeWebComponent: `<elvia-date-picker 
	label="Velg dato"
></elvia-popover>`,
};

export { datepickerData };
