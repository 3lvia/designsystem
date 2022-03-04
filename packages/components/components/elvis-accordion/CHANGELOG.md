# Elvia Accordion Changelog

## 2.2.0 (04.03.22)

### New feature

- Added two new props: ariaLabelOpen and ariaLabelClose. By default the button to open/close the accordion
  will now have an aria-label corresponding to the openLabel/closeLabel props, however this can be overwritten
  with the new props. If no label is provided the aria-labels default to "Åpne" and "Lukk".

## 2.1.1 (18.02.22)

### Patch

- Now using elvis-icon package for internal icons.

## 2.1.0 (07.02.22)

### New feature

- Added inlineStyle and className props

## 2.0.10 (28.01.22)

### Patch

- Added aria-label for open/close button

## 2.0.9 (26.01.22)

### Patch

- Updated dependencies

## 2.0.8 (14.01.22)

### Patch

- Refactoring

## 2.0.7 (07.01.22)

### Patch

- Updated tokens declarations

## 2.0.6 (02.12.21)

### Patch

- Updated and added more tests

## 2.0.5 (30.11.21)

### Patch

- Now using elvis-colors package for colors.

## 2.0.4 (30.11.21)

- Web component wrapper fix

### Bug fix

- Improved type safety.

## 2.0.3 (17.11.21)

### Bug fix

- Improved type safety.

## 2.0.2 (06.09.21)

### Bug fix

- Defined color for accordion button, and set background to transparent to fix error on IOS15.

## 2.0.0 (06.09.21)

### Breaking changes

- Bug fixes for displaying of content in the accordion. This may change some of the accordion content layout.
- The web component accordion will now take up 100% width, this was the default in React. This might be
  breaking for some projects.

## 1.0.0 (09.04.21)

### New features

- First version of Accordion
