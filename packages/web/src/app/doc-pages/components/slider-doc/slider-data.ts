import changelogJson from '@elvia/elvis-slider/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const sliderData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Slider',
  attributes: {
    type: {
      default: '"simple"',
      description: 'Variants of slider.',
      type: '"simple" | "range"',
    },
    hasInputField: {
      default: 'true',
      description: 'Decides if the slider should have input field(s).',
      type: 'boolean',
    },
    hasHints: {
      default: 'true',
      description:
        'Display the minimum and maximum values at each end of the slider. Unavailable for type="range" with hasInputField="true".',
      type: 'boolean',
    },
    label: {
      type: 'string',
      description: 'A label above the slider.',
    },
    max: {
      default: 100,
      description: 'The maximum allowed value within the slider. This must be higher than the "min" value.',
      type: 'number',
    },
    min: {
      default: 0,
      description: 'The minimum allowed value within the slider. This must be lower than the "max" value.',
      type: 'number',
    },
    value: {
      default: '{left: 0, right: 100}',
      description: 'The default value of the slider.',
      type: 'number | {left: number, right: number}',
    },
    isDisabled: {
      default: 'false',
      description: 'Disable the slider.',
      type: 'boolean',
    },
    unit: {
      description: 'The suffix in the Sliders input field(s) and tooltip.',
      type: 'string',
    },
    size: {
      default: '"medium"',
      description: 'The size of the slider and its input field(s).',
      type: '"medium" | "small"',
    },
    ariaLabel: {
      type: 'string | {left: string, right: string}',
      description: 'Aria labels for the slider(s).',
    },
    errorOptions: {
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }> | {left: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>, right: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>}',
      description: 'An object that allows for custom configuration of the error handling.',
      example: /* ts */ `errorOptions = { left: { text: "Left error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true }, right: { text: "Right error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true } }`,
    },
    valueOnChange: {
      isEvent: true,
      type: '(value: number | {left: number, right: number} ) => void',
      description: 'Gets called every time the value is changed. Only returns a value if the input is valid.',
    },
    errorOnChange: {
      isEvent: true,
      type: '(value: string ) => void',
      description: 'Gets called every time the internal error is changed.',
    },
  },
};
