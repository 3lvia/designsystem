# List (`e-list`)

## Reference

https://design.elvia.io/components/list

List is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the list classes.

Icon lists also use the `<e-icon>` web component. See the [icon reference](./icon.md) for setup and available
icons.

## Use

```html
<ul class="e-list">
  <li>First item</li>
  <li>Second item</li>
</ul>

<ol class="e-list e-list--numbers">
  <li>First step</li>
  <li>Second step</li>
</ol>

<ul class="e-list e-list--icons">
  <li>
    <span class="e-list__icon">
      <e-icon name="powermeterAms"></e-icon>
    </span>
    Item text
  </li>
</ul>

<ul class="e-list e-list--strong">
  <li>Emphasized item</li>
</ul>
```

## Types

- **Bullet** (`ul.e-list`): unordered items.
- **Numbered** (`ol.e-list.e-list--numbers`): items with a meaningful order, such as steps.
- **Icon** (`.e-list--icons`): replaces bullet markers with icons; use `ul` or `ol` according to the content's
  meaning.

## Guidelines

- Wrap each icon marker in `e-list__icon`; keep meaningful text in every item.
- Use icon lists when you need to list definitions or explain items.
- `e-list--strong` sets font weight to 600. Font size is inherited from surrounding content.

## Classes

Classes use BEM.

Base: `e-list`

**Elements**

- `e-list__icon`

**Modifiers**

- `e-list--icons`
- `e-list--numbers`
- `e-list--strong`

## Examples

**Input:** Show meter information and the HAN port as icon-marked topics.

**Output:**

```html
<ul class="e-list e-list--icons">
  <li>
    <span class="e-list__icon">
      <e-icon name="powermeterAms"></e-icon>
    </span>
    <strong>Electricity meter:</strong> Monitor your energy use.
  </li>
  <li>
    <span class="e-list__icon">
      <e-icon name="hanColor"></e-icon>
    </span>
    <strong>HAN port:</strong> Request opening on Min side.
  </li>
</ul>
```
