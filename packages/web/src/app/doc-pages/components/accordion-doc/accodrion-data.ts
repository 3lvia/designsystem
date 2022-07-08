import { exampleContents } from 'src/app/shared/example-contents';
import changelogJson from 'src/assets/changelogs/elvis-accordion/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const accordionData: ComponentData = {
  name: 'elvis-accordion',
  elementNameW: 'elvia-accordion',
  elementNameR: 'Accordion',
  attributes: {
    isOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the accordion is open or closed.',
      default: 'false',
    },
    type: {
      isRequired: false,
      type: '“normal” | “overflow”',
      description: 'Variants of accordion',
      default: '"normal"',
      cegDefault: 0,
      cegType: 'string',
      cegFormType: 'type',
      cegOptions: ['normal', 'overflow'],
    },
    overflowHeight: {
      isRequired: false,
      type: 'number',
      description:
        'How much content (in pixels) to display before opening the accordion. Only affects accordion with type "overflow".',
    },
    content: {
      isRequired: true,
      type: 'string | HTMLElement',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text).',
    },
    isFullWidth: {
      isRequired: false,
      type: `boolean`,
      description: `Determines if the accordion is full width.`,

      cegDisplayName: 'Full width',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
    },
    labelPosition: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal position of label and button.',
      default: '"center"',
      cegDisplayName: 'position',
      cegDefault: 'center',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['left', 'center', 'right'],
      cegDependency: [{ name: 'isFullWidth', value: 'false' }],
    },
    size: {
      isRequired: false,
      type: '“small” | “medium” | “large”',
      description: 'Size of accordion label and button.',
      default: '"medium"',
      cegDisplayName: 'Size',
      cegDefault: 'medium',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['small', 'medium', 'large'],
    },
    openLabel: {
      isRequired: false,
      type: `string`,
      description: `Label for opening the accordion. Will also set the aria-label of the button opening the accordion. NB: the prop ariaLabelOpen has higher priority and will overwrite the aria-label.`,
    },
    closeLabel: {
      isRequired: false,
      type: `string`,
      description: `Label for closing the accordion. Will also set the aria-label of the button closing the accordion. NB: the prop ariaLabelClose has higher priority and will overwrite the aria-label.`,
    },
    openAriaLabel: {
      isRequired: false,
      type: `string`,
      description: `Aria-label for the button opening the accordion.`,
    },
    closeAriaLabel: {
      isRequired: false,
      type: `string`,
      description: `Aria-label for the button closing the accordion. `,
    },
    openDetailText: {
      isRequired: false,
      type: `string`,
      description: `Detail text for the button opening the accordion. Will be displayed next to the label.`,
    },
    closeDetailText: {
      isRequired: false,
      type: `string`,
      description: `Detail text for the button closing the accordion. Will be displayed next to the label.`,
    },
    isStartAligned: {
      isRequired: false,
      type: `boolean`,
      description: `Determines if the accordion is full width.`,

      cegDisplayName: 'Start aligned',
      cegType: 'boolean',
      cegFormType: 'toggle',
      cegDefault: false,
      cegOption: 'true',
      cegDependency: [{ name: 'isFullWidth', value: 'false' }],
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the accordion.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the accordion. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-accordion',
  codeImportReact: `import { Accordion } from '@elvia/elvis-accordion/react';`,
  codeImportWebComponent: `import '@elvia/elvis-accordion';`,
  codeReact:
    `<Accordion
  type={"normal"}
  openLabel={"Show"}
  closeLabel={"Hide"}
  labelPosition={"center"}
  size={"medium"}
  content={"` +
    exampleContents.texts.lg['eng-GBR'].description +
    `"}
></Accordion>
`,
  codeAngular:
    `<elvia-accordion
  [type]="'normal'"
  [openLabel]="'Show'"
  [closeLabel]="'Hide'"
  [labelPosition]="'center'"
  [size]="'medium'"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeVue:
    `<elvia-accordion
  :type="'normal'"
  :openLabel="'Show'"
  :closeLabel="'Hide'"
  :labelPosition="'center'"
  :size="'medium'"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeHTML:
    `<elvia-accordion
  type="normal"
  labelPosition="center"
  size="medium"
  id="example-elvia-accordion"
>
  <div slot="content">
    ` +
    exampleContents.texts.lg['eng-GBR'].description +
    `
  </div>
</elvia-accordion>
`,
  codeNativeScript: `  const accordion = document.getElementById('example-elvia-accordion');
  accordion.setProps({openLabel: 'Show' });
  accordion.setProps({closeLabel: 'Hide'});
`,
  changelog: changelogJson.content,
};

export { accordionData };
