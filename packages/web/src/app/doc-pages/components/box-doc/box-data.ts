import changelogJson from '@elvia/elvis-box/CHANGELOG.json';
import { BaseBoxProps } from '@elvia/elvis-box/react';

import ComponentData from '../component-data.interface';

const boxData: ComponentData<BaseBoxProps> = {
  changelog: changelogJson.content,
  name: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    heading: {
      type: `string | HTMLElement | JSX.Element`,
      description: `Heading for the box (slot in webcomponent).`,
    },
    isColored: {
      type: 'boolean',
      description:
        'Green line on top of box. Use the green line to draw attention, but avoid using multiple boxes with green lines on the same page.',
      default: 'false',
    },
  },
};

export { boxData };
