- [Form Field (`e-form-field`)](#form-field-e-form-field)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Form Field (`e-form-field`)

## Reference

https://design.elvia.io/components/input

`e-form-field` is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. Follow the
[Elvis installation reference](./installation.md) if the package is not installed.

## Use

```html
<div class="e-form-field">
  <label class="e-form-field__label" for="name">Navn</label>
  <div class="e-input">
    <input id="name" name="name" />
  </div>
</div>
```

Use `e-input` for the control styles. See [Input](./input.md).

## Guidelines

### When to use

- Use `e-form-field` to group a label, a control or control group, and related feedback.
- Make fields required by default. Mark optional fields with `e-form-field__label--optional`.
- Use `e-form-field--full-width` when the control must fill the available width.
- Use `e-inlined-field` for related controls that belong on one row, such as a ZIP code and city.

### When not to use

- Do not place `e-form-field--full-width` on the input. Place it on the `e-form-field` wrapper.

## Accessibility

- Add `e-form-field__error--visible` when the error is active.
- Keep the error visible while `aria-errormessage` refers to it.

## Examples

**Input:** Mark a field as optional.

**Output:**

```html
<div class="e-form-field">
  <label class="e-form-field__label e-form-field__label--optional" for="phone">Telefon</label>
  <div class="e-input">
    <input id="phone" name="phone" type="tel" />
  </div>
</div>
```

**Input:** Show a validation error.

**Output:**

```html
<div class="e-form-field">
  <label class="e-form-field__label" for="password">Passord</label>
  <div class="e-input e-input---invalid">
    <input type="password" id="password" aria-invalid="true" aria-errormessage="password-error" required />
  </div>
  <span class="e-form-field__error e-form-field__error--visible" id="password-error">
    Skriv inn et gyldig passord
  </span>
</div>
```

## Classes

Classes use BEM.

Base: `e-form-field`, `e-inlined-field`

**Elements**

- `e-form-field__error`
- `e-form-field__input`
- `e-form-field__label`
- `e-form-field__nested`

**Modifiers**

- `e-form-field--full-width`
- `e-form-field--small`
- `e-form-field--width-auto`
- `e-form-field__error--visible`
- `e-form-field__label--optional`
- `e-form-field__nested--sm`
- `e-inlined-field--full-width`
