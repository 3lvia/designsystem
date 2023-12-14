import changelogJson from '@elvia/elvis-context-menu/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseContextMenuProps } from '@elvia/elvis-context-menu/react';

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
    onOpen: {
      isEvent: true,
      type: '() => void',
      description: 'Callback for every time the context menu is opened.',
    },
    onClose: {
      isEvent: true,
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
