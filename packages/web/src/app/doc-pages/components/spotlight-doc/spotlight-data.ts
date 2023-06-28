import changelogJson from '@elvia/elvis-spotlight/CHANGELOG.json';
import ComponentData from '../component-data.interface';

const spotlightData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Spotlight',
  attributes: {
    position: {
      isRequired: true,
      type: '{horizontal: number, vertical: number}',
      description:
        'The position represents the center of the circle, or the top left corner of the rectangle. The position is relative to the screen.',
      default: '',
    },
    shape: {
      isRequired: false,
      type: 'circle | rectangle',
      description: 'The shape of the spotlight.',
      default: 'circle',
    },
    radius: {
      isRequired: false,
      type: 'number',
      description: 'Radius for the spotlight circle. Only applies to shape circle.',
      default: '200',
    },
    rectangleProps: {
      isRequired: false,
      type: '{width: number, height: number, borderRadius: number}',
      description: 'Props for the spotlight rectangle. Only applies to shape rectangle.',
      default: '{width: 200, height: 200, borderRadius: 8}',
    },
    hasLockBodyScroll: {
      isRequired: false,
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the spotlight is active.',
      default: 'true',
    },
    transitionDuration: {
      isRequired: false,
      type: 'string',
      description:
        'The duration of the transition when the spotlight is moved. Can be any valid css duration.',
      default: '350ms',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the Spotlight.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the Spotlight. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { spotlightData };
