---
name: elvia-design-system
description: >
  Reference for UI components in Elvia's design system ("Elvis"). Includes icons (`e-icon`,
  `@elvia/elvis-icons`), buttons (`e-btn`, `@elvia/elvis`), and other components as they're added (see
  references/ for the full list). Covers component-specific guidelines for sizing, coloring, types, ordering,
  labeling, accessibility attributes, CSS setup, and web-component registration. Use when building, reviewing,
  or fixing UI in an Elvia frontend, even if the request doesn't name Elvia or the CSS classes explicitly
  (e.g. "add a save button", "make this icon bigger", "add a tooltip").
license: GPL-3.0-only
metadata:
  author: Elvia
  version: '0.1.0-alpha.1'
---

# Elvia Design System (Elvis)

Reference: https://design.elvia.io

## Areas

Load only the reference file(s) for the area being worked in, not the whole set.

- **Installation** `@elvia/elvis` package, global CSS registration and optional reset, and Elvis web-component
  installation and registration. See [installation.md](references/installation.md).

If no reference file exists for the requested component, fall back to general Elvia design principles from
https://design.elvia.io and note that no reference was available.

- **Icons** `e-icon` element, `@elvia/elvis-icons`/`elvis-assets-icons`, sizing, coloring, accessible icon
  buttons. See [icon.md](references/icon.md).
- **Buttons** `e-btn` class, `@elvia/elvis` CSS library, types, sizing, ordering, labeling, accessibility. See
  [button.md](references/button.md).
