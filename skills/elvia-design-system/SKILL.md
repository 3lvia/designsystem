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
  version: '0.1.0-alpha.3'
---

# Elvia Design System (Elvis)

Reference: https://design.elvia.io

## Areas

Load only the reference file(s) for the area being worked in, not the whole set.

- **Installation** `@elvia/elvis` package, global CSS registration and optional reset, and Elvis web-component
  installation and registration. See [installation.md](references/installation.md).

If no reference file exists for the requested component, fall back to general Elvia design principles from
https://design.elvia.io and note that no reference was available.

- **App Bridge** `<elvia-app-bridge>` web component, `@elvia/elvis-app-bridge` package, metering-point target,
  active apps, internal use only, routing, environments, accessibility. See
  [app-bridge.md](references/app-bridge.md).
- **Icons** `<e-icon>` web component, `@elvia/elvis-icons`/`elvis-assets-icons`, sizing, coloring, accessible
  icon buttons. See [icon.md](references/icon.md).
- **Buttons** `e-btn` class, `@elvia/elvis` CSS library, types, sizing, ordering, labeling, accessibility. See
  [button.md](references/button.md).
- **Tooltips** `<elvia-tooltip>` web component, `@elvia/elvis-tooltip` package, trigger and content slots,
  positioning, accessibility. See [tooltip.md](references/tooltip.md).
