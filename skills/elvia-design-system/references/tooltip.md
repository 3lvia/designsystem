- [Tooltip (`<elvia-tooltip>`)](#tooltip-elvia-tooltip)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [content](#content)
    - [position](#position)
    - [showDelay](#showdelay)
    - [isDisabled](#isdisabled)
    - [display](#display)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Tooltip (`<elvia-tooltip>`)

## Reference

https://design.elvia.io/components/tooltip

`<elvia-tooltip>` is a web component.

## Installation

This web component requires the `@elvia/elvis-tooltip` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

The trigger element MUST have `slot="trigger"`.

```html
<!-- Pairs with aria-label from e-btn -->
<elvia-tooltip content="Slett kontrakt">
  <button slot="trigger" class="e-btn e-btn--icon" aria-label="Slett kontrakt">
    <span class="e-btn__icon"><e-icon name="bin"></e-icon></span>
  </button>
</elvia-tooltip>

<!-- Untruncated version of truncated text -->
<elvia-tooltip content="Lorem ipsum dolor sit amet.">
  <span slot="trigger" class="table__cell-text">Lorem ipsum dol...</span>
</elvia-tooltip>
```

Rich tooltip content uses a slot, `slot="content"`, instead of the `content` attribute:

```html
<elvia-tooltip>
  <button slot="trigger" class="e-btn e-btn--icon" aria-label="Mer info">
    <span class="e-btn__icon"><e-icon name="info"></e-icon></span>
  </button>
  <div slot="content"><strong>Lorem</strong> <i>ipsum</i> dolor sit amet.</div>
</elvia-tooltip>
```

## Attributes

### content

`content` is required unless using `slot="content"`. Keep it short.

Example:

```html
<elvia-tooltip content="Last ned rapport">...</elvia-tooltip>
```

### position

It must be `"top" | "right" | "bottom" | "left"`. Defaults to `"top"`, which auto-adjusts to fit available
space. Prefer leaving it unset unless there's a specific reason to force one.

Example:

```html
<elvia-tooltip content="..." position="left">...</elvia-tooltip>
```

### showDelay

A number (ms). Only applies to hover. Keyboard focus always shows the tooltip instantly.

Example:

```html
<elvia-tooltip content="..." showDelay="800">...</elvia-tooltip>
```

### isDisabled

A boolean.

Example:

```html
<elvia-tooltip content="..." isDisabled>...</elvia-tooltip>
```

### display

It must be a CSS `display` value for the trigger wrapper. Defaults to `"inline-block"`. Only change it if the
default breaks your layout (e.g. the trigger needs to be `block` or `flex`).

Example:

```html
<elvia-tooltip content="..." display="flex">...</elvia-tooltip>
```

## Guidelines

### When to use

- Explaining an icon-only button
- Showing untruncated text

### When not to use

- Explaining a concept
- Content the user needs to complete the task
- When there's nothing useful to say.

## Accessibility

- Keyboard focus shows the tooltip immediately. Don't override this.
- Supplements `aria-label`, never replaces it.
- Never the only place required information appears.

## Examples

**Input:** "Icon-only download button in the toolbar, with a tooltip explaining what it does."

**Output:**

```html
<elvia-tooltip content="Last ned rapport">
  <button slot="trigger" class="e-btn e-btn--icon" aria-label="Last ned rapport">
    <span class="e-btn__icon"><e-icon name="download"></e-icon></span>
  </button>
</elvia-tooltip>
```

**Input:** "A table column shows customer names, but they get cut off at 10 characters. Add a way to see the
full name."

**Output:**

```html
<elvia-tooltip content="Lorem ipsum dolor sit amet.">
  <span slot="trigger" class="table__cell-text">Lorem ipsum dolo...</span>
</elvia-tooltip>
```

**Input:** "Tooltip on 'Submit' explaining it locks the contract for 30 days, irreversibly."

**Output:** Not a tooltip. Visible helper text or a confirmation dialog instead.

```html
<p>Innsending låser kontrakten i 30 dager og kan ikke angres.</p>
<button type="submit" class="e-btn e-btn--primary">
  <span class="e-btn__title">Send inn</span>
</button>
```
