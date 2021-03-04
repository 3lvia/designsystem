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
    attributes: ['items', 'value', 'isInverted'],
    reactName: 'Tabs',
    elementStyle: `
      display:grid;`,
  },
  {
    name: 'elvis-popover',
    elementName: 'elvia-popover',
    attributes: ['title', 'content', 'posX', 'posY', 'hasCloseBtn'],
    reactName: 'Popover',
  },
  {
    name: 'elvis-progress-linear',
    elementName: 'elvia-progress-linear',
    attributes: ['value', 'isIndeterminate', 'isError'],
    reactName: 'ProgressLinear',
    elementStyle: `
      width:100%;
      display:inline-block;`,
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: ['value'],
    reactName: 'TestingComponent',
  },
  {
    name: 'elvis-testing',
    elementName: 'elvia-testing',
    attributes: ['value'],
    reactName: 'TestingComponent',
  },
];
