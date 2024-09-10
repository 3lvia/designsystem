import elvisAccordionChangelog from '@elvia/elvis-accordion/CHANGELOG.json';
import elvisAppBridgeChangelog from '@elvia/elvis-app-bridge/CHANGELOG.json';
import elvisAutocompleteChangelog from '@elvia/elvis-autocomplete/CHANGELOG.json';
import elvisBadgeChangelog from '@elvia/elvis-badge/CHANGELOG.json';
import elvisBoxChangelog from '@elvia/elvis-box/CHANGELOG.json';
import elvisBreadcrumbChangelog from '@elvia/elvis-breadcrumb/CHANGELOG.json';
import elvisCardChangelog from '@elvia/elvis-card/CHANGELOG.json';
import elvisCarouselChangelog from '@elvia/elvis-carousel/CHANGELOG.json';
import elvisChipChangelog from '@elvia/elvis-chip/CHANGELOG.json';
import elvisContextMenuChangelog from '@elvia/elvis-context-menu/CHANGELOG.json';
import elvisDatepickerRangeChangelog from '@elvia/elvis-datepicker-range/CHANGELOG.json';
import elvisDatepickerChangelog from '@elvia/elvis-datepicker/CHANGELOG.json';
import elvisDividerChangelog from '@elvia/elvis-divider/CHANGELOG.json';
import elvisDropdownChangelog from '@elvia/elvis-dropdown/CHANGELOG.json';
import elvisHeaderChangelog from '@elvia/elvis-header/CHANGELOG.json';
import elvisIconsChangelog from '@elvia/elvis-icons/CHANGELOG.json';
import elvisIllustrationsChangelog from '@elvia/elvis-illustrations/CHANGELOG.json';
import elvisModalChangelog from '@elvia/elvis-modal/CHANGELOG.json';
import elvisOutlineChangelog from '@elvia/elvis-outline/CHANGELOG.json';
import elvisPaginationChangelog from '@elvia/elvis-pagination/CHANGELOG.json';
import elvisPopoverChangelog from '@elvia/elvis-popover/CHANGELOG.json';
import elvisRadioFilterChangelog from '@elvia/elvis-radio-filter/CHANGELOG.json';
import elvisSegmentedControlChangelog from '@elvia/elvis-segmented-control/CHANGELOG.json';
import elvisSliderChangelog from '@elvia/elvis-slider/CHANGELOG.json';
import elvisSpotlightChangelog from '@elvia/elvis-spotlight/CHANGELOG.json';
import elvisStepperChangelog from '@elvia/elvis-stepper/CHANGELOG.json';
import elvisTabsChangelog from '@elvia/elvis-tabs/CHANGELOG.json';
import elvisTimepickerChangelog from '@elvia/elvis-timepicker/CHANGELOG.json';
import elvisToastChangelog from '@elvia/elvis-toast/CHANGELOG.json';
import elvisTooltipChangelog from '@elvia/elvis-tooltip/CHANGELOG.json';
import elvisChangelog from '@elvia/elvis/CHANGELOG.json';

import { FrontPageChangelogUrlPipe } from './front-page-changelog-url-pipe';
import { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';

type ChangelogArrayType = (Omit<ComponentChangelog, 'date'> & { name: string; date: Date; url: string })[];

const allChangelogs = [
  elvisChangelog,
  elvisAccordionChangelog,
  elvisAppBridgeChangelog,
  elvisAutocompleteChangelog,
  elvisBadgeChangelog,
  elvisBoxChangelog,
  elvisBreadcrumbChangelog,
  elvisCardChangelog,
  elvisCarouselChangelog,
  elvisChipChangelog,
  elvisContextMenuChangelog,
  elvisDatepickerChangelog,
  elvisDatepickerRangeChangelog,
  elvisDividerChangelog,
  elvisDropdownChangelog,
  elvisHeaderChangelog,
  elvisIconsChangelog,
  elvisIllustrationsChangelog,
  elvisModalChangelog,
  elvisOutlineChangelog,
  elvisPaginationChangelog,
  elvisPopoverChangelog,
  elvisRadioFilterChangelog,
  elvisSegmentedControlChangelog,
  elvisSliderChangelog,
  elvisSpotlightChangelog,
  elvisStepperChangelog,
  elvisTabsChangelog,
  elvisTimepickerChangelog,
  elvisToastChangelog,
  elvisTooltipChangelog,
];

const toDateObject = (dateString: string) => {
  if (/\d\d\.\d\d\.\d\d/.test(dateString)) {
    const [day, month, year] = dateString.split('.');
    return new Date(parseInt(year) + 2000, parseInt(month) - 1, parseInt(day));
  } else {
    return new Date(dateString);
  }
};

export const createChangelogs = () => {
  const changelogs = allChangelogs.map((changelog) => {
    const filteredChangelogs = changelog.content.filter(
      (changelogEntry) => changelogEntry.version.endsWith('.0') && !(changelogEntry as any).private,
    );
    return {
      ...filteredChangelogs[0],
      name: changelog.name,
      date: toDateObject(filteredChangelogs[0].date),
      url: getChangelogUrl(changelog.name),
    } as ChangelogArrayType[number];
  });

  const sortedChangelogs = changelogs.sort((a, b) => {
    return a.date < b.date ? 1 : -1;
  });
  return sortedChangelogs.slice(0, 5);
};

const getChangelogUrl = (name: string) => {
  switch (name) {
    case 'elvis': {
      return '/components/css-library';
    }
    case 'elvis-illustrations': {
      return '/brand/illustration';
    }
    case 'elvis-icons': {
      return '/brand/icon';
    }
    default: {
      const pipe = new FrontPageChangelogUrlPipe();
      return `/components/${pipe.transform(name)}`;
    }
  }
};
