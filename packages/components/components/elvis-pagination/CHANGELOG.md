# Elvia Pagination Changelog

## 2.0.3 (04.03.22)

### Patch

- Now using correct type for webcomponent wrapper for better internal IntelliSense.

## 2.0.2 (18.02.22)

### Patch

- Fixed issue where wrong selection number is calculated when the pagination component is initiated with
  different selectedDropdownItemIndex value than default.

## 2.0.1 (18.02.22)

### Patch

- Now using elvis-icon package for internal icons.

## 2.0.0 (18.02.22)

### Major

- Pagination prop "dropdownItemsDefaultIndex" has been renamed to "selectedDropdownItemIndex". We have also
  added a callback function for this value called "selectedDropdownItemIndexOnChange", that gets called
  everytime a value change occurs in the dropdown used within the pagination. Just replace prop name
  "dropdownItemsDefaultIndex" with the new name "selectedDropdownItemIndex" to fix any issues with the
  pagination.

## 1.3.0 (15.02.22)

### New feature

- Added prop to set defualt value in pagination dropdown

## 1.2.0 (07.02.22)

### New feature

- Added inlineStyle and className props

## 1.1.2 (28.01.22)

### Patch

- Added aria-labels to pagination arrow buttons

## 1.1.2 (26.01.22)

- Updated dependencies

## 1.1.1 (14.01.22)

### Patch

- Refactoring

## 1.1.0 (07.01.22)

### Feature

- Added support for max limit on last number. The 'lastNumberLimit' prop hides last number to jump to if the
  amount of items reaches the given limit.

### Bug fix

- Pagnination no longer shows two of the same numbers when items is less than option range.

## 1.0.8 (07.01.22)

### Patch

- Updated tokens declarations

## 1.0.7 (03.01.22)

### Patches

- Added unit tests.

## 1.0.6 (30.11.21)

### Patches

- Now using elvis-colors package for colors.
- Now using elvis-typography package for typography.

## 1.0.5 (30.11.21)

### Bug fix

- Web component wrapper fix

## 1.0.4 (29.11.21)

### Patch

- Pagination build with new wrapper version

## 1.0.3 (17.11.21)

### Bug fix

- Reformated config file

## 1.0.2 (1.11.21)

### Bug fix

- Fixed isRightAligned prop, now working again for web components

## 1.0.0 (21.09.21)

- First version of paginator.
