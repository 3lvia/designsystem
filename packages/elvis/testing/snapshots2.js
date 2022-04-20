const Percy = await import('@percy/core');

const percy = new Percy();
percy.snapshot({
  baseUrl: 'localhost:3333',
  snapshots: [
    '/',
    '/components/accordion.html',
    '/components/alert.html',
    '/components/autocomplete.html',
    '/components/buttons.html',
    '/components/cards.html',
    '/components/checkbox.html',
    '/components/content-loader.html',
    '/components/datepicker.html',
    '/components/drag-and-drop.html',
    '/components/file-upload.html',
    '/components/header.html',
    '/components/input.html',
    '/components/label.html',
    '/components/link.html',
    '/components/list.html',
    '/components/modal.html',
    '/components/pagination.html',
    '/components/position-picker.html',
    '/components/progressbar.html',
    '/components/radiobutton.html',
    '/components/search.html',
    '/components/segmented-controls.html',
    '/components/stepper.html',
    '/components/table.html',
    '/components/toggle.html',
  ],
  options: {
    widths: [766, 1440],
  },
});
