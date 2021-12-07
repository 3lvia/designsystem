const elvisIconData = {
  name: 'elvia-icon',
  elementNameW: 'elvia-icon',
  elementNameR: 'ElvisIcon',
  attributes: {
    iconName: {
      isRequired: true,
      type: 'string',
      description: 'Available icons from eliva/elvis-assets-icons package, in camelCase',
      default: '""',
      cegDisplayName: 'IconNames',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'iconName',
      cegOptions: ['addCircle', 'box'],
    },
    iconColor: {
      isRequired: false,
      type: 'string',
      description: 'Color of icon, can be any color value like string, hex or rgba',
      default: '',
    },
    iconSize: {
      isRequired: false,
      type: `"xxs" ... =>  "xxl"`,
      description: `Standard size of icon, follows same sizing guide as css classes, e.g "xs" = 16px, "sm" = 24px `,
      default: '"sm"',
    },
    iconDisplay: {
      isRequired: false,
      type: `"inline" | "block"`,
      description: `Define display property of icon element to be inline or block`,
      default: '"inline"',
    },
    customSize: {
      isRequired: false,
      type: 'string',
      description: 'Give the icon any valid css size property like 15px, 1em, 1.25rem',
      default: '',
    },
  },
  package: 'npm install @elvia/elvis-icon',
  codeImportReact: `import { ElvisIcon } from '@elvia/elvis-icon/react';`,
  codeImportWebComponent: `import '@elvia/elvis-icon';`,
  codeReact: `<ElvisIcon
  iconName={"addCircle"}
></ElvisIcon>
`,
  codeAngular: `<elvia-icon
  [iconName]="'addCircle'"
>
</elvia-icon>
`,
  codeNativeHTML: `<elvia-icon
  iconName="addCircle"
  id="example-elvia-icon"
>
</elvia-icon>
`,
  codeNativeScript: `const elvisIcon = document.getElementById('example-elvia-icon');
`,
};

export { elvisIconData };
