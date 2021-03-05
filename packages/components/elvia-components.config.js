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
    name: 'elvis-tabs',
    elementName: 'elvia-tabs',
    attributes: ['items', 'value'],
    reactName: 'Tabs',
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: ['title', 'content', 'posX', 'posY', 'hasCloseBtn'],
    reactName: 'Popover',
    elementStyle: `border: 1px dotted blue; width:100%; min-width:50px;`,
    useWrapper: true,
    wrapperStyle: `border:1px dotted red;`
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: ['value', 'isIndeterminate', 'isError'],
    reactName: 'ProgressLinear',
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: ['value'],
    reactName: 'TestingComponent',
  },
];
