import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  name: 'Popover',
  attributes: [
    { name: 'heading', type: 'string' },
    { name: 'content', type: 'string' },
    { name: 'horizontalPosition', type: 'string' },
    { name: 'verticalPosition', type: 'string' },
    { name: 'trigger', type: 'string' },
    { name: 'hasCloseButton', type: 'boolean' },
    { name: 'isShowing', type: 'boolean' },
    { name: 'className', type: 'string' },
    { name: 'inlineStyle', type: 'object' },
    // Deprecated attributes
    {
      name: 'type',
      type: 'string',
      deprecatedDetails: {
        version: '7.0.0',
        explanation:
          'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
      },
    },
    {
      name: 'isSelectable',
      type: 'boolean',
      deprecatedDetails: {
        version: '7.0.0',
        explanation:
          'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
      },
    },
    {
      name: 'hasDivider',
      type: 'boolean',
      deprecatedDetails: {
        version: '7.0.0',
        explanation:
          'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
      },
    },
    {
      name: 'disableAutoClose',
      type: 'boolean',
      deprecatedDetails: {
        version: '7.0.0',
        explanation:
          'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
      },
    },
    {
      name: 'header',
      type: 'string',
      deprecatedDetails: { version: '5.0.0', newProp: 'heading', isDirectReplacement: true },
    },
    {
      name: 'selectable',
      type: 'boolean',
      deprecatedDetails: { version: '5.0.0', newProp: 'isSelectable', isDirectReplacement: true },
    },
    {
      name: 'posX',
      type: 'string',
      deprecatedDetails: {
        version: '5.0.0',
        newProp: 'horizontalPosition',
        isDirectReplacement: true,
      },
    },
    {
      name: 'posY',
      type: 'string',
      deprecatedDetails: { version: '5.0.0', newProp: 'verticalPosition', isDirectReplacement: true },
    },
    {
      name: 'hasCloseBtn',
      type: 'boolean',
      deprecatedDetails: { version: '5.0.0', newProp: 'hasCloseButton', isDirectReplacement: true },
    },
    {
      name: 'isShowingOnChange',
      type: 'event',
      deprecatedDetails: {
        version: '5.0.0',
        isCallbackFunction: true,
        explanation:
          'Events related to removing or adding elements to the DOM should follow our naming guidelines and be named "onOpen" & "onClose"',
      },
    },
  ],
};
