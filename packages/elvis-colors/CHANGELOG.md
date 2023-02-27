# Elvia Colors Changelog

## 1.7.0 (27.02.23)

### New feature

- Added new theme color labels for icon colors.

### Patch

- Added missing export for `getThemeColorContrast()`.

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
  with several new Typescript types related to theming.
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
