- [Accordion (`<elvia-accordion>`)](#accordion-elvia-accordion)
  - [Reference](#reference)
  - [Installation](#installation)
  - [Use](#use)
  - [Attributes](#attributes)
    - [type](#type)
    - [isOpen](#isopen)
    - [content](#content)
    - [openLabel and closeLabel](#openlabel-and-closelabel)
    - [openAriaLabel and closeAriaLabel](#openarialabel-and-closearialabel)
    - [openDetailText and closeDetailText](#opendetailtext-and-closedetailtext)
    - [overflowHeight](#overflowheight)
    - [isFullWidth](#isfullwidth)
    - [isStartAligned](#isstartaligned)
    - [labelPosition](#labelposition)
    - [size and typography](#size-and-typography)
    - [spacingAboveContent and spacingBelowContent](#spacingabovecontent-and-spacingbelowcontent)
    - [isHovering](#ishovering)
  - [Guidelines](#guidelines)
    - [When to use](#when-to-use)
    - [When not to use](#when-not-to-use)
  - [Accessibility](#accessibility)
  - [Examples](#examples)

# Accordion (`<elvia-accordion>`)

## Reference

https://design.elvia.io/components/accordion

`<elvia-accordion>` is a web component.

## Installation

This web component requires the `@elvia/elvis-accordion` package. If it is not already installed, follow the
[Installation reference](./installation.md).

## Use

Use the default `normal` type for standard disclosure. For section-heading accordions, use the same concise
label in both states.

The component fires `onOpen` and `onClose` when the user opens or closes it. See the shared
[event conventions](./web-components.md#events).

Instances do not manage group state. To allow only one item in a group to be open, coordinate their `isOpen`
properties and events in the consuming application.

## Attributes

### type

The accordion variant: `normal` (default), `overflow`, or `single`.

- `normal` hides its content while closed and reveals it when opened. This is the recommended type for
  standard disclosure.
- `overflow` keeps content visible in a clipped area while closed; use it as a less common preview pattern.
- `single` renders only the toggle and rotating icon, with no visible label or content area. Use it to build a
  custom accordion with Elvia styling and open/close events.

### isOpen

Controls the open state. Defaults to `false`.

### content

The content shown by `normal` and `overflow`. For markup, provide an element in the `content` slot. The
`single` type does not render a content area.

### openLabel and closeLabel

Visible labels for the closed and open states, respectively. They may be the same or provided through matching
slots.

### openAriaLabel and closeAriaLabel

Override the button's accessible name in the closed and open states. Otherwise, visible labels or localized
`Open`/`Close` defaults are used. Set both for `single`, which has no visible label.

### openDetailText and closeDetailText

Optional detail text displayed alongside the label in the closed and open states, respectively.

### overflowHeight

The closed height, in pixels, of an `overflow` accordion's visible content preview.

### isFullWidth

A boolean that makes the `normal` button span the available width; it has no effect on `overflow` or `single`.

### isStartAligned

A boolean that places the icon before the label when the button is not full width.

### labelPosition

Positions the button within the available width: `left`, `center` (default), or `right`.

### size and typography

`size` sets the label and icon scale: `small`, `medium` (default), or `large`. `typography` optionally sets
the label typography to a name from the Elvia typography system.

### spacingAboveContent and spacingBelowContent

Set spacing to `8px`, `16px`, or `24px`. `spacingAboveContent` applies to content in the `normal` type;
`spacingBelowContent` applies to the `overflow` type.

### isHovering

A boolean that shows the filled hover icon while `true`.

## Guidelines

### When to use

- Organize related information.
- When you have a lot of content and the content is not important to always have available.
- Use `normal` for related supplementary content that can be opened independently.
- Use `overflow` only when a clipped preview of longer content is useful.
- Use `single` as the toggle for a separately implemented accordion when Elvia's icon and events are needed.

### When not to use

- Keep content visible when users need to compare it at once.
- `single` is not a complete disclosure; the consuming application must provide and manage its content.
- Don’t hide necessary and critical information to the user to complete their task in a accordion.
- Don’t use it for navigation elements.

## Accessibility

- The toggle is a native button and exposes its state with `aria-expanded`.
- Set `openAriaLabel` and `closeAriaLabel` when labels do not name the action; provide both for `single`.
- With `single`, the consuming application owns the custom panel's accessible structure and synchronization.

## Examples

**Input:** "Reveal billing details under a stable section label."

**Output:**

```html
<elvia-accordion openLabel="About billing" closeLabel="About billing">
  <div slot="content">Details about billing appear here when the accordion is open.</div>
</elvia-accordion>
```

**Input:** "Show a clipped preview of long content until it is opened."

**Output:**

```html
<elvia-accordion type="overflow" openLabel="Read more" closeLabel="Show less">
  <div slot="content">Long content with a visible preview.</div>
</elvia-accordion>
```

**Input:** "Build a custom filter panel with the Elvia toggle icon and events."

**Output:**

```html
<elvia-accordion
  id="toggle"
  type="single"
  openAriaLabel="Show filters"
  closeAriaLabel="Hide filters"
></elvia-accordion>
<div id="panel" hidden>Custom filter controls</div>

<script>
  const toggle = document.querySelector('#toggle');
  const panel = document.querySelector('#panel');

  toggle.addEventListener('onOpen', () => (panel.hidden = false));
  toggle.addEventListener('onClose', () => (panel.hidden = true));
</script>
```
