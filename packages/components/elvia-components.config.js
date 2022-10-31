/*
Include all props / attributes for the component here. The components are sorted alphabetically.
*** Callback functions does not need to be included in this config as they are triggered manually through elvis-component-wrapper.

###### Validation ######
This file is validated by validateConfig.js when building components

###### Contents  ######
name: string - Package name has to start with "elvis-"
elementName: string - Name of DOM element has to start with "elvia-"
attributes: object[] -
  attributes.name: string - name of supported attribute & property
  attributes.type: string -
  Only one type and one of the following is supported: string, number, object, Date, boolean
  Attributes on web components are always handled as strings. This value tells us what the components should parse the string
  value to. This is only to make it easier to use components without bindings value="".
  When using bindings ([value]="") the value is sent in as a property and not an attribute. We do not parse those.
  If you use type "object" we parse it with JSON.parse, which supports arrays as well.

reactName: string - The name of the component in React

useWrapper: boolean - If the React element should be injected into a wrapper instead of directly into the element.
In most cases this should be true, however sometimes we want to have more control over the styling of the custom element itself. 
In those cases removing that wrapper is useful. NB! The wrapper can not be removed if the component is using slots, because the 
slots will then not work in Vue.

slotItems: boolean (default: false) - Saves all "slot" items to variable. Should be set to true for all new components

reactTypescriptDeclaration: boolean (default: true) - Generate typescript declaration for the React component 
*/

module.exports = [
  {
    name: 'elvis-accordion',
    elementName: 'elvia-accordion',
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
    reactName: 'Accordion',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-badge',
    elementName: 'elvia-badge',
    attributes: [
      { name: 'badgeColor', type: 'string' },
      { name: 'count', type: 'number' },
      { name: 'content', type: 'string' },
    ],
    slotItems: true,
    reactName: 'Badge',
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-box',
    elementName: 'elvia-box',
    attributes: [
      { name: 'content', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'hasBorder', type: 'boolean' },
      { name: 'isColored', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'Box',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-breadcrumb',
    elementName: 'elvia-breadcrumb',
    attributes: [
      { name: 'breadcrumbs', type: 'object' }, // Remove when deprecation is final.
      { name: 'items', type: 'object' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'Breadcrumb',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-card',
    elementName: 'elvia-card',
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
    reactName: 'Card',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-carousel',
    elementName: 'elvia-carousel',
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
    reactName: 'Carousel',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-chip',
    elementName: 'elvia-chip',
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
    reactName: 'Chip',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-datepicker',
    elementName: 'elvia-datepicker',
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
    reactName: 'Datepicker',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-datepicker-range',
    elementName: 'elvia-datepicker-range',
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
    reactName: 'DatepickerRange',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-divider',
    elementName: 'elvia-divider',
    attributes: [
      { name: 'type', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'typography', type: 'string' },
      { name: 'isInverted', type: 'boolean' },
      { name: 'orientation', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    slotItems: true,
    reactName: 'Divider',
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-dropdown',
    elementName: 'elvia-dropdown',
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
    slotItems: false,
    reactName: 'Dropdown',
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-header',
    elementName: 'elvia-header',
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
    reactName: 'Header',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-icon',
    elementName: 'elvia-icon',
    attributes: [
      { name: 'name', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'customSize', type: 'string' },
    ],
    reactName: 'Icon',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-modal',
    elementName: 'elvia-modal',
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
    reactName: 'Modal',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-pagination',
    elementName: 'elvia-pagination',
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
    reactName: 'Pagination',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
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
    reactName: 'Popover',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      { name: 'value', type: 'number' },
      { name: 'isIndeterminate', type: 'boolean' },
      { name: 'isError', type: 'boolean' },
      { name: 'ariaValueText', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'ProgressLinear',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-radio-filter',
    elementName: 'elvia-radio-filter',
    attributes: [
      { name: 'name', type: 'string' },
      { name: 'items', type: 'object' },
      { name: 'value', type: 'string' },
      { name: 'ariaLabel', type: 'string' },
      { name: 'groupAriaLabel', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'RadioFilter',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-segmented-control',
    elementName: 'elvia-segmented-control',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'value', type: 'number' },
      { name: 'type', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'SegmentedControl',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-slider',
    elementName: 'elvia-slider',
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
    slotItems: false,
    reactName: 'Slider',
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-spotlight',
    elementName: 'elvia-spotlight',
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
    reactName: 'Spotlight',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'value', type: 'number' },
      { name: 'ariaLabel', type: 'string' },
      { name: 'isInverted', type: 'boolean' },
      { name: 'hasManualActivation', type: 'boolean' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'Tabs',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-timepicker',
    elementName: 'elvia-timepicker',
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
    reactName: 'Timepicker',
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-tooltip',
    elementName: 'elvia-tooltip',
    attributes: [
      { name: 'trigger', type: 'string' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'position', type: 'string' },
      { name: 'showDelay', type: 'number' },
      { name: 'content', type: 'string' },
      { name: 'className', type: 'string' },
      { name: 'inlineStyle', type: 'object' },
    ],
    reactName: 'Tooltip',
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
];
