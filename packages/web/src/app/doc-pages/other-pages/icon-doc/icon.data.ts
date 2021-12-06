const elvisIconData = {
  name: 'elvia-icon',
  elementNameW: 'elvia-icon',
  elementNameR: 'ElvisIcon',
  attributes: {
    // iconName: {
    //   isRequired: true,
    //   type: '"addCircle" | "box" | "flag" | "homeColor" | "power" | "smartCity"',
    //   description: '',
    //   default: '"addCircle"',
    //   displayName: 'IconName',
    //   cegType: 'string',
    //   cegFormType: 'type',
    //   cegOptions: ['addCircle', 'box', 'flag', 'homeColor', 'power', 'smartCity'],
    // },
    // isRequired: false,
    // type: '“normal” | “overflow”',
    // description: 'Variants of accordion',
    // default: '"normal"',
    // cegDisplayName: 'Types',
    // cegDefault: 0,
    // cegType: 'string',
    // cegFormType: 'type',
    // cegOptions: ['normal', 'overflow'],

    iconName: {
      isRequired: true,
      type: '"addCircle" | "box"',
      description: 'Available icons from eliva/elvis-assets-icons package',
      default: '"addCircle"',
      cegDisplayName: 'IconNames',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'iconName',
      cegOptions: ['addCircle', 'box'],
    },

    // iconColor: {
    //   isRequired: true,
    //   type: '"addCircle" | "box" | "flag" | "homeColor" | "power" | "smartCity"',
    //   description: '',
    //   default: '"addCircle"',
    //   displayName: 'IconName',
    //   cegType: 'string',
    //   cegFormType: 'type',
    //   cegOptions: ['addCircle', 'box', 'flag', 'homeColor', 'power', 'smartCity'],
    // },
    iconSize: {
      isRequired: false,
      type: `string`,
      description: `Size of icon`,
    },
    iconDisplay: {
      isRequired: false,
      type: `string`,
      description: `Define display property of icon element to inline or block`,
    },
    customSize: {
      isRequired: false,
      description: 'Give the icon any valid size',
      default: '',
      displayName: 'position',
      cegType: 'string',
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
  codeNativeScript: `  const elvisIcon = document.getElementById('example-elvia-icon');
`,
};

export { elvisIconData };
