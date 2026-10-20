[TOC]

- [Table (`e-table`)](#table-e-table)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)
  - [Classes](#classes)

# Table (`e-table`)

## Reference

https://design.elvia.io/components/table

Table is a CSS-based component, consisting of only CSS classes.

## Installation

This CSS-based component requires `@elvia/elvis`. Follow [Elvis installation](./installation.md) if the
package is not set up.

## Use

```html
<div class="e-table-container">
  <table class="e-table">
    <caption class="e-sr-only">
      Fakturastatus
    </caption>
    <thead>
      <tr>
        <th scope="col">Periode</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Januar 2026</th>
        <td>Betalt</td>
      </tr>
    </tbody>
  </table>
</div>
```

Wrap a desktop table in `e-table-container`. The CSS does not change desktop markup into a mobile layout. Use
a separate `e-table-mobile` table for mobile layout. The mobile sticky style applies to row headers, not
column headers.

## Guidelines

### When to use

- Use a table to show a large amount of data.
- Use medium density for more space and readability. Use small density to show more data in less space.
- Use one density and style for all tables on the page.
- Keep the first column left-aligned. Align each other header with its column.
- Use `e-text-mono` and `e-text-right` for numbers that users compare.
- Use [icon buttons](./button.md) for row actions. Label each icon-only button.
- Use [checkboxes](./checkbox.md) for row selection. Use the header checkbox to select or clear all rows.

### When not to use

- Do not use a table when a data visualization fits the information better.

## Accessibility

- Add a `caption` as the first child of each table. Add `e-sr-only` to hide it visually.
- Add `scope="col"` or `scope="row"` to each `th`.
- For sorting, set `aria-sort="ascending"` or `aria-sort="descending"` on the sorted header. Move it when the
  sorted column or row changes.

## Examples

**Input:** Add edit and delete actions to each table row.

**Output:**

```html
<div class="e-table-container">
  <table class="e-table">
    <caption class="e-sr-only">
      Saker
    </caption>
    <thead>
      <tr>
        <th scope="col">Saks-ID</th>
        <th scope="col">Adresse</th>
        <th scope="col">Handlinger</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td class="e-table__button">
          <button class="e-btn e-btn--icon" aria-label="Rediger sak 203413222">
            <span class="e-btn__icon">
              <e-icon name="edit"></e-icon>
            </span>
          </button>
          <button class="e-btn e-btn--icon" aria-label="Slett sak 203413222">
            <span class="e-btn__icon">
              <e-icon name="bin"></e-icon>
            </span>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

**Input:** Add checkboxes to select table rows.

**Output:**

```html
<div class="e-table-container">
  <table class="e-table">
    <caption class="e-sr-only">
      Saker
    </caption>
    <thead>
      <tr>
        <th scope="col">
          <label class="e-checkbox e-checkbox--small e-checkbox--indeterminate" aria-label="Velg alle">
            <input type="checkbox" />
            <span class="e-checkbox__mark"></span>
          </label>
        </th>
        <th scope="col">Saks-ID</th>
        <th scope="col">Adresse</th>
      </tr>
    </thead>
    <tbody>
      <tr class="e-table__checkbox e-table__checkbox--selected">
        <td>
          <label class="e-checkbox e-checkbox--small" aria-label="Velg sak 203413">
            <input type="checkbox" checked />
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <th scope="row" class="e-text-mono">203413</th>
        <td>Veien 3, 1230 Oslo</td>
      </tr>
      <tr class="e-table__checkbox">
        <td>
          <label class="e-checkbox e-checkbox--small" aria-label="Velg sak 203414">
            <input type="checkbox" />
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <th scope="row" class="e-text-mono">203414</th>
        <td>Veien 3, 1230 Oslo</td>
      </tr>
    </tbody>
  </table>
</div>
```

**Input:** Show desktop data in a different layout on mobile.

**Output:**

```html
<table class="e-table-mobile">
  <caption class="e-sr-only">
    Fakturastatus
  </caption>
  <thead>
    <tr>
      <th scope="col">Tidsperiode</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="col">Januar 2026</th>
      <th scope="col"></th>
    </tr>
    <tr>
      <th scope="row">Status</th>
      <td>Betalt</td>
    </tr>
  </tbody>
</table>
```

## Classes

Classes use BEM.

Base: `e-table`, `e-table-container`, `e-table-mobile`

**Elements**

- `e-table__button`
- `e-table__cell--invalid`
- `e-table__cell--multiline`
- `e-table__cell--multiline-small`
- `e-table__checkbox`
- `e-table__checkbox--selected`
- `e-table__footnote`
- `e-table__footnote--small`
- `e-table__input`
- `e-table__row--invalid`
- `e-table__select`
- `e-table-mobile__button`
- `e-table-mobile__checkbox`
- `e-table-mobile__checkbox--selected`
- `e-table-mobile__input`
- `e-table-mobile__select`

**Modifiers**

- `e-table--no-stripes`
- `e-table--small`
- `e-table--sticky-column-header`
- `e-table--sticky-header`
- `e-table-mobile--small`
- `e-table-mobile--sticky-header`
