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
In most cases this should be false, however sometimes we want the React component to be wrapped inside a separate
div to prevent overwriting other content within the web component. In those cases useWrapper is useful.

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
      { name: 'openLabel', type: 'string', propType: 'string' },
      { name: 'closeLabel', type: 'string', propType: 'string' },
      { name: 'labelPosition', type: 'string', propType: 'string' },
      { name: 'size', type: 'string', propType: 'string' },
      { name: 'type', type: 'string', propType: 'string' },
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
    attributes: [{ name: 'breadcrumbs', type: 'object', propType: 'object' }],
    reactName: 'Breadcrumb',
    useWrapper: false,
    slotItems: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-carousel',
    elementName: 'elvia-carousel',
    attributes: [
      { name: 'className', type: 'string', propType: 'string' },
      { name: 'elements', type: 'string', propType: 'number | string | HTMLElement' },
      { name: 'hideArrows', type: 'boolean', propType: 'boolean' },
      { name: 'useOnboardingCheckmark', type: 'boolean', propType: 'boolean' },
      { name: 'value', type: 'number', propType: 'number' },
    ],
    reactName: 'Carousel',
    slotItems: true,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-chip',
    elementName: 'elvia-chip',
    attributes: [
      { name: 'ariaLabel', type: 'string', propType: 'string' },
      { name: 'color', type: 'string', propType: 'string' },
      { name: 'disabled', type: 'boolean', propType: 'boolean' },
      { name: 'value', type: 'string', propType: 'string' },
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'iconType', type: 'string', propType: 'string' },
      { name: 'selected', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'Chip',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: [
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'isInverted', type: 'boolean', propType: 'boolean' },
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
      { name: 'header', type: 'string', propType: 'string' },
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
      { name: 'posX', type: 'string', propType: 'string' },
      { name: 'posY', type: 'string', propType: 'string' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean' },
      { name: 'isShowing', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'Popover',
    useWrapper: true,
    elementStyle: `display: block;`,
    slotItems: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      { name: 'value', type: 'number', propType: 'number' },
      { name: 'isIndeterminate', type: 'boolean', propType: 'boolean' },
      { name: 'isError', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-datepicker',
    elementName: 'elvia-datepicker',
    attributes: [
      { name: 'value', type: 'Date', propType: 'Date' },
      { name: 'label', type: 'string', propType: 'string' },
      { name: 'minDate', type: 'Date', propType: 'Date' },
      { name: 'maxDate', type: 'Date', propType: 'Date' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean' },
      { name: 'isFullWidth', type: 'boolean', propType: 'boolean' },
      { name: 'isRequired', type: 'boolean', propType: 'boolean' },
      { name: 'customError', type: 'string', propType: 'string' },
    ],
    reactName: 'Datepicker',
    elementStyle: 'display: block; max-width: 383px;',
    conditionalElementStyle: {
      isFullWidth: `width: 100%`,
    },
    useWrapper: false,
    slotItems: false,
    reactTypescriptDeclaration: false,
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
    conditionalElementStyle: {
      isFullWidth: `width: 100%`,
      isBlock: `display: block`,
    },
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-divider',
    elementName: 'elvia-divider',
    attributes: [
      { name: 'type', type: 'string', propType: 'string' },
      { name: 'title', type: 'string', propType: 'string | HTMLElement' },
      { name: 'typography', type: 'string', propType: 'string' },
      { name: 'isInverted', type: 'boolean', propType: 'boolean' },
    ],
    slotItems: true,
    reactName: 'Divider',
    elementStyle: `width: 100%;`,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-dropdown',
    elementName: 'elvia-dropdown',
    attributes: [
      { name: 'defaultValue', type: 'object', propType: 'object' },
      { name: 'errorMessage', type: 'string', propType: 'string' },
      { name: 'isCompact', type: 'boolean', propType: 'boolean' },
      { name: 'isDisabled', type: 'boolean', propType: 'boolean' },
      { name: 'isMulti', type: 'boolean', propType: 'boolean' },
      { name: 'menuPosition', type: 'string', propType: 'string' },
      { name: 'noOptionsMessage', type: 'string', propType: 'string' },
      { name: 'options', type: 'object', propType: 'object' },
      { name: 'label', type: 'string', propType: 'string' },
      { name: 'placeholder', type: 'string', propType: 'string' },
      { name: 'value', type: 'object', propType: 'object' },
    ],
    slotItems: false,
    elementStyle: `min-width: 163px;`,
    reactName: 'Dropdown',
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
  {
    name: 'elvis-box',
    elementName: 'elvia-box',
    attributes: [
      { name: 'content', type: 'string', propType: 'string | HTMLElement' },
      { name: 'title', type: 'string', propType: 'string | HTMLElement' },
      { name: 'hasBorder', type: 'boolean', propType: 'boolean' },
      { name: 'isColored', type: 'boolean', propType: 'boolean' },
    ],
    slotItems: true,
    reactName: 'Box',
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-modal',
    elementName: 'elvia-modal',
    attributes: [
      { name: 'isShowing', type: 'boolean', propType: 'boolean' },
      { name: 'title', type: 'string', propType: 'string' },
      { name: 'content', type: 'string', propType: 'HTMLElement' },
      { name: 'illustration', type: 'string', propType: 'HTMLElement' },
      { name: 'primaryButton', type: 'string', propType: 'HTMLElement' },
      { name: 'secondaryButton', type: 'string', propType: 'HTMLElement' },
      { name: 'className', type: 'string', propType: 'string' },
      { name: 'hasCloseBtn', type: 'boolean', propType: 'boolean' },
      { name: 'hasLockBodyScroll', type: 'boolean', propType: 'boolean' },
    ],
    reactName: 'Modal',
    slotItems: true,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-radio-filter',
    elementName: 'elvia-radio-filter',
    attributes: [
      { name: 'items', type: 'object', propType: 'object' },
      { name: 'name', type: 'string', propType: 'string' },
      { name: 'value', type: 'string', propType: 'string' },
      { name: 'ariaLabel', type: 'string', propType: 'string' },
    ],
    reactName: 'RadioFilter',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: false,
  },
  {
    name: 'elvis-pagination',
    elementName: 'elvia-pagination',
    attributes: [
      { name: 'value', type: 'object', propType: 'object' },
      { name: 'numberOfElements', type: 'number', propType: 'number' },
      { name: 'dropdownMenuPos', type: 'string', propType: 'string' },
      { name: 'dropdownItems', type: 'object', propType: 'object' },
      { name: 'isRightAligned', type: 'boolean', propType: 'boolean' },
      { name: 'labelDisplaying', type: 'string', propType: 'string' },
      { name: 'label', type: 'string', propType: 'string' },
      { name: 'labelOf', type: 'string', propType: 'string' },
    ],
    elementStyle: `display:flex; width: 100%; min-width: 325px`,
    conditionalElementStyle: {
      isRightAligned: `justify-content: flex-end;`,
    },
    reactName: 'Pagination',
    slotItems: false,
    useWrapper: false,
    reactTypescriptDeclaration: true,
  },
];
