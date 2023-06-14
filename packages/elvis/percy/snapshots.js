module.exports = [
  {
    name: 'Alert',
    url: 'http://localhost:3333/components/alert.html',
    widths: [766, 1440],
  },
  {
    name: 'Autocomplete',
    url: 'http://localhost:3333/components/autocomplete.html',
    widths: [766, 1440],
  },
  {
    name: 'Buttons',
    url: 'http://localhost:3333/components/buttons.html',
    widths: [766, 1440],
  },
  {
    name: 'Checkbox',
    url: 'http://localhost:3333/components/checkbox.html',
    widths: [766, 1440],
  },
  {
    name: 'Colors',
    url: 'http://localhost:3333/components/colors.html',
    widths: [766, 1440],
  },
  {
    name: 'Content Loader',
    url: 'http://localhost:3333/components/content-loader.html',
    widths: [766, 1440],
  },
  {
    name: 'Drag and Drop',
    url: 'http://localhost:3333/components/drag-and-drop.html',
    widths: [766, 1440],
  },
  {
    name: 'File Upload',
    url: 'http://localhost:3333/components/file-upload.html',
    widths: [766, 1440],
  },
  {
    name: 'Input',
    url: 'http://localhost:3333/components/input.html',
    widths: [766, 1440],
  },
  {
    name: 'Link',
    url: 'http://localhost:3333/components/link.html',
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
    url: 'http://localhost:3333/components/list.html',
    widths: [766, 1440],
  },
  {
    name: 'Radio Button',
    url: 'http://localhost:3333/components/radiobutton.html',
    widths: [766, 1440],
  },
  {
    name: 'Search',
    url: 'http://localhost:3333/components/search.html',
    widths: [766, 1440],
  },
  {
    name: 'Stepper',
    url: 'http://localhost:3333/components/stepper.html',
    widths: [766, 1440],
  },
  {
    name: 'Table',
    url: 'http://localhost:3333/components/table.html',
    widths: [766, 1440],
  },
  {
    name: 'Tag',
    url: 'http://localhost:3333/components/tag.html',
    widths: [766, 1440],
  },
  {
    name: 'Toggle',
    url: 'http://localhost:3333/components/toggle.html',
    widths: [766, 1440],
  },
];
