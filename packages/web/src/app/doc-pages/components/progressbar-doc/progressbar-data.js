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
      cegFormType: 'counter',
      cegDefault: 20,
      cegCounterMax: 100,
      cegTypeDependency: 'normal',
    },
    isIndeterminate: {
      isRequired: false,
      type: 'boolean',
      description: 'For indeterminate loading',
      default: 'false',
      displayName: 'Indeterminate',
      cegFormType: 'type',
      cegOption: 'Title',
    },
    isError: {
      isRequired: false,
      type: 'boolean',
      description: 'For displaying an error in the progress completion.',
      default: 'false',
      displayName: 'Error',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
    },
  },
  codeInstallation: `//REACT
import { Progressbar } from '@elvia/elvis-progress-linear/react';

// WEBCOMPONENT
import { Progressbar } from  '@elvia/elvis-progress-linear';`,
  codeReact: `<ProgressLinear 
  value={20}
></ProgressLinear>`,
  codeWebComponent: `<elvia-progress-linear
  value="20"
></elvia-progress-linear>`,
};
