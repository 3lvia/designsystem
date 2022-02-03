# Elvia Popover Changelog

## 4.3.0 (03.02.22)

### New feature

- Added inlineStyle and className props

## 4.2.5 (28.01.22)

- Added aria-label for close button

## 4.2.4 (26.01.22)

- Updated dependencies

## 4.2.3 (10.12.21)

### Patch

- Added unit tests for popover

## 4.2.2 (30.11.21)

- Web component wrapper fix

## 4.2.1 (18.11.21)

### Bug fix

- Changed z-index

## 4.2.0 (03.11.21)

### New features

- Added type declaration (for react)

## 4.1.3 (16.09.21)

### Bug fixes

- Use display: none instead of visibility: hidden to remove white space created by the popover in application
  due to SSR.

## 4.1.2 (9.08.21)

### Bug fixes

- Bug-fix for slotting

## 4.1.0 (5.08.21)

### New features

- Added functionality for controlling opening and closing of the popover.

## 4.0.1

### Bug fixes

- Fixed right margin on popover content if scrollbar is visible.

## 4.0.0 (15.04.21)

### Major

- Popover now uses a fixed position enabling popovers to be used in containers with overflow attributes like
  auto or hidden. Due to the size of the changes and risk for complications we decided to version this update
  as a major. No changes are required for existing popovers to function.

## 3.0.0 (15.04.21)

### Bug fixes

- Trigger now only takes up the space of it's content and the popover is now displayed as block and not
  inline-block!

## 2.0.3 (09.04.21)

### Bug fixes

- Fix so that clicks inside and outside the popover works as expected in all scenarios.
- Outline bug fix.

## 2.0.0 (04.03.21)

### Bug fixes

- Popover safari box-sizing bug
- Popover without shadow dom

## 1.0.0 (03.02.21)

### New features

- First version of popover
