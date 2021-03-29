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
    name: 'elvis-checkbox',
    elementName: 'elvia-checkbox',
    attributes: ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'],
    reactName: 'Checkbox',
  },
  {
    name: 'elvis-dropdown',
    role: 'select',
    elementName: 'elvia-dropdown',
    attributes: [
      'options',
      'defaultValue',
      'placeholder',
      'label',
      'errormsg',
      'isCompact',
      'isDisabled',
      'isError',
      'menuPosition',
      'isMulti',
      'valueOnChange',
    ],
    reactName: 'Dropdown',
    elementStyle: `width: 100%; max-width: 400px`,
  },
  {
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: ['items', 'value', 'isInverted'],
    reactName: 'Tabs',
    elementStyle: `display: grid; overflow: hidden;`,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: ['header', 'content', 'posX', 'posY', 'hasCloseBtn'],
    reactName: 'Popover',
    useWrapper: true,
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: ['value', 'isIndeterminate', 'isError'],
    reactName: 'ProgressLinear',
    elementStyle: `width: 100%;`,
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: ['value'],
    reactName: 'TestingComponent',
    elementStyle: `width: 100%`,
  },
];
