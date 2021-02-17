module.exports = {
  name: 'elvis-progress-linear',
  elementNameW: 'elvia-progress-linear',
  elementNameR: 'ProgressLinear',
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
      cegTypeDependency: 'Normal',
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
      cegDisplayGroup: 'Modifiers',
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
      cegDisplayGroup: 'Modifiers',
    },
  },
  codeInstallation: `//REACT
import { ProgressLinear } from '@elvia/elvis-progress-linear/react';

// WEBCOMPONENT
import '@elvia/elvis-progress-linear';`,
  codeReact: `<ProgressLinear 
  value={20}
></ProgressLinear>`,
  codeWebComponent: `<elvia-progress-linear
  value="20"
></elvia-progress-linear>`,
};
