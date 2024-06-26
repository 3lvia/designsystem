import changelogJson from '@elvia/elvis-context-menu/CHANGELOG.json';
import { BaseContextMenuProps } from '@elvia/elvis-context-menu/react';

import ComponentData from '../component-data.interface';

const contextMenuData: ComponentData<BaseContextMenuProps> = {
  changelog: changelogJson.content,
  name: 'ContextMenu',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description:
        'The content (use slot in web component if not just text), typically a list of buttons and links.',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element the user clicks to open the context menu.',
    },
    isShowing: {
      type: 'boolean',
      description: 'Determines whether the context menu is showing.',
      default: 'false',
    },
    isSelectable: {
      type: 'boolean',
      description: 'Determines whether the context menu is selectable',
      default: 'false',
    },
    display: {
      type: 'string',
      default: '"inline-block"',
      description:
        'The display property for the trigger container. Change this if the default display property interferes with your app layout.',
      example: /* ts */ `//use the display CSS property
        display = "block"; 
        display = "flex";`,
    },
    anchorPosition: {
      type: 'object',
      description: 'Can be used to manually override the position of the context menu.',
      children: {
        top: {
          type: 'number',
          description: 'The top position of the context menu in pixels.',
        },
        left: {
          type: 'number',
          description: 'The left position of the context menu in pixels.',
        },
      },
    },
    onOpen: {
      specialType: 'event',
      type: '() => void',
      description: 'Callback for every time the context menu is opened.',
    },
    onClose: {
      specialType: 'event',
      type: '() => void',
      description: 'Callback for every time the context menu is closed.',
    },
    verticalPosition: {
      type: '"bottom" | "top"',
      description: 'Position vertically.',
      default: '"bottom"',
    },
    horizontalPosition: {
      type: '"left" | "right"',
      description: 'Position horizontally.',
      default: '"left"',
    },
  },
};

export { contextMenuData };
