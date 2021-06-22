const boxData = {
  name: 'elvis-box',
  elementNameW: 'elvia-box',
  elementNameR: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'HTMLElement',
      description: 'Text, images, tables or any other content (use slot in angular if not just text)',
    },
    title: {
      isRequired: false,
      type: `HTMLElement`,
      description: `Title for the box`,
    },
    whiteBg: {
      isRequired: false,
      type: 'boolean',
      description: 'If the box is set upon a white background this prop should be used.',
      default: 'false',
      displayName: 'White background',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'true',
      cegOption: 'true',
    },
    hasHeader: {
      isRequired: false,
      type: 'boolean',
      description: 'Green line on top of box.',
      default: 'false',
      displayName: 'Header',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: 'true',
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
  whiteBg={true}
  hasHeader={true}
></Box>`,
  codeWebComponent:
    `<elvia-box
  whiteBg="true"
  hasHeader="true"
>
  <h1 slot="title">
    Title of box
  </h1>
  <div slot="content">
    Content of box
  </div>
</elvia-box>`,
};

export { boxData };
