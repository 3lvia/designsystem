- [Content Loader (`e-content-loader`)](#content-loader-e-content-loader)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Classes](#classes)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Content Loader (`e-content-loader`)

## Reference

https://design.elvia.io/components/content-loader

Content Loader is a CSS-based component, consisting of only CSS classes.

## Installation

Install the CSS package `@elvia/elvis`. See [Elvis Installation](./installation.md).

## Use

```html
<div class="e-content-loader"></div>
```

## Classes

Classes use BEM.

Base: `e-content-loader`

**Modifiers**

- `e-content-loader--circle`
- `e-content-loader--short`
- `e-content-loader--text`

## Guidelines

### When to use

- Use placeholders that match the expected content shape and page layout.
- Set the width and height of a box placeholder to match its content area. The default size is 260px by 260px.
- Set the height of a text placeholder when the expected line height differs from 24px.
- Use `e-content-loader--short` with `e-content-loader--text` to shorten a text row to 70% width.

### When not to use

- Use a progress indicator when the content layout is unknown.

## Accessibility

- Add `aria-live` to content that updates after loading.
- Set `aria-busy="true"` until updates finish.

## Examples

**Input:** A 170px square content area is loading.

**Output:**

```css
.content-loader-size {
  width: 170px;
  height: 170px;
}
```

```html
<div class="e-content-loader content-loader-size"></div>
```

**Input:** A circular content area is loading.

**Output:**

```html
<div class="e-content-loader e-content-loader--circle"></div>
```

**Input:** Three text rows are loading. Shorten the final row.

**Output:**

```html
<div class="e-content-loader e-content-loader--text"></div>
<div class="e-content-loader e-content-loader--text"></div>
<div class="e-content-loader e-content-loader--text e-content-loader--short"></div>
```
