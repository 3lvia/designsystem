import { exampleContents } from 'src/app/shared/example-contents';

export const dropdownData = {
  name: 'elvis-dropdown',
  elementNameW: 'elvia-dropdown',
  elementNameR: 'Dropdown',
  attributes: {
    options: {
      isRequired: true,
      type: 'Array<object>',
      description: 'Options available in the dropdown menu',
      displayName: 'Options',
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected tab.',
      default: '0',
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if tabs should be inverted',
      default: 'false',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => void',
      description: 'Gets called every time the value is changed.',
    },
  },
  package: 'npm install @elvia/elvis-dropdown',
  codeImportReact: `import { Dropdown } from '@elvia/elvis-dropdown/react';`,
  codeImportWebComponent: `import '@elvia/elvis-dropdown';`,
  codeReact:
    `<Tabs 
  items={'` +
    exampleContents.words.random['eng-GBR'][0] +
    `', '` +
    exampleContents.words.random['eng-GBR'][1] +
    `', '` +
    exampleContents.words.random['eng-GBR'][2] +
    `'}
  value={1}
></Tabs>`,
  codeWebComponent:
    `<elvia-tabs 
  [items]="['` +
    exampleContents.words.random['eng-GBR'][0] +
    `', '` +
    exampleContents.words.random['eng-GBR'][1] +
    `', '` +
    exampleContents.words.random['eng-GBR'][2] +
    `']" 
  value="1"
></elvia-tabs>`,
  does: ['If you have sub-sections of a page and can not display everything at once'],
  donts: [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ],
};
