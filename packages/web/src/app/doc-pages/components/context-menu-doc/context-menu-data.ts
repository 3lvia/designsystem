import changelogJson from '@elvia/elvis-context-menu/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { ContextMenuProps } from '@elvia/elvis-context-menu/react';

const contextMenuData: ComponentData<ContextMenuProps> = {
  changelog: changelogJson.content,
  name: 'ContextMenu',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description:
        'The content (use slot in webcomponent if not just text), typically a list of buttons and links.',
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
