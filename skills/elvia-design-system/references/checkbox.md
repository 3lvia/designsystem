- [Checkbox (`e-checkbox`)](#checkbox-e-checkbox)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Props](#props)
    - [Size](#size)
    - [State](#state)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [Nested checkboxes](#nested-checkboxes)
  - [Accessibility](#accessibility)
  - [Classes](#classes)
  - [Examples](#examples)

# Checkbox (`e-checkbox`)

## Reference

https://design.elvia.io/components/checkbox

CSS-only component for a native checkbox input and its label.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the checkbox classes.

## Use

```html
<label class="e-checkbox">
  <input type="checkbox" name="notifications" />
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Send me notifications</span>
</label>
```

## Props

### Size

- **Medium** `e-checkbox`
- **Small** `e-checkbox--small`

### State

Use native input attributes for semantic state. These classes represent state when application logic controls
the styling.

- **Checked**: set `checked` on the input, or use `e-checkbox---checked`.
- **Focus**: `e-checkbox---focus`.
- **Hover**: `e-checkbox---hover`.
- **Disabled**: set `disabled` on the input, or use `e-checkbox---disabled`.
- **Disabled checked**: set both `checked` and `disabled`, or use `e-checkbox---disabled-checked`.
- **Invalid**: use the input's native validity state with `e-checkbox---invalid`.
- **Indeterminate**: use `e-checkbox--indeterminate` when a parent represents a nested group with only some
  children selected.
- **Inverted**: use `e-checkbox--inverted` on an inverted background.

## Guidelines

### When to use

Use checkboxes for independent toggles or multiple selections. Use radio buttons when exactly one option can
be selected.

### Nested checkboxes

Use `e-checkbox--indeterminate` on a parent when a nested group is partially selected. Apply it from
application logic as child selections change; it is visual styling, not the native input state.

```html
<div class="e-form-field">
  <label class="e-checkbox e-checkbox--indeterminate">
    <input type="checkbox" aria-controls="notification-options" />
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">All notifications</span>
  </label>
  <div id="notification-options" class="e-form-field__nested">
    <label class="e-checkbox">
      <input type="checkbox" checked />
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Email</span>
    </label>
    <label class="e-checkbox">
      <input type="checkbox" />
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">SMS</span>
    </label>
  </div>
</div>
```

## Accessibility

- Associate a visible label with every input. The wrapped-label markup above is the standard pattern.
- Keep native state attributes such as `checked`, `required`, `disabled`, and validity in sync with the visual
  state classes.
- For nested groups, keep the parent input state synchronized with its child selections.

## Classes

Classes use BEM.

Base: `e-checkbox`

**Elements**

- `e-checkbox__mark`
- `e-checkbox__label`

**Modifiers**

- `e-checkbox--indeterminate`
- `e-checkbox--inverted`
- `e-checkbox--small`

**Pseudos**

- `e-checkbox---checked`
- `e-checkbox---disabled`
- `e-checkbox---disabled-checked`
- `e-checkbox---focus`
- `e-checkbox---hover`
- `e-checkbox---invalid`

## Examples

**Input:** Add a small checkbox for an optional setting.

**Output:**

```html
<label class="e-checkbox e-checkbox--small">
  <input type="checkbox" name="product-updates" />
  <span class="e-checkbox__mark"></span>
  <span class="e-checkbox__label">Send me product updates</span>
</label>
```

**Input:** Show a partially selected parent for a nested checkbox group.

**Output:**

```html
<fieldset class="e-strip-fieldset e-form-field">
  <legend class="e-form-field__label">Notifications</legend>
  <label class="e-checkbox">
    <input type="checkbox" name="notifications-all" />
    <span class="e-checkbox__mark"></span>
    <span class="e-checkbox__label">All notifications</span>
  </label>
  <div class="e-form-field__nested">
    <label class="e-checkbox">
      <input type="checkbox" name="notifications" value="email" />
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">Email</span>
    </label>
    <label class="e-checkbox">
      <input type="checkbox" name="notifications" value="sms" />
      <span class="e-checkbox__mark"></span>
      <span class="e-checkbox__label">SMS</span>
    </label>
  </div>
</fieldset>
```
