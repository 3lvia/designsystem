- [Segmented Control (`<elvia-segmented-control>`)](#segmented-control-elvia-segmented-control)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [value](#value)
    - [type](#type)
    - [size](#size)
    - [valueOnChange](#valueonchange)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Segmented Control (`<elvia-segmented-control>`)

## Reference

https://design.elvia.io/components/segmented-control

`<elvia-segmented-control>` is a web component.

## Installation

This web component requires the `@elvia/elvis-segmented-control` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

```html
<elvia-segmented-control
  items='[{"label":"Uke"},{"label":"Måned"},{"label":"År"}]'
  value="0"
></elvia-segmented-control>
```

The component reports the selected index. Listen for `valueOnChange` and show the matching view.

For updates to `value` or `items` after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### items

Required. Pass an array of text items or icon items.

- Text items use `label`.
- Icon items use `icon`, `iconSelected`, and `ariaLabel`. `tooltip` is optional.
- Use `icon` for the unselected state and `iconSelected` for the selected state.
- Icon values are HTML strings. See [Arrays and objects](./web-components.md#arrays-and-objects) for how to
  pass the value. See [Icons](./icon.md) for `<e-icon>` registration.

### value

The zero-based index of the selected item. Defaults to `0`.

### type

Set to `text` or `icon`. Defaults to `text`.

### size

Set to `small`, `medium`, or `large`. Defaults to `medium`. The component sets `<e-icon>` to 16px for small
and medium sizes, and 24px for large. Set icon sizes manually when you use other icon markup. See
[Icons](./icon.md).

### valueOnChange

Fires when the user selects an item. The event value is the selected item index. See
[Events](./web-components.md#events).

## Guidelines

### When to use

- Consider a segmented control to switch between closely related subviews.
- Use it to switch between a small set of views with short labels.
- As much as possible, use text with a similar size in each segment.

### When not to use

- Do not use it for more than three options or long labels. Use a dropdown instead.

## Accessibility

- Text items use their `label` as the radio label.
- Every icon item MUST set `ariaLabel`.
- Users can move between items with the Left/Right or Up/Down Arrow keys.
- Use nouns or noun phrases for segment labels.

## Examples

**Input:** Switch between three time periods and show the selected view.

**Output:**

```html
<elvia-segmented-control
  id="control"
  items='[{"label":"Uke"},{"label":"Måned"},{"label":"År"}]'
></elvia-segmented-control>

<div id="views">
  <section>Uke innhold</section>
  <section hidden>Måned innhold</section>
  <section hidden>År innhold</section>
</div>
```

```js
const control = document.querySelector('#control');
const views = document.querySelectorAll('#views > section');

control.addEventListener('valueOnChange', (event) => {
  views.forEach((view, index) => {
    view.hidden = index !== event.detail.value;
  });
});
```

**Input:** Use icon options to switch between image and list views.

**Output:**

```html
<elvia-segmented-control id="control" type="icon"></elvia-segmented-control>
```

```js
const control = document.querySelector('#control');

control.items = [
  {
    ariaLabel: 'Bildevisning',
    icon: '<e-icon name="thumbnail"></e-icon>',
    iconSelected: '<e-icon name="thumbnailColor"></e-icon>',
    tooltip: 'Bilder',
  },
  {
    ariaLabel: 'Listevisning',
    icon: '<e-icon name="list"></e-icon>',
    iconSelected: '<e-icon name="listColor"></e-icon>',
    tooltip: 'Liste',
  },
];
```
