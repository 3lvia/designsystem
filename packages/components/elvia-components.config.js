/*
###### Validation ######
This file is validated by validateConfig.js when building components


###### Contents  ###### 
name: String - Package name has to start with "elvis-"
elementName: String - Name of DOM element has to start with "elvia-"

attributes: Object[] - 

attributes.type (ONE TYPE ONLY): 
IMPORTANT! This is what type we will parse the attribute (always string) as. 
When using Angular / Vue syntax it is not an attribute, but actually a 
property. This works as intended, but attributes are always handled as strings 
(as per web spec). Since it is always sent in as a string, we have no way of 
knowing if it is a number, string, boolean, array etc. All attributes will 
automatically be treated as a string as per the HTML specification. 
We support parsing the attributes to the value specified here to make it 
easier to use the components without a framework. 
Also there should only be ONE TYPE PER ATTRIBUTE, and only one of the following:
string, number, object, boolean or Date

attributes.propType:
We allow propType to contain the actually allowed properties by the react component written in a typescript way:
"string | number | HTMLElement | Date | object" etc.  


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
  },
  {
    name: 'elvis-breadcrumb',
    elementName: 'elvia-breadcrumb',
    attributes: [{ name: 'breadcrumbs', type: 'object', propType: 'object' }],
    reactName: 'Breadcrumb',
    useWrapper: false,
    slotItems: false
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
    slotItems: false,
    useWrapper: false,
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
    reactName: 'Divider',
    elementStyle: `width: 100%;`,
    slotItems: false,
    useWrapper: false,
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
    reactName: 'Dropdown',
    useWrapper: false,
  },
  {
    name: 'elvis-box',
    elementName: 'elvia-box',
    attributes: [
      { name: 'content', type: 'string', propType: 'HTMLElement' },
      { name: 'title', type: 'string', propType: 'string' },
      { name: 'hasBorder', type: 'boolean', propType: 'boolean' },
      { name: 'isColored', type: 'boolean', propType: 'boolean' },
    ],
    slotItems: true,
    reactName: 'Box',
    useWrapper: false,
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
  },
];
