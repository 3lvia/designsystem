- [Elvis Icons](#elvis-icons)
  - [Reference](#reference)
  - [Packages](#packages)
  - [Register](#register)
  - [Use](#use)
  - [Attributes](#attributes)
    - [Name](#name)
    - [Size](#size)
    - [Color](#color)
  - [Accessibility](#accessibility)

# Elvis Icons

## Reference

https://design.elvia.io/brand/icon

`<e-icon>` is a custom element (web component).

## Packages

These packages are required for the icon registry and tree-shakeable icon assets.

```
npm install @elvia/elvis-icons @elvia/elvis-assets-icons
```

- `@elvia/elvis-icons` — registry (`addIcons`, `<e-icon>` element)
- `@elvia/elvis-assets-icons` — tree-shakeable per-icon SVG exports

<details>
<summary>Old patterns (deprecated)</summary>

`@elvia/elvis-icon` (singular) and the `elvis.js`/`e-icon--NAME` class method are deprecated — they pull in
the whole icon set instead of tree-shaking. Only touch these if the codebase already relies on them.

</details>

## Register

```typescript
import { accessControl, addCircle } from '@elvia/elvis-assets-icons';
import { addIcons } from '@elvia/elvis-icons';

addIcons({
  accessControl: { svg: accessControl.getIcon() },
  addCircle: { svg: addCircle.getIcon() },
});
```

Each icon registered once app-wide, not per-component/feature — keep all registrations as one flat object
literal in the bootstrap file. `addIcons` merges by key, so re-registering the same name just overwrites it
silently (no error, no runtime guard needed); before adding a new entry, search the file for the key to avoid
a redundant duplicate line.

Referencing an unregistered icon `name` throws at render time (`Icon "X" not found...`) — if an icon isn't
showing, first check it's been registered, then check it hasn't been renamed/deprecated in a newer
`@elvia/elvis-assets-icons` version. After adding a new icon, verify it renders with no console error.

## Use

```html
<e-icon name="accessControl"></e-icon>
```

For state-driven icons, bind `name` reactively rather than duplicating the element per conditional branch.

## Attributes

### Name

`name` attribute is required. It must match a key in `addIcons()`.

### Size

`size` attribute, `xxs`: 8px, `xs` 16px, `sm` 24px, `md` 32px, `lg` 40px, `xl` 48px, `xxl` 56px.

```html
<e-icon name="accessControl" size="md"></e-icon>
```

### Color

Prefer the semantic color classes over picking a color manually:

```html
<e-icon name="chat" class="e-icon--color-default"></e-icon>
<e-icon name="chat" class="e-icon--color-disabled-1"></e-icon>
<!-- or -disabled-2 -->
<e-icon name="chat" class="e-icon--color-placeholder"></e-icon>
<e-icon name="informationCircle" class="e-icon--color-info"></e-icon>
<e-icon name="checkCircle" class="e-icon--color-positive"></e-icon>
<e-icon name="warningCircle" class="e-icon--color-warning"></e-icon>
<e-icon name="removeCircle" class="e-icon--color-error"></e-icon>
```

`-positive` (green) = hover/interactive & success; `-warning`/`-error` reserved for warnings/errors.

Two ways to set a custom color when no class matches — the choice depends on whether the color is fixed or
varies at runtime:

- **Fixed, same everywhere that icon key is used** → pass it to `getIcon()` at registration time (accepts a
  theme color label or a raw string). This bakes the color into every instance of that registered icon:

```typescript
addIcons({ download: { svg: download.getIcon('positive') } });
```

- **Varies per instance or by runtime state** (e.g. different color per row, or color driven by a value only
  known at render time) → override the CSS variable on that specific icon instead, since registration only
  happens once and can't react to per-instance state:

```css
--e-color-icon-stroke-1
--e-color-icon-filled-foreground-1
--e-color-icon-filled-background-1
--e-color-brand-accent
--e-color-icon-positive
--e-color-icon-caution
--e-color-icon-warning
--e-color-icon-danger
```

Static-color icon variants stay black/white in dark theme. Don't mix filled and outlined icons in the same
group.

## Accessibility

Icon's inner `<svg>` has `aria-hidden="true"` baked in. Don't add `aria-hidden` on `<e-icon>` yourself.

Icon next to visible text → nothing extra needed:

```html
<e-icon name="accessControl"></e-icon><span>Tilgangskontroll</span>
```

Icon-only button → use the button classes (read [./button.md](./button.md)) and put `aria-label` on the
`<button>`.

```html
<button class="e-btn e-btn--icon" aria-label="Slett">
  <span class="e-btn__icon">
    <e-icon name="bin"></e-icon>
  </span>
</button>
```

Disabled → use `disabled` attribute, `aria-label` stays:

```html
<button class="e-btn e-btn--icon" disabled aria-label="Slett">
  <span class="e-btn__icon">
    <e-icon name="bin"></e-icon>
  </span>
</button>
```

Loading → `e-btn--loading`, `aria-busy="true"`, `aria-live="polite"`:

```html
<button class="e-btn e-btn--icon e-btn--loading" aria-label="Laster opp" aria-live="polite" aria-busy="true">
  <span></span>
  <span></span>
  <span></span>
</button>
```

After adding any icon-only control, run/check axe to confirm it has an accessible name.
