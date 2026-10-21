- [Alert (`e-alert`)](#alert-e-alert)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
    - [Local and global alerts](#local-and-global-alerts)
    - [Status and icons](#status-and-icons)
    - [Actions and close buttons](#actions-and-close-buttons)
  - [Classes](#classes)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Alert (`e-alert`)

## Reference

https://design.elvia.io/components/alert

Alert is a CSS-based component, consisting of only CSS classes.

## Installation

This component requires the `@elvia/elvis` package. See the [installation reference](./installation.md).

## Use

```html
<div class="e-alert e-alert--info" role="note">
  <span class="e-alert__icon">
    <e-icon name="informationCircle" class="e-icon--color-grey"></e-icon>
  </span>
  <p class="e-alert__text">Du kan endre kontaktinformasjonen din på Min side.</p>
</div>
```

See the [Icon reference](./icon.md).

### Local and global alerts

- **Local:** `e-alert` is the default. Place it near the related content, between the header and footer.
- **Global:** Add `e-alert--global`. Place it at the bottom of the viewport, with full width.

### Status and icons

- `e-alert--error`: Use for a failure or a problem that prevents task completion. Use the `removeCircle` icon
  with `e-icon--color-danger`.
- `e-alert--warn`: Use for a warning that helps the user prevent an error. Use the `warningCircle` icon with
  `e-icon--color-warning`.
- `e-alert--info`: Use for context, tips, or suggestions. Use the `informationCircle` icon with
  `e-icon--color-grey`.

Without a status modifier, local alerts use the error color, and global alerts use the information color.

### Actions and close buttons

- Place local `e-alert__actions` inside `e-alert__text`.
- Place global `e-alert__actions` directly inside `e-alert`.
- Place an optional `e-alert__title` directly inside `e-alert`. The layout adapts automatically when the title
  is absent.
- Place an optional close button inside `e-alert__close`. Use the `closeBold` icon and the small icon-button
  classes from the [Button reference](./button.md). Add a click handler to remove the alert.

## Classes

Classes use BEM.

Base: `e-alert`

**Elements**

- `e-alert__actions`
- `e-alert__close`
- `e-alert__icon`
- `e-alert__text`
- `e-alert__title`

**Modifiers**

- `e-alert--error`
- `e-alert--global`
- `e-alert--info`
- `e-alert--warn`

## Guidelines

### When to use

- Use a local alert for a medium-urgency problem related to page content or a user action. Place it near the
  affected content.
- Use a global alert for a high-urgency system or product message that applies across the application.
- Use an alert when a failure prevents task completion or the user must correct a problem.

### When not to use

- Use a [Toast](./toast.md) for a completed action confirmation or a minor contextual update, tip, or
  suggestion.

## Accessibility

The alert CSS classes do not set an accessibility role. Choose the role from the message urgency, not the
status modifier or the local/global type.

## Examples

**Input:** Show a local warning with an action near the affected content.

**Output:**

```html
<div class="e-alert e-alert--warn" role="note">
  <span class="e-alert__icon">
    <e-icon name="warningCircle" class="e-icon--color-warning"></e-icon>
  </span>
  <h2 class="e-alert__title">Kontaktinformasjon mangler</h2>
  <div class="e-alert__text">
    Legg til kontaktinformasjon for å motta varsler.
    <div class="e-alert__actions">
      <a class="e-link" href="/kontaktinformasjon">Oppdater kontaktinformasjon</a>
    </div>
  </div>
</div>
```

**Input:** Show a global maintenance message across all application pages.

**Output:**

```html
<div class="e-alert e-alert--global e-alert--info" role="note" id="maintenance-alert">
  <span class="e-alert__icon">
    <e-icon name="informationCircle" class="e-icon--color-grey"></e-icon>
  </span>
  <h2 class="e-alert__title">Planlagt vedlikehold</h2>
  <p class="e-alert__text">Min side er utilgjengelig lørdag fra kl. 08 til 10.</p>
  <div class="e-alert__actions">
    <a class="e-link" href="/driftsmeldinger">Se driftsmeldinger</a>
  </div>
</div>
```

```css
#maintenance-alert {
  position: fixed;
  inset: auto 0 0;
}
```
