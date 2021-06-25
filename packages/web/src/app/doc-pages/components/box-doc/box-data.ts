const boxData = {
  name: 'elvis-box',
  elementNameW: 'elvia-box',
  elementNameR: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'Text, images, tables or any other content (slot in angular)',
    },
    title: {
      isRequired: false,
      type: `HTMLElement`,
      description: `Title for the box (slot in angular)`,
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'If the box is on a white background this prop should be used.',
      default: 'false',
      displayName: 'White',
      cegDefault: 1,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Light grey'],
    },
    isColored: {
      isRequired: false,
      type: 'boolean',
      description: 'Green line on top of box. Should be used---',
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
  codeReact:
    `<Box
  title={<h1>Title of box</h1>}
  content={<div>Content of box</div>}
></Box>`,
  codeWebComponent:
    `<elvia-box 
>
  <h1 slot="title">
    Title of box
  </h1>
  <div slot="content">
    Content of box
  </div>
</elvia-box>`,

  // codeWebComponent: `<elvia-box [hasBorder]="true" [isColored]="true">
  //       <h2 slot="title">Title</h2>
  //       <div slot="content">Webcomponentent content for the box component</div>
  //     </elvia-box>`
};

export { boxData };
