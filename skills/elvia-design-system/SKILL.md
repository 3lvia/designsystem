---
name: elvia-design-system
description: >
  Reference for UI components and patterns in Elvia's design system ("Elvis"). Covers component- and
  pattern-specific guidelines for sizing, coloring, types, ordering, labeling, accessibility attributes, CSS
  setup, and web-component registration. Use when building, reviewing, or fixing UI in an Elvia frontend, even
  if the request doesn't name Elvia or the CSS classes explicitly (e.g. "add a save button", "make this icon
  bigger", "add a tooltip").
license: GPL-3.0-only
metadata:
  author: Elvia
  version: '0.1.0-alpha.12'
---

# Elvia Design System (Elvis)

Reference: https://design.elvia.io

## Areas

Load only the reference file(s) for the area being worked in, not the whole set.

- **Installation** `@elvia/elvis` package, global CSS registration and optional reset, and Elvis web-component
  installation and registration. See [installation.md](references/installation.md).
- **Web components** shared attribute and property behavior, case-insensitive attribute names, arrays and
  objects, and event shape and naming. See [web-components.md](references/web-components.md).

If no reference file exists for the requested component or pattern, fall back to general Elvia design
principles from https://design.elvia.io and note that no reference was available.

- **App Bridge** `<elvia-app-bridge>` web component, `@elvia/elvis-app-bridge` package, metering-point target,
  active apps, internal use only, routing, environments. See [app-bridge.md](references/app-bridge.md).
- **Accordion** `<elvia-accordion>` web component, normal disclosure, overflow preview, single toggle, labels,
  events, and accessibility. See [accordion.md](references/accordion.md).
- **Alert** `e-alert` CSS class, local and global alerts, status icons, actions, accessibility, and Toast
  selection. See [alert.md](references/alert.md).
- **Autocomplete** `<elvia-autocomplete>` web component, `@elvia/elvis-autocomplete` package, free text,
  suggestions, filters, selection events, validation, and accessibility. See
  [autocomplete.md](references/autocomplete.md).
- **Badge** `<elvia-badge>` web component, `@elvia/elvis-badge` package, content slot, count, color,
  visibility, and accessibility. See [badge.md](references/badge.md).
- **Buttons** `e-btn` class, types, sizing, ordering, labeling. See [button.md](references/button.md).
- **Box** `<elvia-box>` element, `@elvia/elvis-box` package, content and heading slots, colored border. See
  [box.md](references/box.md).
- **Breadcrumb** `<elvia-breadcrumb>` web component, `@elvia/elvis-breadcrumb` package, hierarchy, routing,
  mobile behavior, and accessibility. See [breadcrumb.md](references/breadcrumb.md).
- **Card** `<elvia-card>` web component, `@elvia/elvis-card` package, simple and detail types, sizing,
  content, and accessibility. See [card.md](references/card.md).
- **Chip** `<elvia-chip>` web component, `@elvia/elvis-chip` package, removable, legend, and choice types,
  colors, images, selection, and accessibility. See [chip.md](references/chip.md).
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
- **Content Loader** `e-content-loader` CSS class, box, circle, and text variants, sizing, accessibility. See
  [content-loader.md](references/content-loader.md).
- **Context Menu** `<elvia-context-menu>` web component, `@elvia/elvis-context-menu` package, trigger and
  content slots, positions, selection, and accessibility. See [context-menu.md](references/context-menu.md).
- **Datepicker** `<elvia-datepicker>` web component, `@elvia/elvis-datepicker` package, date values, limits,
  disabled dates, automatic selection, time reset, validation, and accessibility. See
  [datepicker.md](references/datepicker.md).
- **Datepicker range** `<elvia-datepicker-range>` web component, `@elvia/elvis-datepicker-range` package,
  start and end values, [time pickers](references/timepicker.md), vertical layout, limits, disabled dates,
  validation, and accessibility. See [datepicker-range.md](references/datepicker-range.md).
