import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { getThemeColor } from '@elvia/elvis-colors';
import Fuse from 'fuse.js';
import { SearchService } from 'src/app/core/services/search.service';
import { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';
import elvisChangelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';
import { ChangelogIdPipe } from './component-changelog-id-pipe';
import { ChangelogTypePipe } from './component-changelog-pipe';

// Extend the ComponentChangelog interface with a skipped property to be able to
// show changelog entries that have been skipped in the elvis changelog
type ChangelogEntry = ComponentChangelog & { skipped?: number };
type Changelog = ChangelogEntry[];
type ChangelogRadioFilter = ComponentChangelog['changelog'][0]['type'] | 'all';
type ChangelogLinks = { displayName: string; url: string }[];

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
  providers: [SearchService],
})
export class ComponentChangelogComponent implements OnInit {
  @Input() changelog?: Changelog;
  /**
   * If enabled the changelog-list will be in an accordion
   */
  @Input() hasAccordion = true;
  /**
   * Will hide all but first element, and hide the changelog filter
   */
  @Input() isFrontpage = false;
  /**
   * The Elvis component to filter for (only display changelog for this component).
   * When set, the component will automatically use the Elvis Changelog.
   *
   * **NOTE**: Not intended for use with V2+ components.
   */
  @Input() elvisComponentToFilter?: string;

  changelogRadioFilterItems: { label: string; value: ChangelogRadioFilter }[] = [
    { label: 'All', value: 'all' },
    { label: 'Breaking', value: 'breaking_changes' },
    { label: 'New feature', value: 'new_feature' },
    { label: 'Bug', value: 'bug_fix' },
    { label: 'Patch', value: 'patch' },
  ];

  searchValue = '';
  radioFilterValue: ChangelogRadioFilter = 'all';
  filteredChangelog: Changelog | undefined = [];
  accordionIsOpen = false;

  changelogIdPipe = new ChangelogIdPipe();
  changelogTypePipe = new ChangelogTypePipe();

  constructor(
    private searchService: SearchService<ChangelogEntry>,
    private breakpointObserver: BreakpointObserver,
  ) {}

  ngOnInit() {
    if (this.elvisComponentToFilter) {
      this.changelog = this.createElvisFilteredChangelog(this.elvisComponentToFilter);
    }
    this.filteredChangelog = this.changelog;
    this.initializeSearchService();

    // Reset search value and filter when the screen is resized to mobile
    this.breakpointObserver.observe('(max-width: 767px)').subscribe((result) => {
      if (result.matches) {
        this.clearSearch();
      }
    });
  }

  searchChangelog() {
    const minSearchValueLength = 1;
    this.accordionIsOpen = true;
    if (!this.searchService.isInitialized) {
      return;
    }
    this.filteredChangelog =
      this.searchValue.length > minSearchValueLength
        ? this.searchService.search(this.searchValue.trim())
        : this.changelog;
    if (this.radioFilterValue !== 'all') {
      this.filteredChangelog = this.filteredChangelog?.filter((change) => {
        return (
          'changelog' in change && // Filter out 'skipped entries' (for elvis changelogs)
          change.changelog?.some((changelogEntry) => {
            return changelogEntry.type === this.radioFilterValue;
          })
        );
      });
    }
    setTimeout(() => {
      if (this.searchValue.length > minSearchValueLength) {
        this.highlightSearchMatches();
      } else {
        this.resetHighlighting();
      }
    });
  }

  clearSearch() {
    this.searchValue = '';
    this.searchChangelog();
  }

  private highlightSearchMatches(): void {
    this.resetHighlighting();
    this.searchService.searchResults?.forEach((resultItem) => {
      resultItem.matches?.forEach((match) => {
        switch (match.key) {
          case 'changelog.changes': {
            const elementId = this.changelogIdPipe.transform(
              (resultItem.item as ComponentChangelog).date,
              (resultItem.item as ComponentChangelog).version,
              match.value!,
              'entry',
            );
            this.updateElementInnerHTML(elementId, this.getHighlightedHTMLString(match));
            break;
          }
          case 'changelog.pages.displayName': {
            const changelogType =
              (resultItem.item as ComponentChangelog).changelog.find((entry) =>
                entry.pages?.some((page) => page.displayName === match.value),
              )?.type ?? 'CHANGELOG_TYPE_NOT_FOUND';
            const elementId = this.changelogIdPipe.transform(
              (resultItem.item as ComponentChangelog).date,
              (resultItem.item as ComponentChangelog).version,
              match.value!,
              changelogType,
            );
            this.updateElementInnerHTML(elementId, this.getHighlightedHTMLString(match));
            break;
          }
          case 'changelog.components.displayName': {
            const changelogType =
              (resultItem.item as ComponentChangelog).changelog.find((entry) =>
                entry.components?.some((component) => component.displayName === match.value),
              )?.type ?? 'CHANGELOG_TYPE_NOT_FOUND';
            const elementId = this.changelogIdPipe.transform(
              (resultItem.item as ComponentChangelog).date,
              (resultItem.item as ComponentChangelog).version,
              match.value!,
              changelogType,
            );
            this.updateElementInnerHTML(elementId, this.getHighlightedHTMLString(match));
            break;
          }
          case 'changelog.type': {
            const elementId = this.changelogIdPipe.transform(
              (resultItem.item as ComponentChangelog).date,
              (resultItem.item as ComponentChangelog).version,
              match.value!,
              '',
            );
            this.updateElementInnerHTML(elementId, this.getHighlightedHTMLString(match));
            break;
          }
        }
      });
    });
  }

