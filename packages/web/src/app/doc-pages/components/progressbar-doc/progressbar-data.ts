import changelogJson from 'src/assets/changelogs/elvis-progress-linear/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const progressbarData: ComponentData = {
  changelog: changelogJson.content,
  name: 'ProgressLinear',
  attributes: {
    value: {
      isRequired: false,
      type: 'number',
      description: 'The percentage value of completion.',
      default: '0',
      cegDisplayName: 'Loaded',
      cegType: 'number',
      cegFormType: 'counter',
      cegDefault: 20,
      cegCounterMax: 100,
      cegCounterMin: 0,
      cegStepValue: 10,
      cegCounterType: '%',
      cegDependency: [
        { name: 'isIndeterminate', value: 'false' },
        { name: 'isError', value: 'false' },
      ],
    },
    isIndeterminate: {
      isRequired: false,
      type: 'boolean',
      description: 'For indeterminate loading.',
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
        'Use to better communicate to the user how far along the progress bar has come. E.g. "8% (34 minutes) remaining".',
      default: '"Progresjonen er nå på {value}%."',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Add an Aria label for accessibility.',
      default: '"Progresjon"',
    },
    ariaRole: {
      isRequired: false,
      type: '"progressbar" | "meter"',
      description:
        'Role="progressbar" indicates that the progress bar displays the progress of a task. \nRole="meter" indicates that the progress bar is used as a gauge.',
      default: '"progressbar"',
    },
    componentId: {
      isRequired: false,
      type: 'string',
      description:
        'The id of the progress bar. Can be used to set the aria-labelledby attribute on other elements.',
    },
    size: {
      isRequired: false,
      type: '"small" | "medium"',
      description: 'The size of the progress bar.',
      default: '"small"',
      cegDisplayName: 'Size',
      cegDefault: 'small',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['small', 'medium'],
    },
    transitionDuration: {
      isRequired: false,
      type: 'string',
      description: 'Set the transition duration for the progress bar animation.',
      default: '"300ms"',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the progress bar.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the progress bar. Example: {marginTop: '8px', width: '100%'}",
    },
  },
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

  codeNativeScript: ``,
};
