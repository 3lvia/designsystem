- [Context Menu (`<elvia-context-menu>`)](#context-menu-elvia-context-menu)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [content](#content)
    - [horizontalPosition](#horizontalposition)
    - [verticalPosition](#verticalposition)
    - [isSelectable](#isselectable)
    - [isShowing](#isshowing)
    - [display](#display)
    - [anchorPosition](#anchorposition)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Context Menu (`<elvia-context-menu>`)

## Reference

https://design.elvia.io/components/context-menu

`<elvia-context-menu>` is a web component.

## Installation

This web component requires the `@elvia/elvis-context-menu` package. If it is not already installed, follow
the [Installation reference](./installation.md).

## Use

- Put the trigger in a child with `slot="trigger"`.
- Put menu items in a child with `slot="content"`.
- Use a native `<button>` as the trigger. Set `aria-haspopup="menu"` on it. See [Buttons](./button.md).
- Use `<e-icon>` for icons beside menu actions. See [Icons](./icon.md).
- Wrap related items in `ewc-context-menu__list-group` to separate them. Add a heading inside a group when
  needed.
- The menu closes when a user selects an item, clicks outside it, or presses Escape.
- Listen for `onOpen` and `onClose` with `addEventListener`. See [Web Components](./web-components.md) for
  event behavior.

```html
<elvia-context-menu>
  <button aria-haspopup="menu" slot="trigger" aria-label="Flere handlinger" class="e-btn e-btn--icon">
    <span class="e-btn__icon">
      <e-icon name="moreMenu"> </e-icon>
    </span>
  </button>
  <div slot="content" class="ewc-context-menu__list-group">
    <button role="menuitem">Rediger</button>
    <button role="menuitem">Slett</button>
  </div>
</elvia-context-menu>
```

## Attributes

### content

Use `slot="content"` for menu items or other elements.

```html
<elvia-context-menu>
  <button aria-haspopup="menu" slot="trigger" aria-label="Flere handlinger" class="e-btn e-btn--icon">
    <span class="e-btn__icon">
      <e-icon name="moreMenu"> </e-icon>
    </span>
  </button>
  <div slot="content">
    <div class="ewc-context-menu__list-group">
      <button role="menuitem">Be om tilgang</button>
      <button role="menuitem">Legg til bruker</button>
      <button role="menuitem">Fjern bruker</button>
    </div>
    <div class="ewc-context-menu__list-group">
      <a role="menuitem" href="#">Endre passord</a>
      <button role="menuitem">Innstillinger</button>
    </div>
  </div>
</elvia-context-menu>
```

### horizontalPosition

Set it to `"left"` or `"right"`. It defaults to `"left"`.

```html
<elvia-context-menu horizontalPosition="right">...</elvia-context-menu>
```

### verticalPosition

Set it to `"bottom"` or `"top"`. It defaults to `"bottom"`.

```html
<elvia-context-menu verticalPosition="top">...</elvia-context-menu>
```

### isSelectable

Defaults to `false`. Set it to `true` for a menu of mutually exclusive choices.

```html
<elvia-context-menu isSelectable="true">...</elvia-context-menu>
```

### isShowing

Defaults to `false`. Set it to `true` to show the menu.

```html
<elvia-context-menu isShowing>...</elvia-context-menu>
```

### display

Sets the trigger container's CSS `display` value. It defaults to `"inline-block"`. Change it if this value
conflicts with the surrounding layout.

```html
<elvia-context-menu display="block">...</elvia-context-menu>
```

### anchorPosition

Set an object with `top` and `left` pixel coordinates to position the menu at a point. It can then be used as
a custom context menu anywhere on the page when right-clicked.

```js
const menu = document.querySelector('elvia-context-menu');
menu.anchorPosition = { top: 100, left: 200 };
```

## Guidelines

### When to use

- Show a short list of secondary actions beside a trigger.
- Use `isSelectable` for a list where the user selects one option.

### When not to use

- Do not use this menu for supporting information. Use a [Popover](./popover.md).
- Do not add many options. The menu can overwhelm users on mobile.

## Accessibility

- Add `role="menuitem"` to each regular menu item.
- For selectable menus, add `role="menuitemradio"` and `aria-checked` to each item.
- Add `e-btn---selected` to the trigger while the menu is open.

## Examples

**Input:** "Show icons beside known actions."

**Output:**

```html
<elvia-context-menu>
  <button slot="trigger" class="e-btn e-btn--icon" aria-haspopup="menu" aria-label="Flere handlinger">
    <span class="e-btn__icon">
      <e-icon name="moreMenu"></e-icon>
    </span>
  </button>
  <div slot="content" class="ewc-context-menu__list-group">
    <button role="menuitem">
      <e-icon name="edit" size="xs"></e-icon>
      <span>Rediger</span>
    </button>
    <button role="menuitem">
      <e-icon name="bin" size="xs"></e-icon>
      <span>Slett</span>
    </button>
    <a role="menuitem" href="#">
      <e-icon name="download" size="xs"></e-icon>
      <span>Last ned</span>
    </a>
  </div>
</elvia-context-menu>
```

**Input:** "Group different actions under headings."

**Output:**

```html
<elvia-context-menu>
  <button slot="trigger" class="e-btn e-btn--icon" aria-haspopup="menu" aria-label="Flere handlinger">
    <span class="e-btn__icon">
      <e-icon name="moreMenu"></e-icon>
    </span>
  </button>
  <div slot="content">
    <div class="ewc-context-menu__list-group">
      <h1>Kundeforhold</h1>
      <button role="menuitem">Be om tilgang</button>
      <button role="menuitem">Legg til bruker</button>
    </div>
    <div class="ewc-context-menu__list-group">
      <h1>Innlogging</h1>
      <a role="menuitem" href="#">Endre passord</a>
      <a role="menuitem" href="#">To-faktor autentisering</a>
    </div>
  </div>
</elvia-context-menu>
```

**Input:** "Disable an action that is not available."

**Output:**

```html
<elvia-context-menu>
  <button slot="trigger" class="e-btn e-btn--icon" aria-haspopup="menu" aria-label="Flere handlinger">
    <span class="e-btn__icon">
      <e-icon name="moreMenu"></e-icon>
    </span>
  </button>
  <div slot="content" class="ewc-context-menu__list-group">
    <button role="menuitem">
      <e-icon name="accessControl" size="xs"></e-icon>
      <span>Be om tilgang</span>
    </button>
    <button role="menuitem" disabled>
      <e-icon name="users" size="xs" class="e-icon--color-disabled-1"></e-icon>
      <span>Legg til bruker</span>
    </button>
    <a role="menuitem" href="#">
      <e-icon name="edit" size="xs"></e-icon>
      <span>Endre passord</span>
    </a>
  </div>
</elvia-context-menu>
```
