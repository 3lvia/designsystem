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
        'Decides if the slider should display its minimum and maximum values at each end of the slider. Not available of type="range" with hasInputField="true".',
      isRequired: false,
      type: 'boolean',
    },
    hasTooltip: {
      default: 'true',
      description:
        'Decides if a tooltip should be displayed when the user uses the slider. A tooltip is always displayed on devices with touch as their primary input method.',
      isRequired: false,
      type: 'boolean',
    },
    hasPercent: {
      default: 'false',
      description:
        'The tooltip should display the percentage of the distance between minimum and maximum values rather than the actual value itself. Only available on a simple slider.',
      isRequired: false,
      type: 'boolean',
    },
    unit: {
      isRequired: false,
      description:
        'A custom unit displayed in the tooltip. For example "kWh", "kr/mnd". The unit will be overwritten if hasPercent is set to true.',
      type: 'string',
      default: '',
    },
    label: {
      isRequired: false,
      description:
        'A custom label displayed above the input(s). For example "Kilowatt hours". Labels can be set individually for range sliders by using a object: {left:"min", right:"max"}',
      type: 'string | {left: string, right: string}',
      default: '',
    },
    max: {
      default: 100,
      description:
        'The greatest value allowed inside the slider. This value must be greater than the value of the "min" attribute.',
      isRequired: false,
      type: 'number',
    },
    min: {
      default: 1,
      description:
        'The lowest value allowed inside the slider. This value must be less than the value of the "max" attribute.',
      isRequired: false,
      type: 'number',
    },
    value: {
      default: '{left: 1, right: 100}',
      description: 'The default value of the slider. An object for range sliders.',
      isRequired: false,
      type: 'number | {left: number, right: number}',
    },
    isDisabled: {
      default: 'false',
      description: 'Set the slider to a disabled state.',
      isRequired: false,
      type: 'boolean',
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
