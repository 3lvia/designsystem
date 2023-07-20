import elvisChangelogJson from '@elvia/elvis/CHANGELOG.json';
import accordionChangelogJson from '@elvia/elvis-accordion/CHANGELOG.json';
import badgeChangelogJson from '@elvia/elvis-badge/CHANGELOG.json';
import boxChangelogJson from '@elvia/elvis-box/CHANGELOG.json';
import breadcrumbChangelogJson from '@elvia/elvis-breadcrumb/CHANGELOG.json';
import cardChangelogJson from '@elvia/elvis-card/CHANGELOG.json';
import carouselChangelogJson from '@elvia/elvis-carousel/CHANGELOG.json';
import chipChangelogJson from '@elvia/elvis-chip/CHANGELOG.json';
import componentWrapperChangelogJson from '@elvia/elvis-component-wrapper/CHANGELOG.json';
import contextMenuChangelogJson from '@elvia/elvis-context-menu/CHANGELOG.json';
import datepickerChangelogJson from '@elvia/elvis-datepicker/CHANGELOG.json';
import datepickerRangeChangelogJson from '@elvia/elvis-datepicker-range/CHANGELOG.json';
import dividerChangelogJson from '@elvia/elvis-divider/CHANGELOG.json';
import dropdownChangelogJson from '@elvia/elvis-dropdown/CHANGELOG.json';
import headerChangelogJson from '@elvia/elvis-header/CHANGELOG.json';
import iconChangelogJson from '@elvia/elvis-icon/CHANGELOG.json';
import modalChangelogJson from '@elvia/elvis-modal/CHANGELOG.json';
import outlineChangelogJson from '@elvia/elvis-outline/CHANGELOG.json';
import paginationChangelogJson from '@elvia/elvis-pagination/CHANGELOG.json';
import popoverChangelogJson from '@elvia/elvis-popover/CHANGELOG.json';
import radioFilterChangelogJson from '@elvia/elvis-radio-filter/CHANGELOG.json';
import segmentedControlChangelogJson from '@elvia/elvis-segmented-control/CHANGELOG.json';
import sliderChangelogJson from '@elvia/elvis-slider/CHANGELOG.json';
import spotlightChangelogJson from '@elvia/elvis-spotlight/CHANGELOG.json';
import stepperChangelogJson from '@elvia/elvis-stepper/CHANGELOG.json';
import tabsChangelogJson from '@elvia/elvis-tabs/CHANGELOG.json';
import timepickerChangelogJson from '@elvia/elvis-timepicker/CHANGELOG.json';
import toastChangelogJson from '@elvia/elvis-toast/CHANGELOG.json';
import toolboxChangelogJson from '@elvia/elvis-toolbox/CHANGELOG.json';
import tooltipChangelogJson from '@elvia/elvis-tooltip/CHANGELOG.json';

const changelogs = [
  elvisChangelogJson,
  accordionChangelogJson,
  badgeChangelogJson,
  boxChangelogJson,
  breadcrumbChangelogJson,
  cardChangelogJson,
  carouselChangelogJson,
  chipChangelogJson,
  componentWrapperChangelogJson,
  contextMenuChangelogJson,
  datepickerChangelogJson,
  datepickerRangeChangelogJson,
  dividerChangelogJson,
  dropdownChangelogJson,
  headerChangelogJson,
  iconChangelogJson,
  modalChangelogJson,
  outlineChangelogJson,
  paginationChangelogJson,
  popoverChangelogJson,
  radioFilterChangelogJson,
  segmentedControlChangelogJson,
  sliderChangelogJson,
  spotlightChangelogJson,
  stepperChangelogJson,
  tabsChangelogJson,
  timepickerChangelogJson,
  toastChangelogJson,
  toolboxChangelogJson,
  tooltipChangelogJson,
];

const changelogNames = [
  'elvis',
  'accordion',
  'badge',
  'box',
  'breadcrumb',
  'card',
  'carousel',
  'chip',
  'component wrapper',
  'context menu',
  'datepicker',
  'datepicker range',
  'divider',
  'dropdown',
  'header',
  'icon',
  'modal',
  'outline',
  'pagination',
  'popover',
  'radioFilter',
  'segmented control',
  'slider',
  'spotlight',
  'stepper',
  'tabs',
  'timepicker',
  'toast',
  'toolbox',
  'tooltip',
];

//const firstChangelogs = changelogs.map((changelog) => changelog.content[0]);

export const frontPageChangelogs = changelogs.map((changelog, i) => {
  const version = changelog.content[0].version;
  const date = changelog.content[0].date;
  return { name: changelogNames[i], version, date };
});
