import changelogJson from '@elvia/elvis-pagination/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const paginationData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Pagination',
  attributes: {
    value: {
      type: 'object',
      description:
        'The range of elements that should be visible in the paginator from start. "start" represents first element index and "end" represents last element index. {start: number, end: number}',
      default: '{ start: undefined, end: undefined }',
      children: {
        start: {
          type: 'number',
          description: 'First element index.',
        },
        end: {
          type: 'number',
          description: 'Last element index.',
        },
      },
    },
    numberOfElements: {
      isRequired: true,
      type: 'number',
      description: 'The total number of rows/objects in a table.',
      default: 0,
    },
    lastNumberLimit: {
      type: 'number',
      description:
        'Hides the last number in pagination if numberOfElements is equal or exceeds the lastNumberLimit.',
    },
    dropdownMenuPosition: {
      type: '"top" | "bottom" | "auto"',
      description: 'Set the position of the dropdown menu.',
      default: '"bottom"',
    },
    alignment: {
      type: '"left" | "right"',
      description: 'Alignment of the paginator.',
      default: '"left"',
    },
    dropdownItems: {
      type: 'object',
      description:
        'Options available in the pagination dropdown menu, set as array of objects with keys of:  {value: string, label: string}',
      default: `[
        {
          value: '10',
          label: '10'
        },
        ...
        {
          value: '40',
          label: '40'
        },
      ]`,
      children: {
        value: {
          type: 'string',
          description: 'Value of the dropdown item.',
        },
        label: {
          type: 'string',
          description: 'Label of the dropdown item.',
        },
      },
    },
    dropdownSelectedItemIndex: {
      type: 'number',
      description: `Set the default value of the dropdown in the paginator by passing the index number of the dropdownItems object you want as a default value.`,
      default: '0',
    },
    dropdownSelectedItemIndexOnChange: {
      isEvent: true,
      type: '(value: number) => void',
      description: `Gets called every time a new value in the pagination dropdown is chosen, returns the index of the chosen value from the available dropdownItems.`,
    },
    labelOptions: {
      type: 'object',
      description: 'Labels used in the paginator.',
      default: `{
        displaying: 'Viser', 
        of: 'av',
        label: 'elementer'
      }`,
      children: {
        displaying: {
          type: 'string',
          description: 'Label for "displaying".',
        },
        of: {
          type: 'string',
          description: 'Label for "of".',
        },
        label: {
          type: 'string',
          description: 'Label for "label".',
        },
      },
    },
    valueOnChange: {
      isEvent: true,
      type: '(value: object) => void',
      description: `Gets called every time a selection range is updated and returns a value object with start and end key-value pairs.`,
    },
  },
};
