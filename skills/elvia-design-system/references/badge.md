- [Badge (`<elvia-badge>`)](#badge-elvia-badge)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [Content](#content)
    - [Badge color](#badgecolor)
    - [Count](#count)
    - [Is hidden](#ishidden)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Badge (`<elvia-badge>`)

## Reference

https://design.elvia.io/components/badge

`<elvia-badge>` is a web component.

## Installation

This component requires the `@elvia/elvis-badge` package. Follow the
[Elvis installation reference](./installation.md).

## Use

The wrapped element MUST use `slot="content"`.

See the [Icons reference](./icon.md) for icon names and usage.

```html
<button class="e-btn e-btn--icon" aria-label="12 varsler">
  <elvia-badge count="12">
    <span slot="content" class="e-btn__icon" aria-hidden="true">
      <e-icon name="notificationBold"></e-icon>
    </span>
  </elvia-badge>
</button>
```

## Attributes

### content

Set `slot` to `content` on the wrapped element.

### badgeColor

Allowed values: `green`, `red`, `orange`, `neutral`, and `data-1` through `data-6`. The default is `green`.

Use `red` for a negative case and `neutral` for a toned-down badge. Use data colors to match related data.

Example: `<elvia-badge badgeColor="red" count="12">`.

### count

Leave `count` unset to show a dot without a number. Values above 99 display as `99+`.

### isHidden

The default is `false`. Set `isHidden` to `true` to hide the badge. The badge stays in the DOM and animates
when this value changes.

## Guidelines

### When to use

- Use a badge on an icon button or thumbnail.
- Use a badge to show a short count or indicator.

### When not to use

- Do not use a badge as a standalone status label.

## Accessibility

Give the enclosing control a detailed `aria-label`. Assistive technology may not announce the badge content
correctly.

## Examples

**Input:** Show 12 notifications on an icon button.

**Output:**

```html
<button class="e-btn e-btn--icon" aria-label="12 varsler">
  <elvia-badge badgeColor="red" count="12">
    <span slot="content" class="e-btn__icon" aria-hidden="true">
      <e-icon name="notificationBold"></e-icon>
    </span>
  </elvia-badge>
</button>
```
