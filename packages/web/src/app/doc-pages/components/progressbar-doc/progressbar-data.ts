import changelogJson from '@elvia/elvis-progress-linear/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { ProgressLinearProps } from '@elvia/elvis-progress-linear/react';

export const progressbarData: ComponentData<ProgressLinearProps> = {
  changelog: changelogJson.content,
  name: 'ProgressLinear',
  attributes: {
    value: {
      type: 'number',
      description: 'The percentage value of completion.',
      default: '0',
    },
    isIndeterminate: {
      type: 'boolean',
      description: 'For indeterminate loading.',
      default: 'false',
    },
    isError: {
      type: 'boolean',
      description: 'For displaying an error in the progress completion.',
      default: 'false',
    },
    ariaValueText: {
      type: 'boolean',
      description:
        'Use to better communicate to the user how far along the progress bar has come. E.g. "8% (34 minutes) remaining".',
      default: '"Progresjonen er nå på {value}%."',
    },
    ariaLabel: {
      type: 'string',
      description: 'Add an Aria label for accessibility.',
      default: '"Progresjon"',
    },
    ariaRole: {
      type: '"progressbar" | "meter"',
      description:
        'Role="progressbar" indicates that the progress bar displays the progress of a task. \nRole="meter" indicates that the progress bar is used as a gauge.',
      default: '"progressbar"',
    },
    componentId: {
      type: 'string',
      description:
        'The id of the progress bar. Can be used to set the aria-labelledby attribute on other elements.',
    },
    size: {
      type: '"small" | "medium"',
      description: 'The size of the progress bar.',
      default: '"small"',
    },
    transitionDuration: {
      type: 'string',
      description: 'Set the transition duration for the progress bar animation.',
      default: '"300ms"',
    },
  },
};
