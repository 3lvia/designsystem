import changelogJson from '@elvia/elvis-context-menu/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const contextMenuData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Context Menu',
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
      isRequired: false,
      type: 'boolean',
      description: 'Determines whether the context menu is showing.',
      default: 'false',
    },
    isSelectable: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines whether the context menu is selectable',
      default: 'false',
    },
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the context menu is opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the context menu is closed.',
    },
    verticalPosition: {
      isRequired: false,
      type: 'bottom | top',
      description: 'Position vertically.',
      default: 'bottom',
    },
    horizontalPosition: {
      isRequired: false,
      type: 'left | right',
      description: 'Position horizontally.',
      default: 'left',
    },
    className: {
      isRequired: false,
      type: 'string',
      description:
        'Custom CSS classes that can be added to the context menu. Note: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the context menu. Example: {marginTop: '8px', width: '100%'}. Note: This applies to the content, not the trigger.",
    },
  },
};

export { contextMenuData };
