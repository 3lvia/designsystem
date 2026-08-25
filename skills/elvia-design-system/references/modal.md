- [Modal (`<elvia-modal>`)](#modal-elvia-modal)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [heading](#heading)
    - [content](#content)
    - [primaryButton / secondaryButton](#primarybutton-secondarybutton)
    - [isShowing](#isshowing)
    - [onClose](#onclose)
    - [disableClose](#disableclose)
    - [hasCloseButton](#hasclosebutton)
    - [illustration](#illustration)
    - [maxWidth](#maxwidth)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Modal (`<elvia-modal>`)

## Reference

https://design.elvia.io/components/modal

`<elvia-modal>` is a web component.

## Installation

This web component requires the `@elvia/elvis-modal` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

Use a modal when the user must make a short, consequential decision before continuing. The modal traps focus
and blocks interaction with the page behind it.

`heading`, `content`, `illustration`, `primaryButton`, and `secondaryButton` use slots. Closing the modal does
not reset its state (eg. a form state inside the modal).

```html
<elvia-modal heading="Datagodkjenning" isShowing>
  <div slot="content">Er du sikker på at du vil godkjenne at Google bruker data om deg?</div>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg" type="button">Godkjenn</button>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" type="button">Avbryt</button>
</elvia-modal>
```

## Attributes

### heading

String or slot content. Keep it short. A question or the decision at hand, not a sentence.

Example:

```html
<elvia-modal heading="Slett kontrakt" isShowing>
  <div slot="content">Er du sikker på at du vil slette kontrakten?</div>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg" type="button">Slett kontrakt</button>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" type="button">Avbryt</button>
</elvia-modal>
```

### content

Required. Slot content (`slot="content"`), not an attribute. Keep it short and scannable. The modal is for
quick decisions, not for reading.

```html
<elvia-modal heading="Slett kontrakt" isShowing>
  <div slot="content">Er du sikker på at du vil slette kontrakten?</div>
</elvia-modal>
```

### primaryButton / secondaryButton

Slot content (`slot="primaryButton"`, `slot="secondaryButton"`). Primary sits to the right on larger screens.
On mobile, the buttons stack with the primary at the bottom. Every action must be wired up by the consumer.
The modal has no built-in submit behavior.

```html
<elvia-modal isShowing>
  <div slot="content">Er du sikker på at du vil slette kontrakten?</div>
  <button slot="primaryButton">Slett kontrakt</button>
  <button slot="secondaryButton">Avbryt</button>
</elvia-modal>
```

### isShowing

Required. Controls whether the modal is rendered.

Example:

```html
<elvia-modal heading="Slett kontrakt" isShowing>
  <div slot="content">Er du sikker på at du vil slette kontrakten?</div>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg" type="button">Slett kontrakt</button>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" type="button">Avbryt</button>
</elvia-modal>
```

### onClose

Fires when the modal closes from a backdrop click, Esc, or the close button.

The caller must set `isShowing` to false in the event handler.

```ts
modal.addEventListener('onClose', () => {
  modal.isShowing = false;
});
```

### disableClose

Prevents closing via click outside, Esc, or the close button. Only use it where an in-progress action makes an
accidental close destructive.

### hasCloseButton

Shows a close button in the top-right corner. Reserve for multi-page modals (see [Guidelines](#when-to-use)).
A single-page modal should close via its secondary button.

### illustration

Slot content (`slot="illustration"`). Adding it creates a layout with a fixed height and width, subject to
responsive constraints. Use for onboarding or celebratory moments, not for routine confirmations.

### maxWidth

Overrides the default max width. Only change it if content genuinely needs more room.

## Guidelines

### When to use

- The user must make an active choice before continuing
- A wrong or accidental decision would be critical (destructive actions, irreversible submissions)

### When not to use

- Back-to-back, repeatedly, in the same flow
- Long content the user needs to read carefully
- Anything that isn't a short, scannable decision

## Accessibility

- Focus is trapped inside the modal and moves to the first focusable element on open. To focus a different
  element first, add the `elvisFocusInitial` attribute to it.
- `disableClose` removes the Esc/outside-click escape hatch. Pair it with a visible way out (e.g. a cancel
  button) or keyboard users get stuck.
- Do not add custom keyboard handlers to the modal. It already handles Esc and Tab.

## Examples

**Input:** "Confirmation modal before a user revokes another user's access."

**Output:**

```html
<elvia-modal heading="Fjerne tilgang" isShowing>
  <div slot="content">Er du sikker på at du vil fjerne tilgangen til denne brukeren?</div>
  <button slot="primaryButton" class="e-btn e-btn--primary e-btn--lg" type="button">Fjern tilgang</button>
  <button slot="secondaryButton" class="e-btn e-btn--secondary e-btn--lg" type="button">Avbryt</button>
</elvia-modal>
```

**Input:** "A 4-step onboarding walkthrough for first-time users, with an illustration on each step."

**Output:**

```html
<elvia-modal hasCloseButton isShowing>
  <div slot="illustration">
    <img src="/assets/onboarding-step.svg" alt="" />
  </div>
  <div slot="content">
    <!-- Render one page per onboarding step -->
    <elvia-carousel> ... </elvia-carousel>
  </div>
</elvia-modal>
```

**Input:** "Show the full terms and conditions text in a modal."

**Output:** Not a modal. Use a dedicated terms page instead because the content is too long to be short and
scannable.

```html
<a href="https://www.example.com" class="e-link"> Les vilkårene </a>
```
