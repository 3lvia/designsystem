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
    attributes: ['content', 'openLabel', 'closeLabel', 'labelPosition', 'size', 'type'],
    reactName: 'Accordion',
    useWrapper: true,
  },
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
      'defaultOption',
      'errorMessage',
      'isCompact',
      'isDisabled',
      'isMulti',
      'label',
      'menuPosition',
      'noOptionsMessage',
      'options',
      'optionOnChange',
      'placeholder',
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
    elementStyle: `display: block;`,
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
    attributes: ['value', 'isFullWidth', 'isBlock'],
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
    attributes: ['isCurved', 'isInverted', 'title', 'titleType'],
    reactName: 'Divider',
  },
];
