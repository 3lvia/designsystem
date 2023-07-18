import changelogJson from '@elvia/elvis-timepicker/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

export const timepickerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Timepicker',
  attributes: {
    value: {
      isRequired: false,
      type: 'Date',
      description: 'The value of the time picker.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Date) => void',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    errorOnChange: {
      isRequired: false,
      type: '(error: string) => void',
      description: 'Gets called every time the internal time validation error is changed. ',
    },
    minuteInterval: {
      isRequired: false,
      type: '"1" | "5" | "10" | "15" | "60"',
      default: '"15"',
      description: 'The number of minute steps in list of minute options.',
    },
    hasSecondPicker: {
      isRequired: false,
      type: 'boolean',
      description: 'Add a second picker alongside the hour and minute pickers.',
      default: false,
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Disables the time picker.',
      default: 'false',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: 'Gives the time picker full width.',
      default: 'false',
    },
    size: {
      isRequired: false,
      type: 'small | medium',
      description: 'Datepicker can be set to different sizes.',
      default: 'medium',
    },
    isRequired: {
      isRequired: false,
      type: 'boolean',
      description: 'Required time picker-fields cannot be empty.',
      default: 'false',
    },
    isOpen: {
      isRequired: false,
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state.',
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description: 'An object that allows for custom configuration of the error handling in the time picker.',
      default: '{ hideText: false, isErrorState: false, hasErrorPlaceholder: true }',
    },
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the time picker is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the time picker is being closed.',
    },
    selectNowOnOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the value to now when opening the time picker.',
      default: 'true',
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label of time picker.',
      default: '"Velg tid"',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the time picker.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the time picker. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};
