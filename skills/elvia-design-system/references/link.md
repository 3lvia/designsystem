- [Link (`e-link`)](#link-e-link)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
    - [Types](#types)
    - [Size](#size)
    - [Label](#label)
    - [Links with button style](#links-with-button-style)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Link (`e-link`)

## Reference

https://design.elvia.io/components/link

Link is a CSS-based component. It uses CSS classes only.

## Installation

Install `@elvia/elvis` to use this CSS-based component. Follow the
[Elvis installation reference](./installation.md) for setup.

Links with icons use the `<e-icon>` web component. Read the [icon reference](./icon.md) for setup and icon
names.

## Use

```html
<a class="e-link" href="/outages">Se vårt strømbruddskart</a>
```

## Guidelines

### When to use

- Use the application's routing mechanism for in-app navigation.
- Apply `e-link` to the rendered link.

### When not to use

- The component has no disabled modifier. Explain unavailable destinations in text.
- Use a button when the user changes application state.

### Types

- **Standard** (`e-link`): standalone navigation.
- **Inline** (`e-link--inline`): inherits the surrounding font size.
- **New tab** (`e-link--new-tab`): apply to external links that open in a new tab. Set `target="_blank"`. Set
  `rel="noopener"`.
- **Action** (`e-link--action`): prominent navigation with a trailing arrow icon.
- **Back** (`e-link--back`): navigation to a previous or parent page with a leading arrow icon.
- Use `e-link__title` and `e-link__icon` in action and back links. Include both color and filled icons to show
  hover and active states.

### Size

- Small `e-link--sm`.
- Medium `e-link--md` (default).
- Large `e-link--lg`.

### Label

Use concise labels that describe the destination. Do not use labels such as “click here.”

### Links with button style

Use `e-btn` on a link only when navigation needs button styling.

```html
<a class="e-btn" href="/application-details">
  <span class="e-btn__title">Se systemdetaljer</span>
</a>
```

## Accessibility

- An icon alone does not tell users that a link opens a new tab. State this in the link text or nearby text.

## Examples

**Input:** Open the outage map in a new tab.

**Output:**

```html
<a class="e-link e-link--new-tab" href="https://strombruddskart.elvia.no/" target="_blank" rel="noopener">
  <span class="e-link__title"
    >Se vårt strømbruddskart <span class="e-sr-only">(åpnes i en ny fane)</span></span
  >
  <span class="e-link__icon">
    <e-icon name="newTabBold"></e-icon>
  </span>
</a>
```

**Input:** Add an action link with an arrow icon.

**Output:**

```html
<a class="e-link e-link--action" href="/systems">
  <span class="e-link__title">Se systemer</span>
  <span class="e-link__icon">
    <e-icon name="arrowRightCircleColor"></e-icon>
    <e-icon name="arrowRightCircleFilledColor"></e-icon>
  </span>
</a>
```

## Classes

Classes use BEM.

Base: `e-link`

**Elements**

- `e-link__icon`
- `e-link__title`

**Modifiers**

- `e-link--action`
- `e-link--back`
- `e-link--inline`
- `e-link--lg`
- `e-link--md`
- `e-link--new-tab`
- `e-link--sm`

**Pseudos**

- `e-link---focus`
- `e-link---hover`
