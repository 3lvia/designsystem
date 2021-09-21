import { exampleContents } from 'src/app/shared/example-contents';

export const tabsData = {
  name: 'elvis-tabs',
  elementNameW: 'elvia-tabs',
  elementNameR: 'Tabs',
  attributes: {
    items: {
      isRequired: true,
      type: 'string[]',
      description: 'Items getting converted to tabs.',
      displayName: 'Tabs',
      // cegType: 'string',
      // cegFormType: 'counter',
      // cegDefault: 3,
      // cegCounterMax: 5,
      // cegCounterMin: 2,
      // cegStepValue: 1,
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
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description: 'Gets called every time the value is changed.',
    },
  },
  package: 'npm install @elvia/elvis-tabs',
  codeImportReact: `import { Tabs } from '@elvia/elvis-tabs/react';`,
  codeImportWebComponent: `import '@elvia/elvis-tabs';`,
  codeReact:
    `<Tabs 
  value={0}
  items={'` +
    exampleContents.words.random['eng-GBR'][0] +
    `', '` +
    exampleContents.words.random['eng-GBR'][1] +
    `', '` +
    exampleContents.words.random['eng-GBR'][2] +
    `'}
  valueOnChange={(event) => handleOnChange(event)}
></Tabs>`,
  codeAngular:
    `<elvia-tabs 
  [value]="0"
  [items]="['` +
    exampleContents.words.random['eng-GBR'][0] +
    `', '` +
    exampleContents.words.random['eng-GBR'][1] +
    `', '` +
    exampleContents.words.random['eng-GBR'][2] +
    `']" 
  (valueOnChange)="handleOnChange(event.detail.value)"
></elvia-tabs>`,
  codeNativeHTML:
    `<elvia-tabs 
  id="example-elvia-tabs"
></elvia-tabs>
`,
  codeNativeScript: `  const tabs = document.getElementById('example-elvia-tabs');
  const items = [${JSON.stringify(exampleContents.words.random['eng-GBR'][0])}, ${JSON.stringify(exampleContents.words.random['eng-GBR'][1])}, ${JSON.stringify(exampleContents.words.random['eng-GBR'][2])}]
  tabs.setProps({items: items})
  tabs.setProps({value: 0 });
  tabs.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected tab: ', event.detail.value)
  });
`,
  does: ['If you have sub-sections of a page and can not display everything at once'],
  donts: [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ],
};
