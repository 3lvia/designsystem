- [Datepicker range (`<elvia-datepicker-range>`)](#datepicker-range-elvia-datepicker-range)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [value](#value)
    - [labelOptions](#labeloptions)
    - [isRequired](#isrequired)
    - [isVertical](#isvertical)
    - [hasTimepickers](#hastimepickers)
    - [hasSelectDateOnOpen](#hasselectdateonopen)
    - [hasAutoOpenEndDatepicker](#hasautoopenenddatepicker)
    - [minDate and maxDate](#mindate-and-maxdate)
    - [disableDates](#disabledates)
    - [errorOptions](#erroroptions)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Datepicker range (`<elvia-datepicker-range>`)

## Reference

https://design.elvia.io/components/datepicker-range

`<elvia-datepicker-range>` is a web component.

## Installation

This web component requires the `@elvia/elvis-datepicker-range` package. See the
[Installation reference](./installation.md).

## Use

```html
<elvia-datepicker-range></elvia-datepicker-range>
```

See [Web components](./web-components.md) for attributes, properties, and events.

## Attributes

### value

Set an object with `start` and `end` as `Date` or `null`.

The `valueOnChange` event returns `{ start, end }` as `Date`, `null` for an empty field, or `Invalid Date`.
The `valueOnChangeISOString` event returns `{ start, end }` as `YYYY-MM-DD` without time, or `null`.

```js
const range = document.querySelector('elvia-datepicker-range');
range.value = { start: new Date(2026, 9, 1), end: new Date(2026, 9, 31) };
```

### labelOptions

Set an object with `start` and `end` strings. The defaults are `Fra dato` and `Til dato`.

```js
range.labelOptions = { start: 'Oppstart', end: 'Avslutning' };
```

### isRequired

Set to `true` to require both dates. Set an object to require only one date.

```js
range.isRequired = { start: true, end: false };
```

### isVertical

The default is `false`. Set to `true` to stack the two pickers. Use it for narrow screens.

```html
<elvia-datepicker-range isVertical></elvia-datepicker-range>
```

### hasTimepickers

The default is `false`. Set to `true` to show a time picker for each date. Set `timepickerInterval` to change
the minute step. The default is `15`.

```html
<elvia-datepicker-range hasTimepickers timepickerInterval="30"></elvia-datepicker-range>
```

### hasSelectDateOnOpen

The default is `true`. An empty picker selects the current date when it opens. Set to `false` to keep it empty
until the user selects a date.

```html
<elvia-datepicker-range hasSelectDateOnOpen="false"></elvia-datepicker-range>
```

### hasAutoOpenEndDatepicker

The default is `false`. Set to `true` to open the end picker when the start picker closes.

```html
<elvia-datepicker-range hasAutoOpenEndDatepicker></elvia-datepicker-range>
```

### minDate and maxDate

Set a `Date` for the first and last available day. The limits apply to both pickers.

```js
range.minDate = new Date(2026, 9, 1);
range.maxDate = new Date(2026, 9, 31);
```

### disableDates

Set an object with `start` and `end` functions. Each function accepts a `Date`. Return `true` to disable the
date.

```js
const isWeekend = (day) => day.getDay() === 0 || day.getDay() === 6;
range.disableDates = { start: isWeekend, end: isWeekend };
```

### errorOptions

Set an object with `start` and `end`. Each one accepts `text`, `hideText`, `isErrorState`, and
`hasErrorPlaceholder`. The defaults are the same as for the [Datepicker](./datepicker.md#erroroptions).

The `errorOnChange` event returns `{ start, end }` with internal validation messages. It does not report
custom errors.

```js
range.errorOptions = { end: { text: 'Velg en senere dato' } };
```

## Guidelines

### When to use

- Use Datepicker range to select a start date and an end date.
- Use `isVertical` when the horizontal layout does not fit.

### When not to use

- Use [Datepicker](./datepicker.md) for one date.

## Accessibility

- Keep the `labelOptions` values nonempty. Each input needs an accessible name.
- The component changes its `aria-label` values with the `lang` attribute on the `html` element.

## Examples

**Input:** Select a period in October 2026. Both dates are required.

**Output:**

```html
<elvia-datepicker-range id="period" isRequired hasSelectDateOnOpen="false"></elvia-datepicker-range>
```

```js
const period = document.querySelector('#period');
period.minDate = new Date(2026, 9, 1);
period.maxDate = new Date(2026, 9, 31);
period.addEventListener('valueOnChangeISOString', (event) => {
  const { start, end } = event.detail.value;
  console.log(start, end);
});
```

**Input:** Select a period with times on a narrow screen.

**Output:**

```html
<elvia-datepicker-range isVertical hasTimepickers></elvia-datepicker-range>
```
