- [Dropdown (`<elvia-dropdown>`)](#dropdown-elvia-dropdown)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [value](#value)
    - [isSearchable](#issearchable)
    - [isMulti](#ismulti)
    - [hasSelectAllOption](#hasselectalloption)
    - [size](#size)
    - [isFullWidth](#isfullwidth)
    - [menuPosition](#menuposition)
    - [errorOptions](#erroroptions)
    - [hasLoadMoreItemsButton](#hasloadmoreitemsbutton)
    - [noOptionsMessage](#nooptionsmessage)
    - [labelTransformation](#labeltransformation)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Dropdown (`<elvia-dropdown>`)

## Reference

https://design.elvia.io/components/dropdown

`<elvia-dropdown>` is a web component.

## Installation

This web component requires the `@elvia/elvis-dropdown` package. See the
[Installation reference](./installation.md).

## Use

```html
<elvia-dropdown
  label="Velg område"
  placeholder="Velg et område"
  items='[{"label":"Oslo","value":"oslo"},{"label":"Hamar","value":"hamar"}]'
></elvia-dropdown>
```

See [Web components](./web-components.md) for attributes, properties, and events.

## Attributes

### items

Set an array of objects with `label` and `value`. Values accept strings, numbers, or `null`. Each value MUST
be unique across all nested items.

- Set `children` to an array of items for a nested menu.
- Set `icon` to an HTML string, not an icon name. Use 24px [Icons](./icon.md).
- Set `status` to `error`, `warning`, `info`, or `informative`. Add an explanation with `tooltip`.
- Set `isDisabled` on an unavailable item.

```js
dropdown.items = [
  {
    label: 'Oslo',
    value: 'oslo',
    children: [{ label: 'Sentrum', value: 'sentrum' }],
  },
  {
    label: 'Hamar',
    value: 'hamar',
    status: 'warning',
    tooltip: 'Noen måleverdier mangler',
  },
];
```

### value

Use an item value for one selection. Use an array of item values for multiple selections. Assign numbers and
arrays as properties to preserve their types. The `valueOnChange` event returns the selected value or array,
not item objects.

```js
dropdown.value = 'oslo';
```

### isSearchable

Set to `true` to filter item labels. A search in nested items shows matching leaf items in one list.

```html
<elvia-dropdown label="Velg område" isSearchable></elvia-dropdown>
```

### isMulti

Set to `true` for multiple selections. The input shows a count when two or more items are selected. When all
selectable items are selected, the input shows `allOptionsSelectedLabel`. This label defaults to `Alle` in
Norwegian and `All` in English.

```js
dropdown.isMulti = true;
dropdown.allOptionsSelectedLabel = 'Alle områder';
```

### hasSelectAllOption

Set to `true` to add a select-all option. This option applies only when `isMulti` is `true`. Use
`selectAllOption` to change its label. The label defaults to `Alle` in Norwegian and `All` in English.

```js
dropdown.hasSelectAllOption = true;
dropdown.selectAllOption = 'Velg alle områder';
```

### size

Set to `small` or `medium`. Use `small` primarily in internal systems. Keep the size consistent with other
inputs in the form.

```html
<elvia-dropdown label="Velg område" size="small"></elvia-dropdown>
```

### isFullWidth

The default maximum width is 448px. Set `isFullWidth` to `true` to fill the parent width without this limit.

```html
<elvia-dropdown label="Velg område" isFullWidth></elvia-dropdown>
```

### menuPosition

Set to `top`, `bottom`, or `auto`. The default is `auto`.

```html
<elvia-dropdown label="Velg område" menuPosition="top"></elvia-dropdown>
```

### errorOptions

Set an object with `text`, `isErrorState`, or `hasErrorPlaceholder`. The default is
`{ isErrorState: false, hasErrorPlaceholder: true }`.

- A nonempty `text` shows a custom error message and activates the error style.
- Set `isErrorState` to `true` to activate the error style without a message.
- Set `hasErrorPlaceholder` to `false` to remove the reserved space when no custom text or internal error is
  present.
- The shared type includes `hideText`, but Dropdown does not use it.

```js
dropdown.errorOptions = { text: 'Velg et område' };
```

### hasLoadMoreItemsButton

Set to `true` to show the load-more button. The `onLoadMoreItems` event requests more items. The component
does not fetch items. Handle this event in the application. Set `isLoadingMoreItems` to `true` during the
request. Append the results to `items`. Set `isLoadingMoreItems` to `false` after the request. Set
`hasLoadMoreItemsButton` to `false` when no more items are available.

```html
<elvia-dropdown label="Velg område" hasLoadMoreItemsButton></elvia-dropdown>
```

### noOptionsMessage

This text defaults to `Ingen tilgjengelige valg` in Norwegian and `No available options` in English.

```js
dropdown.noOptionsMessage = 'Ingen områder funnet';
```

### labelTransformation

Set a function that accepts an item value and returns the input label. The function changes the input label
for one selected item, not the menu label.

```js
dropdown.labelTransformation = (value) =>
  dropdown.items.find((item) => item.value === value).label.slice(0, 3);
```

## Guidelines

### When to use

- Use Dropdown for 5 to 15 options when space is limited.
- Use searchable Dropdown with a load-more button for large lists that require multiple selections.
- Keep nested menus shallow to limit their width.

### When not to use

- For fewer than five options, consider [Radio Filter](./radio-filter.md) or
  [Radio Button](./radio-button.md).
- For more than 15 options with one selection, consider Autocomplete.

## Accessibility

- Set `label` to provide a visible label.
- If no visible label is present, you MUST set `ariaLabel` to give the input an accessible name.

## Examples

**Input:** Select multiple areas and read the selected values.

**Output:**

```html
<elvia-dropdown id="areas" label="Velg områder" isMulti hasSelectAllOption></elvia-dropdown>
<p id="selection" aria-live="polite"></p>
```

```js
const dropdown = document.querySelector('elvia-dropdown');
const selection = document.querySelector('#selection');

dropdown.items = [
  { label: 'Oslo', value: 'oslo' },
  { label: 'Hamar', value: 'hamar' },
];
dropdown.value = [];
dropdown.addEventListener('valueOnChange', (event) => {
  selection.textContent = event.detail.value.join(', ');
});
```

**Input:** Add an empty option that clears the selection.

**Output:**

```html
<elvia-dropdown
  label="Velg område"
  placeholder="Velg et område"
  items='[{"label":"Velg et område","value":null},{"label":"Oslo","value":"oslo"},{"label":"Hamar","value":"hamar"}]'
></elvia-dropdown>
```
