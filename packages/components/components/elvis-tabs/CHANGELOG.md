# Elvia Tabs Changelog

## 1.3.3 (23.03.22)

### Big fix

- Fixed an issue causing problems for events in non-React environments for props with falsy values. This
  update bumps the dependency on @elvia/elvis-component-wrapper.

## 1.3.2 (14.03.22)

### Patch

- Now building .scss files to .css for React users.

## 1.3.1 (04.03.22)

### Patch

- Now using correct type for webcomponent wrapper for better internal IntelliSense.

## 1.3.0 (25.02.22)

### New feature

- Added prop for manual activation of tabs. When using keyboard-navigation tabs will only be activated when
  the enter or space keys are hit.
- Added prop for aria-label: ariaLabel. Should usually be present to describe the tablist.

## 1.2.1 (18.02.22)

### Patch

- Now using elvis-icon package for internal icons.

## 1.2.0 (07.02.22)

### New feature

- Added inlineStyle and className props

## 1.1.5 (26.01.21)

- Updated dependencies

## 1.1.4 (06.12.21)

- Added unit tests for tabs

## 1.1.3 (30.11.21)

- Web component wrapper fix

## 1.1.0 (03.11.21)

### New features

- Added type declaration (for react)

## 1.0.4 (27.10.21)

- Add a general fade
- Remove margin when scroll is used
