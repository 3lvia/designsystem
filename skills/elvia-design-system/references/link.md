# Link (`e-link`)

## Reference

https://design.elvia.io/components/link

Link is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires the `@elvia/elvis` package. If it is not already installed, follow the
[Elvis installation reference](./installation.md) before using the link classes.

Links with icons also use the `<e-icon>` web component. See the [icon reference](./icon.md) for setup and
available icons.

## Use

```html
<a class="e-link" href="/outages">View outages</a>

<p class="e-text-md">Read the <a class="e-link e-link--inline" href="/terms">terms and conditions</a>.</p>

<a class="e-link e-link--new-tab" href="https://example.com" target="_blank" rel="noopener">
  <span class="e-link__title">Visit the external service <span class="e-sr-only">(opens in a new tab)</span></span>
  <span class="e-link__icon">
    <e-icon name="newTabBold"></e-icon>
  </span>
</a>

<a class="e-link e-link--action" href="/applications">
  <span class="e-link__title">View applications</span>
  <span class="e-link__icon">
    <e-icon name="arrowRightCircleColor"></e-icon>
    <e-icon name="arrowRightCircleFilledColor"></e-icon>
  </span>
</a>

<a class="e-link e-link--back" href="/overview">
  <span class="e-link__icon">
    <e-icon name="arrowLeftCircleColor"></e-icon>
    <e-icon name="arrowLeftCircleFilledColor"></e-icon>
  </span>
  <span class="e-link__title">Back to overview</span>
</a>
```

## Types

- **Standard** (`e-link`): standalone navigation.
- **Inline** (`e-link--inline`): inherits the surrounding font size.
- **New tab** (`e-link--new-tab`): for external destinations opened with `target="_blank"` and
  `rel="noopener"`.
- **Action** (`e-link--action`): prominent navigation with a trailing arrow icon.
- **Back** (`e-link--back`): navigation to a previous or parent page with a leading arrow icon.

## Size

- Small `e-link--sm`.
- Medium `e-link--md` (default).
- Large `e-link--lg`.

## Guidelines

- For in-app navigation, use the framework's routing mechanism and use `e-link` styling to its rendered link.
- Links have no disabled state; omit an unavailable link or explain its status in text.
- Use `e-link--action` for prominent navigation and `e-link--back` for previous/parent navigation.
- Pair `e-link--new-tab` with `target="_blank"` and `rel="noopener"` for external links opened in a new tab.
- Action/back links use `e-link__title` and `e-link__icon`; include both color and filled icons for the
  hover/active swap.

### Label

Use concise, meaningful labels that describe the destination. Do not use labels such as “click here.”

### Links with button style

Use `e-btn` on an link only when a navigational link needs button styling; use this sparingly because it can
blur the difference between navigation and actions. Keep the link's `href` or framework routing behavior.

```html
<a class="e-btn" href="/application-details">
  <span class="e-btn__title">View application details</span>
</a>
```

## Accessibility

- The new-tab icon does not communicate the changed browsing context by itself; also identify that behavior in
  the link text or nearby text.

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

## Examples

**Input:** Link to the outage map in a new tab

**Output:**

```html
<a class="e-link e-link--new-tab" href="https://strombruddskart.elvia.no/" target="_blank" rel="noopener">
  <span class="e-link__title">View outage map <span class="e-sr-only">(opens in a new tab)</span></span>
  <span class="e-link__icon">
    <e-icon name="newTabBold"></e-icon>
  </span>
</a>
```
