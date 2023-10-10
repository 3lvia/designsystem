import changelogJson from '@elvia/elvis-divider/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseDividerProps } from '@elvia/elvis-divider/react';

export const dividerData: ComponentData<BaseDividerProps> = {
  changelog: changelogJson.content,
  name: 'Divider',
  attributes: {
    type: {
      type: '"simple" | "heading" | "curved"',
      description: 'Type of the divider. The curved version of the divider follows the Elvia curve formula.',
      default: '"simple"',
    },
    heading: {
      type: 'HTMLElement | JSX.Element',
      description:
        'Heading displayed together with a divider. Send in as slot in webcomponent and JSX.Element in React.',
    },
    typography: {
      type: '"medium" | "caps"',
      description: 'Type of heading typography.',
      default: '"medium"',
    },
    orientation: {
      type: '"horizontal" | "vertical"',
      description: 'Change the orientation of the divider.',
      default: '"horizontal"',
    },
  },
};
