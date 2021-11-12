import { exampleContents } from 'src/app/shared/example-contents';

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
      displayName: 'Colored',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'false',
      cegOption: 'true',
    },
  },
  package: 'npm install @elvia/elvis-box',
  codeImportReact: `import { Box } from '@elvia/elvis-box/react';`,
  codeImportWebComponent: `import '@elvia/elvis-box';`,
  codeReact: `<Box
  title={<h1>Customer relations</h1>}
  content={<div>
    <elvia-tabs [items]="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>}
></Box>`,
  codeAngular: `<elvia-box 
>
  <h1 slot="title">
    Customer relations
  </h1>
  <div slot="content">
    <elvia-tabs [items]="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  codeNativeHTML: `<elvia-box 
>
  <h1 slot="title">
    Customer relations
  </h1>
  <div slot="content">
    <elvia-tabs items='["AMS-meter", "Electric car", "HAN-port"]'></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
};

export { boxData };
