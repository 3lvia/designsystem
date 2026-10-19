- [Autocomplete (`<elvia-autocomplete>`)](#autocomplete-elvia-autocomplete)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [value](#value)
    - [hasBuiltInFilter](#hasbuiltinfilter)
    - [openOnFocus](#openonfocus)
    - [size](#size)
    - [menuPosition](#menuposition)
    - [errorOptions](#erroroptions)
    - [isRequired](#isrequired)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Autocomplete (`<elvia-autocomplete>`)

## Reference

https://design.elvia.io/components/autocomplete

`<elvia-autocomplete>` is a web component.

## Installation

This web component requires the `@elvia/elvis-autocomplete` package. See the
[Installation reference](./installation.md).

## Use

```html
<elvia-autocomplete
  label="Sted"
  placeholder="Skriv et sted"
  items='[{"label":"Oslo","value":"Oslo"},{"label":"Hamar","value":"Hamar"}]'
></elvia-autocomplete>
```

The input accepts free text. Users do not have to select a suggestion.

See [Web components](./web-components.md) for attributes, properties, and events.

## Attributes

### items

Set an array of objects with `label` and `value`. The `label` is a string. The `value` accepts a string or
`null`. Use unique values for the suggestions. The menu shows the label.

```js
autocomplete.items = [
  { label: 'Oslo kommune', value: 'Oslo' },
  { label: 'Hamar kommune', value: 'Hamar' },
];
```

### value

Set a string or `null`. The default is an empty string. The `valueOnChange` event emits the input text when
the user types. The `onSelectItem` event emits the item value when the user selects a suggestion. A selection
does not emit `valueOnChange`. Handle both events when the application needs every input change.

```js
autocomplete.value = 'Oslo';
```

### hasBuiltInFilter

The default is `true`. The filter matches labels with a case-insensitive substring check. It trims the search
text and returns the first six matches in item order. Set to `false` for a custom filter. Filter and sort
`items` in the application.

```js
autocomplete.hasBuiltInFilter = false;
```

### openOnFocus

The default is `false`. Set to `true` to show suggestions when an empty input receives focus. The menu stays
hidden when its only suggestion matches the input value.

```html
<elvia-autocomplete label="Sted" openOnFocus></elvia-autocomplete>
```

### size

Set to `small` or `medium`. Use `small` primarily in internal systems. Keep the size consistent with other
inputs in the form.

```html
<elvia-autocomplete label="Sted" size="small"></elvia-autocomplete>
```

### menuPosition

Set to `top`, `bottom`, or `auto`. The default is `auto`.

```html
<elvia-autocomplete label="Sted" menuPosition="top"></elvia-autocomplete>
```

### errorOptions

Set an object with `text`, `hideText`, `isErrorState`, or `hasErrorPlaceholder`. The default is
`{ hideText: false, isErrorState: false, hasErrorPlaceholder: true }`.

- A nonempty `text` shows a custom error message and activates the error style.
- Set `hideText` to `true` to hide the internal validation message. A custom `text` remains visible.
- Set `isErrorState` to `true` to activate the error style without a message.
- Set `hasErrorPlaceholder` to `false` to remove unused error space. Custom text and internal errors retain
  this space.

```js
autocomplete.errorOptions = { text: 'Skriv et sted' };
```

### isRequired

Set to `true` to reject an empty input. This option does not require a selection from `items`. The component
validates the input on blur.

```html
<elvia-autocomplete label="Sted" isRequired></elvia-autocomplete>
```

## Guidelines

### When to use

- Use Autocomplete when users know the options and can enter a value outside the suggestion list.
- Use a custom filter when the application supplies suggestions from an external source.

### When not to use

- Use [Dropdown](https://design.elvia.io/components/dropdown) when users must select one or more predefined
  options.
- Avoid Autocomplete when users do not know the available options.

## Accessibility

- Set `label` to provide a visible label.
- If no visible label is present, you MUST set `ariaLabel` to give the input an accessible name.
- Preserve Up and Down Arrow navigation and Enter or Tab selection for the highlighted suggestion.

## Examples

**Input:** Show municipality labels and read the selected place.

**Output:**

```html
<elvia-autocomplete
  id="place"
  label="Sted"
  items='[{"label":"Oslo kommune","value":"Oslo"},{"label":"Hamar kommune","value":"Hamar"}]'
></elvia-autocomplete>
<p id="selected-place" aria-live="polite"></p>
```

```js
const autocomplete = document.querySelector('#place');
const selectedPlace = document.querySelector('#selected-place');

autocomplete.addEventListener('onSelectItem', (event) => {
  selectedPlace.textContent = event.detail.value ?? '';
});
```

**Input:** Show suggestions only when the place starts with the input text.

**Output:**

```html
<elvia-autocomplete id="place-prefix" label="Sted" openOnFocus></elvia-autocomplete>
```

```js
const autocomplete = document.querySelector('#place-prefix');
const places = [
  { label: 'Oslo', value: 'Oslo' },
  { label: 'Hamar', value: 'Hamar' },
];

autocomplete.hasBuiltInFilter = false;
autocomplete.items = places;
autocomplete.addEventListener('valueOnChange', (event) => {
  const query = (event.detail.value ?? '').trim().toLowerCase();
  autocomplete.items = places.filter((item) => item.label.toLowerCase().startsWith(query));
});
```
