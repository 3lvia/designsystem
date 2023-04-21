import changelogJson from 'src/assets/changelogs/elvis-box/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const boxData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    title: {
      isRequired: false,
      type: `string | HTMLElement | JSX.Element`,
      description: `Title for the box (slot in webcomponent).`,
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'Use this prop if the box is on a white background.',
      default: 'false',
    },
    isColored: {
      isRequired: false,
      type: 'boolean',
      description:
        'Green line on top of box. Use the green line to draw attention, but avoid using multiple boxes with green lines on the same page.',
      default: 'false',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the box.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the box. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { boxData };
