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
      isRequired: false,
      type: 'Number',
      description:
        'The selected value for the segmented control, which should be the index of the selected item.',
    },
    type: {
      isRequired: false,
      type: '"text" | "icon" ',
      description: 'Type of the segmented control.',
      default: '"text"',
    },
    size: {
      isRequired: false,
      type: '“small” | “medium” | “large”',
      description: 'Size of the segmented control.',
      default: '"medium"',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Number) => void',
      description: 'Gets called every time the value is changed and returns the new selected control.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the segmented control.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the segmented control. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};
