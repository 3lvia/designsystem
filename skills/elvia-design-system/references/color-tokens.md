- [Color tokens (`--e-color-*`)](#color-tokens---e-color-)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Tokens](#tokens)
    - [Purpose tokens](#purpose-tokens)
    - [Contrast tokens](#contrast-tokens)
    - [Theme behavior](#theme-behavior)
    - [Base tokens](#base-tokens)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Color tokens (`--e-color-*`)

## Reference

https://design.elvia.io/brand/color

Color tokens are CSS custom properties for custom UI, not a web component or a CSS class component.

## Installation

Color tokens require the `@elvia/elvis` CSS package. See [Installation](./installation.md).

## Use

Use `var(--e-color-*)` for colors in custom UI outside the design system. Select a purpose token by its role,
not its current color. Prefer these tokens over custom hex, RGB, HSL, or named color values. Avoid colors
outside the Elvia palette.

```html
<section class="custom-panel">Forbruk denne måneden</section>
```

```css
.custom-panel {
  background-color: var(--e-color-background-element-4);
  color: var(--e-color-background-element-4--contrast);
  border: 1px solid var(--e-color-border-2);
}
```

## Tokens

### Purpose tokens

Use these tokens as a starting point. See the [token catalog](https://design.elvia.io/brand/color#Tokens) for
other roles.

- Main background: `--e-color-background-1`, `--e-color-background-2`.
- Large dark surface: `--e-color-background-3`.
- Element surface, such as a box or modal: `--e-color-background-element-4`.
- Primary text: `--e-color-text-1`.
- Muted text: `--e-color-text-2`.
- Placeholder text: `--e-color-text-placeholder-1`.
- Primary disabled text: `--e-color-text-disabled-1`.
- High-contrast border: `--e-color-border-1`.
- Low-contrast border: `--e-color-border-2`.
- Medium-contrast border: `--e-color-border-3`.
- Hover background: `--e-color-background-hover-1`, `--e-color-background-hover-2`.
- Selected background: `--e-color-background-selected-1`, `--e-color-background-selected-2`.
- Disabled background: `--e-color-background-disabled-1`.
- Read-only background: `--e-color-background-readonly-1`.
- Hover border: `--e-color-border-hover-1`.
- Selected border: `--e-color-border-selected-1`, `--e-color-border-selected-2`.
- Disabled border: `--e-color-border-disabled-1`.
- Success: `--e-color-signal-positive`.
- Caution: `--e-color-signal-caution`.
- Warning: `--e-color-signal-warning`.
- Error or danger: `--e-color-signal-danger`.
- Neutral information: `--e-color-signal-info`.
- Data series: `--e-color-data-1`, `--e-color-data-2`, `--e-color-data-3`, `--e-color-data-4`,
  `--e-color-data-5`, `--e-color-data-6`.
- Brand accent: `--e-color-brand-accent`.

Use shade tokens, such as `--e-color-data-1-50`, instead of custom tints or opacity changes.

### Contrast tokens

Use the associated `--contrast` token for text on a colored surface. Change the text token with the background
token for each state.

```css
.custom-item--selected {
  background-color: var(--e-color-background-selected-2);
  color: var(--e-color-background-selected-2--contrast);
}
```

### Theme behavior

Purpose tokens use the light theme by default. The `e-theme-light` and `e-theme-dark` CSS classes set the
theme for an element and its descendants. Keep the same purpose token names in both themes.

```html
<div class="e-theme-dark">
  <section class="custom-panel">Forbruk denne måneden</section>
</div>
```

Setting `background-color: var(--e-color-background-3)` alone does not change descendant tokens. The
`e-color-background-3` CSS class also sets dark-theme tokens for descendants.

### Base tokens

Use base tokens only when no purpose token fits. Keep this exception within the Elvia palette. Base tokens use
`--e-light-theme-*` and `--e-dark-theme-*`, not `--e-color-*`. For example, `--e-light-theme-grey-10` and
`--e-dark-theme-grey-20` are base tokens. Select the corresponding base token explicitly for each theme.

## Guidelines

### When to use

- Use purpose tokens for custom surfaces, text, borders, states, and data displays.
- Use neutral surfaces for most of the interface.
- Reserve green accents for deliberate emphasis or active states.

### When not to use

- Prefer an existing Elvis component when it meets the need.
- Avoid large green backgrounds.
- Avoid base tokens when a purpose token fits.
- Avoid static palette values as fallbacks for purpose tokens.
- You do not need to provide a fallback color for the tokens, trust that the Elvis CSS loads as expected.

## Accessibility

- Use the matching contrast token instead of an assumed black or white text color.
- `--e-color-background-element-1` becomes transparent in the dark theme.
- Check text contrast against the actual parent surface when this token is transparent.

## Examples

**Input:** Add a custom summary panel with a heading and secondary text.

**Output:**

```html
<section class="custom-summary">
  <h2>Forbruk</h2>
  <p class="custom-summary__note">Oppdatert i dag</p>
</section>
```

```css
.custom-summary {
  background-color: var(--e-color-background-1);
  color: var(--e-color-background-1--contrast);
  border: 1px solid var(--e-color-border-3);
}

.custom-summary__note {
  color: var(--e-color-text-2);
}
```

**Input:** Show a success message with a neutral background and a green border accent.

**Output:**

```html
<p class="custom-status" role="status">Endringene er lagret.</p>
```

```css
.custom-status {
  background-color: var(--e-color-background-1);
  color: var(--e-color-background-1--contrast);
  border: 1px solid var(--e-color-signal-positive);
}
```
