import changelogJson from 'src/assets/changelogs/elvis-tooltip/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const tooltipData: ComponentData = {
  name: 'elvis-tooltip',
  elementNameW: 'elvia-tooltip',
  elementNameR: 'Tooltip',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, or rich content (use slot in web component if not just text).',
      cegDisplayName: 'Content',
      cegType: 'string',
      cegFormType: 'custom-text',
      cegDefault: "I'm a tooltip!",
    },
    position: {
      isRequired: false,
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description: 'The position of the tooltip.',
      cegDisplayName: 'Position',
      cegDefault: 'top',
      cegType: 'string',
      cegFormType: 'radio',
      cegOptions: ['top', 'right', 'bottom', 'left'],
    },
    showDelay: {
      isRequired: false,
      type: 'number',
      description:
        'The delay in ms before showing the tooltip. Note: When using keyboard, the delay is always 0.',
      default: 400,
      cegDisplayName: 'Show delay',
      cegType: 'number',
      cegFormType: 'counter',
      cegDefault: 400,
      cegCounterMax: 800,
      cegCounterMin: 0,
      cegStepValue: 100,
      cegCounterType: 'ms',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Disabled tooltip.',
      default: 'false',
      cegDisplayName: 'Disabled',
      cegType: 'boolean',
      cegFormType: 'checkbox',
      cegOption: 'true',
      cegDisplayGroup: 'State',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element that receives the tooltip. This is a slot when used as a web component.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the tooltip.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the tooltip. Example: {marginTop: '8px', width: '100%'}",
    },
  },
  package: 'npm install @elvia/elvis-tooltip',
  codeImportReact: `import { Tooltip } from '@elvia/elvis-tooltip/react';`,
  codeImportTypescriptInterface: `import { TooltipProps } from '@elvia/elvis-tooltip/react';`,
  codeImportWebComponent: `import '@elvia/elvis-tooltip';`,
  codeReact: `<Tooltip
  showDelay={400}
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</Tooltip>`,
  codeAngular: `<elvia-tooltip
  [showDelay]="400"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</elvia-tooltip>`,
  codeVue: `<elvia-tooltip
  :showDelay="400"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</elvia-tooltip>`,
  codeNativeHTML: `<elvia-tooltip
  showDelay="400"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</elvia-tooltip>`,
  codeNativeScript: ``,
  changelog: changelogJson.content,
};
