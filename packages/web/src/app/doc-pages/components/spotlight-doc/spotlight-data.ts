import changelogJson from '@elvia/elvis-spotlight/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { SpotlightProps } from '@elvia/elvis-spotlight/react';

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
      type: 'circle | rectangle',
      description: 'The shape of the spotlight.',
      default: 'circle',
    },
    radius: {
      type: 'number',
      description: 'Radius for the spotlight circle. Only applies to shape circle.',
      default: '200',
    },
    rectangleProps: {
      type: '{width: number, height: number, borderRadius: number}',
      description: 'Props for the spotlight rectangle. Only applies to shape rectangle.',
      default: '{width: 200, height: 200, borderRadius: 8}',
    },
    hasLockBodyScroll: {
      type: 'boolean',
      description: 'Locks the body of your page so that you cant scroll while the spotlight is active.',
      default: 'true',
    },
    transitionDuration: {
      type: 'string',
      description:
        'The duration of the transition when the spotlight is moved. Can be any valid css duration.',
      default: '350ms',
    },
  },
};

export { spotlightData };
