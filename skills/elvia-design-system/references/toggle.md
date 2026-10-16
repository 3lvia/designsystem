- [Toggle (`e-toggle`)](#toggle-e-toggle)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Toggle (`e-toggle`)

## Reference

https://design.elvia.io/components/toggle

Toggle is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS class component requires the `@elvia/elvis` package. Follow the
[Elvis installation reference](./installation.md) if the package is not installed.

## Use

```html
<label class="e-toggle">
  Vis ukenummer
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>
```

To put the label text on the right side of the switch, put the `input` before the text.

## Guidelines

### When to use

- Use a toggle for one setting with an on or off state.
- Use the same size for all toggles on a page.
- Use the small toggle in internal systems where space is limited.
- Put the label on the right side when toggles are in a vertical list, so the switches align.

### When not to use

- Do not use a toggle for an action. Use a button.

## Accessibility

- Set `role="switch"` on the checkbox.
- Add a click handler that sets `aria-checked` to `true` or `false` to match the checked state.

## Examples

**Input:** Make a small toggle for an internal system.

**Output:**

```html
<label class="e-toggle e-toggle--small">
  Kompakt visning
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="false" />
</label>
```

**Input:** Make a disabled toggle that is on.

**Output:**

```html
<label class="e-toggle e-toggle---checked e-toggle---disabled">
  Vis ukenummer
  <input class="e-toggle__input" type="checkbox" role="switch" aria-checked="true" checked disabled />
</label>
```

## Classes

Classes use BEM.

Base: `e-toggle`

**Elements**

- `e-toggle__input`

**Modifiers**

- `e-toggle--small`

**Pseudos**

- `e-toggle---checked`
- `e-toggle---disabled`
- `e-toggle---focus`
