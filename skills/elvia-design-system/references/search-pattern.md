- [Search Pattern](#search-pattern)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
    - [Instant Search](#instant-search)
    - [On-Submit Search](#on-submit-search)
  - [Related References](#related-references)

# Search Pattern

## Reference

https://design.elvia.io/components/search

Search is an pattern, not a component. It uses search inputs and Elvis CSS classes.

## Installation

This pattern uses the `@elvia/elvis` package. Follow the [Elvis installation reference](./installation.md) if
the package is not installed.

## Use

Build search from a native `<input type="search">` inside `e-input`. Use `e-form-field` and `e-inlined-field`
for layout. Do not use the removed `e-search` classes.

## Guidelines

- Use instant search to filter results as the user types.
- Use on-submit search when the user must choose when the search starts.
- Use medium size by default. Use small size in dense internal interfaces. Keep the size consistent on the
  page.
- Add `e-form-field--full-width` to the field wrapper when instant search must fill the available width.
- For on-submit search that must fill the available width, add `e-inlined-field--full-width` to the outer
  `e-inlined-field`.
- Remove `e-invisible` from the clear button when the input has a valid value.

## Accessibility

- Add an `aria-label` to the search input when no visible label is present.
- Add an `aria-label` to the clear button.

## Examples

### Instant Search

```html
<div class="e-form-field">
  <div class="e-input">
    <e-icon name="searchColor"></e-icon>
    <input aria-label="Søk" type="search" placeholder="Søk" />
    <button type="button" class="e-btn e-btn--icon e-invisible" aria-label="Tøm søkefelt">
      <span class="e-btn__icon">
        <e-icon name="close"></e-icon>
      </span>
    </button>
  </div>
</div>
```

### On-Submit Search

```html
<div class="e-inlined-field">
  <div class="e-form-field e-form-field--width-auto">
    <div class="e-input">
      <input aria-label="Søk" type="search" placeholder="Søk" />
      <button class="e-btn e-btn--icon e-invisible" aria-label="Tøm søkefelt">
        <span class="e-btn__icon">
          <e-icon name="close"></e-icon>
        </span>
      </button>
    </div>
  </div>
  <button class="e-btn e-btn--lg e-ml-16">
    <span class="e-btn__icon">
      <e-icon name="searchColor"></e-icon>
    </span>
    <span class="e-btn__title">Søk</span>
  </button>
</div>
```

## Related References

- [Form Field](./form-field.md) covers `e-form-field`.
- [Input](./input.md) covers `e-input`.
- [Icons](./icon.md) covers `e-icon`.
