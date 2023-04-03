import changelogJson from 'src/assets/changelogs/elvis-tooltip/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const tooltipData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Tooltip',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, or rich content (use slot in web component if not just text).',
    },
    display: {
      isRequired: false,
      type: 'string',
      default: '"inline-block"',
      description:
        'The display property for the trigger wrapper. Change this if the default display property interferes with your app layout.',
    },
    position: {
      isRequired: false,
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description: 'The position of the tooltip.',
    },
    showDelay: {
      isRequired: false,
      type: 'number',
      description:
        'The delay in ms before showing the tooltip. Note: When using keyboard, the delay is always 0.',
      default: 400,
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Disabled tooltip.',
      default: 'false',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element that receives the tooltip. This is a slot when used as a web component.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description:
        'Custom CSS classes that can be added to the tooltip. NB: This applies to the content, not the trigger.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the tooltip. Example: {marginTop: '8px', width: '100%'}. NB: This applies to the content, not the trigger.",
    },
  },
  codeReact: ``,
  codeAngular: ``,
  codeVue: ``,
  codeNativeHTML: ``,
  codeNativeScript: ``,
};
