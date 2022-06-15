import changelogJson from 'src/assets/changelogs/elvis-tabs/CHANGELOG.json';
import { exampleContents } from 'src/app/shared/example-contents';
import ComponentData from '../component-data.interface';

export const tabsData: ComponentData = {
  name: 'elvis-tabs',
  elementNameW: 'elvia-tabs',
  elementNameR: 'Tabs',
  attributes: {
    items: {
      isRequired: true,
      type: 'string[]',
      description: 'Items shown as tabs.',
      cegDisplayName: 'Tabs',
    },
    value: {
      isRequired: false,
      type: 'number',
      description: 'Index of selected tab.',
      default: '0',
    },
    ariaLabel: {
      isRequired: false,
      type: 'string',
      description: 'Aria label that describes the tablist. Aria label should be added for accessibility.',
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'Decides if tabs should be inverted.',
      default: 'false',
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
    },
    hasManualActivation: {
      isRequired: false,
      type: 'boolean',
      description:
        'Activates the tab when user hits either space, enter or a mouse click. Manual activation is usually necessary when panels cannot be displayed instantly.',
      default: 'false',
      cegDisplayName: 'Activate tab manually',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
      cegDisplayGroup: 'Keyboard navigation',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number) => CustomEvent',
      description:
        'Gets called every time the value is changed. Value is the index of the clicked tab in items.',
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
  ariaLabel={'Simple tablist example'}
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
  [ariaLabel]="'Simple tablist example'"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-tabs>`,
  codeVue:
    `<elvia-tabs 
  :value="0"
  :items="['` +
    exampleContents.words.random['eng-GBR'][0] +
    `', '` +
    exampleContents.words.random['eng-GBR'][1] +
    `', '` +
    exampleContents.words.random['eng-GBR'][2] +
    `']" 
  :ariaLabel="'Simple tablist example'"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-tabs>`,
  codeNativeHTML: `<elvia-tabs 
  id="example-elvia-tabs"
></elvia-tabs>
`,
  codeNativeScript: `  const tabs = document.getElementById('example-elvia-tabs');
  const items = [${JSON.stringify(exampleContents.words.random['eng-GBR'][0])}, ${JSON.stringify(
    exampleContents.words.random['eng-GBR'][1],
  )}, ${JSON.stringify(exampleContents.words.random['eng-GBR'][2])}]
  tabs.setProps({items: items})
  tabs.setProps({value: 0 });
  tabs.setProps({ariaLabel: 'Simple tablist example' });
  tabs.addEventListener('valueOnChange', (event) => {
    console.log('Do what you want with selected tab: ', event.detail.value)
  });
`,
  changelog: changelogJson.content,
  does: ['If you have sub-sections of a page and can not display everything at once'],
  donts: [
    'If the content can be displayed at once.',
    'Don’t use tab in tab.',
    'Primary navigation that links to other pages',
  ],
};
