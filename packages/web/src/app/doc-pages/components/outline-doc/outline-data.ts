import changelogJson from '@elvia/elvis-outline/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const outlineData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Outline',
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the outline.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the outline. Example: {borderColor: 'black'}",
    },
  },
};
