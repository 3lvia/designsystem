- [Thumbnail (`e-thumbnail`)](#thumbnail-e-thumbnail)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Thumbnail (`e-thumbnail`)

## Reference

https://design.elvia.io/components/thumbnail

Thumbnail is a CSS-based component, consisting of CSS classes only.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the thumbnail class.

## Use

Use a button with an image inside it:

```html
<button class="e-thumbnail" aria-label="Vis bilde 3 i større format">
  <img src="assets/thumbnail/image-3.jpg" alt="Vis bilde 3 i større format" />
</button>
```

## Guidelines

### When to use

- Use thumbnails to select an image from a collection and show it in a larger view.

### When not to use

- Do not use `e-thumbnail` for a non-interactive image.
- Do not use `e-thumbnail` for a "fancy" button or icon.

## Accessibility

- Add a descriptive `aria-label` to the button.
- Set the image `alt` text to describe the button action.

## Examples

**Input:** Mark the selected image in a collection.

Set `aria-current="true"` on the current thumbnail. When the displayed image changes, move both
`aria-current="true"` and `e-thumbnail---selected` to the new current thumbnail, removing them from the
previous one.

**Output:**

```html
<button class="e-thumbnail e-thumbnail---selected" aria-current="true" aria-label="Vis bilde 3 i større format">
  <img src="assets/thumbnail/image-3.jpg" alt="Vis bilde 3 i større format" />
</button>
```

## Classes

Classes use BEM.

Base: `e-thumbnail`

**Pseudos**

- `e-thumbnail---hover`
- `e-thumbnail---selected`
