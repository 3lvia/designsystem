export const dividerData = {
  name: 'elvis-divider',
  elementNameW: 'elvia-divider',
  elementNameR: 'Divider',
  package: 'npm install @elvia/elvis-divider',
  attributes: {
    type: {
      isRequired: false,
      type: '"simple" | "title" | "curved"',
      description: 'A curved version of the divider, which follow the Elvia curve formula.',
      default: '"simple"',
      displayName: 'Types',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['simple', 'title', 'curved'],
    },
    title: {
      isRequired: false,
      type: 'HTMLElement',
      description:
        'Title displayed together with a divider. Send in as slot in webcomponent and HTMLElement in React.',
      default: '"Title"',
      displayName: 'Title',
    },
    typography: {
      isRequired: false,
      type: '“medium” | “caps”',
      description: 'Type of title',
      default: '“medium”',
      displayName: 'Typography',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['medium', 'caps'],
      cegTypeDependency: 'title',
    },
    isInverted: {
      isRequired: false,
      type: 'boolean',
      description: 'If the divider is on a dark grey background this prop should be used.',
      default: 'false',
      cegDefault: 0,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
    },
    orientation: {
      isRequired: false,
      type: '"horizontal" | "vertical"',
      description: 'Change the orientation of the divider.',
      default: '"horizontal"',
      displayName: 'Orientation',
      cegDefault: 'horizontal',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['horizontal', 'vertical'],
      cegTypeDependency: 'simple',
    }
  },
  codeImportReact: `import { Divider } from '@elvia/elvis-divider/react';`,
  codeImportWebComponent: `import '@elvia/elvis-divider';`,
  codeReact: `<Divider
  title={<h2>Title</h2>}
></Divider>`,
  codeAngular: `<elvia-divider
>
  <h2 slot="title">Title</h2>
</elvia-divider>`,
  codeNativeHTML: `<elvia-divider
>
  <h2 slot="title">Title</h2>
</elvia-divider>
`,
};
