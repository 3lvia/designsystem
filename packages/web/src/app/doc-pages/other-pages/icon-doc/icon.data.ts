const elvisIconData = {
  name: 'elvia-icon',
  elementNameW: 'elvia-icon',
  elementNameR: 'ElvisIcon',
  attributes: {
    name: {
      isRequired: true,
      type: 'string',
      description: 'Available icons from elvia/elvis-assets-icons package, in camelCase',
      default: '""',
      cegDisplayName: 'name',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'iconName',
      cegOptions: ['addCircle', 'box'],
    },
    color: {
      isRequired: false,
      type: 'string',
      description: 'Color of icon, can be any color value like string, hex or rgba',
      default: '',
    },
    size: {
      isRequired: false,
      type: `"xxs" ... =>  "xxl"`,
      description: `Standard size of icon, follows same sizing guide as css classes, e.g "xs" = 16px, "sm" = 24px `,
      default: '"sm"',
      propertyTableMultiline: true,
    },
    customSize: {
      isRequired: false,
      type: 'string',
      description: 'Give the icon any valid css size property like 15px, 1em, 1.25rem',
      default: '',
    },
  },
  package: 'npm install @elvia/elvis-icon',
  codeImportReact: `import { Icon } from '@elvia/elvis-icon/react';`,
  codeImportWebComponent: `import '@elvia/elvis-icon';`,
  codeReact: `<Icon
  name={"addCircle"}
></Icon>
`,
  codeAngular: `<elvia-icon
  [name]="'addCircle'"
>
</elvia-icon>
`,
  codeNativeHTML: `<elvia-icon
  name="addCircle"
  id="example-elvia-icon"
>
</elvia-icon>
`,
  codeNativeScript: `const elvisIcon = document.getElementById('example-elvia-icon');
`,
};

export { elvisIconData };
