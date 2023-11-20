import changelogJson from '@elvia/elvis-segmented-control/CHANGELOG.json';
import ComponentData from '../../component-data.interface';
import { BaseSegmentedControlProps } from '@elvia/elvis-segmented-control/react';

export const segmentedControlData: ComponentData<BaseSegmentedControlProps> = {
  changelog: changelogJson.content,
  name: 'SegmentedControl',
  attributes: {
    items: {
      isRequired: true,
      type: 'TextSegmentedControl[] | IconSegmentedControl[]',
      description: 'The items represent the controls in the segmented control.',
      children: {
        label: {
          type: 'string',
          description: 'Label for the segmented control. Applicable for regular segmented controls.',
        },
        ariaLabel: {
          type: 'string',
          description: 'Aria label for the segmented control. Only used in icon segmented controls.',
        },
        icon: {
          type: 'string',
          description:
            'HTML for the icon to be used for the segmented control. Only used in icon segmented controls.',
        },
        iconSelected: {
          type: 'string',
          description:
            'HTML for the icon visible when the segmented control is active. Only used in icon segmented controls.',
        },
      },
    },
    value: {
      type: 'Number',
      description:
        'The selected value for the segmented control, which should be the index of the selected item.',
    },
    type: {
      type: '"text" | "icon" ',
      description: 'Type of the segmented control.',
      default: '"text"',
    },
    size: {
      type: '"small" | "medium" | "large"',
      description: 'Size of the segmented control.',
      default: '"medium"',
    },
    valueOnChange: {
      isEvent: true,
      type: '(value: Number) => void',
      description: 'Gets called every time the value is changed and returns the new selected control.',
    },
  },
};
