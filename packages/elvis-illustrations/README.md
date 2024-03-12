# Elvis Illustrations library

This package provides Elvia illustrations as web components, where each illustration is provided as a separate
export from the package.

## How to use

To use an illustration, follow these steps:

1. Install the package (e.g. `npm add @elvia/elvis-illustrations`). Must be done one time.
2. Import an illustration (e.g. `import '@elvia/elvis-illustrations/no-connection';`). Must be done _one time
   per illustration_, ideally in an `index.ts`-file.
3. Use the illustration in your HTML template. Its tag name is `<elvia-illustrations-ILLUSTRATION-NAME>`.

The custom element has one prop: `color`. It can be `purple`, `green`, `blue`, or `orange`. The default color
is `grey`.

## Add or update illustrations

The `.svg`-files in `src/illustrations` are the source for all built illustration web components. To add a new
illustration, follow these steps:

1. Export the SVG from Figma. It is recommended to include layer IDs, as they may be helpful in seeing what
   color label to use for the different parts.
2. Make sure the file name is in the correct format. The final illustration web component will be named after
   the `.svg`-file. It should consist of lower-case letters and hyphens (i.e. `no-connection`, not
   `No Connection`).
3. Replace all `fill/stroke` values with their corresponding CSS variables. See the section below for
   available variables.
4. Build the package and see that the new illustration is exported into the `dist`-folder, and check that it
   works in both light and dark theme.

## Available CSS variables

These values can be used to set colors in the `.svg`-files. They should include the fallback values.

```css
var(--main-1, #262626)
var(--main-2, #FFFFFF)
var(--main-3, #262626)
var(--main-4, #FFFFFF)
var(--main-5, #29D305)
var(--main-5--contrast, #000000)

var(--shade-1, #F4F4F4)
var(--shade-2, #E9E9E9)
var(--shade-3, #D3D3D3)
var(--shade-4, #BDBDBD)

var(--background-1, #E9E9E9)
```

If more variables are needed, they may be added to the `build/colors.css`-file, and added to this list.
