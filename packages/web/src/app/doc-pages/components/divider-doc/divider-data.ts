import changelogJson from 'src/assets/changelogs/elvis-divider/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const dividerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Divider',
  attributes: {
    type: {
      isRequired: false,
      type: 'simple | title | curved',
      description: 'Type of the divider. The curved version of the divider follows the Elvia curve formula.',
      default: 'simple',
    },
    title: {
      isRequired: false,
      type: 'HTMLElement | JSX.Element',
      description:
        'Title displayed together with a divider. Send in as slot in webcomponent and JSX.Element in React.',
      default: 'Title',
    },
    typography: {
      isRequired: false,
      type: 'medium | caps',
      description: 'Type of title typography.',
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
