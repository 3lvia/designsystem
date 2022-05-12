import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-popover/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const popoverData: ComponentData = {
  name: 'elvis-popover',
  elementNameW: 'elvia-popover',
  elementNameR: 'Popover',
  attributes: {
    header: {
      isRequired: false,
      type: 'string',
      description: 'Header of content',
      cegDisplayName: 'Header',
      cegType: 'string',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: exampleContents.texts.md['eng-GBR'].title,
      cegDependency: [{ name: 'type', value: 'informative' }],
    },
    hasCloseBtn: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the close button in the upper right corner should be visible',
      default: 'true',
      cegDisplayName: 'Close button',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: true,
      cegOption: 'false',
      cegDependency: [{ name: 'type', value: 'informative' }],
    },
    hasDivider: {
      isRequired: false,
      type: 'boolean',
      description:
        'With type list you can add a divider to group content. The divider will appear between each "ewc-popover__list-group" element section.',
      default: 'true',
      cegDisplayName: 'Divider',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
      cegDependency: [{ name: 'type', value: 'list' }],
    },
    isShowing: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines the popover is showing or not.',
      default: 'false',
    },
    isShowingOnChange: {
      isRequired: false,
      type: '(isShowing: boolean) => CustomEvent',
      description: 'Gets called every time the isShowing value is changed.',
    },
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text)',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'The element the user clicks to open the popover',
    },
    posY: {
      isRequired: false,
      type: '“bottom” | “top”',
      description: 'Position vertically',
      default: '“top”',
      cegDisplayName: 'Vertical position',
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'bottom'],
    },
    posX: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Position horizontally',
      default: '“center”',
      cegDisplayName: 'Horizontal position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
    },
    disableAutoClose: {
      isRequired: false,
      type: 'boolean',
      description:
        'If true, closes the popover whenever the user clicks anywhere inside the popover. Set to false if you want to control the closing yourself with isShowing property.',
      default: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the popover.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description: 'Custom CSS style object that can be added to the popover.',
    },
  },
  package: 'npm install @elvia/elvis-popover',
  codeImportReact: `import { Popover } from '@elvia/elvis-popover/react';`,
  codeImportWebComponent: `import '@elvia/elvis-popover';`,
  // Not used here, as there are separate files with code for each component type.
  codeReact: ``,
  codeAngular: ``,
  codeVue: ``,
  codeNativeHTML: ``,
  codeNativeScript: `  const popover = document.getElementById('example-elvia-popover');
  popover.addEventListener('isShowingOnChange', (event) => {
    console.log('Do what you want when visibility changes: ', event.detail.value);
  });
`,
  changelog: changelogJson.content,
};

export { popoverData };
