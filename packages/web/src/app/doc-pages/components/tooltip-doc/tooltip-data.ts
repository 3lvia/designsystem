import changelogJson from '@elvia/elvis-tooltip/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { TooltipProps } from '@elvia/elvis-tooltip/react';

export const tooltipData: ComponentData<Omit<TooltipProps, 'triggerAreaRef'>> = {
  changelog: changelogJson.content,
  name: 'Tooltip',
  attributes: {
    content: {
      isRequired: true,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, or rich content (use slot in web component if not just text).',
    },
    display: {
      type: 'string',
      default: '"inline-block"',
      description:
        'The display property for the trigger wrapper. Change this if the default display property interferes with your app layout.',
    },
    position: {
      type: '"top" | "right" | "bottom" | "left"',
      default: '"top"',
      description: 'The position of the tooltip.',
    },
    showDelay: {
      type: 'number',
      description:
        'The delay in ms before showing the tooltip. Note: When using keyboard, the delay is always 0.',
      default: 400,
    },
    isDisabled: {
      type: 'boolean',
      description: 'Disabled tooltip.',
      default: 'false',
    },
    trigger: {
      isRequired: true,
      type: 'HTMLElement | JSX.Element',
      description: 'The element that receives the tooltip. This is a slot when used as a web component.',
    },
  },
};
