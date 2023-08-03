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
      isRequired: false,
      type: 'string',
      description: 'Set a default value to the autocomplete.',
      default: 'undefined',
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description:
        'An object that allows for custom configuration of the error handling in the autocomplete. Setting "text" will always show the provided error message. "isErrorState" allows for manually activating the visual error UI. "hasErrorPlaceholder" allows you to remove the padding below the autocomplete.',
      default: '{ isErrorState: false, hasErrorPlaceholder: true }',
    },
    size: {
      isRequired: false,
      type: 'small | medium',
      description: 'Autocomplete can be set to different sizes.',
      default: 'medium',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set autocomplete to a disabled state.',
      default: 'false',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: "Set the autocomplete to fill 100% of its parent's container width.",
      default: 'false',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'The label for the autocomplete.',
    },
    menuPosition: {
      isRequired: false,
      type: 'top | bottom | auto',
      description: `Set the position of the autocomplete menu.`,
      default: `auto`,
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      description: 'Placeholder value for the autocomplete input.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(values: string) => void',
      description: `Gets called every time the user types inside the autocomplete input`,
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Add an Aria label for accessibility if no explicit label is provided.',
    },
    useBuiltInFilter: {
      isRequired: false,
      type: 'boolean',
      description:
        'Use the built-in filter with a simple "includes()" check to filter the autocomplete options. If set to false, you will need to manually filter and sort the items array yourself.',
      default: 'true',
    },
    hasOptionalText: {
      isRequired: false,
      type: 'boolean',
      description: 'Adds an optional text to the autocomplete.',
      default: 'false',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the autocomplete.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the autocomplete. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  does: [
    'When you have a list with optional options, and the input is not restricted to selecting from a predefined list.',
  ],
  donts: ['When the user must select one or more options from a predefined list.'],
};
