- [Button (`e-btn`)](#button-e-btn)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Props](#props)
    - [Type](#type)
    - [Size](#size)
  - [Guidelines](#guidelines)
    - [Order](#order)
    - [Label](#label)
    - [Icons on buttons](#icons-on-buttons)
  - [Accessibility](#accessibility)
  - [Classes](#classes)
  - [Examples](#examples)

# Button (`e-btn`)

## Reference

https://design.elvia.io/components/button

Button is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the button classes.

## Use

```html
<button class="e-btn">
  <span class="e-btn__title">Lagre</span>
</button>

<!-- Primary + secondary -->
<div>
  <button class="e-btn e-btn--secondary">
    <span class="e-btn__title">Avbryt</span>
  </button>
  <button type="submit" class="e-btn e-btn--primary">
    <span class="e-btn__title">Lagre</span>
  </button>
</div>

<!-- Icon button in a table row -->
<button class="e-btn e-btn--icon" aria-label="Slett tilgang for Ola">
  <span class="e-btn__icon">
    <e-icon name="bin"></e-icon>
  </span>
</button>

<!-- Danger action -->
<button class="e-btn e-btn--danger">
  <span class="e-btn__title">Fjern tilgang</span>
</button>

<!-- Modifier combined conditionally, e.g. a loading state -->
<button class="e-btn e-btn--primary e-btn--loading" aria-live="polite" aria-busy="true">
  <span></span>
  <span></span>
  <span></span>
</button>

<!-- Icon button with circled icon. Notice the Icon name -->
<button class="e-btn e-btn--icon e-btn--circled" aria-label="Les mer om Elvia">
  <span class="e-btn__icon">
    <e-icon name="informationCircle"> </e-icon>
    <e-icon name="informationCircleFilledColor"> </e-icon>
  </span>
</button>
```

## Props

### Type

One type per button, based on the action's importance. Primary, secondary, tertiary, danger, and icon are
mutually exclusive.

- **Primary** (`e-btn--primary`): the action you want the user to take. Example: save, send, submit, register.
  Only one primary button per view/section.
- **Secondary** (`e-btn--secondary`): the alternative to primary. Example: cancel, decline, go back. Pairs
  with primary or stands alone.
- **Tertiary** (`e-btn--tertiary`): minor/optional actions. Example: download, edit. Icons are encouraged for
  tertiary button, they help signal it's clickable.
- **Danger** (`e-btn--danger`): destructive actions. Confirm with a dialog before the action fires.
- **Icon** (`e-btn--icon`): simple actions grouped together (close, edit, delete in a table row). Requires
  `aria-label`; add a `<elvia-tooltip>` if the icon alone isn't obvious.

### Size

- **Small** `e-btn--sm`
- **Medium** `e-btn` (default).
- **Large** `e-btn--lg`

Size combines with type (e.g. `e-btn--primary e-btn--sm`).

- Match size to priority/attention, and to whatever is in that UI region (don't put a large button next to
  small form controls).

Use `e-w-100` to make a button fill its container width.

## Guidelines

### Order

- When a primary and secondary button are together, primary goes on the **right**, secondary on the **left**.
  Don't flip it for visual balance.

### Label

- The label should be a verb. Three words max. If a longer explanation is needed, put it in surrounding copy.

### Icons on buttons

- Only add an icon when it clarifies something the label alone doesn't.
  - **Exception for tertiary buttons**: icon + text is preferred even without clarifying value, since it helps
    signal that the button is clickable.
- Icon can sit left or right of the text.
- Icon-only buttons are always `e-btn--icon` (or `e-btn--icon e-btn--circled` when used standalone, e.g. a
  floating circular action, circled buttons have a different hover effect) — never a text button with the
  label visually hidden.

## Accessibility

- Icon-only buttons must have an `aria-label` on the `<button>`.
- Do not add `aria-hidden="true"` to `<e-icon>`; its inner SVG already has it.
- A tooltip supplements the accessible name; it does not replace `aria-label`.

Links with `e-btn` styling do not support a disabled state. The `e-btn` disabled styles do not apply to `<a>`
elements with a `disabled` attribute. If an action can be disabled, use a `<button>` instead of a link.

## Classes

Classes use BEM.

Base: `e-btn`

**Elements**

- `e-btn__icon`
- `e-btn__title`

**Modifiers**

- `e-btn--circled`
- `e-btn--danger`
- `e-btn--icon`
- `e-btn--inverted`
- `e-btn--lg`
- `e-btn--loading`
- `e-btn--primary`
- `e-btn--secondary`
- `e-btn--sm`
- `e-btn--tertiary`

**Pseudos**

- `e-btn---active`
- `e-btn---disabled`
- `e-btn---focus`
- `e-btn---hover`
- `e-btn---selected`

## Examples

**Input:** Add a form footer with a way to cancel and a way to save the changes.

**Output:**

```html
<div>
  <button class="e-btn e-btn--secondary">
    <span class="e-btn__title">Avbryt</span>
  </button>
  <button type="submit" class="e-btn e-btn--primary">
    <span class="e-btn__title">Lagre</span>
  </button>
</div>
```

**Input:** "There's a table of access grants, each row needs a way to remove that person's access."

**Output:**

```html
<button class="e-btn e-btn--icon" aria-label="Fjern tilgang for Kari">
  <span class="e-btn__icon">
    <e-icon name="bin"></e-icon>
  </span>
</button>
```

**Input:** "We need a button to delete a customer's saved payment method."

**Output:**

```html
<button class="e-btn e-btn--danger">
  <span class="e-btn__title">Slett betalingsmetode</span>
</button>
```

```html
<!-- shown after the button above is clicked, before the delete actually fires -->
<div>
  <p>Vil du slette betalingsmetoden?</p>
  <button class="e-btn e-btn--secondary">
    <span class="e-btn__title">Avbryt</span>
  </button>
  <button class="e-btn e-btn--danger">
    <span class="e-btn__title">Slett</span>
  </button>
</div>
```
