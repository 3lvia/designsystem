- [Radio Button (`e-radio`)](#radio-button-e-radio)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Radio Button (`e-radio`)

## Reference

https://design.elvia.io/components/radiobutton

`e-radio` is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not installed, follow the
[Elvis installation reference](./installation.md).

## Use

Use a native radio input inside each labeled option. Give every option in a group the same `name`. Set one
option as checked. Include `e-radio__mark` and `e-radio__label` in each option.

```html
<fieldset class="e-strip-fieldset">
  <legend class="e-text-md">Velg årsak</legend>
  <label class="e-radio">
    <input type="radio" name="reason" value="rounding" />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Avrundingsfeil</span>
  </label>
  <label class="e-radio">
    <input type="radio" name="reason" value="connection" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Koblingsfeil</span>
  </label>
</fieldset>
```

## Guidelines

### When to use

- Use radio buttons when users must select one option from two to five visible choices.
- List the options in a logical order.

### When not to use

- Use checkboxes when users can select multiple options.
- Use a [Dropdown](./dropdown.md) when the list has more than five options.

## Accessibility

- Associate each input with a visible label.
- Set native `checked`, `required`, and `disabled` attributes on the input to expose its state to assistive
  tools.

## Examples

**Input:** Use small radio buttons for a compact form.

**Output:**

```html
<fieldset class="e-strip-fieldset">
  <legend class="e-text-md">Velg periode</legend>
  <label class="e-radio e-radio--small">
    <input type="radio" name="period" value="month" checked />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">Måned</span>
  </label>
  <label class="e-radio e-radio--small">
    <input type="radio" name="period" value="year" />
    <span class="e-radio__mark"></span>
    <span class="e-radio__label">År</span>
  </label>
</fieldset>
```

## Classes

Classes use BEM.

Base: `e-radio`

**Elements**

- `e-radio__label`
- `e-radio__mark`

**Modifiers**

- `e-radio--small`

**Pseudos**

- `e-radio---checked`
- `e-radio---disabled`
- `e-radio---disabled-checked`
- `e-radio---focus`
- `e-radio---hover`
- `e-radio---invalid`
