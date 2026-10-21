- [Shadows](#shadows)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Examples](#examples)
  - [Classes](#classes)

# Shadows

## Reference

https://design.elvia.io/brand/shadow

Shadows are CSS utility classes.

## Installation

Use the `@elvia/elvis` CSS package. See [installation](./installation.md).

## Use

Add one shadow class to a solid surface:

```html
<div class="e-shadow-soft">Innhold</div>
```

## Guidelines

### When to use

- Use shadows sparingly to add depth behind a solid surface.
- Use `e-shadow-soft` mostly on grey backgrounds.
- Use `e-shadow-medium` or `e-shadow-hard` on white backgrounds.

### When not to use

- When in doubt, do not add a shadow. Elvia uses a flat design approach, so shadows should be minimal.
- Do not use shadows on text or icons.
- Do not use shadows in the dark theme. Use lighter surfaces or borders to show depth.
- Do not add several shadows to the same surface.

## Examples

**Input:** Add a subtle shadow to a card on a grey background.

**Output:**

```html
<div class="e-shadow-soft">Innhold</div>
```

## Classes

- `e-shadow-hard`
- `e-shadow-medium`
- `e-shadow-none`
- `e-shadow-soft`
