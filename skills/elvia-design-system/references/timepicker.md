- [Timepicker (`<elvia-timepicker>`)](#timepicker-elvia-timepicker)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [value](#value)
    - [minuteInterval](#minuteinterval)
    - [hasSecondPicker](#hassecondpicker)
    - [size](#size)
    - [minTime](#mintime)
    - [maxTime](#maxtime)
    - [selectNowOnOpen](#selectnowonopen)
    - [isRequired](#isrequired)
    - [errorOptions](#erroroptions)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Timepicker (`<elvia-timepicker>`)

## Reference

https://design.elvia.io/components/timepicker

`<elvia-timepicker>` is a web component.

## Installation

This web component requires the `@elvia/elvis-timepicker` package. See the
[Installation reference](./installation.md).

## Use

```html
<elvia-timepicker label="Velg tid"></elvia-timepicker>
```

See [Web components](./web-components.md) for attributes, properties, and events.

## Attributes

### value

Set a `Date` for the selected time. Set `null` to clear the selection.

The `valueOnChange` event returns a `Date` or `null`. The component validates typed input when the input loses
focus. Malformed times do not emit a new value, but times outside `minTime` or `maxTime` still emit a `Date` and
produce a validation error. Use `errorOnChange` to check validation errors, not only `valueOnChange`.

```js
const timepicker = document.querySelector('elvia-timepicker');
timepicker.value = new Date(2026, 9, 20, 9, 30);
```

### minuteInterval

Set to `"1"`, `"5"`, `"10"`, `"15"`, or `"60"`. The default is `"15"`. The interval controls the minute and
second options in the popup, not typed input. Set to `"60"` to hide the minute options.

```html
<elvia-timepicker label="Velg tid" minuteInterval="5"></elvia-timepicker>
```

### hasSecondPicker

Set to `true` to add second options and use the `HH:mm:ss` input format. The default format is `HH:mm`.

```html
<elvia-timepicker label="Velg tid" hasSecondPicker minuteInterval="1"></elvia-timepicker>
```

### size

Set to `small` or `medium`. Use `small` primarily in internal systems.

```html
<elvia-timepicker label="Velg tid" size="small"></elvia-timepicker>
```

### minTime

Set a `Date` for the earliest available time. Only hours, minutes, and seconds affect validation, not the
date. Typed times before this limit cause a validation error.

```js
timepicker.minTime = new Date(2026, 9, 20, 8, 0);
```

### maxTime

Set a `Date` for the latest available time. Only hours, minutes, and seconds affect validation, not the date.
Typed times after this limit cause a validation error.

```js
timepicker.maxTime = new Date(2026, 9, 20, 16, 0);
```

### selectNowOnOpen

The default is `true`. An empty picker selects the current time when it opens. This selection can be outside
`minTime` and `maxTime`. Set to `false` to keep the value empty until the user selects a time.

```html
<elvia-timepicker label="Velg tid" selectNowOnOpen="false"></elvia-timepicker>
```

### isRequired

Set to `true` to validate an empty field after the user interacts with it.

```html
<elvia-timepicker label="Velg tid" isRequired></elvia-timepicker>
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
timepicker.errorOptions = { text: 'Velg et annet tidspunkt' };
```

## Guidelines

### When to use

- Use seconds when the task needs second-level precision.
- Keep the size consistent with the other inputs in the form.

### When not to use

- Use [Datepicker](./datepicker.md) for one date.
- Use [Datepicker range](./datepicker-range.md#hastimepickers) for a start date and an end date with times.

## Accessibility

- Keep a nonempty `label` for the internal input.
- Preserve the popup focus trap and the focus return to the trigger.

## Examples

**Input:** Require a time between 08:00 and 16:00. Keep the initial value empty when the popup opens.

**Output:**

```html
<elvia-timepicker label="Velg avtaletid" isRequired selectNowOnOpen="false"></elvia-timepicker>
```

```js
const timepicker = document.querySelector('elvia-timepicker');

timepicker.minTime = new Date(2026, 9, 20, 8, 0);
timepicker.maxTime = new Date(2026, 9, 20, 16, 0);
```

**Input:** Select a time with seconds. Show popup options at one-second intervals.

**Output:**

```html
<elvia-timepicker
  label="Velg nøyaktig tidspunkt"
  hasSecondPicker
  minuteInterval="1"
  selectNowOnOpen="false"
></elvia-timepicker>
```
