const breadcrumbData = {
  name: 'elvis-breadcrumb',
  elementNameW: 'elvia-breadcrumb',
  elementNameR: 'Breadcrumb',
  attributes: {
    breadcrumbs: {
      isRequired: true,
      type: 'Array<object>',
      description:
        'The links that the breadcrumb consists of. Send in as array of objects with the key value pairs of {url: string, title: string}',
    },
  },
  package: 'npm install @elvia/elvis-breadcrumb',
  codeImportReact: `import { Breadcrumb } from '@elvia/elvis-breadcrumb/react';`,
  codeImportWebComponent: `import '@elvia/elvis-breadcrumb';`,
  codeReact: `const breadcrumbs = [
  {
    url: 'https://design.elvia.io/',
    title: 'Home',
  },
  {
    url: 'https://design.elvia.io/components',
    title: 'Components',
  },
  {
    url: 'https://design.elvia.io/components/breadcrumb',
    title: 'Breadcrumbs',
  },
];
  
<Breadcrumb breadcrumbs={breadcrumbs}>
</Breadcrumb>`,
  codeWebComponent: `// in ts
  const breadcrumbs = [
    {
      url: 'https://design.elvia.io/',
      title: 'Home',
    },
    {
      url: 'https://design.elvia.io/components',
      title: 'Components',
    },
    {
      url: 'https://design.elvia.io/components/breadcrumb',
      title: 'Breadcrumbs',
    },
  ];

// in html
<elvia-breadcrumb [breadcrumbs]="breadcrumbs">
</elvia-breadcrumb>`,
};

export { breadcrumbData };
