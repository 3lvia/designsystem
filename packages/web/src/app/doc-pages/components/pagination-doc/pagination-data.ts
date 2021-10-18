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
    dropdownMenuPos: {
      isRequired: false,
      type: 'string',
      description: `Set the position of the dropdown menu, can be either 'top', 'bottom' or 'auto'`,
      default: 'bottom',
    },
    isRightAligned: {
      isRequired: false,
      type: 'boolean',
      description: 'Align the paginator to the right',
      default: false,
    },
    paginatorDropdownOptions: {
      isRequired: true,
      type: 'object',
      description:
        'Options available in the pagination dropdown menu, set as array of objects with keys of :  {value: string, label: string}',
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
      default: 'elementer',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: object) => CustomEvent',
      description: `Gets called every time a selection range is updated and return a value object with start and end key value pairs`,
    },
  },
  package: 'npm install @elvia/elvis-pagination',
  codeImportReact: `import { Pagination } from '@elvia/elvis-pagination/react';`,
  codeImportWebComponent: `import '@elvia/elvis-pagination';`,
  codeReact: `<Pagination items={156}
  valueOnChange={(event) => handleOnChange(event)} >
</Pagination>`,
  codeAngular: `<elvia-pagination
  [items]="156" 
  (valueOnChange)="handleOnChange(event.detail.value)">
</elvia-pagination>`,
  codeNativeHTML: `<elvia-pagination id="example-elvia-pagination">
</elvia-pagination>`,

  codeNativeScript: `  const tabs = document.getElementById('example-elvia-pagination');
  const items = 156;
  tabs.setProps({items: items})
  tabs.addEventListener('valueOnChange', (event) => {
    console.log('Current selection range of paginator is : ', event.detail.value)
  });
`,
};
