# Elvia Colors Changelog

## 4.1.0 (02.10.23)

### New feature

- New token `text-5` used for light black to dark black text.

## 4.0.0 (30.08.23)

### New feature

- New `dark-grey-60`with new hex value
- `dark-grey-60` -> `dark-grey-50`
- `dark-grey-50` -> `dark-grey-40`
- `dark-grey-40` -> `dark-grey-30`
- `background-overlay-1` now uses `dark-grey-60` instead of `dark-grey-70`

## 3.1.0 (29.08.23)

### New feature

- `background-element-6` added, used for headers

## 3.0.0 (25.08.23)

### Breaking changes

- Static category -> Assorted category (with no common prefix)
- `text-3` -> `text-placeholder-1`
- `signal-red` now has contrast color white instead of black
- Dark `grey-70` has gone from `#242424` to `#262626` to match `grey` in light theme.
- `background-3` uses dark `grey-70` instead of dark `grey`.
- Reworked icon tokens.
- Renamed `signal-success` -> `signal-positive`
- Renamed `signal-error` -> `signal-danger`

### New feature

- Building CSS variables and classes for tokens.
- Added support so that all `e-*--inverted` classes and the token `e-color-background-3` gives dark theme.
- Added new theme color label: `brand-accent`, `background-element-5`, `text-3`, `text-4`
- `getThemeColor` now return the inverted (dark theme) colors if `opts` `isInverted` is supplied and true.

## 2.7.1 (07.06.23)

### Patch

- Change dark grey-20 from #BDBDBD to #A1A1A1.
- `background-2` and `background-element-2` light theme colors have been changed from `grey-05` to `grey-02`

## 2.7.0 (01.06.23)

### New feature

- Added new theme color label: `border-6`.

## 2.6.0 (01.06.23)

### New feature

- `getThemeColor` and `getThemeColorContrast` now accepts labels with or without a `color-`-prefix.
- `getThemeColor` and `getThemeColorContrast` will now throw an error if a color (or contrast) is not found,
  instead of returning an empty string.

## 2.5.0 (26.05.23)

### New feature

- Now building and exporting both CommonJS and ESModule versions.

## 2.4.0 (23.05.23)

### New feature

- Added contrast colors to text colors.

## 2.3.0 (12.05.23)

### New feature

- Added `getBaseColor()` function that can be used to fetch the base token in custom cases.

## 2.2.0 (25.04.23)

### New feature

- Added new theme color label: `border-5`.

## 2.1.0 (25.04.23)

### New feature

- Added new theme color label: `background-element-4`.

## 2.0.0 (25.04.23)

### Breaking changes

- Updated the theme color labels to the new ones.
- Removed the `getColor()`. Use `getThemeColor()` or `getCustomThemeColor()` instead.
- Removed the old color object, as it has been replaced by the new theme functionality and theme color object.

### Patch

- Improved the types for `getShadow()`.

## 1.8.0 (09.03.23)

### New feature

- Added new theme color labels for icon colors.

### Patch

- Added missing export for `getThemeColorContrast()`.

## 1.7.0 (01.03.23)

### New feature

- Added functionality for getting shadows. This introduces a new function `getShadow()` that returns a
  css-variable that can be used to set box-shadow.
- Generating `elvisShadowMap.scss` with a scss-map of all the shadows for use in elvis.

## 1.6.0 (24.02.23)

### New feature

- Added new theme color labels: `background-overlay-strong`, `state-selected-grey`,
  `state-disabled-foreground`, `state-disabled-background`, `state-disabled-foreground-strong`,
  `state-disabled-background-strong`, `static-black`, and `static-white`.
- Updated color of `background-accent-strong` in dark theme.
- Now generating css variables for contrast colors for each theme color.
- Added new function `getThemeColorContrast()` to get the contrast color for a theme color label.

## 1.5.0 (30.01.23)

### New feature

- Added theme functionality. This introduces new functions `getThemeColor()` and `getCustomThemeColor()` along
  with several new Typescript types related to theme.
- Deprecated the function `getColor()`.

## 1.4.3 (01.12.22)

### Patch

- The Typescript union type for all the color names is no longer generated during build, instead it comes
  directly from Typescript.
- The package has been rewritten in Typescript.
- The build script is now written in Typescript.

## 1.4.2 (29.08.22)

### Patch

- Now generating up a Typescript union type for all the color names.

## 1.4.1 (11.05.22)

### Patch

- Added generation of scss file for elvis (colorMap.scss).

## 1.4.0 (10.05.22)

### New feature

- Expanded the build system and added a dist folder.

## 1.3.2 (03.05.22)

### Bug fix

- Fixed type declaration of colors object.

## 1.3.1 (08.04.22)

### Patch

- Converted from ES module (ESM) to CommonJS (CJS).

## 1.3.0 (08.04.22)

### New feature

- Improved support for IntelliSense when using `getColor()` and `getContrastText()`.

## 1.2.3 (23.03.22)

### Patch

- Now building the elviaColors.json and elviaColors.scss files from the elviaColors.js colors object using
  gulp.

### Bug fixes

- Fixed the RGB value on signal color yellow.

## 1.2.2 (08.03.22)

### Patch

- Updated color alt-labels to correspond with the Colors documentation on design.elvia.io.

## 1.2.1 (19.01.22)

### Patch

- Updated README to explain how to use the package in Typescript/Javascript.

## 1.2.0 (07.01.22)

### New feature

- Added JSDoc documentation and better Typescript declarations.

## 1.1.0 (29.11.21)

### New feature

- Added new helper functions to get color hex value and contrast text from color label or alt-text.
