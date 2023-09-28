import changelogJson from '@elvia/elvis-dropdown/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const dropdownData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Dropdown',
  attributes: {
    items: {
      isRequired: true,
      type: 'object[]',
      description:
        'Options available in the dropdown menu, set as array of objects with keys of :  {value: string | number, label: string, icon?: string, isDisabled?: boolean, status?: string, tooltip?: string, children?: Array<object>}',
    },
    value: {
      type: 'string | string[] | number | number[]',
      description:
        'Set a default value to the dropdown. The value is the value of the selected element from the items list.',
      default: 'undefined',
    },
    errorOptions: {
      type: 'Partial<{ text: string; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description:
        'An object that allows for custom configuration of the error handling in the dropdown. Setting "text" will always show the provided error message. "isErrorState" allows for manually activating the visual error UI. "hasErrorPlaceholder" allows you to remove the padding below the dropdown.',
      default: '{ isErrorState: false, hasErrorPlaceholder: true }',
    },
    size: {
      type: '"small" | "medium"',
      description: 'Dropdown can be set to different sizes.',
      default: '"medium"',
    },
    isDisabled: {
      type: 'boolean',
      description: 'Set dropdown to a disabled state.',
      default: 'false',
    },
    isFullWidth: {
      type: 'boolean',
      description: "Set the dropdown to fill 100% of its parent's container width.",
      default: 'false',
    },
    isSearchable: {
      type: 'boolean',
      description:
        'Set the dropdown to accept text input that filters possible options based an the search term.',
      default: 'false',
    },
    isMulti: {
      type: 'boolean',
      description: 'Set the dropdown to accept multiple values.',
      default: 'false',
    },
    hasSelectAllOption: {
      type: 'boolean',
      description: 'Add a select all-option to the dropdown. Only available in multiselect dropdown.',
      default: 'false',
    },
    selectAllOption: {
      type: 'string',
      description:
        'Change the label of the select all-option inside the opened dropdown. Only available in multiselect dropdown.',
      default: '"Alle"',
    },
    allOptionsSelectedLabel: {
      type: 'string',
      description:
        'Change the label shown in the dropdown text field when all options are selected. Only available in multiselect dropdown.',
      default: '"Alle"',
    },
    label: {
      type: 'string',
      description: 'The label for the dropdown.',
    },
    menuPosition: {
      type: '"top" | "bottom" | "auto"',
      description: 'Set the position of the dropdown menu.',
      default: '"auto"',
    },
    noOptionsMessage: {
      type: 'string',
      description: 'Text to display when there are no options.',
      default: '"Ingen tilgjengelige valg"',
    },
    placeholder: {
      type: 'string',
      description: 'Placeholder value for the dropdown menu.',
    },
    placeholderIcon: {
      type: 'string',
      description:
        'Use the <i> element for the icon in the placeholder. E.g. <i class="e-icon e-icon--electricity_tower e-icon--sm">',
    },
    valueOnChange: {
      isEvent: true,
      type: '(values: string | string[]) => void',
      description: `Gets called every time an option(s) is selected and returns an array of selected objects.`,
    },
    onItemHover: {
      isEvent: true,
      type: '(value: string | undefined) => void',
      description: `Gets called every time an option is hovered and returns the hovered object.`,
    },
    hasLoadMoreItemsButton: {
      type: 'boolean',
      description: 'Add a button to the bottom of the dropdown menu to load more items.',
    },
    onLoadMoreItems: {
      isEvent: true,
      type: '() => void',
      description: 'Function that is called when the "Load more"-button is clicked.',
    },
    isLoadingMoreItems: {
      type: 'boolean',
      description: 'Set the dropdown "Load more"-button to a loading state when loading more items.',
    },
    ariaLabel: {
      type: 'string',
      description: 'Add an Aria label for accessibility if no explicit label is provided.',
    },
  },
};
