/*
name: String - Package name
elementName: String - Name of DOM element
attributes: String[] - What attributes DOM element listens for
reactName: String - The name of the component in React
elementStyle: String Styling for the DOM element itself
useWrapper: Boolean - If the React element should be injected into a wrapper instead of directly into the element
wrapperStyle: String - Styling for the React wrapper - This requires useWrapper to be true.
slotItems: Boolean (default: false) - Saves all "slot" items to variable. Should be set to true for all new components
*/

module.exports = [
  {
    name: 'elvis-accordion',
    elementName: 'elvia-accordion',
    attributes: [
      { name: 'content', type: 'string | HTMLElement' },
      { name: 'openLabel', type: 'string' },
      { name: 'closeLabel', type: 'string' },
      { name: 'labelPosition', type: 'string' },
      { name: 'size', type: 'string' },
      { name: 'type', type: 'string' },
    ],
    reactName: 'Accordion',
    useWrapper: true,
    slotItems: false,
  },
  {
    name: 'elvis-breadcrumb',
    elementName: 'elvia-breadcrumb',
    attributes: [{ name: 'breadcrumbs', type: 'object' }],
    reactName: 'Breadcrumb',
  },
  {
    name: 'elvis-carousel',
    elementName: 'elvia-carousel',
    attributes: [
      { name: 'className', type: 'string' },
      { name: 'elements', type: 'number | string | HTMLElement' },
      { name: 'hideArrows', type: 'boolean' },
      { name: 'useOnboardingCheckmark', type: 'boolean' },
      { name: 'value', type: 'number' },
    ],
    reactName: 'Carousel',
    slotItems: false,
  },
  {
    name: 'elvis-chips',
    elementName: 'elvia-chips',
    attributes: [
      { name: 'className', type: 'string' },
      { name: 'color', type: 'string' },
      { name: 'disabled', type: 'boolean' },
      { name: 'value', type: 'string' },
      { name: 'type', type: 'string' },
      { name: 'iconType', type: 'string' },
      { name: 'isInitiallySelected', type: 'boolean' },
    ],
    reactName: 'Chips',
    slotItems: false,
  },
  // {
  //   name: 'elvis-checkbox',
  //   elementName: 'elvia-checkbox',
  //   attributes: ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'],
  //   reactName: 'Checkbox',
  // },
  {
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: [
      { name: 'items', type: 'object' },
      { name: 'value', type: 'number' },
      { name: 'isInverted', type: 'boolean' },
    ],
    reactName: 'Tabs',
    elementStyle: `display: grid; overflow: hidden;`,
    slotItems: false,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: [
      { name: 'header', type: 'string' },
      { name: 'content', type: 'string | HTMLElement' },
      { name: 'posX', type: 'string' },
      { name: 'posY', type: 'string' },
      { name: 'hasCloseBtn', type: 'boolean' },
      { name: 'isShowing', type: 'boolean' },
    ],
    reactName: 'Popover',
    useWrapper: true,
    elementStyle: `display: block;`,
    slotItems: false,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      { name: 'value', type: 'number' },
      { name: 'isIndeterminate', type: 'boolean' },
      { name: 'isError', type: 'boolean' },
    ],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
    slotItems: false,
  },
  {
    name: 'elvis-datepicker',
    elementName: 'elvia-datepicker',
    attributes: [
      { name: 'value', type: 'Date' },
      { name: 'label', type: 'string' },
      { name: 'minDate', type: 'Date' },
      { name: 'maxDate', type: 'Date' },
      { name: 'isCompact', type: 'boolean' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'isRequired', type: 'boolean' },
      { name: 'customError', type: 'string' },
    ],
    reactName: 'Datepicker',
    elementStyle: 'display: block; max-width: 383px;',
    conditionalElementStyle: {
      isFullWidth: `width: 100%`,
    },

    slotItems: false,
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: [
      { name: 'isFullWidth', type: 'boolean' },
      { name: 'isBlock', type: 'boolean' },
    ],
    reactName: 'TestingComponent',
    elementStyle: `width: 50%; display: grid;`,
    conditionalElementStyle: {
      isFullWidth: `width: 100%`,
      isBlock: `display: block`,
    },
    slotItems: false,
  },
  {
    name: 'elvis-divider',
    elementName: 'elvia-divider',
    attributes: [
      { name: 'type', type: 'string' },
      { name: 'title', type: 'string | HTMLElement' },
      { name: 'typography', type: 'string' },
      { name: 'isInverted', type: 'boolean' },
    ],
    reactName: 'Divider',
    elementStyle: `width: 100%;`,
    slotItems: false,
  },
  {
    name: 'elvis-dropdown',
    elementName: 'elvia-dropdown',
    attributes: [
      { name: 'defaultValue', type: 'object' },
      { name: 'errorMessage', type: 'string' },
      { name: 'isCompact', type: 'boolean' },
      { name: 'isDisabled', type: 'boolean' },
      { name: 'isMulti', type: 'boolean' },
      { name: 'menuPosition', type: 'string' },
      { name: 'noOptionsMessage', type: 'string' },
      { name: 'options', type: 'object' },
      { name: 'label', type: 'string' },
      { name: 'placeholder', type: 'string' },
      { name: 'value', type: 'object' },
    ],
    slotItems: false,
    reactName: 'Dropdown',
  },
  {
    name: 'elvis-box',
    elementName: 'elvia-box',
    attributes: [
      { name: 'content', type: 'HTMLElement' },
      { name: 'title', type: 'string' },
      { name: 'hasBorder', type: 'boolean' },
      { name: 'isColored', type: 'boolean' },
    ],
    slotItems: true,
    reactName: 'Box',
  },
  {
    name: 'elvis-modal',
    elementName: 'elvia-modal',
    attributes: [
      { name: 'isShowing', type: 'boolean' },
      { name: 'title', type: 'string' },
      { name: 'content', type: 'HTMLElement' },
      { name: 'illustration', type: 'HTMLElement' },
      { name: 'primaryButton', type: 'HTMLElement' },
      { name: 'secondaryButton', type: 'HTMLElement' },
      { name: 'className', type: 'string' },
      { name: 'hasCloseBtn', type: 'boolean' },
      { name: 'hasLockBodyScroll', type: 'boolean' },
    ],
    reactName: 'Modal',
    slotItems: true,
  },
];
