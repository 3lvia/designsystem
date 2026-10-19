[TOC]

- [Pagination (`<elvia-pagination>`)](#pagination-elvia-pagination)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [numberOfElements](#numberofelements)
    - [alignment](#alignment)
    - [ariaLabel](#arialabel)
    - [value](#value)
    - [valueOnChange](#valueonchange)
    - [dropdownItems](#dropdownitems)
    - [dropdownSelectedItemIndex](#dropdownselecteditemindex)
    - [dropdownSelectedItemIndexOnChange](#dropdownselecteditemindexonchange)
    - [dropdownMenuPosition](#dropdownmenuposition)
    - [lastNumberLimit](#lastnumberlimit)
    - [labelOptions](#labeloptions)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Pagination (`<elvia-pagination>`)

## Reference

https://design.elvia.io/components/pagination

`<elvia-pagination>` is a web component.

## Installation

This web component requires the `@elvia/elvis-pagination` package. If it is not installed, follow the
[Installation reference](./installation.md).

## Use

```html
<elvia-pagination ariaLabel="Orders" numberOfElements="100"></elvia-pagination>
```

Set `numberOfElements` to the total number of items.

For updates to attributes or properties after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### numberOfElements

Set the total number of items. Defaults to `0`.

### alignment

Set to `left` or `right`. Defaults to `left`.

### ariaLabel

Set a unique accessible name for the pagination navigation landmark.

### value

Set the visible range with `start` and `end` indexes. Indexes start at 1 and include both ends.

```js
pagination.value = { start: 21, end: 30 };
```

### valueOnChange

Listen for this event when the visible range changes. Its event value has `start` and `end` indexes. See
[Events](./web-components.md#events).

### dropdownItems

Set the page-size options as objects with string `value` and `label` fields. Use numeric values. Defaults to
10, 20, 30, and 40.

### dropdownSelectedItemIndex

Set the selected option by its zero-based index in `dropdownItems`. Defaults to `0`.

### dropdownSelectedItemIndexOnChange

Listen for this event when the selected page-size option changes. Its event value is the selected option's
zero-based index. See [Events](./web-components.md#events).

### dropdownMenuPosition

Set to `top`, `bottom`, or `auto`. Defaults to `bottom`.

### lastNumberLimit

Set a threshold for hiding the last page number. When `numberOfElements` equals or exceeds this value, the
last page number is hidden if the current page is more than three pages from the end.

### labelOptions

Override the labels for `displaying`, `of`, and `label`. The defaults depend on the page language.

## Guidelines

### When to use

- Use pagination to split a large set of content into pages.
- Use pagination with tables.

### When not to use

- Do not use pagination when all content fits on one page.

## Accessibility

- Set a unique `ariaLabel` for each pagination landmark on a page.
- Users can move through pagination controls with the Left and Right Arrow keys.
- Users can open the page-size dropdown and select a page number with Space or Enter.

## Examples

**Input:** Update the displayed item range when a user selects a page.

**Output:**

```html
<elvia-pagination id="pagination" ariaLabel="Orders" numberOfElements="52"></elvia-pagination>
```

```js
const pagination = document.querySelector('elvia-pagination');

pagination.addEventListener('valueOnChange', (event) => {
  console.log(event.detail.value);
});
```

**Input:** Set page-size options and custom labels.

**Output:**

```js
const pagination = document.querySelector('elvia-pagination');

pagination.dropdownItems = [
  { value: '25', label: '25' },
  { value: '50', label: '50' },
];
pagination.labelOptions = {
  displaying: 'Viser',
  of: 'av',
  label: 'fakturaer',
};
```
