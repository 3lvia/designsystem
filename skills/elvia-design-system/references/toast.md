- [Toast](#toast)
  - [Reference](#reference)
  - [Packages](#packages)
  - [Register](#register)
  - [Configuration](#configuration)
    - [title](#title)
    - [body](#body)
    - [status](#status)
    - [duration](#duration)
    - [closable](#closable)
    - [customIcon](#customicon)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
    - [Examples](#examples)

# Toast

## Reference

https://design.elvia.io/components/toast

`<elvia-toast>` is a web component.

## Packages

This web component requires the `@elvia/elvis-toast` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Register

```html
<!-- in the root of the app: -->
<elvia-toast></elvia-toast>
```

```ts
import { openElviaToast } from '@elvia/elvis-toast';

/* to show a toast: */
openElviaToast({
  body: 'Handlingen var vellykket',
  status: 'positive',
  title: '',
});
```

The Toast component stand out from the rest. Add `<elvia-toast>` once to the root of the app. Check if the app
already has an `<elvia-toast>` element before adding a new one. Adding multiple `<elvia-toast>` elements
displays a console warning.

The element listens for events dispatched by the `openElviaToast` method.

## Configuration

### title

The title shown in the toast.

### body

The message shown in the toast. Keep it short and simple.

### status

Controls the appearance of the toast.

- positive: Confirms that an action completed successfully.
- informative: Provides contextual information, such as a tip or suggestion.
- negative: Indicates that an action completed unsuccessfully. If something goes wrong, consider using an
  alert.

### duration

How long the toast is visible, in milliseconds.

### closable

Adds a close button to the toast. Most often it should be set to `true`, so the user can dismiss the toast.

### customIcon

Replaces the default status icon with custom inner HTML.

```ts
openElviaToast({
  body: 'Delelenken ble slettet',
  closable: true,
  customIcon: `<e-icon name="bin" size="sm"></e-icon>`,
  status: 'positive',
  title: 'Slettet',
});
```

## Guidelines

### When to use

- Confirmation message after a user action.
- Notification message.
- When there is no inherent visual feedback.
- Information the user will not mind missing.

### When not to use

- Long-form content that requires reading, scrolling, or multiple steps.
- Critical errors or form field validation. Use an alert instead.
- Persistent information.
- Redundant feedback. If the interface already provides clear visual feedback, do not add a toast to confirm
  the action.

## Accessibility

The toast is automatically announced to screen readers using an assertive live region. Do not add this
yourself.

### Examples

**Input:** "Show a confirmation after the user saves their changes."

**Output:**

```ts
openElviaToast({
  body: 'Endringene dine er lagret.',
  closable: true,
  status: 'positive',
  title: 'Endringer lagret',
});
```

**Input:** "Show an informative toast when an action cannot be completed."

**Output:**

```ts
openElviaToast({
  body: 'Denne handlingen kan ikke utføres.',
  closable: true,
  status: 'informative',
});
```

**Input:** "Show a negative toast when an action fails."

**Output:**

```ts
openElviaToast({
  body: 'Handlingen kunne ikke fullføres.',
  closable: true,
  status: 'negative',
});
```

**Input:** "Tell the user that the form is invalid."

**Output:** Not a toast. Use a local alert instead.