  private getHighlightedHTMLString(match: Fuse.FuseResultMatch): string {
    const { value, indices } = match;
    if (!value) {
      return '';
    }
    // Add any part of the description that is before the first match
    let highlightedValue = value.substring(0, indices[0][0]);

    const longestMatch = indices.reduce((longest, current) => {
      return current[1] - current[0] > longest[1] - longest[0] ? current : longest;
    });
    const lengthOfLongestMatch = longestMatch[1] - longestMatch[0];

    // Add each match, and the part of the description between matches
    indices.forEach((matchIndices, index, items) => {
      const [matchStart, matchEnd] = matchIndices;
      // Only highlight if match is long enough, and not part of an HTML tag
      if (
        matchEnd - matchStart >= lengthOfLongestMatch / 2 &&
        !this.isSubstringPartOfHtmlTag(value, matchStart)
      ) {
        highlightedValue += this.addHighlightBackground(value.substring(matchStart, matchEnd + 1));
      } else {
        highlightedValue += value.substring(matchStart, matchEnd + 1);
      }

      // If not the last match, add the part of the description upto next match
      if (index !== indices.length - 1) {
        highlightedValue += value.substring(matchEnd + 1, items[index + 1][0]);
      }
    });
    // Add the part after the last match
    highlightedValue += value.substring(indices[indices.length - 1][1] + 1, value.length);
    return highlightedValue;
  }

  private updateElementInnerHTML(elementId: string, newInnerHTML: string): void {
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = newInnerHTML;
    }
  }

  private resetHighlighting(): void {
    this.filteredChangelog?.forEach((changelogEntry) => {
      if ('changelog' in changelogEntry) {
        changelogEntry.changelog?.forEach((entry) => {
          entry.changes.forEach((change) => {
            const elementId = this.changelogIdPipe.transform(
              changelogEntry.date,
              changelogEntry.version,
              change,
              'entry',
            );
            this.updateElementInnerHTML(elementId, change);
          });
          [...(entry.pages ?? []), ...(entry.components ?? [])].forEach((page) => {
            const elementId = this.changelogIdPipe.transform(
              changelogEntry.date,
              changelogEntry.version,
              page.displayName,
              entry.type,
            );
            this.updateElementInnerHTML(elementId, page.displayName);
          });
          const elementId = this.changelogIdPipe.transform(
            changelogEntry.date,
            changelogEntry.version,
            this.changelogTypePipe.transform(entry.type),
            '',
          );
          this.updateElementInnerHTML(elementId, this.changelogTypePipe.transform(entry.type));
        });
      }
    });
  }

  private addHighlightBackground(str: string): string {
    return `<span style='background: ${getThemeColor('background-selected-1')}'>${str}</span>`;
  }

  /**
   * Check if the substring is part of an HTML tag by counting the number of opening and closing tags before the substring.
   * If the number of opening and closing tags are not equal, the substring is part of an HTML tag.
   *
   * **NB**: Does not work if < or > is used in the substring as a character, not as a tag.
   */
  private isSubstringPartOfHtmlTag(wholeString: string, substringStartIndex: number): boolean {
    const beforeMatch = wholeString.substring(0, substringStartIndex);
    const numberOfOpeningTagsBeforeMatch = (beforeMatch.match(/</g) || []).length;
    const numberOfClosingTagsBeforeMatch = (beforeMatch.match(/>/g) || []).length;
    return numberOfOpeningTagsBeforeMatch !== numberOfClosingTagsBeforeMatch;
  }

  private initializeSearchService(): void {
    if (!this.changelog) {
      return;
    }
    this.searchService.initializeSearch(this.changelog, {
      threshold: 0.2,
      includeMatches: true,
      shouldSort: false,
      ignoreLocation: true,
      keys: [
        { name: 'changelog.changes', weight: 1 },
        { name: 'changelog.components.displayName', weight: 1 },
        { name: 'changelog.pages.displayName', weight: 1 },
        {
          name: 'changelog.type',
          weight: 1,
          getFn: (obj: ComponentChangelog) =>
            // Map the changelog type to the display name so that it can be searched
            obj.changelog?.map((change) => this.changelogTypePipe.transform(change.type)),
        },
      ],
    });
  }

  /**
   * Filters the the Elvis changelog for a specific Elvis component.
   * Counts the number of releases between each mention of the component it filters
   */
  private createElvisFilteredChangelog(elvisComponentToFilter: string): Changelog {
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
  }
}
