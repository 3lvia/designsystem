import changelogJson from 'src/assets/changelogs/elvis-timepicker/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const tooltipData: ComponentData = {
  name: 'elvis-tooltip',
  elementNameW: 'elvia-tooltip',
  elementNameR: 'Tooltip',
  attributes: {
    content: {
      isRequired: true,
      type: 'string',
      description: 'The content placed in the tooltip.',
      cegDisplayName: 'Content',
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
      description: 'The element that receives the tooltip.',
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
  content="I'm a tooltip!"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</Tooltip>`,
  codeAngular: `<elvia-tooltip
  content="I'm a tooltip!"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</elvia-tooltip>`,
  codeVue: `<elvia-tooltip
  content="I'm a tooltip!"
>
  <button slot="trigger" class="e-btn e-btn--icon e-btn--lg" aria-label="Vis tooltip">
    <span class="e-btn__icon">
      <i class="e-icon e-icon--star" aria-hidden="true"></i>
    </span>
  </button>
</elvia-tooltip>`,
  codeNativeHTML: `<elvia-tooltip
  content="I'm a tooltip!"
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
