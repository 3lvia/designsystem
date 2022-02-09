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
      cegDisplayName: 'Types',
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
      cegDisplayName: 'Title',
    },
    typography: {
      isRequired: false,
      type: '“medium” | “caps”',
      description: 'Type of title',
      default: '“medium”',
      cegDisplayName: 'Typography',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['medium', 'caps'],
      cegDependency: [{ name: 'type', value: 'title' }],
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
      cegDisplayName: 'Orientation',
      cegDefault: 'horizontal',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['horizontal', 'vertical'],
      cegDependency: [{ name: 'type', value: 'simple' }],
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom css classes that can be added to the divider.',
    },
    inlineStyle: {
      isRequired: false,
      type: 'string',
      description: 'Custom css style that can be added to the divider.',
    },
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
  codeVue: `<elvia-divider
>
  <h2 slot="title">Title</h2>
</elvia-divider>`,
  codeNativeHTML: `<elvia-divider
>
  <h2 slot="title">Title</h2>
</elvia-divider>
`,
};
