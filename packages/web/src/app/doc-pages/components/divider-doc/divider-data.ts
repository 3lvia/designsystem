import changelogJson from '@elvia/elvis-divider/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const dividerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Divider',
  attributes: {
    type: {
      isRequired: false,
      type: 'simple | heading | curved',
      description: 'Type of the divider. The curved version of the divider follows the Elvia curve formula.',
      default: 'simple',
    },
    heading: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      description:
        'Heading displayed together with a divider. Send in as slot in webcomponent and JSX.Element in React.',
    },
    typography: {
      isRequired: false,
      type: 'medium | caps',
      description: 'Type of heading typography.',
      default: 'medium',
    },
    orientation: {
      isRequired: false,
      type: 'horizontal | vertical',
      description: 'Change the orientation of the divider.',
      default: 'horizontal',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the divider.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the divider. Example: {marginTop: '8px', width: '100%'}",
    },
  },

  codeNativeScript: ``,
};
