import changelogJson from 'src/assets/changelogs/elvis-progress-linear/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const progressbarData: ComponentData = {
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
      cegDisplayName: 'Loaded',
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
      cegDisplayName: 'Indeterminate',
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
      cegDisplayName: 'Error',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    ariaValueText: {
      isRequired: false,
      type: 'boolean',
      description:
        'Use ariaValueText to better communicate to the user how far along the progressbar has come. E.g. "8% (34 minutes) remaining"',
      default: '"Progress is currently at {value}%."',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the progressbar.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the progressbar.',
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
  codeVue: `<elvia-progress-linear
  :value="20"
></elvia-progress-linear>`,
  codeNativeHTML: `<elvia-progress-linear
  value="20"
></elvia-progress-linear>`,
  changelog: changelogJson.content,
  codeNativeScript: ``,
};
