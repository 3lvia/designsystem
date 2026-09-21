- [Progress Linear (`<elvia-progress-linear>`)](#progress-linear-elvia-progress-linear)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [value](#value)
    - [isIndeterminate](#isindeterminate)
    - [isError](#iserror)
    - [ariaLabel](#arialabel)
    - [ariaRole](#ariarole)
    - [ariaValueText](#ariavaluetext)
    - [componentId](#componentid)
    - [size](#size)
    - [transitionDuration](#transitionduration)
  - [Guidelines](#guidelines)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Progress Linear (`<elvia-progress-linear>`)

## Reference

https://design.elvia.io/components/progressbar

Use `<elvia-progress-linear>` for loading and completion progress.

## Installation

This web component requires the `@elvia/elvis-progress-linear` package. If it is not already installed, follow
the [Installation reference](./installation.md).

## Use

Use `value` for known progress, `isIndeterminate` for unknown progress, and `isError` for failed progress.

For updates to attributes after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### value

Percentage completion. Defaults to `0`; use `0` to `100`.

### isIndeterminate

Defaults to `false`. Animates a segment when completion is unknown. Overridden by `isError`.

### isError

Defaults to `false`. Displays a error bar, overriding determinate and indeterminate progress.

### ariaLabel

Accessible label. The component provides a localized default, but set this explicitly.

### ariaRole

Must be `"progressbar"` or `"meter"`; defaults to `"progressbar"`. Use `"meter"` for a gauge.

### ariaValueText

Optional text for context such as time remaining. Otherwise, localized text is generated from the current
value.

### componentId

Sets the progress bar's `id`; use it as the target of `aria-describedby` on the loading region.

### size

Must be `"small"`, `"medium"`, or `"large"`; defaults to `"medium"`.

### transitionDuration

CSS duration. Defaults to `"300ms"`; ignored while indeterminate.

## Guidelines

- Use for local or full-page loading when a content loader is unsuitable.
- Use for per-file upload progress and errors.

## Accessibility

- Set `ariaLabel` to describe what is progressing.
- For a loading region, set `aria-describedby` to `componentId` and `aria-busy="true"` while it loads.

## Examples

**Input:** "Show the upload progress for a contract that is 65% complete."

**Output:**

```html
<elvia-progress-linear value="65" ariaLabel="Kontraktsopplasting" ariaValueText="65 prosent ferdig">
</elvia-progress-linear>
```

**Input:** "Show that a report is loading when its completion time is unknown."

**Output:**

```html
<section aria-describedby="report-loading" aria-busy="true">
  <elvia-progress-linear componentId="report-loading" isIndeterminate ariaLabel="Rapport lastes inn">
  </elvia-progress-linear>
</section>
```

**Input:** "Show an error for a failed file upload."

**Output:**

```html
<elvia-progress-linear value="65" isError ariaLabel="Opplasting av kontrakt mislyktes">
</elvia-progress-linear>
```
