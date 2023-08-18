import elvisChangelogJson from '@elvia/elvis/CHANGELOG.json';
import { Changelog, ChangelogEntry, ChangelogLinks } from './changelogTypes';

/**
 * Filters the the Elvis changelog for a specific Elvis component.
 * Counts the number of releases between each mention of the component it filters
 */
export const createElvisFilteredChangelog = (elvisComponentToFilter: string): Changelog => {
  const filteredElvisChangelog: Changelog = [];
  let numberOfReleasesSkipped = 0;
  elvisChangelogJson.content.forEach((elvisChangelogEntry) => {
    let wasSkipped = true;
    elvisChangelogEntry.changelog.forEach((version: (typeof elvisChangelogEntry.changelog)[number]) => {
      let allEntries: ChangelogLinks = [];
      if ('components' in version) {
        allEntries = allEntries.concat(version['components'] as ChangelogLinks);
      }
      if ('pages' in version) {
        allEntries = allEntries.concat(version['pages'] as ChangelogLinks);
      }
      if (allEntries.length === 0) return;
      allEntries.some(({ displayName }) => {
        if (
          displayName.toLowerCase() === elvisComponentToFilter.toLowerCase() &&
          !filteredElvisChangelog.includes(elvisChangelogEntry)
        ) {
          wasSkipped = false;
          if (filteredElvisChangelog.length !== 0 && numberOfReleasesSkipped > 0) {
            filteredElvisChangelog.push({ skipped: numberOfReleasesSkipped } as ChangelogEntry);
          }
          filteredElvisChangelog.push(elvisChangelogEntry);
          numberOfReleasesSkipped = 0;
        }
      });
    });
    if (wasSkipped) numberOfReleasesSkipped++;
  });
  return filteredElvisChangelog;
};
