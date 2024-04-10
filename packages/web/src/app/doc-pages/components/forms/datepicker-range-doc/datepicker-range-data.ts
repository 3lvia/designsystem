import changelogJson from '@elvia/elvis-datepicker-range/CHANGELOG.json';
import { BaseDatepickerRangeProps } from '@elvia/elvis-datepicker-range/react';

import ComponentData from '../../component-data.interface';

const datepickerRangeData: ComponentData<BaseDatepickerRangeProps> = {
  changelog: changelogJson.content,
  name: 'DatepickerRange',
  attributes: {
    value: {
      type: 'object',
      description: 'Preselected date.',
      children: {
        start: {
          type: 'Date',
          description: 'The start date.',
        },
        end: {
          type: 'Date',
          description: 'The end date.',
        },
      },
    },
    valueOnChange: {
      specialType: 'event',
      type: '(value: {start: Date | null, end: Date | null}) => void',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    valueOnChangeISOString: {
      specialType: 'event',
      type: '(value: {start: string | null, end: string | null}) => void',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    labelOptions: {
      type: 'object',
      description: 'Labels of inputs.',
      children: {
        start: {
          type: 'string',
          description: 'The label for the start datepicker.',
          default: 'Fra dato',
        },
        end: {
          type: 'string',
          description: 'The label for the end datepicker.',
          default: 'Til dato',
        },
      },
    },
    size: {
      type: '"small" | "medium"',
      description: 'Datepicker can be set to different sizes.',
      default: '"medium"',
    },
    isFullWidth: {
      type: 'boolean',
      description: 'Gives the input 100% width (max = 912px).',
      default: 'false',
    },
    isDisabled: {
      type: 'boolean',
      description: 'Disabled datepicker.',
      default: 'false',
    },
    isRequired: {
      type: 'boolean | {start?: boolean; end?: boolean}',
      description:
        'Required datepicker-fields cannot be empty. If a boolean is passed, it will apply to both fields.',
      default: 'false',
    },
    isVertical: {
      type: 'boolean',
      description:
        'Set to true to force datepickers to stack vertically instead of horizontally. This is useful for devices with limited screen space.',
      default: 'false',
    },
    hasSelectDateOnOpen: {
      type: 'boolean',
      description: 'Sets the current date to selected when opening the datepicker.',
      default: 'true',
    },
    hasAutoOpenEndDatepicker: {
      type: 'boolean',
      description: 'Auto opens the next picker when the currently open picker is closed.',
      default: 'false',
    },
    hasTimepickers: {
      type: 'boolean',
      description: 'Displays time pickers to enable time selection.',
      default: false,
    },
    timepickerInterval: {
      type: '"1" | "5" | "10" | "15" | "60"',
      default: '"15"',
      description: 'The number of minute steps in the timepicker, if visible.',
    },
    minDate: {
      type: 'Date',
      description: 'Makes dates before the provided minimum date disabled.',
    },
    maxDate: {
      type: 'Date',
      description: 'Makes dates after the provided maximum date disabled.',
    },
    disableDates: {
      type: 'object',
      description: 'Object containing functions that set dates as disabled. Return true to disable a date.',
      example: /* ts */ `// example: only allow mondays on start datepicker, only allow fridays on end datepicker
        disableDates = { start: (day: Date) => day.getDay() !== 1, end: (day: Date) => day.getDay() !== 5 }
      `,
      children: {
        start: {
          type: '(day: Date) => boolean',
          description: 'A function that defines what dates that should be disabled in the start datepicker.',
        },
        end: {
          type: '(day: Date) => boolean',
          description: 'A function that defines what dates that should be disabled in the end datepicker.',
        },
      },
    },
    errorOptions: {
      type: 'object',
      description:
        'An object that allows for custom configuration of the error handling for both the start- and end-datepicker.',
      example: /* ts */ `errorOptions = { start: { text: "Start error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true }, end: { text: "End error text", hideText: false, isErrorState: true, hasErrorPlaceholder: true } }`,
      children: {
        start: {
          type: 'object',
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
              description: 'Allows you to remove the padding below the date picker.',
              default: 'true',
            },
          },
        },
        end: {
          type: 'object',
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
              description: 'Allows you to remove the padding below the date picker.',
              default: 'true',
            },
          },
        },
      },
    },
    errorOnChange: {
      specialType: 'event',
      type: '(errors: {start?: string; end?: string}) => void',
      description: 'Gets called every time the internal date validation error is changed.',
    },
  },
};

export { datepickerRangeData };
