import { UtilityGroup } from './utility.interface';

export const utilityGroups: UtilityGroup[] = [
  {
    title: 'Accessibility',
    path: '/tools/accessibility',
    classes: [
      {
        className: 'e-sr-only',
        description:
          'Screen readers only content. Hides the content so it will be visually hidden but still readable by modern screen readers.',
        styling: 'Hiding',
      },
    ],
  },
  {
    title: 'Border',
    classes: [
      { className: 'e-border-none', description: 'Removes the border.', styling: 'border: none' },
      { className: 'e-br-4', description: 'Gives the border radius 4px.', styling: 'border-radius: 4px' },
      { className: 'e-br-8', description: 'Gives the border radius 8px.', styling: 'border-radius: 8px' },
    ],
  },
  {
    title: 'Color',
    path: '/brand/color',
    classes: [
      {
        className: 'e-bg-name',
        description:
          'Sets the background to an available color in Elvis. Also sets text to contrast color of background-color.',
        styling: 'background-color: #colorname',
      },
      {
        className: 'e-text-name',
        description: 'Sets the text to an available color in Elvis',
        styling: 'color: #colorname',
      },
    ],
  },
  {
    title: 'Display',
    classes: [
      {
        className: 'e-none',
        description: 'Remove elements from the DOM.',
        styling: 'display: none',
      },
      {
        className: 'e-hide',
        description: 'Visibly hide the element without actually removing it.',
        styling: 'height: 0; overflow: hidden;',
      },
      {
        className: 'e-none-xl',
        description:
          'Remove elements from the DOM when the viewport width is within the MaxDesktop breakpoint.',
        styling: 'display: none',
      },
      {
        className: 'e-none-lg',
        description:
          'Remove elements from the DOM when the viewport width is within the MinDesktop breakpoint.',
        styling: 'display: none',
      },
      {
        className: 'e-none-md',

        description: 'Remove elements from the DOM when the viewport width is within the Tablet breakpoint.',
        styling: 'display: none',
      },
      {
        className: 'e-none-sm',
        description: 'Remove elements from the DOM when the viewport width is within the Mobile breakpoint.',
        styling: 'display: none',
      },
    ],
  },
  {
    title: 'Flex',
    classes: [
      {
        className: 'e-flex',
        description: 'Adds the flex attribute to the element.',
        styling: 'display: flex',
      },
      {
        className: 'e-flex-direction-column',
        description: 'Changes the flex direction to column.',
        styling: 'flex-direction: column',
      },
      {
        className: 'e-flex-direction-row',
        description: 'Changes the flex direction to row.',
        styling: 'flex-direction: row',
      },
      {
        className: 'e-justify-content-center',
        description: 'Distributes items on the main axis around the center.',
        styling: 'justify-content: center',
      },
      {
        className: 'e-justify-content-start',
        description: 'Distributes items on the main axis from the start.',
        styling: 'justify-content: flex-start',
      },
      {
        className: 'e-justify-content-end',
        description: 'Distributes items on the main axis from the end.',
        styling: 'justify-content: flex-end',
      },
      {
        className: 'e-justify-content-between',
        description:
          'Distribute items evenly. The first item is flush with the start, the last is flush with the end.',
        styling: 'justify-content: space-between',
      },
      {
        className: 'e-justify-content-around',
        description: 'Distribute items evenly. Items have a half-size space on either end.',
        styling: 'justify-content: space-around',
      },
      {
        className: 'e-align-items-center',
        description: 'Aligns the items around the center.',
        styling: 'align-items: center',
      },
      {
        className: 'e-align-items-start',
        description: 'Aligns the items from the start on the cross axis.',
        styling: 'align-items: flex-start',
      },
      {
        className: 'e-align-items-end',
        description: 'Aligns the items from the end.',
        styling: 'align-items: flex-end',
      },
      {
        className: 'e-flex-wrap',
        description: 'Wrap the items',
        styling: 'flex-wrap: wrap',
      },
      {
        className: 'e-flex-wrap-reverse',
        description: 'Wrap the items in reverse',
        styling: 'flex-wrap: wrap-reverse',
      },
      {
        className: 'e-gap-number',
        description: 'Decides the gap between flex elements, from 0-40 following 8px multiplication.',
        styling: 'gap: {number}px',
      },
    ],
  },
  {
    title: 'Focus',
    path: '/tools/accessibility',
    fragment: 'Keyboard-navigation',
    classes: [
      {
        className: 'e-outline',
        description: 'Adds outline to elements.',
        styling: 'outline: 2px solid $focus-color; outline-offset: 2px;',
      },
    ],
  },
  {
    title: 'Shadow',
    classes: [
      {
        className: 'e-shadow-none',
        description: 'Removes box-shadow on element.',
        styling: 'box-shadow: none',
      },
      {
        className: 'e-shadow-soft',
        description: 'Set a soft box-shadow on element.',
        styling: 'box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.03)',
      },
      {
        className: 'e-shadow-medium',
        description: 'Set a medium box-shadow on element.',
        styling: 'box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06)',
      },
      {
        className: 'e-shadow-hard',
        description: 'Set a hard box-shadow on element.',
        styling: 'box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.08)',
      },
    ],
  },
  {
    title: 'Spacing',
    path: '/brand/layout',
    fragment: 'Spacing',
    classes: [
      {
        className: 'e-p-number',
        description: 'Set padding in all directions, from 0-112 following 8px multiplication.',
        styling: 'padding: {number}px',
      },
      {
        className: 'e-pl-number',
        description: 'Set padding left, from 0-112 following 8px multiplication.',
        styling: 'padding-left: {number}px',
      },
      {
        className: 'e-pr-number',
        description: 'Set padding right, from 0-112 following 8px multiplication.',
        styling: 'padding-right: {number}px',
      },
      {
        className: 'e-pt-number',
        description: 'Set padding top, from 0-112 following 8px multiplication.',
        styling: 'padding-top: {number}px',
      },
      {
        className: 'e-pb-number',
        description: 'Set padding bottom, from 0-112 following 8px multiplication.',
        styling: 'padding-bottom: {number}px',
      },
      {
        className: 'e-px-number',
        description: 'Set padding left and right, from 0-112 following 8px multiplication.',
        styling: 'padding-left: {number}px; padding-right: {number}px;',
      },
      {
        className: 'e-py-number',
        description: 'Set padding top and bottom, from 0-112 following 8px multiplication.',
        styling: 'padding-top: {number}px; padding-bottom: {number}px;',
      },
      {
        className: 'e-m-number',
        description: 'Set margin in all directions, from 0-112 following 8px multiplication.',
        styling: 'margin: {number}px',
      },
      {
        className: 'e-ml-number',
        description: 'Set margin left, from 0-112 following 8px multiplication.',
        styling: 'margin-left: {number}px',
      },
      {
        className: 'e-mr-number',
        description: 'Set margin right, from 0-112 following 8px multiplication.',
        styling: 'margin-right: {number}px',
      },
      {
        className: 'e-mt-number',
        description: 'Set margin top, from 0-112 following 8px multiplication.',
        styling: 'margin-top: {number}px',
      },
      {
        className: 'e-mb-number',
        description: 'Set margin bottom, from 0-112 following 8px multiplication.',
        styling: 'margin-bottom: {number}px',
      },
      {
        className: 'e-mx-number',
        description: 'Set margin left and right, from 0-112 following 8px multiplication.',
        styling: 'margin-left: {number}px; margin-right: {number}px;',
      },
      {
        className: 'e-my-number',
        description: 'Set margin top and bottom, from 0-112 following 8px multiplication.',
        styling: 'margin-top: {number}px; margin-bottom: {number}px;',
      },
      {
        className: 'e-m-nnumber',
        description:
          'Set margin negative, from 0-112 following 8px multiplication. All margin classes can be used e.g. e-mr-n8',
        styling: 'margin-right: -number',
      },
    ],
  },
  {
    title: 'Size',
    classes: [
      {
        className: 'e-w-100',
        description: 'Gives element 100% width.',
        styling: 'width: 100%',
      },
      {
        className: 'e-w-75',
        description: 'Gives element 75% width.',
        styling: 'width: 75%',
      },
      {
        className: 'e-w-50',
        description: 'Gives element 50% width.',
        styling: 'width: 50%',
      },
      {
        className: 'e-w-25',
        description: 'Gives element 25% width.',
        styling: 'width: 25%',
      },
      {
        className: 'e-w-0',
        description: 'Gives element 0% width.',
        styling: 'width: 0%',
      },
      {
        className: 'e-h-100',
        description: 'Gives element 100% height.',
        styling: 'height: 100%',
      },
      {
        className: 'e-h-75',
        description: 'Gives element 75% height.',
        styling: 'height: 75%',
      },
      {
        className: 'e-h-50',
        description: 'Gives element 50% height.',
        styling: 'height: 50%',
      },
      {
        className: 'e-h-25',
        description: 'Gives element 25% height.',
        styling: 'height: 25%',
      },
      {
        className: 'e-h-0',
        description: 'Gives element 0% height.',
        styling: 'height: 0%',
      },
    ],
  },
  {
    title: 'Strip',
    classes: [
      {
        className: 'e-strip-fieldset',
        description: 'Strips all CSS from the fieldset HTML element.',
        styling: 'Resets all css.',
      },
    ],
  },
  {
    title: 'Text',
    classes: [
      {
        className: 'e-capitalize',
        description: 'Transforms the first character of each word to uppercase.',
        styling: 'text-transform: capitalize',
      },
      {
        className: 'e-lowercase',
        description: 'Transforms all characters to lowercase.',
        styling: 'text-transform: lowercase',
      },
      {
        className: 'e-uppercase',
        description: 'Transforms all characters to uppercase.',
        styling: 'text-transform: uppercase',
      },
      {
        className: 'e-text-left',
        description: 'Aligns text to the left.',
        styling: 'text-transform: left',
      },
      {
        className: 'e-text-center',
        description: 'Aligns text to the center.',
        styling: 'text-transform: center',
      },
      {
        className: 'e-text-right',
        description: 'Aligns text to the right.',
        styling: 'text-transform: right',
      },
    ],
  },
  {
    title: 'Visibility',
    classes: [
      {
        className: 'e-invisible',
        description: 'Hide elements in DOM.',
        styling: 'visibility: hidden',
      },
      {
        className: 'e-invisible-xl',
        description: 'Hide elements displayed MaxDesktop breakpoints.',
        styling: 'visibility: hidden',
      },
      {
        className: 'e-invisible-lg',
        description: 'Hide elements displayed MinDesktop breakpoints.',
        styling: 'visibility: hidden',
      },
      {
        className: 'e-invisible-md',
        description: 'Hide elements displayed Tablet breakpoints.',
        styling: 'visibility: hidden',
      },
      {
        className: 'e-invisible-sm',
        description: 'Hide elements displayed Mobile breakpoints.',
        styling: 'visibility: hidden',
      },
    ],
  },
];
