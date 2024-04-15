import changelogJson from '@elvia/elvis-autocomplete/CHANGELOG.json';
import { BaseAutocompleteProps } from '@elvia/elvis-autocomplete/react';

import ComponentData from '../component-data.interface';

export const autocompleteData: ComponentData<BaseAutocompleteProps> = {
  changelog: changelogJson.content,
  name: 'Autocomplete',
  attributes: {
    items: {
      isRequired: true,
      type: 'object[]',
      children: {
        value: {
          type: 'string',
          description: 'The value for the given autocomplete item',
        },
        label: {
          type: 'string',
          description: 'The label which is visible in the autocomplete dropdown.',
        },
      },
      description:
        'Options available in the autocomplete menu, set as array of objects with keys of: {value: string, label: string }',
    },
    value: {
      type: 'string',
      description: 'Set a default value to the autocomplete.',
    },
    errorOptions: {
      type: 'object',
      description:
        'An object that allows for custom configuration of the error handling in the autocomplete.',
      default: '{ isErrorState: false, hasErrorPlaceholder: true }',
      example: /* ts */ `errorOptions = { text: "Error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true }`,
      children: {
        text: {
          type: 'string',
          description: 'Setting "text" will always show the provided error message.',
        },
        hideText: {
          type: 'boolean',
          description: 'Hides the default validation errors.',
          default: 'false',
        },
        isErrorState: {
          type: 'boolean',
          description: 'Allows for manually activating the visual error UI.',
          default: 'false',
        },
        hasErrorPlaceholder: {
          type: 'boolean',
          description: 'Allows you to remove the padding below the date picker.',
          default: 'true',
        },
      },
    },
    size: {
      type: '"small" | "medium"',
      description: 'Autocomplete can be set to different sizes.',
      default: '"medium"',
    },
    isDisabled: {
      type: 'boolean',
      description: 'Set autocomplete to a disabled state.',
      default: 'false',
    },
    isFullWidth: {
      type: 'boolean',
      description: "Set the autocomplete to fill 100% of its parent's container width.",
      default: 'false',
    },
    isRequired: {
      type: 'boolean',
      description: 'Makes the autocomplete required.',
      default: 'false',
    },
    openOnFocus: {
      type: 'boolean',
      description: 'Open the autocomplete menu on focus, even if the input is empty.',
      default: 'false',
    },
    label: {
      type: 'string',
      description: 'The label for the autocomplete.',
    },
    menuPosition: {
      type: '"top" | "bottom" | "auto"',
      description: 'Set the position of the autocomplete menu.',
      default: '"auto"',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder value for the autocomplete input.',
    },
    valueOnChange: {
      specialType: 'event',
      type: '(values: string) => void',
      description: 'Gets called every time the user types inside the autocomplete input',
    },
    onOpen: {
      specialType: 'event',
      type: '() => void',
      description: 'Gets called when the autocomplete popup opens',
    },
    onClose: {
      specialType: 'event',
      type: '() => void',
      description: 'Gets called when the autocomplete popup closes',
    },
    onFocus: {
      specialType: 'event',
      type: '() => void',
      description: 'Gets called when the autocomplete receives focus',
    },
    errorOnChange: {
      specialType: 'event',
      type: '(error: string) => void',
      description: 'Gets called every time the internal date validation error is changed. ',
    },
    onSelectItem: {
      specialType: 'event',
      type: '(value: string) => void',
      description: 'Gets called when the user selects an item from the autocomplete popup',
    },
    ariaLabel: {
      type: 'string',
      description: 'Add an Aria label for accessibility if no explicit label is provided.',
    },
    hasBuiltInFilter: {
      type: 'boolean',
      description:
        'Use the built-in filter with a simple "includes()" check to filter the autocomplete options. If set to false, you will need to manually filter and sort the items array yourself.',
      default: 'true',
    },
    hasOptionalText: {
      type: 'boolean',
      description: 'Adds an optional text to the autocomplete.',
      default: 'false',
    },
  },
};
