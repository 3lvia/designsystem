import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-box/CHANGELOG.json';
const { content } = changelogJson;

const boxData = {
  name: 'elvis-box',
  elementNameW: 'elvia-box',
  elementNameR: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (slot in webcomponent)',
    },
    title: {
      isRequired: false,
      type: `string | HTMLElement`,
      description: `Title for the box (slot in webcomponent)`,
      cegDisplayName: 'Title',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegSlot: '<h1>Customer relations</h1>',
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'If the box is on a white background this prop should be used.',
      default: 'false',
      cegDefault: 1,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Light grey'],
    },
    isColored: {
      isRequired: false,
      type: 'boolean',
      description:
        'Green line on top of box. The box with a colored line should be used if you want the box to take more attention, but not use multiple boxes with colored lines on the same page.',
      default: 'false',
      cegDisplayName: 'Colored',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the box.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the box.',
    },
  },
  package: 'npm install @elvia/elvis-box',
  codeImportReact: `import { Box } from '@elvia/elvis-box/react';`,
  codeImportWebComponent: `import '@elvia/elvis-box';`,
  codeReact: `<Box
  content={<div>
    <Tabs items={['AMS-meter', 'Electric car', 'HAN-port']}></Tabs>
    <div className="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>}
></Box>`,
  codeAngular: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs [items]="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  codeVue: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs :items="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  codeNativeHTML: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs items='["AMS-meter", "Electric car", "HAN-port"]'></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  changelog: content,
};

export { boxData };
