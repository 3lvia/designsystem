- [Radio Filter (`<elvia-radio-filter>`)](#radio-filter-elvia-radio-filter)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [name](#name)
    - [value](#value)
    - [ariaLabel](#arialabel)
    - [groupAriaLabel](#grouparialabel)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Radio Filter (`<elvia-radio-filter>`)

## Reference

https://design.elvia.io/components/radio-filter

`<elvia-radio-filter>` is a web component.

## Installation

This web component requires the `@elvia/elvis-radio-filter` package. If it is not already installed, follow
the [Elvis installation reference](./installation.md).

## Use

Set `items` and the initial `value`. Give each Radio Filter a unique `name`.

```html
<elvia-radio-filter id="filter" name="message-filter"></elvia-radio-filter>
```

```js
const filter = document.querySelector('#filter');
filter.items = [
  { label: 'Alle', value: 'all' },
  { label: 'Lest', value: 'read' },
  { label: 'Ulest', value: 'unread' },
];
filter.value = 'all';
filter.addEventListener('valueOnChange', (event) => {
  //...
});
```

The component manages selection after initialization. Listen for `valueOnChange` with `addEventListener`. See
[Web Components](./web-components.md) for event and property behavior.

## Attributes

### items

Pass an array of objects with string `label` and `value` properties. The component sanitizes label HTML and
supports the [`<e-icon>` web component](./icon.md).

```js
filter.items = [{ label: 'Alle', value: 'all' }];
```

### name

Give each Radio Filter a unique name. The component uses this name for its radio inputs.

```html
<elvia-radio-filter name="message-filter"></elvia-radio-filter>
```

### value

Set the initial value to an item value. The component manages later selections and emits `valueOnChange`.

```js
filter.value = 'all';
```

### ariaLabel

This value overrides the accessible name of every option. Leave it unset when each option needs a distinct
name. The component then uses each visible label and a localized suffix.

```js
filter.ariaLabel = 'Meldingsfilter';
```

### groupAriaLabel

Set an accessible name for the radio group. The default is `Filtreringsknapper` in Norwegian and
`Filter buttons` in English.

```js
filter.groupAriaLabel = 'Meldingsfilter';
```

## Guidelines

### When to use

- Use Radio Filter to filter or toggle views of the same content.
- Always include an "All" option.

### When not to use

- Do not use Radio Filter to switch between different content. Use [Tabs](./tabs.md) or Segmented Control.

## Accessibility

- The component exposes its options as a radio group.
- Use `groupAriaLabel` to set a group name when the localized default is not suitable.
- Use `ariaLabel` when an option's visible label does not provide a sufficient accessible name. s.

## Examples

**Input:** Add an icon to a filter option.

**Output:**

```js
filter.items = [
  { label: 'Alle', value: 'all' },
  { label: '<e-icon name="bookmarkFilled" size="xs"></e-icon>Flagget', value: 'flagged' },
];
```
