import changelogJson from '@elvia/elvis-accordion/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { AccordionProps } from '@elvia/elvis-accordion/react';

const accordionData: ComponentData<AccordionProps> = {
  changelog: changelogJson.content,
  name: 'Accordion',
  attributes: {
    isOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Determines if the accordion is open or closed.',
      default: 'false',
    },
    isHovering: {
      isRequired: false,
      type: 'boolean',
      description: 'Adds the hover style to the accordion button when set to true.',
      default: 'false',
    },
    type: {
      isRequired: false,
      type: '“normal” | “overflow” | “single”',
      description: 'Variants of accordion',
      default: '"normal"',
    },
    overflowHeight: {
      isRequired: false,
      type: 'number',
      description:
        'How much content (in pixels) to display before opening the accordion. Only affects accordion with type "overflow".',
    },
    content: {
      isRequired: false,
      type: 'string | HTMLElement | JSX.Element',
      description: 'Text, images, tables or any other content (use slot in webcomponent if not just text).',
    },
    isFullWidth: {
      isRequired: false,
      type: `boolean`,
      description: `Determines if the accordion is full width.`,
    },
    labelPosition: {
      isRequired: false,
      type: '“left” | “center” | “right”',
      description: 'Horizontal position of label and button.',
      default: '"center"',
    },
    size: {
      isRequired: false,
      type: '“small” | “medium” | “large”',
      description: 'Size of accordion label and button.',
      default: '"medium"',
    },
    typography: {
      isRequired: false,
      type: 'string',
      description:
        'The accordion uses a custom typography. If you want to use any of the design system typographies, pass the name of the typography here. Example: "text-md"',
    },
    spacingAboveContent: {
      isRequired: false,
      type: '"8px" | "16px" | "24px"',
      description:
        'For normal accordion, if you want to change det padding between the accordion button and the content below it, you can use this attribute. Example: spacingAboveContent: "16px".',
      default: '"8px"',
    },
    spacingBelowContent: {
      isRequired: false,
      type: '"8px" | "16px" | "24px"',
      description:
        'For overflow accordion, if you want to change det padding between the accordion button and the content below it, you can use this attribute. Example: spacingBelowContent: "16px".',
      default: '"8px"',
    },
    openLabel: {
      isRequired: false,
      type: `string | JSX.Element`,
      description: `Label for opening the accordion. Can be slot in webcomponent. Will also set the aria-label of the button opening the accordion. NB: the prop ariaLabelOpen has higher priority and will overwrite the aria-label.`,
    },
    closeLabel: {
      isRequired: false,
      type: `string | JSX.Element`,
      description: `Label for closing the accordion. Can be slot in webcomponent. Will also set the aria-label of the button closing the accordion. NB: the prop ariaLabelClose has higher priority and will overwrite the aria-label. `,
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
      description: `Sets the accordion icon at the start, before the accordion label.`,
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
};

export { accordionData };
