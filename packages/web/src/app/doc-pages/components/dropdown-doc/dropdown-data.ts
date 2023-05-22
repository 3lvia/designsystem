import changelogJson from 'src/assets/changelogs/elvis-dropdown/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const dropdownData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Dropdown',
  attributes: {
    items: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'Options available in the dropdown menu, set as array of objects with keys of :  {value: string | number, label: string, icon?: string, isDisabled?: boolean, status?: string, tooltip?: string, children?: Array<object>}',
    },
    value: {
      isRequired: false,
      type: 'string | string[] | number | number[]',
      description:
        'Set a default value to the dropdown. The value is the value of the selected element from the items list.',
      default: 'undefined',
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description:
        'An object that allows for custom configuration of the error handling in the dropdown. Setting "text" will always show the provided error message. "isErrorState" allows for manually activating the visual error UI. "hasErrorPlaceholder" allows you to remove the padding below the dropdown.',
    },
    size: {
      isRequired: false,
      type: 'small | medium',
      description: 'Dropdown can be set to different sizes.',
      default: 'medium',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Set dropdown to a disabled state.',
      default: 'false',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: "Set the dropdown to fill 100% of its parent's container width.",
      default: 'false',
    },
    isSearchable: {
      isRequired: false,
      type: 'boolean',
      description:
        'Set the dropdown to accept text input that filters possible options based an the search term.',
      default: 'false',
    },
    isMulti: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown to accept multiple values.',
      default: 'false',
    },
    hasSelectAllOption: {
      isRequired: false,
      type: 'boolean',
      description: 'Add a select all-option to the dropdown. Only available in multiselect dropdown.',
      default: 'false',
    },
    selectAllOption: {
      isRequired: false,
      type: 'string',
      description:
        'Change the label of the select all-option inside the opened dropdown. Only available in multiselect dropdown.',
      default: 'Alle',
    },
    allOptionsSelectedLabel: {
      isRequired: false,
      type: 'string',
      description:
        'Change the label shown in the dropdown text field when all options are selected. Only available in multiselect dropdown.',
      default: 'Alle',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'The label for the dropdown.',
    },
    menuPosition: {
      isRequired: false,
      type: 'top | bottom | auto',
      description: `Set the position of the dropdown menu.`,
      default: `auto`,
    },
    noOptionsMessage: {
      isRequired: false,
      type: 'string',
      description: 'Text to display when there are no options.',
      default: `'Ingen tilgjengelige valg'`,
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      description: 'Placeholder value for the dropdown menu.',
    },
    placeholderIcon: {
      isRequired: false,
      type: 'string',
      description: 'Name of icon to be used in the placeholder.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(values: string | string[]) => CustomEvent',
      description: `Gets called every time an option(s) is selected and returns an array of selected objects.`,
    },
    onItemHover: {
      isRequired: false,
      type: '(value: string | undefined) => CustomEvent',
      description: `Gets called every time an option is hovered and returns the hovered object.`,
    },
    hasLoadMoreItemsButton: {
      isRequired: false,
      type: 'boolean',
      description: 'Add a button to the bottom of the dropdown menu to load more items.',
    },
    onLoadMoreItems: {
      isRequired: false,
      type: '() => void',
      description: 'Function that is called when the "Load more"-button is clicked.',
    },
    isLoadingMoreItems: {
      isRequired: false,
      type: 'boolean',
      description: 'Set the dropdown "Load more"-button to a loading state when loading more items.',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Add an Aria label for accessibility if no explicit label is provided.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the dropdown.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the dropdown. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};
