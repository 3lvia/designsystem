const changelogNames = [
  'elvis',
  'elvis-badge',
  'elvis-accordion',
  'elvis-box',
  'elvis-breadcrumb',
  'elvis-card',
  'elvis-carousel',
  'elvis-chip',
  'elvis-component-wrapper',
  'elvis-context-menu',
  'elvis-datepicker',
  'elvis-datepicker-range',
  'elvis-divider',
  'elvis-dropdown',
  'elvis-header',
  'elvis-icon',
  'elvis-modal',
  'elvis-outline',
  'elvis-pagination',
  'elvis-popover',
  'elvis-radio-filter',
  'elvis-segmented-control',
  'elvis-slider',
  'elvis-spotlight',
  'elvis-stepper',
  'elvis-tabs',
  'elvis-timepicker',
  'elvis-toast',
  'elvis-toolbox',
  'elvis-tooltip',
];

const toDateObject = (dateString: string) => {
  if (/\d\d\.\d\d\.\d\d/.test(dateString)) {
    const [day, month, year] = dateString.split('.');
    return new Date(parseInt(year) + 2000, parseInt(month) - 1, parseInt(day));
  } else {
    return new Date(dateString);
  }
};

export const createChangelogs = async () => {
  const changelogs = await changelogNames.reduce(async (changelogPromise, name) => {
    const changelogs = await changelogPromise;
    const entry = await import(`@elvia/${name}/CHANGELOG.json`).then((changelog) => {
      return changelog.content[0];
    });
    changelogs.push({ ...entry, name: name, date: toDateObject(entry.date) });
    return changelogs;
    // TODO: Use better type
  }, Promise.resolve([] as { name: string; version: string; date: Date; changelog: any[] }[]));
  console.log(changelogs);
  return changelogs
    .sort((a, b) => {
      return a.date < b.date ? 1 : -1;
    })
    .slice(0, 5);
};
