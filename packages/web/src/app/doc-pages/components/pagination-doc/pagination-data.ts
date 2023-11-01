import changelogJson from '@elvia/elvis-pagination/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BasePaginationProps } from '@elvia/elvis-pagination/react';

export const paginationData: ComponentData<BasePaginationProps> = {
  changelog: changelogJson.content,
  name: 'Pagination',
  attributes: {
    value: {
      type: 'object',
      description:
        'The range of elements that should be visible in the paginator from start. "start" represents first element index and "end" represents last element index.',
      children: {
        start: {
          type: 'number',
          description: 'The start index for the visible range.',
        },
        end: {
          type: 'number',
          description: 'The end index for the visible range.',
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
        label: {
          type: 'string',
          description: 'The label for the dropdown item.',
        },
        value: {
          type: 'string',
          description: 'The value for the dropdown item.',
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
      children: {
        displaying: {
          type: 'string',
          description: 'The value for the word "displaying"',
          default: 'Viser',
        },
        label: {
          type: 'string',
          description: 'The value for the word "label"',
          default: 'elementer',
        },
        of: {
          type: 'string',
          description: 'The value for the word "of"',
          default: 'av',
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
