- [Stepper (`<elvia-stepper>`)](#stepper-elvia-stepper)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [type](#type)
    - [steps](#steps)
    - [isForced](#isforced)
    - [removeActions](#removeactions)
    - [typography](#typography)
    - [value](#value)
    - [valueOnChange](#valueonchange)
    - [onFinish](#onfinish)
    - [onNextClick](#onnextclick)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Stepper (`<elvia-stepper>`)

## Reference

https://design.elvia.io/components/stepper

`<elvia-stepper>` is a web component.

## Installation

This web component requires the `@elvia/elvis-stepper` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

Place one child per step inside an element with `slot="content"`. Step indexes start at `1`.

```html
<elvia-stepper>
  <div slot="content">
    <div>Trinn 1 innhold</div>
    <div>Trinn 2 innhold</div>
    <div>Trinn 3 innhold</div>
  </div>
</elvia-stepper>
```

## Attributes

### type

Allowed values are `horizontal` and `vertical`. The default is `horizontal`. Set `type` to `vertical` to stack
the steps. Example:

```html
<elvia-stepper type="vertical">
  <div slot="content">
    <div>Trinn 1</div>
    <div>Trinn 2</div>
    <div>Trinn 3</div>
  </div>
</elvia-stepper>
```

### steps

Pass an object keyed by one-based step indexes. Each entry can set `heading`, `isCompleted`, `isError`,
`nextButtonText`, `previousButtonText`, or `nextButtonState`. Set `nextButtonState` to `loading` to show a
loading state on the next button. Default button text follows the page language. Example:

```js
document.querySelector('elvia-stepper').steps = {
  1: { heading: 'Kontaktopplysninger' },
  2: { heading: 'Kontroll' },
  3: { heading: 'Bekreftelse', nextButtonText: 'Send inn' },
};
```

### isForced

A boolean. The default is `false`. Set it to `true` to block forward navigation until the current step is
complete. Example:

```html
<elvia-stepper isForced>
  <div slot="content">
    <div>Trinn 1</div>
    <div>Trinn 2</div>
    <div>Trinn 3</div>
  </div>
</elvia-stepper>
```

### removeActions

A boolean. The default is `false`. Set it to `true` to hide the next and previous buttons. Example:

```html
<elvia-stepper removeActions>
  <div slot="content">
    <div>Trinn 1</div>
    <div>Trinn 2</div>
    <div>Trinn 3</div>
  </div>
</elvia-stepper>
```

### typography

Set a typography name for step headings. See [Typography](./typography.md). Example:

```html
<elvia-stepper typography="text-md">
  <div slot="content">
    <div>Trinn 1</div>
    <div>Trinn 2</div>
    <div>Trinn 3</div>
  </div>
</elvia-stepper>
```

### value

The active step index starts at `1`. The default is `1`. Set this property to control the active step.

### valueOnChange

Fires when the active step changes. Read the new one-based index from `event.detail.value`. See
[Events](./web-components.md#events).

### onFinish

Fires when the user selects the next button on the final step.

### onNextClick

Fires when the user selects the next button, even when forced progression blocks the next step.

## Guidelines

### When to use

- Use a stepper for a process with clear stages and a need to show progress or navigation.
- Use forced progression when each step must be complete before the user continues.
- Use normal progression when users can navigate between steps.

### When not to use

- Do not use stepper for processes with fewer than three or more than ten steps.
- Do not use stepper for a list or a process without step-by-step navigation.

## Accessibility

- The component sets `tablist`, `tab`, `tabpanel`, `aria-selected`, and a polite live status region.
- Use Left and Right Arrow keys for horizontal steps. Use Up and Down Arrow keys for vertical steps.
- Use Home and End to focus the first or last step. Press Enter or Space to select a focused step.

## Examples

**Input:** Create a three-step meter registration flow.

**Output:**

```html
<elvia-stepper>
  <div slot="content">
    <section>Legg inn målepunkt-ID.</section>
    <section>Kontroller opplysningene.</section>
    <section>Send inn registreringen.</section>
  </div>
</elvia-stepper>
<p id="registration-status" aria-live="polite"></p>
```

```js
const stepper = document.querySelector('elvia-stepper');
stepper.steps = {
  1: { heading: 'Målepunkt' },
  2: { heading: 'Kontroll' },
  3: { heading: 'Bekreftelse', nextButtonText: 'Send inn' },
};
stepper.addEventListener('onFinish', () => {
  document.querySelector('#registration-status').textContent = 'Registreringen er sendt.';
});
```
