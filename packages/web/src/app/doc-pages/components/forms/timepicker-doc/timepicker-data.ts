import changelogJson from '@elvia/elvis-timepicker/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

export const timepickerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Timepicker',
  attributes: {
    value: {
      type: 'Date',
      description: 'The value of the time picker.',
    },
    valueOnChange: {
      isEvent: true,
      type: '(value: Date) => void',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    errorOnChange: {
      isEvent: true,
      type: '(error: string) => void',
      description: 'Gets called every time the internal time validation error is changed. ',
    },
    minuteInterval: {
      type: '"1" | "5" | "10" | "15" | "60"',
      default: '"15"',
      description: 'The number of minute steps in list of minute options.',
    },
    hasSecondPicker: {
      type: 'boolean',
      description: 'Add a second picker alongside the hour and minute pickers.',
      default: false,
    },
    isDisabled: {
      type: 'boolean',
      description: 'Disables the time picker.',
      default: 'false',
    },
    isFullWidth: {
      type: 'boolean',
      description: 'Gives the time picker full width.',
      default: 'false',
    },
    size: {
      type: '"small" | "medium"',
      description: 'Datepicker can be set to different sizes.',
      default: '"medium"',
    },
    isRequired: {
      type: 'boolean',
      description: 'Required time picker-fields cannot be empty.',
      default: 'false',
    },
    isOpen: {
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state.',
    },
    errorOptions: {
      type: 'object',
      description: 'An object that allows for custom configuration of the error handling in the time picker.',
      default: '{ hideText: false, isErrorState: false, hasErrorPlaceholder: true }',
      example: /* ts */ `errorOptions = { text: "Error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true }`,
      children: {
        text: {
          type: 'string',
          description: 'Setting "text" will always show the provided error message.',
        },
        hideText: {
          type: 'boolean',
          description: 'Hides the default validation errors.',
          default: 'false',
        },
        isErrorState: {
          type: 'boolean',
          description: 'Allows for manually activating the visual error UI.',
          default: 'false',
        },
        hasErrorPlaceholder: {
          type: 'boolean',
          description: 'Allows you to remove the padding below the time picker.',
          default: 'true',
        },
      },
    },
    minTime: {
      isRequired: false,
      type: 'Date',
      description:
        'Makes the time before the provided minimum time disabled. (The validation uses only the time part of this prop value)',
    },
    maxTime: {
      isRequired: false,
      type: 'Date',
      description:
        'Makes the time after the provided maximum time disabled. (The validation uses only the time part of this prop value)',
    },
    onOpen: {
      isEvent: true,
      type: '() => void',
      description: 'Callback for every time the time picker is being opened.',
    },
    onClose: {
      isEvent: true,
      type: '() => void',
      description: 'Callback for every time the time picker is being closed.',
    },
    selectNowOnOpen: {
      type: 'boolean',
      description: 'Sets the value to now when opening the time picker.',
      default: 'true',
    },
    label: {
      type: 'string',
      description: 'Label of time picker.',
      default: '"Velg tid"',
    },
  },
};