- **Divider** `<elvia-divider>` web component, `@elvia/elvis-divider` package, divider types, heading slot,
  orientation, typography, and accessibility. See [divider.md](references/divider.md).
- **Drag and Drop** `e-dragdrop` CSS class, dimensions, dragover state. See
  [drag-and-drop.md](references/drag-and-drop.md).
- **Dropdown** `<elvia-dropdown>` web component, `@elvia/elvis-dropdown` package, nested items, search,
  multiple selections, status, validation, load-more behavior, and accessibility. See
  [dropdown.md](references/dropdown.md).
- **File Upload** `e-fileupload` CSS class, file input layout. See
  [file-upload.md](references/file-upload.md).
- **Form fields** `e-form-field` class, labels, feedback, and inline field layout. See
  [form-field.md](references/form-field.md).
- **Inputs** `e-input` class, sizing, states, suffixes, and validation. See [input.md](references/input.md).
- **Toggle** `e-toggle` CSS class, on/off settings, sizing, state classes, and accessibility. See
  [toggle.md](references/toggle.md).
- **Radio buttons** `e-radio` CSS class, sizing, grouping, selection, and accessibility. See
  [radio-button.md](references/radio-button.md).
- **Radio Filter** `<elvia-radio-filter>` web component, `@elvia/elvis-radio-filter` package, options,
  selection, icons, localization, and accessibility. See [radio-filter.md](references/radio-filter.md).
- **Header** `<elvia-header>` web component, `@elvia/elvis-header` package, user and app details, sidenav
  slots, events, and theme utility. See [header.md](references/header.md).
- **Modal** `<elvia-modal>` web component, `@elvia/elvis-modal` package, heading, content, buttons,
  illustration. See [modal.md](references/modal.md).
- **Pagination** `<elvia-pagination>` web component, `@elvia/elvis-pagination` package, page ranges, page-size
  options, labels, and accessibility. See [pagination.md](references/pagination.md).
- **Progress linear** `<elvia-progress-linear>` web component, `@elvia/elvis-progress-linear` package,
  determinate and indeterminate progress, error state, sizing, and accessibility. See
  [progress-linear.md](references/progress-linear.md).
- **Popover** `<elvia-popover>` web component, `@elvia/elvis-popover` package, text and slotted content,
  placement, dismissal, and accessibility. See [popover.md](references/popover.md).
- **Search pattern** instant and on-submit variants, clear button behavior, sizing, and accessibility. See
  [search-pattern.md](references/search-pattern.md).
- **Stepper** `<elvia-stepper>` web component, `@elvia/elvis-stepper` package, step content, progression,
  state, events, and accessibility. See [stepper.md](references/stepper.md).
- **Segmented Control** `<elvia-segmented-control>` web component, `@elvia/elvis-segmented-control` package,
  text and icon items, selection, sizing, keyboard navigation, and accessibility. See
  [segmented-control.md](references/segmented-control.md).
- **Tabs** `<elvia-tabs>` web component, `@elvia/elvis-tabs` package, items, selection, manual/automatic
  activation, overflow scrolling. See [tabs.md](references/tabs.md).
- **Tags** `e-tag` CSS class, categorization, status colors. See [tag.md](references/tag.md).
- **Thumbnail** `e-thumbnail` CSS class, image selection states, and accessibility. See
  [thumbnail.md](references/thumbnail.md).
- **Timepicker** `<elvia-timepicker>` web component, `@elvia/elvis-timepicker` package, time values, minute
  intervals, seconds, limits, automatic selection, validation, and accessibility. See
  [timepicker.md](references/timepicker.md).
- **Toast** `<elvia-toast>` web component, `@elvia/elvis-toast` package, single application root element,
  function options, status, dismissal, custom icons, and accessibility. See [toast.md](references/toast.md).
- **Typography** text hierarchy and available typography classes. See
  [typography.md](references/typography.md).
- **Tooltips** `<elvia-tooltip>` web component, `@elvia/elvis-tooltip` package, trigger and content slots,
  positioning. See [tooltip.md](references/tooltip.md).
