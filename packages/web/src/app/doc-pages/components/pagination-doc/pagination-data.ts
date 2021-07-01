import { exampleContents } from 'src/app/shared/example-contents';

export const paginationData = {
  name: 'elvis-pagination',
  elementNameW: 'elvia-pagination',
  elementNameR: 'Pagination',
  attributes: {
    value: {
      isRequired: false,
      type: 'object',
      description: 'Value range of currently selected pagination, {start: number, end: number}',
      displayName: 'value',
      default: '{ start: undefined, end: undefined }',
    },
    items: {
      isRequired: true,
      type: 'number',
      description: 'Total amount of rows/objects in a table that is display',
      default: 0,
    },
    paginatorDropdownOptions: {
      isRequired: true,
      type: 'object',
      description: 'Options available in the pagination dropdown menu, set as array of objects with keys of :  {value: string, label: string}',
      default: `[
        {
          value: '10',
          label: '10'
        },
        {
          value: '20',
          label: '20'
        },
        {
          value: '30',
          label: '30'
        },
        {
          value: '40',
          label: '40'
        },
      ]`,
    },
    labelDisplaying: {
      isRequired: false,
      type: 'string',
      description: 'First label in front of dropdown menu',
      default: 'Viser',
    },
    labelOf: {
      isRequired: false,
      type: 'string',
      description: 'Label between dropdown menu and amount of items being showed',
      default: 'av',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label for describing what kind of data is displayed, eg. rows, items.',
      default: 'rader',
    },
    valueOnChange: {
      isRequired: false,
      type: 'function',
      description: `Gets called every time a selection range is updated and return a value object with start and end key value pairs`,
    },
  },
  package: 'npm install @elvia/elvis-pagination',
  codeImportReact: `import { Pagination } from '@elvia/elvis-pagination/react';`,
  codeImportWebComponent: `import '@elvia/elvis-pagination';`,
  codeReact:
    `<Pagination 
  items={156} 
  labelDisplaying="Displaying" 
  valueOnChange={(event) => console.log(event)}>
</Pagination>`,
  codeWebComponent:
    `<elvia-pagination 
  items="156" 
  labelDisplaying="Displaying" 
  (valueOnChange)="console.log($event.detail.value)">
</elvia-pagination>`,
};


