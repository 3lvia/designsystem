- [Utility Classes](#utility-classes)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)
    - [Accessibility](#accessibility-1)
    - [Borders](#borders)
    - [Display](#display)
    - [Flex](#flex)
    - [Focus](#focus)
    - [Shadows](#shadows)
    - [Sizing](#sizing)
    - [Spacing](#spacing)
    - [Text](#text)
    - [Visibility](#visibility)

# Utility Classes

## Reference

https://design.elvia.io/tools/utility-classes

Elvis utility classes are CSS classes.

## Installation

Use the `@elvia/elvis` CSS package. See [installation](./installation.md).

## Use

Add utility classes to an element:

```html
<div class="e-flex e-gap-16">
  <button type="button" class="e-btn e-btn--secondary">
    <span class="e-btn__title">Avbryt</span>
  </button>
  <button type="button" class="e-btn e-btn--primary">
    <span class="e-btn__title">Lagre</span>
  </button>
</div>
```

## Guidelines

### When to use

- Use utility classes for simple layout, spacing, sizing, text, and visibility styles.
- Use `e-none-*` to hide an element without reserving its space at a viewport size.
- Use `e-invisible-*` to hide an element and reserve its space at a viewport size.
- Use spacing values from 0 to 112 in steps of 8 pixels.
- Use gap values from 0 to 72 in steps of 8 pixels.
- Use `e-shadow-*` sparingly. See the [shadow guidance](https://design.elvia.io/brand/shadow).

### When not to use

- Do not use `e-hide` on focusable content. It can remain keyboard accessible while visually hidden.
- Do not use utility classes when they conflict with a component's required styles.

## Accessibility

- Use `e-sr-only` to hide content visually and keep it available to screen readers.
- Use `e-none-*` only when the content should be absent from the visual and accessibility trees at that
  viewport.

## Examples

**Input:** Hide a label visually but keep it available to screen readers.

**Output:**

```html
<span class="e-sr-only">Søk etter målepunkt</span>
```

**Input:** Hide an element on small screens but keep its space.

**Output:**

```html
<div class="e-invisible-sm">Innhold</div>
```

## Classes

Utility classes use the `e-` prefix. Values in braces show generated class patterns.

### Accessibility

- `e-sr-only`

### Borders

- `e-border-none`
- `e-br-4`
- `e-br-8`

### Display

- `e-hide`
- `e-none-lg`
- `e-none-md`
- `e-none-sm`
- `e-none-xl`
- `e-none`

### Flex

- `e-align-items-center`
- `e-align-items-end`
- `e-align-items-start`
- `e-align-self-center`
- `e-align-self-end`
- `e-align-self-start`
- `e-flex`
- `e-flex-direction-column`
- `e-flex-direction-row`
- `e-flex-wrap`
- `e-flex-wrap-reverse`
- `e-gap-{n}` where `n` is 0, 8, 16, 24, 32, 40, 48, 56, 64, or 72
- `e-justify-content-around`
- `e-justify-content-between`
- `e-justify-content-center`
- `e-justify-content-end`
- `e-justify-content-start`

### Sizing

- `e-h-0`
- `e-h-100`
- `e-h-25`
- `e-h-50`
- `e-h-75`
- `e-w-0`
- `e-w-100`
- `e-w-25`
- `e-w-50`
- `e-w-75`

### Spacing

Use `n` as 0, 8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, or 112. `e-m-n{n}` means negative margin of
`n` pixels.

- `e-m-n{n}`
- `e-m-{n}`
- `e-mb-n{n}`
- `e-mb-{n}`
- `e-ml-n{n}`
- `e-ml-{n}`
- `e-mr-n{n}`
- `e-mr-{n}`
- `e-mt-n{n}`
- `e-mt-{n}`
- `e-mx-n{n}`
- `e-mx-{n}`
- `e-my-n{n}`
- `e-my-{n}`
- `e-p-{n}`
- `e-pb-{n}`
- `e-pl-{n}`
- `e-pr-{n}`
- `e-pt-{n}`
- `e-px-{n}`
- `e-py-{n}`

### Text

- `e-capitalize`
- `e-lowercase`
- `e-text-abbreviation---active` (use with `e-text-abbreviation`)
- `e-text-abbreviation`
- `e-text-center`
- `e-text-left`
- `e-text-right`
- `e-text-wrap-balance`
- `e-text-wrap-nowrap`
- `e-text-wrap-pretty`
- `e-text-wrap-wrap`
- `e-uppercase`

### Visibility

Breakpoints:

- `e-invisible`
- `e-invisible-lg`
- `e-invisible-md`
- `e-invisible-sm`
- `e-invisible-xl`
