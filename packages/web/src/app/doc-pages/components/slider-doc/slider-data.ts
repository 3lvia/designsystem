import changelogJson from 'src/assets/changelogs/elvis-slider/CHANGELOG.json';
import ComponentData from '../component-data.interface';

export const sliderData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Slider',
  attributes: {
    type: {
      default: '"simple"',
      description: 'Variants of slider.',
      isRequired: false,
      type: '“simple” | “range”',
    },
    hasInputField: {
      default: 'false',
      description: 'Decides if the slider should have input field(s).',
      isRequired: false,
      type: 'boolean',
    },
    hasHintValues: {
      default: 'false',
      description:
        'Display the minimum and maximum values at each end of the slider. Unavailable for type="range" with hasInputField="true".',
      isRequired: false,
      type: 'boolean',
    },
    hasTooltip: {
      default: 'true',
      description:
        'Determine whether to show a tooltip when using the slider. Note: A tooltip is always displayed on touch devices.',
      isRequired: false,
      type: 'boolean',
    },
    hasPercent: {
      default: 'false',
      description:
        'Show the percentage in the tooltip, not the actual value. Only available for a type="simple".',
      isRequired: false,
      type: 'boolean',
    },
    heading: {
      isRequired: false,
      type: 'string',
      description: 'A heading above the slider.',
    },
    unit: {
      isRequired: false,
      description:
        'Show a custom unit in the tooltip, like "kWh" or "kr/mnd". This will be replaced if the "hasPercent" prop is set to true.',
      type: 'string',
      default: '',
    },
    label: {
      isRequired: false,
      description: 'A custom label displayed above the input(s). For example "Kilowatt hours".',
      type: 'string | {left: string, right: string}',
      default: '',
    },
    max: {
      default: 100,
      description: 'The maximum allowed value within the slider. This must be higher than the "min" value.',
      isRequired: false,
      type: 'number',
    },
    min: {
      default: 0,
      description: 'The minimum allowed value within the slider. This must be lower than the "max" value.',
      isRequired: false,
      type: 'number',
    },
    value: {
      default: '{left: 0, right: 100}',
      description: 'The default value of the slider. An object for range sliders.',
      isRequired: false,
      type: 'number | {left: number, right: number}',
    },
    isDisabled: {
      default: 'false',
      description: 'Disable the slider.',
      isRequired: false,
      type: 'boolean',
    },

    isCompact: {
      default: 'false',
      description: 'Set the slider to a smaller compact style.',
      isRequired: false,
      type: 'boolean',
    },

    ariaLabel: {
      isRequired: false,
      type: 'string | {left: string, right: string}',
      description: 'Aria labels for the slider(s).',
    },

    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }> | {left: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>, right: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>}',
      description: 'An object that allows for custom configuration of the error handling.',
    },

    className: {
      description: 'Custom CSS classes that can be added to the slider.',
      isRequired: false,
      type: 'string',
    },
    inlineStyle: {
      description:
        "Custom CSS style object that can be added to the slider. Example: {marginTop: '8px', width: '100%'}",
      isRequired: false,
      type: '{[cssProperty: string]: string}',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: number | object ) => void',
      description: 'Gets called every time the value is changed. Only returns a value if the input is valid.',
    },
  },
};
