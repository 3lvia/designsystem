import { ComponentConfig } from '@elvia/elvis-toolbox';

export const config: ComponentConfig = {
  componentName: 'Pagination',
  deprecatedProps: {
    isRightAligned: {
      version: '3.0.0',
      newProp: 'alignment',
    },
    dropdownMenuPos: {
      version: '3.0.0',
      newProp: 'dropdownMenuPosition',
      isDirectReplacement: true,
    },
    selectedDropdownItemIndex: {
      version: '3.0.0',
      newProp: 'dropdownSelectedItemIndex',
      isDirectReplacement: true,
    },
    selectedDropdownItemIndexOnChange: {
      version: '3.0.0',
      newProp: 'dropdownSelectedItemIndexOnChange',
      isCallbackFunction: true,
      isDirectReplacement: true,
    },
    labelDisplaying: {
      version: '3.0.0',
      newProp: 'labelOptions',
    },
    label: {
      version: '3.0.0',
      newProp: 'labelOptions',
    },
    labelOf: {
      version: '3.0.0',
      newProp: 'labelOptions',
    },
  },
};
