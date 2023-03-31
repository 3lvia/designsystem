import changelogJson from 'src/assets/changelogs/elvis-timepicker/CHANGELOG.json';
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
    isCompact: {
      isRequired: false,
      type: 'boolean',
      description: 'Compact size.',
      default: 'false',
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
  codeReact: `<Timepicker
  minuteInterval="10"
  valueOnChange={(event) => handleOnChange(event)}
></Timepicker>`,
  codeAngular: `<elvia-timepicker
  minuteInterval="10"
  (valueOnChange)="handleOnChange($event.detail.value)"
></elvia-timepicker>`,
  codeVue: `<elvia-timepicker
  minuteInterval="10"
  @value-on-change="handleOnChange($event.detail.value)"
></elvia-timepicker>`,
  codeNativeHTML: `<elvia-timepicker
  id="example-elvia-timepicker"
  minuteInterval="10"
></elvia-timepicker>`,
  codeNativeScript: `  const timepicker = document.getElementById('example-elvia-timepicker');
  timepicker.addEventListener('valueOnChange', (event) => {
    console.log(event.detail.value)
  });
`,
};
