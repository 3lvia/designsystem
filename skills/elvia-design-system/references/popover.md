- [Popover (`<elvia-popover>`)](#popover-elvia-popover)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [heading](#heading)
    - [content](#content)
    - [horizontalPosition](#horizontalposition)
    - [verticalPosition](#verticalposition)
    - [hasCloseButton](#hasclosebutton)
    - [noPadding](#nopadding)
    - [display](#display)
    - [isShowing](#isshowing)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Popover (`<elvia-popover>`)

## Reference

https://design.elvia.io/components/popover

`<elvia-popover>` is a web component.

## Installation

This web component requires the `@elvia/elvis-popover` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md).

## Use

- The trigger MUST be a child with `slot="trigger"`. Set `content` for plain text. Use `slot="content"` for
  other content.
- For circled icon triggers, include both the normal and filled icons in the DOM.
- Popover toggles on trigger click, closes on outside click or Escape, positions itself, and adjusts to
  available space.

```html
<elvia-popover heading="Forbruk per time" content="Se forbruket per time.">
  <button slot="trigger" class="e-btn"><span class="e-btn__title">Vis forbruk</span></button>
</elvia-popover>
```

Listen for `onOpen` and `onClose` with `addEventListener`. See [Web Components](./web-components.md) for event
behavior.

## Attributes

### heading

Sets the popover's visible heading and the dialog's accessible name through `aria-labelledby`. Provide a
descriptive heading so screen reader users can identify the dialog.

```html
<elvia-popover heading="Forbruk per time" content="Se forbruket per time.">...</elvia-popover>
```

### content

Use this attribute for plain text. Use `slot="content"` for other content.

```html
<elvia-popover content="Se forbruket per time.">...</elvia-popover>
```

### horizontalPosition

It must be `"left" | "center" | "right"`. Defaults to `"center"`. The component can shift to fit available
space.

```html
<elvia-popover horizontalPosition="right" content="...">...</elvia-popover>
```

### verticalPosition

It must be `"bottom" | "top"`. Defaults to `"top"`. The component can flip to fit available space.

```html
<elvia-popover verticalPosition="bottom" content="...">...</elvia-popover>
```

### hasCloseButton

Defaults to `true`. Set it to `false` only for special cases, such as a menu list.

```html
<elvia-popover hasCloseButton="false" content="...">...</elvia-popover>
```

### noPadding

Defaults to `false`. Set it to `true` only for edge cases that need content without padding.

```html
<elvia-popover noPadding content="...">...</elvia-popover>
```

### display

This sets the trigger wrapper's CSS `display` value. Defaults to `"flex"`. Change it when `flex` breaks the
layout.

```html
<elvia-popover display="inline-flex" content="...">...</elvia-popover>
```

### isShowing

Defaults to `false`. Set it to `true` to show the popover.

```html
<elvia-popover isShowing content="Se forbruket per time.">...</elvia-popover>
```

## Guidelines

### When to use

- Show supporting information or secondary details.
- Help the user complete a small action.
- Show content when page space is limited.
- Keep text popovers near 450px wide for readability.

### When not to use

- Do not place information here if the user needs it to complete the page task.
- Do not add extensive content on mobile.
- Use `<elvia-context-menu>` for a menu, not Popover.

## Accessibility

- Set `heading` to give the dialog an accessible name. Neither `content` nor the trigger's label names the
  dialog.
- Use a native `<button>` as the trigger so Space and Enter work.
- Space or Enter opens or closes the popover. Escape closes it.
- The popover traps focus while open and returns focus when it closes.
- The close button label follows the global `lang` attribute on `<html>`.
- Add `e-btn---selected` to the trigger while the popover is open.
- Use `onOpen` and `onClose` to sync `e-btn---selected`.

## Examples

**Input:** "Show extra information from an icon button."

**Output:**

```html
<elvia-popover heading="Forbruk per time" content="Se forbruket per time.">
  <button slot="trigger" class="e-btn e-btn--icon e-btn--circled" aria-label="Vis forbruk">
    <span class="e-btn__icon">
      <e-icon name="informationCircle"></e-icon>
      <e-icon name="informationCircleFilledColor"></e-icon>
    </span>
  </button>
</elvia-popover>
```

```js
const popover = document.querySelector('elvia-popover');
const trigger = popover.querySelector('[slot="trigger"]');
popover.addEventListener('onOpen', () => trigger.classList.add('e-btn---selected'));
popover.addEventListener('onClose', () => trigger.classList.remove('e-btn---selected'));
```

**Input:** "Add a small form inside the popover."

**Output:**

```html
<elvia-popover heading="Endre varsling">
  <button slot="trigger" class="e-btn">
    <span class="e-btn__title">Endre varsling</span>
  </button>
  <div slot="content">
    <label for="limit">Grense</label>
    <input id="limit" type="number" />
  </div>
</elvia-popover>
```

**Input:** "Add a menu of actions beside a button."

**Output:** Popover is the wrong component. Use `<elvia-context-menu>` for a menu.
