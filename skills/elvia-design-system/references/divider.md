- [Divider (`<elvia-divider>`)](#divider-elvia-divider)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [type](#type)
    - [heading](#heading)
    - [typography](#typography)
    - [orientation](#orientation)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Divider (`<elvia-divider>`)

## Reference

https://design.elvia.io/components/divider

`<elvia-divider>` is a web component.

## Installation

This web component requires the `@elvia/elvis-divider` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

Use a simple divider by default.

```html
<elvia-divider></elvia-divider>
```

## Attributes

### type

Allowed values are `simple`, `heading`, and `curved`. The default is `simple`.

Set `type` to `heading` to show a heading, or to `curved` to show a curved divider.

```html
<elvia-divider type="curved"></elvia-divider>
```

### heading

Set `heading` to text, or provide content in the `heading` slot.

```html
<elvia-divider type="heading" heading="Hva er nettleie?"></elvia-divider>
```

### typography

Allowed values are `medium` and `caps`. The default is `medium`.

Set `typography` when `type` is `heading`.

```html
<elvia-divider type="heading" heading="Hva er nettleie?" typography="caps"></elvia-divider>
```

### orientation

Allowed values are `horizontal` and `vertical`. The default is `horizontal`.

Set `orientation` when `type` is `simple`.

```html
<elvia-divider type="simple" orientation="vertical"></elvia-divider>
```

## Guidelines

### When to use

- Use the simple divider for subtle separation.
- Use the heading divider to group content at the same hierarchy level.
- Use the curved divider for clear, full-width page sections.
- Use margin classes to set spacing around the divider. The component has `display: contents`, so use a
  wrapper or the `className` prop.

### When not to use

- Do not use the curved divider for a partial-width section.

## Accessibility

The divider has the `separator` role.

## Examples

**Input:** Separate content with a subtle line.

**Output:**

```html
<elvia-divider></elvia-divider>
```

**Input:** Add a formatted heading to a content section.

**Output:**

```html
<elvia-divider type="heading">
  <h2 slot="heading">Hva er nettleie?</h2>
</elvia-divider>
```
