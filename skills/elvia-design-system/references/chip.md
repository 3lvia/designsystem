- [Chip (`<elvia-chip>`)](#chip-elvia-chip)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [type](#type)
    - [ariaLabel](#arialabel)
    - [color](#color)
    - [value](#value)
    - [markerStyle](#markerstyle)
    - [isLoading](#isloading)
    - [isSelected](#isselected)
    - [image](#image)
    - [onDelete](#ondelete)
    - [isSelectedOnChange](#isselectedonchange)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Chip (`<elvia-chip>`)

## Reference

https://design.elvia.io/components/chip

`<elvia-chip>` is a web component.

## Installation

This web component requires the `@elvia/elvis-chip` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

```html
<elvia-chip type="removable" value="2025" ariaLabel="Fjern filter: 2025"></elvia-chip>
```

Set `ariaLabel` for every chip. Use the `image` slot only with removable chips.

For updates to attributes or properties after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### type

Set to `removable`, `legend`, or `choice`. Defaults to `removable`.

- Use `removable` for selected filters that users can remove.
- Use `legend` to toggle data in a graph or map.
- Use `choice` to select multiple options.

### ariaLabel

Set an accessible label for every chip. Keep the label stable when the selected state changes.

### color

Set to `blue`, `green`, `orange`, `purple`, `red`, or `violet`. Defaults to `green`.

Use different colors to distinguish categories. Group chips with the same color.

For legend chips align their color with the corresponding data representation in the graph or map.

### value

Required. Set the text to display in the chip.

### markerStyle

Set to `dot`, `line`, or `dashed`. Defaults to `dot`.

Use this attribute with `type="legend"`.

### isLoading

Set this attribute to show a loading state. Use it only with `type="legend"`.

### isSelected

Set this attribute to mark a legend or choice chip as selected.

### image

Add an image to a removable chip with a child element that has `slot="image"`. The image is 32 by 32 pixels.

### onDelete

Listen for this event when a user activates a removable chip. Its event value is the chip's `value`. See
[Events](./web-components.md#events).

### isSelectedOnChange

Listen for this event when a user changes the selected state of a legend or choice chip. Its event value is
the new selected state. See [Events](./web-components.md#events).

## Guidelines

### When to use

- Use removable chips with a filter to show selected values.
- Use legend chips to toggle graph or map data.
- Use choice chips when users can select multiple options.

### When not to use

- Do not use choice chips when users must select only one option. Use [Radio buttons](./radio-button.md).

## Accessibility

- Set `ariaLabel` for every chip.
- Users can move between chips with Tab.
- Users can select, unselect, or delete a chip with Space or Enter.
- Legend and choice chips use `role="checkbox"` and `aria-checked` to indicate their selected state.
- Keep the accessible name stable when the selected state changes.

## Examples

**Input:** Remove a selected filter when a user activates its chip.

**Output:**

```html
<elvia-chip id="filter" type="removable" value="2025" ariaLabel="Forbruk for 2025"> </elvia-chip>
```

```js
const chip = document.querySelector('#filter');

chip.addEventListener('onDelete', () => {
  chip.remove();
});
```

**Input:** Label a legend chip with the name of its data series.

**Output:**

```html
<elvia-chip
  ariaLabel="Produksjon"
  color="orange"
  id="production"
  type="legend"
  value="Produksjon"
></elvia-chip>
```

**Input:** Show the person assigned to a task with an image.

**Output:**

```html
<elvia-chip type="removable" value="Ola Nordmann" ariaLabel="Fjern Ola Nordmann">
  <img slot="image" src="assets/chip/example.png" alt="" />
</elvia-chip>
```
