# Elvia Typography Changelog

## 3.1.1 (05.09.24)

### Minor

- Removed "color: inherit" from all typographies.

## 3.1.0 (31.07.24)

### Minor

- All font-sizes and letter-spacing attributes are now defined in rem instead of px.

## 3.0.0 (18.06.24)

### Major

- Title xxs has updated font size from 15px -> 16px and line height of 120%. Body text medium has an updated
  line height of 160%. Text lead on mobile changed font size from 22px -> 20px.

## 2.7.1 (18.04.24)

### Patch

- Typography line heights are now defined relative to the font size, instead of being fixed values.

## 2.7.0 (07.11.23)

### New feature

- Added new typographies:
  - text-interactive (small, medium, and large).
  - text-mono (small, medium, and large).
  - Title xxsmall.
- Now using font weight 300 instead of a lighter text color for light typographies.

## 2.6.0 (05.10.23)

### New feature

- Now giving a console warning if a deprecated typography is used.

## 2.5.0 (29.08.23)

### New feature

- Dark theme support.

## 2.4.0 (26.05.23)

### New feature

- Now building and exporting both CommonJS and ESModule versions.

## 2.3.2 (09.03.23)

### Patch

- The line height for 'Text medium' typography on mobile has been adjusted to 160% from its previous value of
  175%.

## 2.3.1 (29.08.22)

### Patch

- Now generating up a Typescript union type for all the typography names.

## 2.3.0 (18.08.22)

### New feature

- All our typographies are now available through not only sm, md, lg etc. abbreviations, but also through the
  full size name; small, medium, large etc.

## 2.2.0 (23.05.22)

### New feature

- Expanded the build system and added a dist folder.
- Now generating the files needed to use this package as the source of typographies in Elvis.

## 2.1.0 (18.05.22)

### New feature

- Added function `getTypographyCss(typographyName)` that gets the CSS-formated text containing all the
  properties of a typography, including a media query breakpoint for the mobile typography.

## 2.0.0 (16.02.22)

### Major

- Title xs on mobiles has been updated font-size from 18px -> 16px. This is done so that the difference
  between title sm and xs i more distinct.

## 1.2.1 (08.02.22)

### Patch

- Updated README to document how to use package in Javascript/Typescript.

## 1.2.0 (07.11.21)

### New feature

- Added JSDoc documentation and better Typescript declarations.

## 1.1.1 (17.11.21)

### Bug fix

- Added font fallbacks
