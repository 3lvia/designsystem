import Percy from '@percy/core';

const percy = new Percy();
percy.snapshot({
  baseUrl: 'localhost:3333',
  snapshots: ['/', '/components/accordion.html', '/components/alert.html'],
  options: {
    widths: [766, 1440],
  },
});
