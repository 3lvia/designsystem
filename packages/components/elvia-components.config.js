/*
Include all props / attributes for the component here. The components are sorted alphabetically.
*** Callback functions does not need to be included in this config as they are triggered manually through elvis-component-wrapper.

###### Validation ######
This file is validated by validateConfig.js when building components

###### Contents  ######
elementName: string - Name of DOM element has to start with "elvia-"
reactName: string - The name of the component in React
attributes: object[] -
  attributes.name: string - name of supported attribute & property
  attributes.type: string -
  Only one type and one of the following is supported: string, number, object, Date, boolean
  Attributes on web components are always handled as strings. This value tells us what the components should parse the string
  value to. This is only to make it easier to use components without bindings value="".
  When using bindings ([value]="") the value is sent in as a property and not an attribute. We do not parse those.
  If you use type "object" we parse it with JSON.parse, which supports arrays as well.
*/

module.exports = [
  {
    elementName: 'elvia-accordion',
    reactName: 'Accordion',
    attributes: [
      { name: 'content', type: 'string' },
      { name: 'isOpen', type: 'boolean' },
      { name: 'isHovering', type: 'boolean' },
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'openLabel', type: 'string' },
      { name: 'closeLabel', type: 'string' },
      { name: 'openDetailText', type: 'string' },
      { name: 'closeDetailText', type: 'string' },
      { name: 'openAriaLabel', type: 'string' },
      { name: 'closeAriaLabel', type: 'string' },
      { name: 'isStartAligned', type: 'boolean' },
      { name: 'hasBoldLabel', type: 'boolean' },
      { name: 'labelPosition', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'spacingAboveContent', type: 'string' },
      { name: 'spacingBelowContent', type: 'string' },
      { name: 'typography', type: 'string' },
      { name: 'overflowHeight', type: 'number' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-badge',
    reactName: 'Badge',
    attributes: [
      { name: 'badgeColor', type: 'string' },
      { name: 'count', type: 'number' },
      { name: 'content', type: 'string' },
    ],
  },
  {
    elementName: 'elvia-box',
    reactName: 'Box',
    attributes: [
      { name: 'content', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'hasBorder', type: 'boolean' },
      { name: 'isColored', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-breadcrumb',
    reactName: 'Breadcrumb',
    attributes: [
      { name: 'breadcrumbs', type: 'object' }, // Remove when deprecation is final.
      { name: 'items', type: 'object' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-card',
    reactName: 'Card',
    attributes: [
      { name: 'icon', type: 'string' },
      { name: 'iconHover', type: 'string' },
      { name: 'header', type: 'string' }, // Deprecated
      { name: 'heading', type: 'string' },
      { name: 'headingLevel', type: 'string' },
      { name: 'description', type: 'string' },
      { name: 'borderColor', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'shape', type: 'string' }, // Deprecated
      { name: 'hasBorder', type: 'boolean' },
      { name: 'width', type: 'string' },
      { name: 'minWidth', type: 'number' },
      { name: 'maxWidth', type: 'number' },
      { name: 'maxDescriptionLines', type: 'number' },
      { name: 'label', type: 'string' }, // Deprecated
      { name: 'tag', type: 'string' },
      { name: 'cornerIcon', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-carousel',
    reactName: 'Carousel',
    attributes: [
      { name: 'elements', type: 'string' }, // TODO: Remove when deprecation is final.
      { name: 'items', type: 'string' },
      { name: 'hideArrows', type: 'boolean' }, // TODO: Remove when deprecation is final.
      { name: 'loop', type: 'boolean' },
      { name: 'useOnboardingCheckmark', type: 'boolean' }, // TODO: Remove when deprecation is final.
      { name: 'hasConfirmationCheckmark', type: 'boolean' },
      { name: 'hasAnimation', type: 'boolean' },
      { name: 'value', type: 'number' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-chip',
    reactName: 'Chip',
    attributes: [
      { name: 'ariaLabel', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'type', type: 'string' },
      { name: 'isLoading', type: 'boolean' },
      { name: 'isSelected', type: 'boolean' },
      { name: 'value', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-datepicker',
    reactName: 'Datepicker',
    attributes: [
      { name: 'value', type: 'Date' },
      { name: 'label', type: 'string' },
      { name: 'isCompact', type: 'boolean' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'isRequired', type: 'boolean' },
      { name: 'hasSelectDateOnOpen', type: 'boolean' },
      { name: 'errorOptions', type: 'object' },
      { name: 'minDate', type: 'Date' },
      { name: 'maxDate', type: 'Date' },
      { name: 'placeholder', type: 'string' },
      { name: 'isOpen', type: 'boolean' },
      { name: 'hasOptionalText', type: 'boolean' },
      { name: 'clearButtonText', type: 'string' },
      { name: 'disableDate', type: 'function' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-datepicker-range',
    reactName: 'DatepickerRange',
    attributes: [
      { name: 'value', type: 'object' },
      { name: 'labelOptions', type: 'object' },
      { name: 'isCompact', type: 'boolean' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'isRequired', type: 'object' },
      { name: 'isVertical', type: 'object' },
      { name: 'hasSelectDateOnOpen', type: 'boolean' },
      { name: 'errorOptions', type: 'object' },
      { name: 'hasAutoOpenEndDatepicker', type: 'boolean' },
      { name: 'minDate', type: 'Date' },
      { name: 'maxDate', type: 'Date' },
      { name: 'disableDates', type: 'function' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-divider',
    reactName: 'Divider',
    attributes: [
      { name: 'type', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'typography', type: 'string' },
      { name: 'isInverted', type: 'boolean' },
      { name: 'orientation', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-dropdown',
    reactName: 'Dropdown',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'options', type: 'object' }, // DEPRECATED
      { name: 'value', type: 'object' },
      { name: 'defaultValue', type: 'object' }, // DEPRECATED
      { name: 'isCompact', type: 'boolean' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'isMulti', type: 'boolean' },
      { name: 'isSearchable', type: 'boolean' },
      { name: 'hasSelectAllOption', type: 'boolean' },
      { name: 'selectAllOption', type: 'object' },
      { name: 'allOptionsSelectedLabel', type: 'string' },
      { name: 'errorMessage', type: 'string' },
      { name: 'label', type: 'string' },
      { name: 'menuPosition', type: 'string' },
      { name: 'noOptionsMessage', type: 'string' },
      { name: 'placeholder', type: 'string' },
      { name: 'placeholderIcon', type: 'string' },
      { name: 'hasLoadMoreItemsButton', type: 'boolean' },
      { name: 'isLoadingMoreItems', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-header',
    reactName: 'Header',
    attributes: [
      { name: 'appTitle', type: 'string' },
      { name: 'pageTitle', type: 'string' },
      { name: 'navItems', type: 'string' },
      { name: 'username', type: 'string' },
      { name: 'email', type: 'string' },
      { name: 'appContent', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-icon',
    reactName: 'Icon',
    attributes: [
      { name: 'name', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'customSize', type: 'string' },
    ],
  },
  {
    elementName: 'elvia-modal',
    reactName: 'Modal',
    attributes: [
      { name: 'isShowing', type: 'boolean' },
      { name: 'title', type: 'string' }, // Deprecated
      { name: 'heading', type: 'string' },
      { name: 'content', type: 'string' },
      { name: 'illustration', type: 'string' },
      { name: 'primaryButton', type: 'string' },
      { name: 'secondaryButton', type: 'string' },
      { name: 'hasCloseBtn', type: 'boolean' }, // Deprecated
      { name: 'hasCloseButton', type: 'boolean' },
      { name: 'hasLockBodyScroll', type: 'boolean' },
      { name: 'hasPadding', type: 'boolean' },
      { name: 'disableClose', type: 'boolean' },
      { name: 'maxWidth', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-pagination',
    reactName: 'Pagination',
    attributes: [
      { name: 'value', type: 'object' },
      { name: 'numberOfElements', type: 'number' },
      { name: 'lastNumberLimit', type: 'number' },
      { name: 'dropdownMenuPos', type: 'string' }, // Deprecated
      { name: 'selectedDropdownItemIndex', type: 'number' }, // Deprecated
      { name: 'isRightAligned', type: 'boolean' }, // Deprecated
      { name: 'dropdownItems', type: 'object' },
      { name: 'labelDisplaying', type: 'string' }, // Deprecated
      { name: 'label', type: 'string' }, // Deprecated
      { name: 'labelOf', type: 'string' }, // Deprecated
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
      { name: 'labelOptions', type: 'object' },
      { name: 'alignment', type: 'string' },
      { name: 'dropdownMenuPosition', type: 'string' },
      { name: 'dropdownSelectedItemIndex', type: 'number' },
    ],
  },
  {
    elementName: 'elvia-popover',
    reactName: 'Popover',
    attributes: [
      { name: 'header', type: 'string' }, // DEPRECATED SINCE 5.0.0
      { name: 'heading', type: 'string' }, // DEPRECATED SINCE 5.0.0
      { name: 'content', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'selectable', type: 'boolean' }, // DEPRECATED SINCE 5.0.0
      { name: 'isSelectable', type: 'boolean' },
      { name: 'hasDivider', type: 'boolean' },
      { name: 'posX', type: 'string' }, // DEPRECATED SINCE 5.0.0
      { name: 'posY', type: 'string' }, // DEPRECATED SINCE 5.0.0
      { name: 'horizontalPosition', type: 'string' },
      { name: 'verticalPosition', type: 'string' },
      { name: 'trigger', type: 'string' },
      { name: 'hasCloseBtn', type: 'boolean' }, // DEPRECATED SINCE 5.0.0
      { name: 'hasCloseButton', type: 'boolean' },
      { name: 'isShowing', type: 'boolean' },
      { name: 'disableAutoClose', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-progress-linear',
    reactName: 'ProgressLinear',
    attributes: [
      { name: 'value', type: 'number' },
      { name: 'isIndeterminate', type: 'boolean' },
      { name: 'isError', type: 'boolean' },
      { name: 'ariaValueText', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-radio-filter',
    reactName: 'RadioFilter',
    attributes: [
      { name: 'name', type: 'string' },
      { name: 'items', type: 'object' },
      { name: 'value', type: 'string' },
      { name: 'ariaLabel', type: 'string' },
      { name: 'groupAriaLabel', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-segmented-control',
    reactName: 'SegmentedControl',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'value', type: 'number' },
      { name: 'type', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-slider',
    reactName: 'Slider',
    attributes: [
      { name: 'className', type: 'string' },
      { name: 'hasHintValues', type: 'boolean' },
      { name: 'hasInputField', type: 'boolean' },
      { name: 'hasPercent', type: 'boolean' },
      { name: 'hasTooltip', type: 'boolean' },
      { name: 'inlineStyle', type: 'object' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'label', type: 'string' },
      { name: 'max', type: 'number' },
      { name: 'min', type: 'number' },
      { name: 'type', type: 'string' },
      { name: 'unit', type: 'string' },
      { name: 'value', type: 'number' },
    ],
  },
  {
    elementName: 'elvia-spotlight',
    reactName: 'Spotlight',
    attributes: [
      { name: 'position', type: 'object' },
      { name: 'shape', type: 'string' },
      { name: 'radius', type: 'number' },
      { name: 'rectangleProps', type: 'object' },
      { name: 'hasLockBodyScroll', type: 'boolean' },
      { name: 'transitionDuration', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-tabs',
    reactName: 'Tabs',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'value', type: 'number' },
      { name: 'ariaLabel', type: 'string' },
      { name: 'isInverted', type: 'boolean' },
      { name: 'hasManualActivation', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-timepicker',
    reactName: 'Timepicker',
    attributes: [
      { name: 'value', type: 'Date' },
      { name: 'minuteInterval', type: 'string' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isCompact', type: 'boolean' },
      { name: 'isRequired', type: 'boolean' },
      { name: 'errorOptions', type: 'object' },
      { name: 'selectNowOnOpen', type: 'boolean' },
      { name: 'label', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
  {
    elementName: 'elvia-tooltip',
    reactName: 'Tooltip',
    attributes: [
      { name: 'trigger', type: 'string' },
      { name: 'display', type: 'string' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'position', type: 'string' },
      { name: 'showDelay', type: 'number' },
      { name: 'content', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
  },
];
