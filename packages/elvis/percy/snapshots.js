module.exports = [
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
];
