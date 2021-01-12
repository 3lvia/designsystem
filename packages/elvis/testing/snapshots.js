const PercyScript = require('@percy/script');
const breakpoints = [766, 1440];

PercyScript.run(async (page, percySnapshot) => {
  await page.waitForTimeout(2000);
  await page.goto('http://localhost:3333/');
  await page.waitForTimeout(2000);

  //Accordion
  await page.goto('http://localhost:3333/components/accordion.html');
  await percySnapshot('Accordion', { widths: breakpoints });
  //Alerts
  await page.goto('http://localhost:3333/components/alerts.html');
  await percySnapshot('Alerts', { widths: breakpoints });
  //Autcomplete
  await page.goto('http://localhost:3333/components/autocomplete.html');
  await percySnapshot('Autcomplete', { widths: breakpoints });
  //Buttons
  await page.goto('http://localhost:3333/components/buttons.html');
  await percySnapshot('Buttons', { widths: breakpoints });
  //Cards
  await page.goto('http://localhost:3333/components/cards.html');
  await percySnapshot('Cards', { widths: breakpoints });
  //Checkbox
  await page.goto('http://localhost:3333/components/checkbox.html');
  await page.waitForTimeout(2000);
  await percySnapshot('Checkboxes', { widths: breakpoints });
  //Content-Loader
  await page.goto('http://localhost:3333/components/content-loader.html');
  await percySnapshot('Content-Loader', { widths: breakpoints });
  //Datepicker
  await page.goto('http://localhost:3333/components/datepicker.html');
  await percySnapshot('Date/Time-picker', { widths: breakpoints });
  //Drag&Drop
  await page.goto('http://localhost:3333/components/dragAndDrop.html');
  await percySnapshot('Drag&Drop', { widths: breakpoints });
  //File-Upload
  await page.goto('http://localhost:3333/components/file-upload.html');
  await percySnapshot('File-Upload', { widths: breakpoints });
  //Header
  await page.goto('http://localhost:3333/components/header.html');
  await percySnapshot('Header', { widths: breakpoints });
  //Input
  await page.goto('http://localhost:3333/components/input.html');
  await percySnapshot('Input', { widths: breakpoints });
  //Label
  await page.goto('http://localhost:3333/components/label.html');
  await percySnapshot('Label', { widths: breakpoints });
  //Link
  await page.goto('http://localhost:3333/components/link.html');
  await percySnapshot('Link', { widths: breakpoints });
  //List
  await page.goto('http://localhost:3333/components/list.html');
  await percySnapshot('List', { widths: breakpoints });
  //Modal
  await page.goto('http://localhost:3333/components/modal.html');
  await percySnapshot('Modal', { widths: breakpoints, minHeight: 2000 });
  //Pagination
  await page.goto('http://localhost:3333/components/pagination.html');
  await percySnapshot('Pagination', { widths: breakpoints });
  //Popover
  await page.goto('http://localhost:3333/components/popover.html');
  await percySnapshot('Popover', { widths: breakpoints });
  //Position-Picker
  await page.goto('http://localhost:3333/components/position-picker.html');
  await percySnapshot('Position-Picker', { widths: breakpoints });
  //Progressbar
  await page.goto('http://localhost:3333/components/progressbar.html');
  await percySnapshot('Progressbar', { widths: breakpoints });
  //RadioButtons
  await page.goto('http://localhost:3333/components/radiobutton.html');
  await percySnapshot('RadioButtons', { widths: breakpoints });
  //Search
  await page.goto('http://localhost:3333/components/search.html');
  await percySnapshot('Search', { widths: breakpoints });
  //Segmented-Controls
  await page.goto('http://localhost:3333/components/segmented-controls.html');
  await percySnapshot('Segmented-Controls', { widths: breakpoints });
  //Stepper
  await page.goto('http://localhost:3333/components/stepper.html');
  await percySnapshot('Stepper', { widths: breakpoints });
  //Table
  await page.goto('http://localhost:3333/components/table.html');
  await percySnapshot('Table', { widths: breakpoints });
  //Toggle
  await page.goto('http://localhost:3333/components/toggle.html');
  await percySnapshot('Toggle', { widths: breakpoints });
  //Tooltip
  await page.goto('http://localhost:3333/components/tooltip.html');
  await percySnapshot('Tooltip', { widths: breakpoints });
});
