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
      cegDefault: 'simple',
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['simple', 'title', 'curved'],
    },
    title: {
      isRequired: false,
      type: 'HTMLElement',
      description: 'Title displayed together with a divider. Send in as slot in Angular and HTMLElement in React.',
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
      description: 'The inverted divider fit for darker backgrounds.',
      default: 'false',
      displayName: 'Inverted',
      cegDefault: 'White',
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Dark grey'],
    },
  },
  codeImportReact: `import { Divider } from '@elvia/elvis-divider/react';`,
  codeImportWebComponent: `import '@elvia/elvis-divider';`,
  codeReact: `<Divider
  title={<h2>Title</h2>}
></Divider>`,
  codeWebComponent: `<elvia-divider
>
  <h2 slot="title">Title</h2>
</elvia-divider>`,
};
