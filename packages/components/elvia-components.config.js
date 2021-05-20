/*
name: String - Package name
elementName: String - Name of DOM element
attributes: String[] - What attributes DOM element listens for
reactName: String - The name of the component in React
elementStyle: String Styling for the DOM element itself
useWrapper: Boolean - If the React element should be injected into a wrapper instead of directly into the element
wrapperStyle: String - Styling for the React wrapper - This requires useWrapper to be true.
*/

module.exports = [
  {
    name: 'elvis-accordion',
    elementName: 'elvia-accordion',
    attributes: [
      {name: 'content', type: 'string | HTMLElement'}, 
      {name: 'openLabel', type: 'string'}, 
      {name: 'closeLabel', type: 'string'}, 
      {name: 'labelPosition', type: 'string'}, 
      {name: 'size', type: 'string'}, 
      {name: 'type', type: 'string'}, 
    ],
    reactName: 'Accordion',
    useWrapper: true,
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
      {name: 'items', type: 'object'}, 
      {name: 'value', type: 'number'}, 
      {name: 'isInverted', type: 'boolean'}, 
    ],
    reactName: 'Tabs',
    elementStyle: `display: grid; overflow: hidden;`,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: [
      {name: 'header', type: 'string'}, 
      {name: 'content', type: 'string | HTMLElement'}, 
      {name: 'posX', type: 'string'}, 
      {name: 'posY', type: 'string'}, 
      {name: 'hasCloseBtn', type: 'boolean'}
    ],
    reactName: 'Popover',
    useWrapper: true,
    elementStyle: `display: block;`,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: [
      {name: 'value', type: 'number'}, 
      {name: 'isIndeterminate', type: 'boolean'}, 
      {name: 'isError', type: 'boolean'}
    ],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: [
      {name: 'isFullWidth', type: 'boolean'}, 
      {name: 'isBlock', type: 'boolean'}
    ],
    reactName: 'TestingComponent',
    elementStyle: `width: 50%; display: grid;`,
    conditionalElementStyle: {
      isFullWidth: `width: 100%`,
      isBlock: `display: block`,
    },
  },
  {
    name: 'elvis-divider',
    elementName: 'elvia-divider',
    attributes: [
      {name: 'isCurved', type: 'boolean'}, 
      {name: 'isInverted', type: 'boolean'}, 
      {name: 'title', type: 'string'}, 
      {name: 'titleType', type: 'string'}, 
    ],
    reactName: 'Divider',
  },
];
