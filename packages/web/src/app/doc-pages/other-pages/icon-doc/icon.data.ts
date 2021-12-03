const accordionData = {
  name: 'elvia-icon',
  elementNameW: 'elvia-icon',
  elementNameR: 'ElvisIcon',
  attributes: {
    iconName: {
      isRequired: true,
      type: '"addCircle" | "box" | "flag" | "homeColor" | "power" | "smartCity"',
      description: '',
      default: '"addCircle"',
      displayName: 'IconName',
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['addCircle', 'box', 'flag', 'homeColor', 'power', 'smartCity'],
    },
    iconColor: {
      isRequired: true,
      type: '"addCircle" | "box" | "flag" | "homeColor" | "power" | "smartCity"',
      description: '',
      default: '"addCircle"',
      displayName: 'IconName',
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['addCircle', 'box', 'flag', 'homeColor', 'power', 'smartCity'],
    },
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
  codeAngular: `<elvia-accordion
  [iconName]="'addCircle'"
>

</elvia-accordion>
`,
  codeNativeHTML: `<elvia-icon
   iconName="addCircle"
  id="example-elvia-icon"
>
</elvia-accordion>
`,
  codeNativeScript: `  const elvisIcon = document.getElementById('example-elvia-icon');
//   elvisIcon.setProps({openLabel: 'Show' });
//   elvisIcon.setProps({closeLabel: 'Hide'});
`,
};

export { accordionData };
