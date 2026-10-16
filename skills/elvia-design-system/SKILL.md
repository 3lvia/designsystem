---
name: elvia-design-system
description: >
  Reference for UI components in Elvia's design system ("Elvis"). Covers component-specific guidelines for
  sizing, coloring, types, ordering, labeling, accessibility attributes, CSS setup, and web-component
  registration. Use when building, reviewing, or fixing UI in an Elvia frontend, even if the request doesn't
  name Elvia or the CSS classes explicitly (e.g. "add a save button", "make this icon bigger", "add a
  tooltip").
license: GPL-3.0-only
metadata:
  author: Elvia
  version: '0.1.0-alpha.11'
---

# Elvia Design System (Elvis)

Reference: https://design.elvia.io

## Areas

Load only the reference file(s) for the area being worked in, not the whole set.

- **Installation** `@elvia/elvis` package, global CSS registration and optional reset, and Elvis web-component
  installation and registration. See [installation.md](references/installation.md).
- **Web components** shared attribute and property behavior, case-insensitive attribute names, arrays and
  objects, and event shape and naming. See [web-components.md](references/web-components.md).

If no reference file exists for the requested component, fall back to general Elvia design principles from
https://design.elvia.io and note that no reference was available.

- **App Bridge** `<elvia-app-bridge>` web component, `@elvia/elvis-app-bridge` package, metering-point target,
  active apps, internal use only, routing, environments. See [app-bridge.md](references/app-bridge.md).
- **Accordion** `<elvia-accordion>` web component, normal disclosure, overflow preview, single toggle, labels,
  events, and accessibility. See [accordion.md](references/accordion.md).
- **Buttons** `e-btn` class, types, sizing, ordering, labeling. See [button.md](references/button.md).
- **Box** `<elvia-box>` element, `@elvia/elvis-box` package, content and heading slots, colored border. See
  [box.md](references/box.md).
- **Lists** `e-list` class, bullet, numbered, and icon markers, emphasis, and list semantics. See
  [list.md](references/list.md).
- **Links** `e-link` CSS class, navigation variants, sizing, labeling, and accessibility. See
  [link.md](references/link.md).
- **Icons** `<e-icon>` web component, `@elvia/elvis-icons`/`elvis-assets-icons`, sizing, coloring, accessible
  icon buttons. See [icon.md](references/icon.md).
- **Illustrations** `@elvia/elvis-illustrations` web components, per-illustration imports, and colors. See
  [illustrations.md](references/illustrations.md).
- **Checkboxes** `e-checkbox` class, sizing, states, grouping, and accessibility. See
  [checkbox.md](references/checkbox.md).
- **Toggle** `e-toggle` CSS class, on/off settings, sizing, state classes, and accessibility. See
  [toggle.md](references/toggle.md).
- **Radio buttons** `e-radio` CSS class, sizing, grouping, selection, and accessibility. See
  [radio-button.md](references/radio-button.md).
- **Header** `<elvia-header>` web component, `@elvia/elvis-header` package, user and app details, sidenav
  slots, events, and theme utility. See [header.md](references/header.md).
- **Modal** `<elvia-modal>` web component, `@elvia/elvis-modal` package, heading, content, buttons,
  illustration. See [modal.md](references/modal.md).
- **Progress linear** `<elvia-progress-linear>` web component, `@elvia/elvis-progress-linear` package,
  determinate and indeterminate progress, error state, sizing, and accessibility. See
  [progress-linear.md](references/progress-linear.md).
- **Popover** `<elvia-popover>` web component, `@elvia/elvis-popover` package, text and slotted content,
  placement, dismissal, and accessibility. See [popover.md](references/popover.md).
- **Tabs** `<elvia-tabs>` web component, `@elvia/elvis-tabs` package, items, selection, manual/automatic
  activation, overflow scrolling. See [tabs.md](references/tabs.md).
- **Tags** `e-tag` CSS class, categorization, status colors. See [tag.md](references/tag.md).
- **Typography** text hierarchy and available typography classes. See
  [typography.md](references/typography.md).
- **Tooltips** `<elvia-tooltip>` web component, `@elvia/elvis-tooltip` package, trigger and content slots,
  positioning. See [tooltip.md](references/tooltip.md).
