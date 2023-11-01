import changelogJson from '@elvia/elvis-spotlight/CHANGELOG.json';
import ComponentData from '../component-data.interface';
import { BaseSpotlightProps } from '@elvia/elvis-spotlight/react';

const spotlightData: ComponentData<BaseSpotlightProps> = {
  changelog: changelogJson.content,
  name: 'Spotlight',
  attributes: {
    position: {
      isRequired: true,
      type: 'object',
      description: 'The position of the spotlight, relative to the screen.',
      children: {
        horizontal: {
          type: 'number',
          description:
            'The horizontal position of the spotlight. Represents the center of a circle, and the left edge of a rectangle.',
        },
        vertical: {
          type: 'number',
          description:
            'The vertical position of the spotlight. Represents the center of a circle, and the top edge of a rectangle.',
        },
      },
    },
    shape: {
      type: '"circle" | "rectangle"',
      description: 'The shape of the spotlight.',
      default: '"circle"',
    },
    radius: {
      type: 'number',
      description: 'Radius for the spotlight circle. Only applies to shape circle.',
      default: '200',
    },
    rectangleProps: {
      type: 'object',
      description: 'Props for the spotlight rectangle. Only applies to shape rectangle.',
      children: {
        borderRadius: {
          type: 'number',
          description: 'The border radius of the spotlight',
          default: 8,
        },
        height: {
          type: 'number',
          description: 'The height of the spotlight.',
          default: 200,
        },
        width: {
          type: 'number',
          description: 'The width of the spotlight.',
          default: 200,
        },
      },
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
      default: '"350ms"',
    },
  },
};

export { spotlightData };
