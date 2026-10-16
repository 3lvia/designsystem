- [Input (`e-input`)](#input-e-input)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Input (`e-input`)

## Reference

https://design.elvia.io/components/input

`e-input` is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. Follow the
[Elvis installation reference](./installation.md) if the package is not installed.

## Use

```html
<div class="e-form-field">
  <label class="e-form-field__label" for="name">Navn</label>
  <div class="e-input">
    <input id="name" name="name" placeholder="Ola Nordmann" />
  </div>
</div>
```

Use an `input` or `textarea` as a direct child of `e-input`.

Use `e-form-field` for the label and related feedback. See [Form Field](./form-field.md).

## Guidelines

### When to use

- Use the medium size by default. Use the small size in dense internal interfaces.
- Use the same input size throughout a page.
- Use `e-input---loading` while the current value is being validated.

### When not to use

- Do not use a read-only input as a standalone value. Use regular text instead.
- Do not use `readonly` when the value must not be selected or read by assistive technology. Use `disabled`
  instead.

## Accessibility

- Set `aria-invalid="true"` when the input is invalid.
- Set `aria-errormessage` to the error element's `id`. Keep that element visible.

## Examples

**Input:** Add a unit after the input.

**Output:**

```html
<div class="e-form-field">
  <label class="e-form-field__label" for="distance">Distanse</label>
  <div class="e-input">
    <input id="distance" name="distance" />
    <span class="e-input__suffix">km</span>
  </div>
</div>
```

**Input:** Build a search field.

**Output:** See [Search Pattern](./search-pattern.md) for examples.

**Input:** Add a form for sending a message.

**Output:**

```html
<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="message">Beskjed</label>
  <div class="e-input">
    <textarea id="message" placeholder="Plassholdertekst"></textarea>
  </div>
</div>
```

## Classes

Classes use BEM.

Base: `e-input`

**Elements**

- `e-input__icon`
- `e-input__suffix`

**Modifiers**

- `e-input--small`

**Pseudos**

- `e-input---active`
- `e-input---disabled`
- `e-input---focus`
- `e-input---invalid`
- `e-input---loading`
- `e-input---readonly`
