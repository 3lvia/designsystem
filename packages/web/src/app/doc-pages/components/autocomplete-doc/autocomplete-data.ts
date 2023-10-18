import changelogJson from '@elvia/elvis-autocomplete/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const autocompleteData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Autocomplete',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<{value: string, label: string }>',
      description:
        'Options available in the autocomplete menu, set as array of objects with keys of: {value: string, label: string }',
    },
    value: {
      type: 'string',
      description: 'Set a default value to the autocomplete.',
    },
    errorOptions: {
      type: 'Partial<{ text: string; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description:
        'An object that allows for custom configuration of the error handling in the autocomplete. Setting "text" will always show the provided error message. "isErrorState" allows for manually activating the visual error UI. "hasErrorPlaceholder" allows you to remove the padding below the autocomplete.',
      default: '{ isErrorState: false, hasErrorPlaceholder: true }',
      example: /* ts */ `errorOptions = { text: "Error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true }`,
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
      isEvent: true,
      type: '(values: string) => void',
      description: 'Gets called every time the user types inside the autocomplete input',
    },
    onOpen: {
      isEvent: true,
      type: '() => void',
      description: 'Gets called when the autocomplete popup opens',
    },
    onSelectItem: {
      isEvent: true,
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
