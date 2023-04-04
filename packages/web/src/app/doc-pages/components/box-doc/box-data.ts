import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-box/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const boxData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Box',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (slot in webcomponent).',
    },
    title: {
      isRequired: false,
      type: `string | HTMLElement | JSX.Element`,
      description: `Title for the box (slot in webcomponent).`,
      cegDisplayName: 'Title',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegSlot: '<h1>Customer relations</h1>',
    },
    hasBorder: {
      isRequired: false,
      type: 'boolean',
      description: 'Use this prop if the box is on a white background.',
      default: 'false',
      cegDefault: 1,
      cegType: 'boolean',
      cegFormType: 'background',
      cegOptions: ['White', 'Light grey'],
    },
    isColored: {
      isRequired: false,
      type: 'boolean',
      description:
        'Green line on top of box. Use the green line to draw attention, but avoid using multiple boxes with green lines on the same page.',
      default: 'false',
      cegDisplayName: 'Colored',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the box.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the box. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  codeReact: `<Box
  content={<div>
    <Tabs items={['AMS-meter', 'Electric car', 'HAN-port']}></Tabs>
    <div className="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>}
></Box>`,
  codeAngular: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs [items]="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  codeVue: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs :items="['AMS-meter', 'Electric car', 'HAN-port']"></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,
  codeNativeHTML: `<elvia-box 
>
  <div slot="content">
    <elvia-tabs items='["AMS-meter", "Electric car", "HAN-port"]'></elvia-tabs>
    <div class="e-mt-16">${exampleContents.texts.sm['eng-GBR'].description}</div>
  </div>
</elvia-box>`,

  codeNativeScript: ``,
};

export { boxData };
