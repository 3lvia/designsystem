- [Header (`<elvia-header>`)](#header-elvia-header)
- [Reference](#reference)
- [Installation](#installation)
- [Use](#use)
  - [Attributes](#attributes)
  - [Slots](#slots)
  - [hideThemeSwitch](#hidethemeswitch)
  - [Events](#events)
  - [Theme utility](#theme-utility)
- [Guidelines](#guidelines)
  - [When to use](#when-to-use)
  - [When not to use](#when-not-to-use)
- [Accessibility](#accessibility)
- [Examples](#examples)

# Header (`<elvia-header>`)

## Reference

https://design.elvia.io/components/header

`<elvia-header>` is a web component. It works in any framework, or without one.

## Installation

The Header requires the `@elvia/elvis-header` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

`<elvia-header>` provides the app header, user menu, and sidenav layout. The app provides the signed-in user's
details and owns its page routing and sidenav markup.

### Attributes

- `username` is required. It is the signed-in user's username.
- `email` is required. It is the signed-in user's email address.
- `pageTitle` is required. Provide it as the attribute (plain text) or through the `pageTitle` slot.Do not
  provide both.
- `appTitle` is optional. It sets the app name.
- `hideThemeSwitch` is optional. See [hideThemeSwitch](#hidethemeswitch).

Set attributes and properties on `<elvia-header>` the way the app's framework sets them on any custom element.

### Slots

Use slots for content that is more than text:

- `pageTitle` replaces the page title with rich content.
- `navItems` contains the app's sidenav items.
- `appContent` contains the page content, usually the router outlet or its containing element.
- `menuContent` adds app-specific content to the user menu.

The app owns its sidenav DOM because routing and active-item state are framework-specific. Use these classes:

- `e-sidenav__container` on the `<nav>` element
- `e-sidenav__item` on each link
- `e-sidenav__item-text` on the visible link text
- `e-sidenav__icon-container` around the item icons
- `e-sidenav__item--active` on the link for the current page

Each item has two icons inside `e-sidenav__icon-container`: the regular icon (for example `dashboard`)
followed by its `Color` variant (for example `dashboardColor`). Both must exist for every item. For icon, see
the [Icon reference](./icon.md).

### hideThemeSwitch

Set it to `true` to hide the theme switch in the user menu. Do this if the current app does not support theme
switching.

```html
<elvia-header hideThemeSwitch="true" ...></elvia-header>
```

### Events

Listen on the `<elvia-header>` element for these events:

- `onLogoClick` fires when the Elvia logo is clicked.
- `onSignOutClick` fires when the sign-out button is clicked.
- `onThemeChange` fires when the user changes the theme.

In a framework, use its mechanism for listening to custom DOM events.

See the shared [event guidance](./web-components.md#events) for event behavior.

### Theme utility

Import `getCurrentTheme()` from `@elvia/elvis-header` to read the currently resolved theme (`'light'` or
`'dark'`). This is a package utility, not an `<elvia-header>` attribute or event. Most apps will not need to
use it directly.

```ts
import { getCurrentTheme } from '@elvia/elvis-header';

const theme = getCurrentTheme();
```

## Guidelines

### When to use

- Use the Header for internal Elvia apps, meaning apps used by Elvia employees.
- Keep navigation and active-route behavior in the app. Use the app's own router to set link destinations and
  the active state.
- Give every top-level feature page a corresponding sidebar item, wired to that page's route and shown as
  active when the page, or one of its sub-pages, is open. Detail and sub-pages do not need their own item.

### When not to use

- Do NOT use this Header for external or customer-facing apps.

## Accessibility

The app supplies the sidenav links, so they must be real, accessible links.

- The header renders the app content inside a `main` element, you do not need to add another `main` element
  inside your app content.
- Every link has a real destination (`href`, or the router's equivalent that renders one) so it is focusable
  and announced as a link.
- Put `aria-current="page"` on the active link and remove it from all others when the route changes. Prefer
  the router's built-in active-link support if it has one, so this stays in sync automatically.
- Give the `<nav>` a unique, descriptive `aria-label` in the app's language.

## Examples

**Input:** Add an internal app header for this app with sidenav for the Dashbord and Søk pages.

**Output:**

```html
<elvia-header username="Ola" email="ola@nordmann.no" appTitle="Min app">
  <span slot="pageTitle">Dashbord</span>

  <nav slot="navItems" class="e-sidenav__container" aria-label="Hovednavigasjon">
    <a href="/dashbord" class="e-sidenav__item e-sidenav__item--active" aria-current="page">
      <div class="e-sidenav__icon-container">
        <e-icon name="dashboard" size="sm"></e-icon>
        <e-icon name="dashboardColor" size="sm"></e-icon>
      </div>
      <div class="e-sidenav__item-text">Dashbord</div>
    </a>
    <a href="/sok" class="e-sidenav__item">
      <div class="e-sidenav__icon-container">
        <e-icon name="search" size="sm"></e-icon>
        <e-icon name="searchColor" size="sm"></e-icon>
      </div>
      <div class="e-sidenav__item-text">Søk</div>
    </a>
  </nav>

  <div slot="appContent">
    <!-- app page content or router outlet -->
  </div>
</elvia-header>

<script>
  const header = document.querySelector('elvia-header');

  header.addEventListener('onSignOutClick', () => {
    // Start the app's sign-out flow.
  });
</script>
```

This is plain HTML. In a framework, replace the static `href`s, the active class, `aria-current` and the
`<script>` with the framework's router links, active-link handling and event binding.
