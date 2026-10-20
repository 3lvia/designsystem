[TOC]

- [Slider (`<elvia-slider>`)](#slider-elvia-slider)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [type](#type)
    - [min](#min)
    - [max](#max)
    - [value](#value)
    - [hasInputField](#hasinputfield)
    - [hasHints](#hashints)
    - [size](#size)
    - [ariaLabel](#arialabel)
    - [errorOptions](#erroroptions)
    - [valueOnChange](#valueonchange)
    - [errorOnChange](#erroronchange)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Slider (`<elvia-slider>`)

## Reference

https://design.elvia.io/components/slider

`<elvia-slider>` is a web component.

## Installation

This web component requires the `@elvia/elvis-slider` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

```html
<elvia-slider label="Forbruk" ariaLabel='"Strømforbruk"'></elvia-slider>
```

Set `type` to `range` to select a start and end value.

## Attributes

### type

Set to `simple` for one value or `range` for two values. Defaults to `simple`.

### min

Set the minimum value. Defaults to `0`. Set it lower than `max`.

### max

Set the maximum value. Defaults to `100`. Set it higher than `min`.

### value

Use a number for a simple slider. Use `{ left, right }` for a range slider. Without `value`, the simple slider
starts at `min`, and the range slider starts at `{ left: min, right: max }`.

Set a range value as a property:

```js
document.querySelector('elvia-slider').value = { left: 20, right: 60 };
```

### hasInputField

Show numeric input fields. Defaults to `true`.

### hasHints

Show the `min` and `max` values beside the slider. Defaults to `true`. Hints do not show for a range slider
when `hasInputField` is `true`.

### size

Set to `medium` or `small`. Defaults to `medium`.

### ariaLabel

Always provide an accessible label. Use a string for a simple slider. Use `{ left, right }` to label each
thumb on a range slider.

### errorOptions

Set `text`, `hideText`, `isErrorState`, or `hasErrorPlaceholder` for the input fields. These fields default to
no text, `false`, `false`, and `true`, respectively. For a range slider, set options under `left` or `right`.

```js
slider.errorOptions = {
  left: {
    text: 'Ugyldig startverdi',
    hideText: false,
    isErrorState: true,
    hasErrorPlaceholder: true,
  },
  right: {
    text: 'Ugyldig sluttverdi',
    hideText: false,
    isErrorState: true,
    hasErrorPlaceholder: true,
  },
};
```

Set `hideText` to hide the error message. For a range slider, setting it on either side hides the shared error
message.

### valueOnChange

Emits the new value when it changes. The value is a number for a simple slider or `{ left, right }` for a
range slider.

### errorOnChange

Emits the current validation error text when it changes.

## Guidelines

### When to use

- Use a slider when an approximate value is sufficient.

### When not to use

- Do not use a slider when the user must enter a precise value.

## Accessibility

- Set `ariaLabel` for each slider thumb.

## Examples

**Input:** Let users choose a range and handle its value changes.

**Output:**

```html
<elvia-slider id="forbruk" type="range" label="Estimert forbruk"></elvia-slider>
```

```js
const slider = document.querySelector('#forbruk');

slider.ariaLabel = { left: 'Laveste forbruk', right: 'Høyeste forbruk' };
slider.addEventListener('valueOnChange', (event) => {
  const { left, right } = event.detail.value;
  console.log(left, right);
});
```

See [Events](./web-components.md#events) for the event shape.
