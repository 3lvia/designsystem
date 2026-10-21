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

This CSS-based component requires `@elvia/elvis`. See [Elvis installation](./installation.md).

## Use

```html
<div class="e-table-container">
  <table class="e-table">
    <caption class="e-sr-only">
      Beskrivelse av tabellen
    </caption>
    <thead>
      <tr>
        <th scope="col">Periode</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Beløp (kr)</th>
        <th scope="col" class="e-text-right">Faktura nr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Januar 2020</td>
        <td>Sendt</td>
        <td class="e-text-right e-text-mono">1 111,11</td>
        <td class="e-text-right e-text-mono">123456</td>
      </tr>
      <tr>
        <td>Februar 2020</td>
        <td>Betalt</td>
        <td class="e-text-right e-text-mono">500,00</td>
        <td class="e-text-right e-text-mono">123456</td>
      </tr>
      <tr>
        <td>Mars 2020</td>
        <td>Sendt</td>
        <td class="e-text-right e-text-mono">568,98</td>
        <td class="e-text-right e-text-mono">123456</td>
      </tr>
    </tbody>
  </table>
</div>
```

Use `e-table` for the default medium density. The CSS supplies the header background, alternate row
backgrounds, and cell spacing. Use `e-table e-table--small` for compact rows. Put `e-table-container` on a
separate parent element for the border and horizontal scroll.

The CSS does not change desktop markup into a mobile layout. Use a separate `e-table-mobile` table for mobile
layout. Use one `tbody` per record. Put its record header in the first row and its field labels in subsequent
rows. The mobile sticky style applies to record headers, not column headers.

## Guidelines

### When to use

- Use a table to show a large amount of data.
- Use medium density for more space and readability. Use small density to show more data in less space.
- Use one density and style for all tables on the page.
- Keep the first column left-aligned. Align each other header with its column.
- Use `e-text-mono` and `e-text-right` for numbers that users compare.
- Use [icon buttons](./button.md) for row actions. Label each icon-only button.
- Put `e-table__button` on the action cell. Use `e-text-center` on its column header.
- Register the action icons before use. See [Icons](./icon.md).
- Use [checkboxes](./checkbox.md) for row selection. Use the header checkbox to select or clear all rows.
- Put `e-table__checkbox` on each selection row, including the header row.
- Add `e-table__checkbox--selected` to selected body rows.
- Use `e-table--sticky-header` for top column headers. Use `e-table--sticky-column-header` for left row
  headers.
- Use `e-table__cell--multiline` for 450px text cells. Use `e-table__cell--multiline-small` for 250px text
  cells.
- Row expansion is a
  [Figma-only pattern](https://www.figma.com/file/gh5MaG2NWKVODTk1p3cO6s/Tables?node-id=2927%3A24058), not
  built-in table behavior, guide the user to Figma.
- For row expansion, put the single [accordion](./accordion.md) control at the right. Leave its column header
  empty.
- Let users expand or collapse the whole row. Permit multiple expanded rows.
- Implement row expansion and sort logic in the application. The table CSS does not supply these behaviors.

### When not to use

- Use a data visualization when it fits the information better.

## Accessibility

- Add a `caption` as the first child of each table. Add `e-sr-only` to hide it visually.
- Add `scope="col"` or `scope="row"` to each `th`.
- For sorting, set `aria-sort="ascending"` or `aria-sort="descending"` on the sorted header. Move it when the
  sorted column or row changes.

## Examples

**Input:** Show compact invoices with row headers and numeric columns.

**Output:**

```html
<div class="e-table-container">
  <table class="e-table e-table--small">
    <caption class="e-sr-only">
      Fakturaer for 2023
    </caption>
    <thead>
      <tr>
        <th scope="col">Tidsperiode</th>
        <th scope="col">Status</th>
        <th scope="col" class="e-text-right">Beløp (kr)</th>
        <th scope="col" class="e-text-right">Faktura nr.</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">Januar 2023</th>
        <td>Sendt</td>
        <td class="e-text-right e-text-mono">567,98</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
      <tr>
        <th scope="row">Februar 2023</th>
        <td>Betalt</td>
        <td class="e-text-right e-text-mono">543,10</td>
        <td class="e-text-right e-text-mono">1023456</td>
      </tr>
    </tbody>
  </table>
</div>
```

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
        <th scope="col">Opprettet</th>
        <th scope="col" class="e-text-center">Handlinger</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="e-text-mono">203413222</td>
        <td>Elviaveien 3, 1230 Oslo</td>
        <td>15.01.2023</td>
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

`e-checkbox--indeterminate` only styles the mark. Set the header input's `indeterminate` property to `true`
for partial selection. Set it to `false` otherwise. Keep the native input states and the selection classes
synchronized. Implement the header checkbox's select-all and clear-all behavior in the application.

```html
<div class="e-table-container">
  <table class="e-table">
    <caption class="e-sr-only">
      Saker
    </caption>
    <thead>
      <tr class="e-table__checkbox">
        <th scope="col">
          <label class="e-checkbox e-checkbox--small e-checkbox--indeterminate" aria-label="Velg alle">
            <input type="checkbox" />
            <span class="e-checkbox__mark"></span>
          </label>
        </th>
        <th scope="col">Saks-ID</th>
        <th scope="col">Adresse</th>
        <th scope="col">Opprettet</th>
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
        <td class="e-text-mono">203413</td>
        <td>Veien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
      <tr class="e-table__checkbox">
        <td>
          <label class="e-checkbox e-checkbox--small" aria-label="Velg sak 203414">
            <input type="checkbox" />
            <span class="e-checkbox__mark"></span>
          </label>
        </td>
        <td class="e-text-mono">203414</td>
        <td>Veien 3, 1230 Oslo</td>
        <td>15.01.2021</td>
      </tr>
    </tbody>
  </table>
</div>
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
