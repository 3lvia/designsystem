- [Empty State (`e-empty-state`)](#empty-state-e-empty-state)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Classes](#classes)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Empty State (`e-empty-state`)

## Reference

https://design.elvia.io/components/empty-state

Empty State is a CSS-based component, consisting of only CSS classes.

## Installation

Install the CSS package `@elvia/elvis`. See [Elvis Installation](./installation.md).

## Use

```html
<section class="e-empty-state">
  <elvia-illustrations-no-results class="e-empty-state__illustration"></elvia-illustrations-no-results>
  <div class="e-empty-state__content">
    <h2 class="e-empty-state__heading">Ingen treff</h2>
    <p class="e-empty-state__description">Prøv et annet søk.</p>
  </div>
</section>
```

## Classes

Classes use BEM.

Base: `e-empty-state`

**Elements**

- `e-empty-state__action`
- `e-empty-state__content`
- `e-empty-state__description`
- `e-empty-state__heading`
- `e-empty-state__illustration`

**Modifiers**

- `e-empty-state--lg`
- `e-empty-state--start-aligned`

## Guidelines

### When to use

- Use an empty state for missing data, cleared data, errors, or empty search results.
- Use the default layout when the empty state applies to part of the content.
- Use `e-empty-state--lg` when the empty state fills the page.
- Use `e-empty-state--start-aligned` when content needs start alignment. It switches to a vertical layout on
  mobile.
- Explain why the state appears. Give the user a next step with a [button](./button.md) or [link](./link.md)
  when needed.
- Use plain language and a positive tone. Avoid product-specific terms.
- Add an [illustration](./illustrations.md) when it helps explain the state.

### When not to use

- Do not use an empty state to show progress or loading.

## Accessibility

- Choose a heading level that fits the context. Use `h1` for page content and `h2` or lower for a section.

## Examples

**Input:** A search returns no results.

**Output:**

```html
<section class="e-empty-state">
  <elvia-illustrations-no-results class="e-empty-state__illustration"></elvia-illustrations-no-results>
  <div class="e-empty-state__content">
    <h2 class="e-empty-state__heading">Ingen treff</h2>
    <p class="e-empty-state__description">Prøv et annet søk eller fjern noen filtre.</p>
  </div>
</section>
```

**Input:** The page has no content because an error prevented data from loading.

**Output:**

```html
<section class="e-empty-state e-empty-state--lg">
  <elvia-illustrations-no-connection class="e-empty-state__illustration"></elvia-illustrations-no-connection>
  <div class="e-empty-state__content">
    <h1 class="e-empty-state__heading">Noe gikk galt 👀</h1>
    <p class="e-empty-state__description">Vi klarte ikke å hente data. Prøv igjen senere.</p>
    <div class="e-empty-state__action">
      <button class="e-btn e-btn--primary" type="button">Prøv igjen</button>
    </div>
  </div>
</section>
```
