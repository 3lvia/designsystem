import { Component } from '@angular/core';
import { getDocPagesNotFromCMS } from 'src/app/shared/doc-pages';
import { UtilityGroup } from './utility.interface';

@Component({
  selector: 'app-utilities-doc',
  templateUrl: './utilities-doc.component.html',
  styleUrls: ['./utilities-doc.component.scss'],
})
export class UtilitiesDocComponent {
  description = getDocPagesNotFromCMS('utilities').description;
  utilityGroups: UtilityGroup[] = [
    {
      title: 'Border',
      classes: [{ className: 'e-border-none', description: 'Removes the border.', styling: 'border: none' }],
    },
    {
      title: 'Color',
      path: '/brand/color',
      classes: [
        {
          className: 'e-bg-name',
          description:
            'Sets the background to an available color in elvis. Also sets text to contrast color of background-color.',
          styling: 'background-color: #colorname',
        },
        {
          className: 'e-text-name',
          description: 'Sets the text to an available color in elvis',
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
          description: 'Display none on element displayed MaxDesktop breakpoints.',
          styling: 'display: none',
        },
        {
          className: 'e-none-lg',
          description: 'Display none on element displayed MinDesktop breakpoints.',
          styling: 'display: none',
        },
        {
          className: 'e-none-md',
          description: 'Display none on element displayed Tablet breakpoints.',
          styling: 'display: none',
        },
        {
          className: 'e-none-sm',
          description: 'Display none on element displayed Mobile breakpoints.',
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
          description: 'Changed the flex direction.',
          styling: 'flex-direction: column',
        },
        {
          className: 'e-flex-direction-row',
          description: 'Changed the flex direction.',
          styling: 'flex-direction: row',
        },
        {
          className: 'e-justify-content-center',
          description: 'Distributes space between and around content items.',
          styling: 'justify-content: center',
        },
        {
          className: 'e-justify-content-start',
          description: 'Distributes space between and around content items.',
          styling: 'justify-content: flex-start',
        },
        {
          className: 'e-justify-content-end',
          description: 'Distributes space between and around content items.',
          styling: 'justify-content: flex-end',
        },
        {
          className: 'e-align-items-center',
          description: 'Aligns the items.',
          styling: 'align-items: center',
        },
        {
          className: 'e-align-items-start',
          description: 'Aligns the items.',
          styling: 'align-items: flex-start',
        },
        {
          className: 'e-align-items-end',
          description: 'Aligns the items.',
          styling: 'align-items: flex-end',
        },
      ],
    },
    {
      title: 'Focus',
      path: '/tools/accessibility',
      fragment: 'Keyboard',
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
          className: 'e-shadow-3',
          description: 'Set a soft box-shadow on element.',
          styling: 'box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.03)',
        },
        {
          className: 'e-shadow-6',
          description: 'Set a medium box-shadow on element.',
          styling: 'box-shadow: 0px 0px 40px rgba(0, 0, 0, 0.06)',
        },
        {
          className: 'e-shadow-8',
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
          description: 'Set padding in all directions, from 0-72 following 8px multiplication.',
          styling: 'padding: number',
        },
        {
          className: 'e-pl-number',
          description: 'Set padding left, from 0-72 following 8px multiplication.',
          styling: 'padding-left: number',
        },
        {
          className: 'e-pr-number',
          description: 'Set padding right, from 0-72 following 8px multiplication.',
          styling: 'padding-right: number',
        },
        {
          className: 'e-pt-number',
          description: 'Set padding top, from 0-72 following 8px multiplication.',
          styling: 'padding-top: number',
        },
        {
          className: 'e-pb-number',
          description: 'Set padding bottom, from 0-72 following 8px multiplication.',
          styling: 'padding-bottom: number',
        },
        {
          className: 'e-px-number',
          description: 'Set padding left and right, from 0-72 following 8px multiplication.',
          styling: 'padding-left: number; padding-right: number;',
        },
        {
          className: 'e-py-number',
          description: 'Set padding top and bottom, from 0-72 following 8px multiplication.',
          styling: 'padding-top: number; padding-bottom: number;',
        },
        {
          className: 'e-m-number',
          description: 'Set margin in all directions, from 0-72 following 8px multiplication.',
          styling: 'margin: number',
        },
        {
          className: 'e-ml-number',
          description: 'Set margin left, from 0-72 following 8px multiplication.',
          styling: 'margin-left: number',
        },
        {
          className: 'e-mr-number',
          description: 'Set margin right, from 0-72 following 8px multiplication.',
          styling: 'margin-right: number',
        },
        {
          className: 'e-mt-number',
          description: 'Set margin top, from 0-72 following 8px multiplication.',
          styling: 'margin-top: number',
        },
        {
          className: 'e-mb-number',
          description: 'Set margin bottom, from 0-72 following 8px multiplication.',
          styling: 'margin-bottom: number',
        },
        {
          className: 'e-mx-number',
          description: 'Set margin left and right, from 0-72 following 8px multiplication.',
          styling: 'margin-left: number; margin-right: number;',
        },
        {
          className: 'e-my-number',
          description: 'Set margin top and bottom, from 0-72 following 8px multiplication.',
          styling: 'margin-top: number; margin-bottom: number;',
        },
        {
          className: 'e-m-nnumber',
          description:
            'Set margin negative, from 0-72 following 8px multiplication. All margin classes can be used e.g. e-mr-n8',
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
          description: 'Strips all css from the fieldset html element.',
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
}
