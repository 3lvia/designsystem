- [Breadcrumb (`<elvia-breadcrumb>`)](#breadcrumb-elvia-breadcrumb)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [items](#items)
    - [onLinkClick](#onlinkclick)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Breadcrumb (`<elvia-breadcrumb>`)

## Reference

https://design.elvia.io/components/breadcrumb

`<elvia-breadcrumb>` is a web component.

## Installation

This web component requires the `@elvia/elvis-breadcrumb` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

You MUST pass at least two items. Start with the home page and end with the current page. On mobile, the
component shows only the closest parent.

```html
<elvia-breadcrumb
  items='[{"href":"/","text":"Hjem"},{"href":"/komponenter","text":"Komponenter"}]'
></elvia-breadcrumb>
```

For updates to `items` after initialization, follow the shared
[attribute and property guidance](./web-components.md#attributes-and-properties).

## Attributes

### items

An array of objects. Each object requires `text` and can include `href`. Omit `href` when the application
handles routing with `onLinkClick`. See [Arrays and objects](./web-components.md#arrays-and-objects) for how
to pass the value.

### onLinkClick

Fires when a breadcrumb link is clicked. The event value is the zero-based index of the clicked item. Use this
event for application routing when items omit `href`. Call your framework's router in the event handler. See
[Events](./web-components.md#events) for the event shape and naming.

## Guidelines

### When to use

- Use breadcrumbs to show location in a multi-level hierarchy and support navigation between levels.

### When not to use

- Do not use breadcrumbs for a flat site, to show journey progress, or as a replacement for primary
  navigation.
- Use a backlink when a page has only one parent level. See the [`e-link--back` guidance](./link.md#types).

## Accessibility

- The component renders a labeled `nav`, an ordered list, and marks the current page with
  `aria-current="page"`.
- Users navigate breadcrumb links with Tab.

## Examples

**Input:** A three-level page hierarchy with normal links.

**Output:**

```html
<elvia-breadcrumb
  items='[{"href":"/","text":"Hjem"},{"href":"/nett","text":"Nett"},{"href":"/nett/priser","text":"Priser"}]'
></elvia-breadcrumb>
```

**Input:** Application routing with no `href` values.

**Output:**

```html
<elvia-breadcrumb
  id="breadcrumb"
  items='[{"text":"Hjem"},{"text":"Nett"},{"text":"Priser"}]'
></elvia-breadcrumb>
```

```js
const breadcrumb = document.querySelector('#breadcrumb');
const paths = ['/', '/nett', '/nett/priser'];

breadcrumb.addEventListener('onLinkClick', (event) => {
  navigateTo(paths[event.detail.value]);
});
```

Replace `navigateTo` with the navigation method for your framework's router.
