import changelogJson from '@elvia/elvis-datepicker-range/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

const datepickerRangeData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Datepicker Range',
  attributes: {
    value: {
      isRequired: false,
      type: '{start: Date | null, end: Date | null}',
      description: 'Preselected date.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: {start: Date | null, end: Date | null}) => void',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    handleValueOnChangeISOString: {
      isRequired: false,
      type: '(value: {start: string | null, end: string | null}) => void',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    labelOptions: {
      isRequired: false,
      type: '{start?: string; end?: string}',
      description: 'Labels of inputs.',
      default: '{start: "Fra dato", end: "Til dato"}',
    },
    size: {
      isRequired: false,
      type: 'small | medium',
      description: 'Datepicker can be set to different sizes.',
      default: 'medium',
    },
    isFullWidth: {
      isRequired: false,
      type: 'boolean',
      description: 'Gives the input 100% width (max = 912px).',
      default: 'false',
    },
    isDisabled: {
      isRequired: false,
      type: 'boolean',
      description: 'Disabled datepicker.',
      default: 'false',
    },
    isRequired: {
      isRequired: false,
      type: 'boolean | {start?: boolean; end?: boolean}',
      description:
        'Required datepicker-fields cannot be empty. If a boolean is passed, it will apply to both fields.',
      default: 'false',
    },
    isVertical: {
      isRequired: false,
      type: 'boolean',
      description:
        'Set to true to force datepickers to stack vertically instead of horizontally. This is useful for devices with limited screen space.',
      default: 'false',
    },
    hasSelectDateOnOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the current date to selected when opening the datepicker.',
      default: 'true',
    },
    hasAutoOpenEndDatepicker: {
      isRequired: false,
      type: 'boolean',
      description: 'Auto opens the next picker when the currently open picker is closed.',
      default: 'false',
    },
    hasTimepickers: {
      isRequired: false,
      type: 'boolean',
      description: 'Displays time pickers to enable time selection.',
      default: false,
    },
    timepickerInterval: {
      isRequired: false,
      type: '"1" | "5" | "10" | "15" | "60"',
      default: '"15"',
      description: 'The number of minute steps in the timepicker, if visible.',
    },
    minDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes dates before the provided minimum date disabled.',
    },
    maxDate: {
      isRequired: false,
      type: 'Date',
      description: 'Makes dates after the provided maximum date disabled.',
    },
    disableDates: {
      isRequired: false,
      type: '{start: (day: Date) => boolean; end: (day: Date) => boolean}',
      description: 'Object containing functions that set dates as disabled. Return true to disable a date.',
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{start: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>, end: Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>}>',
      description: 'An object that allows for custom configuration of the error handling.',
      default:
        '{ start: { hideText: false, hasErrorPlaceholder: true }, end: { hideText: false, hasErrorPlaceholder: true }}',
    },
    errorOnChange: {
      isRequired: false,
      type: '(errors: {start?: string; end?: string}) => void',
      description: 'Gets called every time the internal date validation error is changed.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the datepicker range.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the datepicker range. Example: {marginTop: '8px', width: '100%'}",
    },
  },
};

export { datepickerRangeData };
