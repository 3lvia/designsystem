import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  componentName: 'Popover',
  deprecatedProps: {
    // Rule 1.2: Fullstendige ord
    hasCloseBtn: {
      version: '5.0.0',
      newProp: 'hasCloseButton',
      isDirectReplacement: true,
    },
    // Rule 1.8: Reserverte ord (Title)
    header: {
      version: '5.0.0',
      newProp: 'heading',
      isDirectReplacement: true,
    },
    // Rule 1.4: Event handler
    isShowingOnChange: {
      version: '5.0.0',
      isCallbackFunction: true,
      explanation:
        'Events related to removing or adding elements to the DOM should follow our naming guidelines and be named "onOpen" & "onClose"',
    },
    // Rule 1.2: Fullstendige ord
    posX: {
      version: '5.0.0',
      newProp: 'horizontalPosition',
      isDirectReplacement: true,
    }, // Rule 1.2: Fullstendige ord
    posY: {
      version: '5.0.0',
      newProp: 'verticalPosition',
      isDirectReplacement: true,
    }, // Rule 1.6: Variant / state / valg
    selectable: {
      version: '5.0.0',
      newProp: 'isSelectable',
      isDirectReplacement: true,
    },
    type: {
      version: '7.0.0',
      explanation:
        'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
    },
    isSelectable: {
      version: '7.0.0',
      explanation:
        'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
    },
    hasDivider: {
      version: '7.0.0',
      explanation:
        'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
    },
    disableAutoClose: {
      version: '7.0.0',
      explanation:
        'Context menu functionality has been moved to the component ContextMenu. Use that instead.',
    },
  },
};
