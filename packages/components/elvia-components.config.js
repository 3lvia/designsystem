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

  attributes.propType: string -
  We allow propType to contain the actually allowed properties by the react component written in a typescript way:
  "string | number | HTMLElement | Date | object" etc.

reactName: string - The name of the component in React
elementStyle: string - Styling for the DOM element (web component HTMLElement) itself

dependentStyleSheet: If the component depends on the style sheet from another component when used as a web component, the path
to the style sheet is added here. E.g. '@elvia/elvis-datepicker/src/react/style.scss'. It will be added to the style tag
of the web component.

useWrapper: boolean - If the React element should be injected into a wrapper instead of directly into the element.
In most cases this should be true, however sometimes we want to have more control over the styling of the custom element itself. 
In those cases removing that wrapper is useful. NB! The wrapper can not be removed if the component is using slots, because the 
slots will then not work in Vue.

wrapperStyle: string - Styling for the React wrapper (the div wrapper inside the web component, when using 'useWrapper'
- This requires useWrapper to be true.

slotItems: boolean (default: false) - Saves all "slot" items to variable. Should be set to true for all new components

conditionalElementStyle: object - An object containing a key value pair for different CSS styles following the
javascript naming of the different CSS styles

reactTypescriptDeclaration: boolean (default: true) - Generate typescript declaration for the React component 
*/

module.exports = [
  {
    name: 'elvis-accordion',
    elementName: 'elvia-accordion',
    attributes: [
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
      { name: 'isOpen', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isHovering', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'openLabel', type: 'string', propType: 'string | undefined' },
      { name: 'closeLabel', type: 'string', propType: 'string | undefined' },
      { name: 'openDetailText', type: 'string', propType: 'string | undefined' },
      { name: 'closeDetailText', type: 'string', propType: 'string | undefined' },
      { name: 'openAriaLabel', type: 'string', propType: 'string | undefined' },
      { name: 'closeAriaLabel', type: 'string', propType: 'string | undefined' },
      { name: 'isStartAligned', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasBoldLabel', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'labelPosition', type: 'string', propType: 'string' },
      { name: 'size', type: 'string', propType: 'string' },
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'spacingAboveContent', type: 'string', propType: 'string' },
      { name: 'spacingBelowContent', type: 'string', propType: 'string' },
      { name: 'typography', type: 'string', propType: 'string' },
      { name: 'overflowHeight', type: 'number', propType: 'number | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Accordion',
    useWrapper: true,
    slotItems: true,
    elementStyle: 'width: 100%;',
    conditionalElementStyle: [{ name: 'type', value: 'single', style: `width: auto;` }],
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-badge',
    elementName: 'elvia-badge',
    attributes: [
      { name: 'badgeColor', type: 'string', propType: 'string | undefined' },
      { name: 'count', type: 'number', propType: 'number | string | undefined' },
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
    ],
    slotItems: true,
    reactName: 'Badge',
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-box',
    elementName: 'elvia-box',
    attributes: [
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
      { name: 'title', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'hasBorder', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isColored', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Box',
    useWrapper: true,
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-breadcrumb',
    elementName: 'elvia-breadcrumb',
    attributes: [
      { name: 'breadcrumbs', type: 'object', propType: 'object' }, // Remove when deprecation is final.
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Breadcrumb',
    useWrapper: false,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-card',
    elementName: 'elvia-card',
    attributes: [
      { name: 'icon', type: 'string', propType: 'string | HTMLElement' },
      { name: 'iconHover', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'header', type: 'string', propType: 'string' },
      { name: 'description', type: 'string', propType: 'string | undefined' },
      { name: 'borderColor', type: 'string', propType: 'string | undefined' },
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'shape', type: 'string', propType: 'string' },
      { name: 'hasBorder', type: 'boolean', propType: 'boolean' },
      { name: 'width', type: 'string', propType: 'string' },
      { name: 'minWidth', type: 'number', propType: 'number | undefined' },
      { name: 'maxWidth', type: 'number', propType: 'number | undefined' },
      { name: 'maxDescriptionLines', type: 'number', propType: 'number' },
      { name: 'label', type: 'string', propType: 'string | undefined' },
      { name: 'cornerIcon', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Card',
    useWrapper: true,
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-carousel',
    elementName: 'elvia-carousel',
    attributes: [
      { name: 'elements', type: 'string', propType: 'number | string | HTMLElement' }, // TODO: Remove when deprecation is final.
      { name: 'items', type: 'string', propType: 'number | string | HTMLElement' },
      { name: 'hideArrows', type: 'boolean', propType: 'boolean | undefined' }, // TODO: Remove when deprecation is final.
      { name: 'loop', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'useOnboardingCheckmark', type: 'boolean', propType: 'boolean | undefined' }, // TODO: Remove when deprecation is final.
      { name: 'hasConfirmationCheckmark', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasAnimation', type: 'boolean', propType: 'boolean' },
      { name: 'value', type: 'number', propType: 'number | undefined' },
      { name: 'className', type: 'string', propType: 'string' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Carousel',
    slotItems: true,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-chip',
    elementName: 'elvia-chip',
    attributes: [
      { name: 'ariaLabel', type: 'string', propType: 'string | undefined' },
      { name: 'color', type: 'string', propType: 'string | undefined' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'type', type: 'string', propType: 'string | undefined' },
      { name: 'isLoading', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isSelected', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'value', type: 'string', propType: 'string' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Chip',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-datepicker',
    elementName: 'elvia-datepicker',
    attributes: [
      { name: 'value', type: 'Date', propType: 'Date | null | undefined' },
      { name: 'label', type: 'string', propType: 'string | undefined' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isRequired', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasSelectDateOnOpen', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'customError', type: 'string', propType: 'string | undefined' },
      { name: 'minDate', type: 'Date', propType: 'Date | undefined' },
      { name: 'maxDate', type: 'Date', propType: 'Date | undefined' },
      { name: 'placeholder', type: 'string', propType: 'string | undefined' },
      { name: 'isOpen', type: 'boolean', propType: 'boolean' },
      { name: 'hasOptionalText', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'showValidation', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'showValidationState', type: 'boolean', propType: 'boolean' },
      { name: 'clearButtonText', type: 'string', propType: 'string' },
      { name: 'isErrorState', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasValidation', type: 'boolean', propType: 'boolean' },
      { name: 'disableDate', type: 'function', propType: '(Date) => boolean | undefined' },
      { name: 'resetTime', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Datepicker',
    elementStyle: 'display: block; max-width: 448px;',
    conditionalElementStyle: [{ name: 'isFullWidth', value: 'true', style: `width: 100%; max-width:unset;` }],
    useWrapper: true,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-datepicker-range',
    elementName: 'elvia-datepicker-range',
    attributes: [
      { name: 'value', type: 'object', propType: 'object | undefined' },
      { name: 'labelOptions', type: 'object', propType: 'object | undefined' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isRequired', type: 'object', propType: 'object | undefined' },
      { name: 'isVertical', type: 'object', propType: 'object | undefined' },
      { name: 'hasSelectDateOnOpen', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasAutoOpenEndDatepicker', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'showValidationState', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isErrorState', type: 'object', propType: 'object | undefined' },
      { name: 'customError', type: 'object', propType: 'object | undefined' },
      { name: 'hasErrorPlaceholderElement', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'minDate', type: 'Date', propType: 'Date | undefined' },
      { name: 'maxDate', type: 'Date', propType: 'Date | undefined' },
      { name: 'disableDates', type: 'function', propType: 'object | undefined' },
      { name: 'resetTime', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'DatepickerRange',
    elementStyle: 'display: block;',
    conditionalElementStyle: [{ name: 'isFullWidth', value: 'true', style: `width: 100%` }],
    dependentStyleSheets: ['@elvia/elvis-datepicker/src/react/style.scss'],
    useWrapper: true,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-divider',
    elementName: 'elvia-divider',
    attributes: [
      { name: 'type', type: 'string', propType: 'string | undefined' },
      { name: 'title', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'typography', type: 'string', propType: 'string | undefined' },
      { name: 'isInverted', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'orientation', type: 'string', propType: 'string | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    slotItems: true,
    reactName: 'Divider',
    conditionalElementStyle: [
      { name: 'orientation', value: 'horizontal', style: `width: 100%;` },
      { name: 'orientation', value: undefined, style: `width: 100%;` },
      { name: 'orientation', value: 'vertical', style: `height: 100%` },
    ],
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-dropdown',
    elementName: 'elvia-dropdown',
    attributes: [
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'options', type: 'object', propType: 'object' }, // DEPRECATED
      { name: 'value', type: 'object', propType: 'object | undefined' },
      { name: 'defaultValue', type: 'object', propType: 'object | undefined' }, // DEPRECATED
      { name: 'isCompact', type: 'boolean', propType: 'boolean' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean' },
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isMulti', type: 'boolean', propType: 'boolean' },
      { name: 'isSearchable', type: 'boolean', propType: 'boolean' },
      { name: 'hasSelectAllOption', type: 'boolean', propType: 'boolean' },
      { name: 'selectAllOption', type: 'object', propType: 'object | undefined' },
      { name: 'allOptionsSelectedLabel', type: 'string', propType: 'string | undefined' },
      { name: 'errorMessage', type: 'string', propType: 'string | undefined' },
      { name: 'label', type: 'string', propType: 'string | undefined' },
      { name: 'menuPosition', type: 'string', propType: 'string | undefined' },
      { name: 'noOptionsMessage', type: 'string', propType: 'string | undefined' },
      { name: 'placeholder', type: 'string', propType: 'string | undefined' },
      { name: 'placeholderIcon', type: 'string', propType: 'string | undefined' },
      { name: 'hasLoadMoreItemsButton', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isLoadingMoreItems', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    slotItems: false,
    elementStyle: 'max-width: 448px; width: 100%; display: block;',

    conditionalElementStyle: [
      { name: 'isFullWidth', value: 'true', style: `width: 100%; max-width: unset;` },
    ],

    reactName: 'Dropdown',
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-header',
    elementName: 'elvia-header',
    attributes: [
      { name: 'appTitle', type: 'string', propType: 'string' },
      { name: 'pageTitle', type: 'string', propType: 'string | HTMLElement' },
      { name: 'navItems', type: 'string', propType: 'string | HTMLElement' },
      { name: 'username', type: 'string', propType: 'string' },
      { name: 'email', type: 'string', propType: 'string' },
      { name: 'appContent', type: 'string', propType: 'string | HTMLElement' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Header',
    slotItems: true,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-icon',
    elementName: 'elvia-icon',
    attributes: [
      { name: 'name', type: 'string', propType: 'string' },
      { name: 'color', type: 'string', propType: 'string | undefined' },
      { name: 'size', type: 'string', propType: 'string | undefined' },
      { name: 'customSize', type: 'string', propType: 'string | undefined' },
    ],
    reactName: 'Icon',
    slotItems: false,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-modal',
    elementName: 'elvia-modal',
    attributes: [
      { name: 'isShowing', type: 'boolean', propType: 'boolean' },
      { name: 'title', type: 'string', propType: 'string | undefined' }, // Deprecated
      { name: 'heading', type: 'string', propType: 'string | undefined' },
      { name: 'content', type: 'string', propType: 'HTMLElement' },
      { name: 'illustration', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'primaryButton', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'secondaryButton', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean | undefined' }, // Deprecated
      { name: 'hasCloseButton', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasLockBodyScroll', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasPadding', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'disableClose', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'maxWidth', type: 'string', propType: 'string | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Modal',
    slotItems: true,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-pagination',
    elementName: 'elvia-pagination',
    attributes: [
      { name: 'value', type: 'object', propType: 'object' },
      { name: 'numberOfElements', type: 'number', propType: 'number' },
      { name: 'lastNumberLimit', type: 'number', propType: 'number | undefined' },
      { name: 'dropdownMenuPos', type: 'string', propType: 'string' }, // Deprecated
      { name: 'selectedDropdownItemIndex', type: 'number', propType: 'number' }, // Deprecated
      { name: 'isRightAligned', type: 'boolean', propType: 'boolean | undefined' }, // Deprecated
      { name: 'dropdownItems', type: 'object', propType: 'object' },
      { name: 'labelDisplaying', type: 'string', propType: 'string' }, // Deprecated
      { name: 'label', type: 'string', propType: 'string' }, // Deprecated
      { name: 'labelOf', type: 'string', propType: 'string' }, // Deprecated
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
      { name: 'labelOptions', type: 'object', propType: 'object | undefined' },
      { name: 'alignment', type: 'string', propType: 'string | undefined' },
      { name: 'dropdownMenuPosition', type: 'string', propType: 'string | undefined' },
      { name: 'dropdownSelectedItemIndex', type: 'number', propType: 'number' },
    ],
    elementStyle: `display:flex; width: 100%; min-width: 325px`,
    conditionalElementStyle: [{ name: 'alignment', value: 'right', style: `justify-content: flex-end;` }],
    reactName: 'Pagination',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: [
      { name: 'header', type: 'string', propType: 'string | undefined' }, // DEPRECATED SINCE 5.0.0
      { name: 'heading', type: 'string', propType: 'string | undefined' }, // DEPRECATED SINCE 5.0.0
      { name: 'content', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'selectable', type: 'boolean', propType: 'boolean' }, // DEPRECATED SINCE 5.0.0
      { name: 'isSelectable', type: 'boolean', propType: 'boolean' },
      { name: 'hasDivider', type: 'boolean', propType: 'boolean' },
      { name: 'posX', type: 'string', propType: 'string | undefined' }, // DEPRECATED SINCE 5.0.0
      { name: 'posY', type: 'string', propType: 'string | undefined' }, // DEPRECATED SINCE 5.0.0
      { name: 'horizontalPosition', type: 'string', propType: 'string | undefined' },
      { name: 'verticalPosition', type: 'string', propType: 'string | undefined' },
      { name: 'trigger', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean | undefined' }, // DEPRECATED SINCE 5.0.0
      { name: 'hasCloseButton', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isShowing', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'disableAutoClose', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Popover',
    useWrapper: true,
    elementStyle: `display: block;`,
    slotItems: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'isIndeterminate', type: 'boolean', propType: 'boolean' },
      { name: 'isError', type: 'boolean', propType: 'boolean' },
      { name: 'ariaValueText', type: 'string', propType: 'string' },
      { name: 'size', type: 'string', propType: 'string' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
    slotItems: false,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-radio-filter',
    elementName: 'elvia-radio-filter',
    attributes: [
      { name: 'name', type: 'string', propType: 'string' },
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'value', type: 'string', propType: 'string' },
      { name: 'ariaLabel', type: 'string', propType: 'string | undefined' },
      { name: 'groupAriaLabel', type: 'string', propType: 'string | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'RadioFilter',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-slider',
    elementName: 'elvia-slider',
    attributes: [
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'hasHintValues', type: 'boolean', propType: 'boolean' },
      { name: 'hasInputField', type: 'boolean', propType: 'boolean' },
      { name: 'hasPercent', type: 'boolean', propType: 'boolean' },
      { name: 'hasTooltip', type: 'boolean', propType: 'boolean' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'label', type: 'string', propType: 'string | object | undefined' },
      { name: 'max', type: 'number', propType: 'number' },
      { name: 'min', type: 'number', propType: 'number' },
      { name: 'type', type: 'string', propType: 'string | undefined' },
      { name: 'unit', type: 'string', propType: 'string | undefined' },
      { name: 'value', type: 'number', propType: 'number | object' },
    ],
    slotItems: false,
    reactName: 'Slider',
    useWrapper: true,
    reactTypescriptDeclaration: true,
    elementStyle: 'width: 100%; display: block;',
  },
  {
    name: 'elvis-spotlight',
    elementName: 'elvia-spotlight',
    attributes: [
      { name: 'position', type: 'object', propType: 'object' },
      { name: 'shape', type: 'string', propType: 'string' },
      { name: 'radius', type: 'number', propType: 'number' },
      { name: 'rectangleProps', type: 'object', propType: 'object' },
      { name: 'hasLockBodyScroll', type: 'boolean', propType: 'boolean' },
      { name: 'transitionDuration', type: 'string', propType: 'boolean' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Spotlight',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: [
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'ariaLabel', type: 'string', propType: 'string' },
      { name: 'isInverted', type: 'boolean', propType: 'boolean' },
      { name: 'hasManualActivation', type: 'boolean', propType: 'boolean' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Tabs',
    elementStyle: `display: grid; overflow: hidden;`,
    slotItems: false,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-timepicker',
    elementName: 'elvia-timepicker',
    attributes: [
      { name: 'value', type: 'Date', propType: 'Date | undefined' },
      { name: 'minuteInterval', type: 'string', propType: 'string | undefined' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isRequired', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'selectNowOnOpen', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'label', type: 'string', propType: 'string | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Timepicker',
    slotItems: false,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-tooltip',
    elementName: 'elvia-tooltip',
    attributes: [
      { name: 'trigger', type: 'string', propType: 'string | HTMLElement' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'position', type: 'string', propType: 'string | undefined' },
      { name: 'showDelay', type: 'number', propType: 'number | undefined' },
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Tooltip',
    slotItems: true,
    useWrapper: true,
    reactTypescriptDeclaration: true,
  },
];
