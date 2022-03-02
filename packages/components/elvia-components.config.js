/*
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
      { name: 'openLabel', type: 'string', propType: 'string | undefined' },
      { name: 'closeLabel', type: 'string', propType: 'string | undefined' },
      { name: 'labelPosition', type: 'string', propType: 'string' },
      { name: 'size', type: 'string', propType: 'string' },
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Accordion',
    useWrapper: true,
    slotItems: false,
    elementStyle: `width: 100%;`,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-breadcrumb',
    elementName: 'elvia-breadcrumb',
    attributes: [
      { name: 'breadcrumbs', type: 'object', propType: 'object' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Breadcrumb',
    useWrapper: false,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-carousel',
    elementName: 'elvia-carousel',
    attributes: [
      { name: 'className', type: 'string', propType: 'string' },
      { name: 'elements', type: 'string', propType: 'number | string | HTMLElement' },
      { name: 'hideArrows', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'useOnboardingCheckmark', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'value', type: 'number', propType: 'number | undefined' },
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
      { name: 'disabled', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'type', type: 'string', propType: 'string | undefined' },
      { name: 'selected', type: 'boolean', propType: 'boolean | undefined' },
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
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: [
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'ariaLabel', type: 'string', propType: 'string' },
      { name: 'isInverted', type: 'boolean', propType: 'boolean' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
      { name: 'hasManualActivation', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'Tabs',
    elementStyle: `display: grid; overflow: hidden;`,
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: [
      { name: 'header', type: 'string', propType: 'string | undefined' },
      { name: 'list', type: 'object', propType: 'object | undefined' },
      { name: 'content', type: 'string', propType: 'string | HTMLElement | undefined' },
      { name: 'posX', type: 'string', propType: 'string | undefined' },
      { name: 'posY', type: 'string', propType: 'string | undefined' },
      { name: 'trigger', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'isShowing', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'Popover',
    useWrapper: true,
    elementStyle: `display: block;`,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'isIndeterminate', type: 'boolean', propType: 'boolean' },
      { name: 'isError', type: 'boolean', propType: 'boolean' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
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
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
      { name: 'hasOptionalText', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'showValidation', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'clearButtonText', type: 'string', propType: 'string' },
      { name: 'isErrorState', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasValidation', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'Datepicker',
    elementStyle: 'display: block; max-width: 448px;',
    conditionalElementStyle: [{ name: 'isFullWidth', value: 'true', style: `width: 100%` }],
    useWrapper: false,
    slotItems: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: [
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean' },
      { name: 'isBlock', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'TestingComponent',
    elementStyle: `width: 50%; display: grid;`,
    conditionalElementStyle: [
      { name: 'isFullWidth', value: 'true', style: `width: 100%` },
      { name: 'isBlock', value: 'true', style: `display: block` },
    ],
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: false,
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
      { name: 'defaultValue', type: 'object', propType: 'object | undefined' },
      { name: 'errorMessage', type: 'string', propType: 'string | undefined' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean' },
      { name: 'isMulti', type: 'boolean', propType: 'boolean' },
      { name: 'label', type: 'string', propType: 'string | undefined' },
      { name: 'menuPosition', type: 'string', propType: 'string | undefined' },
      { name: 'noOptionsMessage', type: 'string', propType: 'string | undefined' },
      { name: 'options', type: 'object', propType: 'object' },
      { name: 'placeholder', type: 'string', propType: 'string | undefined' },
      { name: 'value', type: 'object', propType: 'object | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    slotItems: false,
    elementStyle: 'max-width: 448px; width: 100%; display: block;',
    reactName: 'Dropdown',
    useWrapper: false,
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
    name: 'elvis-modal',
    elementName: 'elvia-modal',
    attributes: [
      { name: 'isShowing', type: 'boolean', propType: 'boolean' },
      { name: 'title', type: 'string', propType: 'string | undefined' },
      { name: 'content', type: 'string', propType: 'HTMLElement' },
      { name: 'illustration', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'primaryButton', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'secondaryButton', type: 'string', propType: 'HTMLElement | undefined' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'hasLockBodyScroll', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'disableClose', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'maxWidth', type: 'string', propType: 'string | undefined' },
    ],
    reactName: 'Modal',
    slotItems: true,
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
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    reactName: 'RadioFilter',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-pagination',
    elementName: 'elvia-pagination',
    attributes: [
      { name: 'value', type: 'object', propType: 'object' },
      { name: 'numberOfElements', type: 'number', propType: 'number' },
      { name: 'lastNumberLimit', type: 'number', propType: 'number | undefined' },
      { name: 'dropdownMenuPos', type: 'string', propType: 'string' },
      { name: 'selectedDropdownItemIndex', type: 'number', propType: 'number' },
      { name: 'isRightAligned', type: 'boolean', propType: 'boolean | undefined' },
      { name: 'dropdownItems', type: 'object', propType: 'object' },
      { name: 'labelDisplaying', type: 'string', propType: 'string' },
      { name: 'label', type: 'string', propType: 'string' },
      { name: 'labelOf', type: 'string', propType: 'string' },
      { name: 'className', type: 'string', propType: 'string | undefined' },
      { name: 'inlineStyle', type: 'object', propType: 'object | undefined' },
    ],
    elementStyle: `display:flex; width: 100%; min-width: 325px`,
    conditionalElementStyle: [{ name: 'isRightAligned', value: 'true', style: `justify-content: flex-end;` }],
    reactName: 'Pagination',
    slotItems: false,
    useWrapper: false,
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
];
