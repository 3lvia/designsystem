import changelogJson from '@elvia/elvis-segmented-control/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

export const segmentedControlData: ComponentData = {
  changelog: changelogJson.content,
  name: 'SegmentedControl',
  attributes: {
    items: {
      isRequired: true,
      type: 'TextSegmentedControl: {label: string} | IconSegmentedControl: {icon: string, iconSelected: string, ariaLabel: string }',
      description:
        'The items represent the controls in the segmented control. When using the icon type, the items should be provided with icon as html both for normal state and hover and should have an ariaLabel to describe the icon e.g. {icon: "<i class="e-icon e-icon--access_control"></i>", iconSelected: "<i class="e-icon e-icon--access_control-color"></i>", ariaLabel: "Thumbnail..." }.',
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
      type: '“small” | “medium” | “large”',
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
