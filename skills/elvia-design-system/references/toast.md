- [Toast (`<elvia-toast>`)](#toast-elvia-toast)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [Status](#status)
    - [Duration](#duration)
    - [Closable](#closable)
    - [CustomIcon](#customicon)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Toast (`<elvia-toast>`)

## Reference

https://design.elvia.io/components/toast

`<elvia-toast>` is a web component.

## Installation

This component requires the `@elvia/elvis-toast` package. See the [installation reference](./installation.md).

## Use

Add exactly ONE (1) `<elvia-toast>` to the shared application root.

```html
<elvia-toast></elvia-toast>
```

Call `openElviaToast` after the component mounts; earlier calls are not queued.

```js
import { openElviaToast } from '@elvia/elvis-toast';

openElviaToast({ body: 'Endringene er lagret.' });
```

The component manages the queue and viewport placement: upper right on desktop, bottom on mobile. An optional
second argument receives a callback when the toast closes.

## Attributes

Pass the options below to `openElviaToast(config, callback?)`, not as attributes on `<elvia-toast>`. Use
`title` and `body` for plain text.

### Status

Allowed values: `positive` (default), `informative`, `negative`.

- `positive`: A user action completes successfully.
- `informative`: A minor contextual change, tip, or suggestion.
- `negative`: An action completes with an unsuccessful outcome, rather than a system error.

```js
openElviaToast({ body: 'Oppgavene ble satt til "Ikke godkjent".', status: 'negative' });
```

### Duration

The default is `7000` milliseconds. The timer pauses while the pointer is over the first toast in the queue.

```js
openElviaToast({ body: 'Rapporten er klar.', duration: 10000 });
```

### Closable

The default is `false`. Set `closable` to `true` to add a close button; automatic dismissal remains active.

```js
openElviaToast({ body: 'Rapporten er klar.', closable: true });
```

### CustomIcon

Pass an HTML string, not an icon name. This option replaces the status icon. Register custom `<e-icon>` icons
as described in the [Icon reference](./icon.md). The default status icons require no application registration.

```js
openElviaToast({
  body: 'Rapporten er klar.',
  customIcon: '<e-icon name="informationCircle"></e-icon>',
});
```

## Guidelines

### When to use

- Use Toast for confirmations after user actions or notification messages.

### When not to use

- Use [Alert](./alert.md) for error messages.

## Accessibility

- The component sets `role="status"` on each toast.
- The close-button label follows the global HTML language: `no` selects Norwegian; other values select
  English.

## Examples

**Input:** Show an notification when the user submits the form.

**Output:** Use the existing application-level `<elvia-toast>`.

```js
import { openElviaToast } from '@elvia/elvis-toast';

openElviaToast({
  title: 'Nye måleverdier',
  body: 'Nye måleverdier er sendt inn og mottatt.',
  status: 'positive',
  duration: 10000,
  closable: true,
});
```
