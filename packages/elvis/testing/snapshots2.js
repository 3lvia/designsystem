const Percy = require('@percy/core');

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
  ],
  options: {
    widths: [766, 1440],
  },
});
