module.exports = [
  {
    name: 'elvis-checkbox',
    role: 'dialog',
    elementName: 'elvia-checkbox',
    attributes: ['label', 'name', 'value', 'id', 'size', 'checked', 'disabled', 'required'],
    reactName: 'Checkbox',
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
    attributes: ['title', 'description', 'customContent', 'posX', 'posY', 'noClose'],
    reactName: 'Popover',
  },
  {
    name: 'elvis-progress-linear',
    role: 'progressbar',
    elementName: 'elvia-progress-linear',
    attributes: ['value', 'isIndeterminate', 'isError'],
    reactName: 'ProgressLinear',
  },
  {
    name: 'elvis-slider',
    role: 'slider',
    elementName: 'elvia-slider',
    attributes: ['value'],
    reactName: 'Slider',
  },
];
