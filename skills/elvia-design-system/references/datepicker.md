- [Datepicker (`<elvia-datepicker>`)](#datepicker-elvia-datepicker)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [value](#value)
    - [size](#size)
    - [minDate](#mindate)
    - [maxDate](#maxdate)
    - [disableDate](#disabledate)
    - [hasSelectDateOnOpen](#hasselectdateonopen)
    - [resetTime](#resettime)
    - [isRequired](#isrequired)
    - [hasOptionalText](#hasoptionaltext)
    - [errorOptions](#erroroptions)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Datepicker (`<elvia-datepicker>`)

## Reference

https://design.elvia.io/components/datepicker

`<elvia-datepicker>` is a web component.

## Installation

This web component requires the `@elvia/elvis-datepicker` package. See the
[Installation reference](./installation.md).

## Use

```html
<elvia-datepicker label="Velg dato"></elvia-datepicker>
```

See [Web components](./web-components.md) for attributes, properties, and events.

## Attributes

### value

Set a `Date` for a selected date. Set `null` to clear the selection.

The `valueOnChange` event returns a `Date` or `null`. The `valueOnChangeISOString` event returns the local
date as `YYYY-MM-DD`, without time. It returns `null` for an empty selection or `"Invalid Date"` for an
invalid date.

Use `errorOnChange` to check validation errors, not only the value events.

```js
const datepicker = document.querySelector('elvia-datepicker');
datepicker.value = new Date(2026, 9, 19);
```

### size

Set to `small` or `medium`. Use `small` primarily in internal systems.

```html
<elvia-datepicker label="Velg dato" size="small"></elvia-datepicker>
```

### minDate

Set a `Date` for the first available day.

```js
datepicker.minDate = new Date(2026, 9, 1);
```

### maxDate

Set a `Date` for the last available day.

```js
datepicker.maxDate = new Date(2026, 9, 31);
```

### disableDate

Set a function that accepts a `Date`. Return `true` to disable the date in the calendar.

This function does not validate typed dates or prevent automatic selection when the picker opens. Validate
these dates in the application.

```js
datepicker.disableDate = (day) => day.getDay() === 0 || day.getDay() === 6;
```

### hasSelectDateOnOpen

The default is `true`. An empty picker selects today when it opens. If today is outside the limits, it selects
the nearest limit.

Set to `false` to keep the value empty until the user selects a date.

```html
<elvia-datepicker label="Velg dato" hasSelectDateOnOpen="false"></elvia-datepicker>
```

### resetTime

The default is `false`. The component preserves the previous selected time when it changes the date. Set to
`true` to reset the time to local midnight.

```html
<elvia-datepicker label="Velg dato" resetTime></elvia-datepicker>
```

### isRequired

Set to `true` to validate an empty field as an error. The reset button still clears the selection.

```html
<elvia-datepicker label="Velg dato" isRequired></elvia-datepicker>
```

### hasOptionalText

Set to `true` to add `(valgfri)` to the label in Norwegian. The text is `(optional)` in English. This option
does not change validation.

```html
<elvia-datepicker label="Velg dato" hasOptionalText></elvia-datepicker>
```

### errorOptions

Set an object with `text`, `hideText`, `isErrorState`, or `hasErrorPlaceholder`. The default is
`{ hideText: false, isErrorState: false, hasErrorPlaceholder: true }`.

- A nonempty `text` shows a custom error message and activates the error style.
- Set `hideText` to `true` to hide internal error messages, not custom text or the error style.
- Set `isErrorState` to `true` to activate the error style without a message.
- Set `hasErrorPlaceholder` to `false` to remove reserved space when no internal error or custom text is
  present.

The `errorOnChange` event returns an internal validation message, or an empty string when the error clears. It
does not report custom errors from `errorOptions`.

```js
datepicker.errorOptions = { text: 'Velg en virkedag' };
```

## Guidelines

### When to use

- Use Datepicker for one date with manual input and a calendar.
- Keep the size consistent with the other inputs in the form.

### When not to use

- Use [Datepicker range](./datepicker-range.md) to select a start date and an end date.
- Use Timepicker for tasks that require selecting a time.
- Do not use Datepicker for birthdates.

## Accessibility

- Keep a nonempty `label` so the internal input has an accessible name.

## Examples

**Input:** Read the selected local date without time. Keep the initial value empty when the calendar opens.

**Output:**

```html
<elvia-datepicker id="date" label="Velg dato" hasSelectDateOnOpen="false"></elvia-datepicker>
<p id="selected-date" aria-live="polite"></p>
```

```js
const datepicker = document.querySelector('#date');
const selectedDate = document.querySelector('#selected-date');

datepicker.addEventListener('valueOnChangeISOString', (event) => {
  const value = event.detail.value;
  selectedDate.textContent = value === 'Invalid Date' ? 'Ugyldig dato' : (value ?? 'Ingen dato valgt');
});
```

**Input:** Require a date in October 2026.

**Output:**

```html
<elvia-datepicker
  id="appointment"
  label="Velg avtaledato"
  isRequired
  resetTime
  hasSelectDateOnOpen="false"
></elvia-datepicker>
```

```js
const appointment = document.querySelector('#appointment');

appointment.minDate = new Date(2026, 9, 1);
appointment.maxDate = new Date(2026, 9, 31);
```

**Input:** Disable weekends in the calendar. Show a custom error when the user types a weekend date.

**Output:**

```html
<elvia-datepicker id="workday" label="Velg en virkedag" hasSelectDateOnOpen="false"></elvia-datepicker>
```

```js
const workday = document.querySelector('#workday');
const isWeekend = (day) => day.getDay() === 0 || day.getDay() === 6;

workday.disableDate = isWeekend;
workday.addEventListener('valueOnChange', (event) => {
  const value = event.detail.value;
  workday.errorOptions = {
    text: value && isWeekend(value) ? 'Velg en virkedag' : '',
  };
});
```
