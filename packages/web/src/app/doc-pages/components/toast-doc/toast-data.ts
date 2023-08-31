import changelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const toastData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Toast',
  attributes: {
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the toast.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the toast. Example: {marginTop: '8px', width: '100%'}.",
    },
  },
};
