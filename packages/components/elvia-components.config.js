module.exports = [
  {
    name: 'elvis-checkbox',
    role: 'dialog',
    elementName: 'elvia-checkbox',
    attributes: ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'],
    reactName: 'Checkbox',
  },
  {
    name: 'elvis-dropdown',
    role: 'select',
    elementName: 'elvia-dropdown',
    attributes: ['options'],
    reactName: 'Dropdown',
  },
  {
    name: 'elvis-tabs',
    role: 'tabs',
    elementName: 'elvia-tabs',
    attributes: ['items', 'value'],
    reactName: 'Tabs',
  },
  {
    name: 'elvis-popover',
    role: 'checkbox',
    elementName: 'elvia-popover',
    attributes: ['title', 'content', 'posX', 'posY', 'hasCloseBtn'],
    reactName: 'Popover',
  },
  {
    name: 'elvis-progress-linear',
    role: 'progressbar',
    elementName: 'elvia-progress-linear',
    attributes: ['value', 'isIndeterminate', 'isError'],
    reactName: 'ProgressLinear',
  },
];
