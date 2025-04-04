import changelogJson from '@elvia/elvis-datepicker/CHANGELOG.json';
import { DatepickerProps } from '@elvia/elvis-datepicker/react';

import ComponentData from '../../component-data.interface';

const datepickerData: ComponentData<Omit<DatepickerProps, 'dateRangeProps' | 'onFocus'>> = {
  changelog: changelogJson.content,
  name: 'Datepicker',
  attributes: {
    value: {
      type: 'Date',
      description: 'Preselected date.',
    },
    valueOnChange: {
      specialType: 'event',
      type: '(value: Date) => void',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    valueOnChangeISOString: {
      specialType: 'event',
      type: '(value: string | null) => void',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    label: {
      type: 'string',
      description: 'Label of input.',
    },
    size: {
      type: '"small" | "medium"',
      description: 'Datepicker can be set to different sizes.',
      default: '"medium"',
    },
    isFullWidth: {
      type: 'boolean',
      description: 'Gives the input 100% width.',
      default: 'false',
    },
    isDisabled: {
      type: 'boolean',
      description: 'Disabled datepicker.',
      default: 'false',
    },
    isRequired: {
      type: 'boolean',
      description: 'Required datepicker-fields cannot be empty.',
      default: 'false',
    },
    hasSelectDateOnOpen: {
      type: 'boolean',
      description: 'Sets the current date to selected when opening the datepicker.',
      default: 'true',
    },
    hasOptionalText: {
      type: 'boolean',
      description:
        'An optional prop that adds the text "(valgfri)" behind the label, once set to true, to signalize that the input is optional to fill.',
      default: 'true',
    },
    minDate: {
      type: 'Date',
      description: 'Makes dates before the provided minimum date disabled.',
    },
    maxDate: {
      type: 'Date',
      description: 'Makes dates after the provided maximum date disabled.',
    },
    onOpen: {
      specialType: 'event',
      type: '() => void',
      description: 'Callback for every time the datepicker is being opened.',
    },
    onClose: {
      specialType: 'event',
      type: '() => void',
      description: 'Callback for every time the datepicker is being closed.',
    },
    onReset: {
      specialType: 'event',
      type: '() => void',
      description: 'Callback for every time the datepicker reset button is clicked.',
    },
    resetTime: {
      type: 'boolean',
      description: 'Whether to reset the time value in the emitted Date object to 00:00:00.',
      default: 'false',
    },
    placeholder: {
      type: 'string',
      default: '"dd.mm.åååå"',
      description: 'A short hint displayed in the input before the user enters a value.',
    },
    isOpen: {
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state.',
    },
    errorOptions: {
      type: 'object',
      description: 'An object that allows for custom configuration of the error handling in the date picker.',
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
          description: 'Allows you to remove the padding below the date picker.',
          default: 'true',
        },
      },
    },
    errorOnChange: {
      specialType: 'event',
      type: '(error: string) => void',
      description: 'Gets called every time the internal date validation error is changed. ',
    },
    clearButtonText: {
      type: 'string',
      default: '"Nullstill"',
      description: 'Text to display in clear date-button.',
    },
    disableDate: {
      type: '(day: Date) => boolean',
      description: 'Function that sets dates as disabled. Return true to disable a date.',
      example: /*ts*/ `disableDate = (day: Date) => {
        const dayOfWeek = day.getDay();
        //return true if day is a weekend -> disable the date
        return dayOfWeek === 0 || dayOfWeek === 6;
      };`,
    },
  },
};

export { datepickerData };
