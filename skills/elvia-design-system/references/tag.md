- [Tag (`e-tag`)](#tag-e-tag)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Colors](#colors)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [Text and color](#text-and-color)
  - [Accessibility](#accessibility)
  - [Classes](#classes)
  - [Examples](#examples)

# Tag (`e-tag`)

## Reference

https://design.elvia.io/components/tag

Tag is a CSS-based component, consisting of CSS classes only.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the tag classes.

## Use

```html
<span class="e-tag">Faktura</span>
```

## Colors

`e-tag` has no colored dot. Add one color modifier to show a dot before the text:

```html
<span class="e-tag e-tag--positive">Aktiv</span>
```

Available color modifiers:

- **Signal colors:** `e-tag--positive`, `e-tag--danger`, `e-tag--warning`, `e-tag--neutral`
- **Data colors:** `e-tag--data-1`, `e-tag--data-2`, `e-tag--data-3`, `e-tag--data-4`, `e-tag--data-5`,
  `e-tag--data-6`

Prefer the most semantic alias when possible, eg. `e-tag--positive` instead of `e-tag--green`. Use only one
color modifier at a time. For an inverted background, add `e-tag--inverted` as a separate theme modifier:

```html
<span class="e-tag e-tag--inverted e-tag--neutral">Arkivert</span>
```

Semantic status modifiers and their color aliases:

| Modifier(s)                                   | Underlying color token                   | Intended meaning                                                 |
| --------------------------------------------- | ---------------------------------------- | ---------------------------------------------------------------- |
| `e-tag--positive`, `e-tag--success`           | `--e-color-signal-positive`              | Successful or completed status                                   |
| `e-tag--caution`, `e-tag--yellow`             | `--e-color-signal-caution`               | A status that needs attention                                    |
| `e-tag--warning`, `e-tag--orange`             | `--e-color-signal-warning`               | A warning status                                                 |
| `e-tag--error`, `e-tag--danger`, `e-tag--red` | `--e-color-signal-danger`                | An error or negative status                                      |
| `e-tag--neutral`                              | `--e-tag-color-neutral` (theme-adaptive) | Neither positive nor negative, such as in progress or registered |

The numbered data modifiers (`e-tag--data-1` through `e-tag--data-6`) are palette identifiers for
categorization only, never for status. Their numbers identify colors; they do not imply meaning, priority, or
order. Use them to distinguish categories, not to communicate a status.

## Guidelines

### When to use

- Use tags to categorize items or show their status.
- Pair a tag with the item it describes; do not use tags alone.
- For an interactive action, use a link or button instead of styling it as a tag.
- Prefer `e-tag` over custom tags or classes.
- Use `e-tag--neutral` for neutral statuses, such as in progress or registered.
- Use `e-tag--data-1` through `e-tag--data-6` for categorization only, never for status.

### Text and color

- Keep the label short and descriptive, with a maximum of two words.
- For status labels, use `positive`/`success` for successful states, `caution` or `warning` when attention is
  needed, `danger`/`error` for errors or negative states, and `neutral` when the state is neither good nor
  bad.
- Use data colors for categorization only; do not use them to communicate status.
- Do not use tags for standalone numeric values such as IDs or amounts.

## Accessibility

- Use a static element, such as `<span>` or `<div>`.
- Keep the text meaningful without its color. Do not rely on color alone to communicate.
- If the item needs an action, use a native link or button with its normal accessible name and interaction
  behavior. Tags are not interactive elements themselves.

## Classes

Classes use BEM.

Base: `e-tag`

**Modifiers**

- `e-tag--black`
- `e-tag--blue-berry`
- `e-tag--caution`
- `e-tag--danger`
- `e-tag--data-1`
- `e-tag--data-2`
- `e-tag--data-3`
- `e-tag--data-4`
- `e-tag--data-5`
- `e-tag--data-6`
- `e-tag--error`
- `e-tag--green-apple`
- `e-tag--green`
- `e-tag--grey`
- `e-tag--inverted`
- `e-tag--neutral`
- `e-tag--orange-mango`
- `e-tag--orange`
- `e-tag--positive`
- `e-tag--purple-plum`
- `e-tag--red-tomato`
- `e-tag--red`
- `e-tag--success`
- `e-tag--violet-grape`
- `e-tag--warning`
- `e-tag--white`
- `e-tag--yellow`

## Examples

**Input:** Add a status label to a task.

**Output:**

```html
<div>
  <span>Oppgavestatus</span>
  <span class="e-tag e-tag--positive">Fullført</span>
</div>
```

**Input:** Categorize this item.

**Output:**

```html
<div>
  <span>Forbruk</span>
  <span class="e-tag e-tag--data-1">Bolig</span>
  <span class="e-tag e-tag--data-2">Fritid</span>
  <span class="e-tag e-tag--data-3">Næring</span>
</div>
```
