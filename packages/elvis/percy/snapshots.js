module.exports = [
  {
    name: 'Alert',
    url: '/components/alert.html',
    widths: [766, 1440],
  },
  {
    name: 'Autocomplete',
    url: '/components/autocomplete.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Buttons',
    url: '/components/buttons.html',
    widths: [766, 1440],
  },
  {
    name: 'Checkbox',
    url: '/components/checkbox.html',
    waitForTimeout: 5000,
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Colors',
    url: '/components/colors.html',
    widths: [766, 1440],
  },
  {
    name: 'Content Loader',
    url: '/components/content-loader.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Drag and Drop',
    url: '/components/drag-and-drop.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'File Upload',
    url: '/components/file-upload.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Input',
    url: '/components/input.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Link',
    url: '/components/link.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'List',
    url: '/components/list.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Radio Button',
    url: '/components/radiobutton.html',
    widths: [766, 1440],
  },
  {
    name: 'Search',
    url: '/components/search.html',
    widths: [766, 1440],
    additionalSnapshots: [
      {
        suffix: ' - dark theme',
        execute() {
          document.body.classList.add('e-theme-dark');
        },
      },
    ],
  },
  {
    name: 'Stepper',
    url: '/components/stepper.html',
    widths: [766, 1440],
  },
  {
    name: 'Table',
    url: '/components/table.html',
    widths: [766, 1440],
  },
  {
    name: 'Tag',
    url: '/components/tag.html',
    widths: [766, 1440],
  },
  {
    name: 'Toggle',
    url: '/components/toggle.html',
    widths: [766, 1440],
  },
];
