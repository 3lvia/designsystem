import changelogJson from '@elvia/elvis-chip/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const chipData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Chip',
  attributes: {
    type: {
      type: '"removable" | "legend" | "choice"',
      description: 'Which type of chip should be displayed.',
      default: '"removable"',
    },
    ariaLabel: {
      isRequired: true,
      type: 'string',
      description:
        'Aria label should be added for accessibility. See the code example in top for inspiration.',
    },
    color: {
      type: '"blue" | "green" | "orange" | "purple" | "red" | "violet"',
      description: 'Set a background color of the chip.',
      default: '"green"',
    },
    isDisabled: {
      type: 'boolean',
      description: 'Set the chip as disabled.',
      default: 'false',
    },
    value: {
      isRequired: true,
      type: 'string',
      description: 'The value displayed in the chip.',
    },
    isLoading: {
      type: 'boolean',
      description: 'Sets the chip to have loading state. Only works for legend type.',
    },
    isSelected: {
      type: 'boolean',
      description: 'Sets the chip to have the selected state. Optional on legend and choice types.',
    },
    isSelectedOnChange: {
      isEvent: true,
      type: '(isSelected: boolean) => void',
      description: 'Gets called every time the selected state is changed.',
    },
    onDelete: {
      isEvent: true,
      type: '(value: string) => void',
      description:
        'Gets called if an item is clicked and it should be deleted. Required on removable type and not necessary on any of the other types.',
    },
  },

  does: [
    'Used together with filter so the user has control and an overview of what is selected',
    'Simple way for the user to toggle data on and off',
  ],
  donts: [''],
};
