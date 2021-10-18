export const progressbarData = {
  name: 'elvis-progress-linear',
  elementNameW: 'elvia-progress-linear',
  elementNameR: 'ProgressLinear',
  package: 'npm install @elvia/elvis-progress-linear',
  attributes: {
    value: {
      isRequired: false,
      type: 'number',
      description: 'The percentage value of completion',
      default: '0',
      displayName: 'Loaded',
      cegType: 'number',
      cegFormType: 'counter',
      cegDefault: 20,
      cegCounterMax: 100,
      cegCounterMin: 0,
      cegStepValue: 10,
      cegCounterType: '%',
    },
    isIndeterminate: {
      isRequired: false,
      type: 'boolean',
      description: 'For indeterminate loading',
      default: 'false',
      displayName: 'Indeterminate',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    isError: {
      isRequired: false,
      type: 'boolean',
      description: 'For displaying an error in the progress completion.',
      default: 'false',
      displayName: 'Error',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
  },
  codeImportReact: `import { ProgressLinear } from '@elvia/elvis-progress-linear/react';`,
  codeImportWebComponent: `import '@elvia/elvis-progress-linear';`,
  codeReact: `<ProgressLinear
  value={20}
></ProgressLinear>`,
  codeAngular: `<elvia-progress-linear
  [value]="20"
></elvia-progress-linear>`,
  codeNativeHTML: `<elvia-progress-linear
  value="20"
></elvia-progress-linear>`,
};
