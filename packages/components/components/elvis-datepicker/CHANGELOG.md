# Elvia Date picker Changelog

## 2.8.0 (18.03.22)

### New feature

- Added disableDate prop that allows disabling specific dates by sending in a function of the shape
  `(day: Date) => boolean` that is true for dates that should be disabled.

### Patch

- Now listening to changes on minDate and maxDate-props and updating validation when either changes.

## 2.7.2 (14.03.22)

### Patch

- Now building .scss files to .css for React users.

## 2.7.1 (04.03.22)

### Patch

- Now using correct type for webcomponent wrapper for better internal IntelliSense.

## 2.7.0 (02.03.22)

### New features

- New prop: showValidationState. If set to false, no internal validation will be shown on the datepicker. The
  prop customError has higher priority and will still set the datepicker as error state if it is provided.

## 2.6.0 (02.03.22)

### New features

- Several new props: isErrorState, hasValidation, clearButtonText, errorOnChange.
- A button to clear the selected date has been added inside the datepicker, and its text can be changed
  through the clearButtonText prop.
- The function errorOnChange is called every time the internal error of the datepicker is updated. This can be
  used for external error validation in conjunction with isErrorState and hasValidation.

### Bug fixes

- The datepicker input field is now given a green active state when the datepicker is open.
- The input placeholder is no longer possible to select.

## 2.5.2 (25.02.22)

### Patch

- Setting both 'isCompact' and 'isFullWidth' now gives compact and full width (i.e. width: 100%).

## 2.5.1 (18.02.22)

### Patch

- Now using elvis-icon package for internal icons.

## 2.5.0 (16.02.22)

### New feature

- Added showValidation prop to trigger showing errors if datepicker has not been in focus

## 2.4.0 (15.02.22)

### New feature

- Added hasOptionalText prop

## 2.3.0 (07.02.22)

### New feature

- Added inlineStyle and className props

## 2.2.4 (31.01.21)

- Updated dependencies

## 2.2.1 (26.01.22)

- Remove fixed width
- New props: placeholder and isOpen

## 2.1.0 (22.12.21)

- Fullwidth prop fix
- New prop: hasSelectDateOnOpen

## 2.0.2 (08.12.21)

- Added unit tests for datepicker

## 2.0.1 (30.11.21)

- Web component wrapper fix

## 2.0.0 (24.11.21)

### New feature

- Now sending events when no date, or invalid date, is selected

## 1.2.3 (17.11.21)

### Bug fix

- Reformated config file

## 1.2.2 (11.11.21)

### Bug fix

- Changed max width to match other input elements

## 1.2.0 (08.11.21)

### New features

- Added callback functions for both onOpen and onClose of datepicker

## 1.1.1 (05.11.21)

### Bug fixes

- Datepicker now has highest possible z-index so that it always lays on top of other components.

## 1.1.0 (03.11.21)

### New features

- Added type declaration (for react)

## 1.0.2 (08.06.21)

### Bug fixes

Updated red validation color to new elvia red (#EE0701)

## 1.0.0 (07.05.21)

First version of datepicker.
