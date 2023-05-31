import changelogJson from 'src/assets/changelogs/elvis-datepicker/CHANGELOG.json';
import ComponentData from '../../component-data.interface';

const datepickerData: ComponentData = {
  changelog: changelogJson.content,
  name: 'Datepicker',
  attributes: {
    value: {
      isRequired: false,
      type: 'Date',
      description: 'Preselected date.',
    },
    valueOnChange: {
      isRequired: false,
      type: '(value: Date) => CustomEvent',
      description:
        'Gets called every time the value is changed. Returns null if input field is empty, or Invalid Date if input is not a valid date.',
    },
    valueOnChangeISOString: {
      isRequired: false,
      type: '(value: string | null) => CustomEvent',
      description: `Gets called every time the value is changed. Returns a string containing the chosen date, without time, in ISO format (e.g. '2022-06-20'), or null if no date is selected.`,
    },
    label: {
      isRequired: false,
      type: 'string',
      description: 'Label of input.',
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
      description: 'Gives the input 100% width.',
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
      type: 'boolean',
      description: 'Required datepicker-fields cannot be empty.',
      default: 'false',
    },
    hasSelectDateOnOpen: {
      isRequired: false,
      type: 'boolean',
      description: 'Sets the current date to selected when opening the datepicker.',
      default: 'true',
    },
    hasOptionalText: {
      isRequired: false,
      type: 'boolean',
      description:
        'An optional prop that adds the text "(valgfri)" behind the label, once set to true, to signalize that the input is optional to fill.',
      default: 'true',
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
    onOpen: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker is being opened.',
    },
    onClose: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker is being closed.',
    },
    onReset: {
      isRequired: false,
      type: '() => void',
      description: 'Callback for every time the datepicker reset button is clicked.',
    },
    resetTime: {
      isRequired: false,
      type: 'boolean',
      description: 'Whether to reset the time value in the emitted Date object to 00:00:00.',
    },
    placeholder: {
      isRequired: false,
      type: 'string',
      default: 'dd.mm.åååå',
      description: 'A short hint displayed in the input before the user enters a value.',
    },
    isOpen: {
      isRequired: false,
      type: 'boolean',
      default: 'false',
      description: 'Controlled picker open state.',
    },
    className: {
      isRequired: false,
      type: 'string',
      description: 'Custom CSS classes that can be added to the datepicker.',
    },
    inlineStyle: {
      isRequired: false,
      type: '{[cssProperty: string]: string}',
      description:
        "Custom CSS style object that can be added to the datepicker. Example: {marginTop: '8px', width: '100%'}",
    },
    errorOptions: {
      isRequired: false,
      type: 'Partial<{ text: string; hideText: boolean; isErrorState: boolean; hasErrorPlaceholder: boolean }>',
      description:
        'An object that allows for custom configuration of the error handling in the date picker. Setting "text" will always show the provided error message. "hideText" hides the default validation errors. "isErrorState" allows for manually activating the visual error UI. "hasErrorPlaceholder" allows you to remove the padding below the date picker.',
      default: '{ hideText: false, isErrorState: false, hasErrorPlaceholder: true }',
    },
    errorOnChange: {
      isRequired: false,
      default: 'true',
      type: '(error: string) => void',
      description: 'Gets called every time the internal date validation error is changed. ',
    },
    clearButtonText: {
      isRequired: false,
      type: 'string',
      default: 'Nullstill',
      description: 'Text to display in clear date-button.',
    },
    disableDate: {
      isRequired: false,
      type: '(day: Date) => boolean',
      description: 'Function that sets dates as disabled. Return true to disable a date.',
    },
  },
};

export { datepickerData };
