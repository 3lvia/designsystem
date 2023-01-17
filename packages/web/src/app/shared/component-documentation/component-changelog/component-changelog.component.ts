import { Component, Input, OnInit } from '@angular/core';
import { getColor } from '@elvia/elvis-colors';
import { SearchService } from 'src/app/core/services/search.service';
import { ComponentChangelog } from 'src/app/doc-pages/components/component-data.interface';
import elvisChangelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';
import Fuse from 'fuse.js';

// Extend the ComponentChangelog interface with a skipped property to be able to
// show changelog entries that have been skipped in the elvis changelog
type ChangelogEntry = ComponentChangelog | { skipped: number };
type Changelog = ChangelogEntry[];
type ChangelogRadioFilter = ComponentChangelog['changelog'][0]['type'] | 'all';

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
  filteredChangelog: Changelog = [];

  constructor(private searchService: SearchService<ChangelogEntry>) {}

  ngOnInit() {
    if (this.elvisComponentToFilter) {
      this.changelog = this.createElvisFilteredChangelog(this.elvisComponentToFilter);
    }
    this.filteredChangelog = this.changelog;
    this.initializeSearchService();
    this.searchChangelog();
  }

  searchChangelog() {
    if (!this.searchService.isInitialized) {
      return;
    }
    this.filteredChangelog =
      this.searchValue.length > 1 ? this.searchService.search(this.searchValue) : this.changelog;
    if (this.radioFilterValue !== 'all') {
      this.filteredChangelog = this.filteredChangelog.filter((changelog) => {
        return (
          'changelog' in changelog && // Filter out skipped entries
          changelog.changelog.some((changelogEntry) => {
            return changelogEntry.type === this.radioFilterValue;
          })
        );
      });
    }
    setTimeout(() => {
      if (this.searchValue.length > 1) {
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

  /**
   * Create a unique ID for each changelog entry.
   * @returns
   */
  getChangelogEntryId(date: string, version: string, change: string): string {
    return 'changelog-change-' + this.encodeHTML(`${date} v${version} ${change}`);
  }

  private highlightSearchMatches(): void {
    this.resetHighlighting();
    this.searchService.searchResults?.forEach((resultItem) => {
      resultItem.matches.forEach((match) => {
        const elementId = this.getChangelogEntryId(
          (resultItem.item as ComponentChangelog).date,
          (resultItem.item as ComponentChangelog).version,
          match.value,
        );
        const element = document.getElementById(elementId);
        if (element) {
          element.innerHTML = this.getHighlightedHTMLString(match);
        }
      });
    });
  }

  private getHighlightedHTMLString(match: Fuse.FuseResultMatch): string {
    const value = match.value;
    if (!value) {
      return;
    }
    // Add any part of the description that is before the first match
    let highlightedValue = value.substring(0, match.indices[0][0]);
    // Add each match, and the part of the description between matches
    match.indices.forEach((matchIndices, index, items) => {
      const [matchStart, matchEnd] = matchIndices;
      // Only highlight if more than one character, and not part of an HTML tag
      if (matchEnd - matchStart > 0 && !this.checkIfSubstringIsPartOfHtmlTag(value, matchStart, matchEnd)) {
        highlightedValue += this.addHighlightBackground(value.substring(matchStart, matchEnd + 1));
      } else {
        highlightedValue += value.substring(matchStart, matchEnd + 1);
      }

      // If not the last match, add the part of the description upto next match
      if (index !== match.indices.length - 1) {
        highlightedValue += value.substring(matchEnd + 1, items[index + 1][0]);
      }
    });
    // Add the part after the last match
    highlightedValue += value.substring(match.indices[match.indices.length - 1][1] + 1, value.length);
    return highlightedValue;
  }

  private resetHighlighting(): void {
    this.filteredChangelog.forEach((changelogEntry) => {
      if ('changelog' in changelogEntry) {
        changelogEntry.changelog.forEach((entry) => {
          entry.changes.forEach((change) => {
            const element = document.getElementById(
              this.getChangelogEntryId(changelogEntry.date, changelogEntry.version, change),
            );
            if (element) {
              element.innerHTML = change;
            }
          });
        });
      }
    });
  }

  private encodeHTML(txt: string): string {
    return txt
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/&/g, '&amp;')
      .replace(/'/g, '&apos;')
      .replace(/"/g, '&quot;')
      .replace(/\s/g, '-');
  }

  private addHighlightBackground(str: string): string {
    return `<span style='background: ${getColor('elvia-charge')}'>${str}</span>`;
  }

  /**
   * Check if the substring is part of an HTML tag by counting the number of opening and closing tags before and after the substring.
   * If the number of opening and closing tags are not equal, the substring is part of an HTML tag.
   */
  private checkIfSubstringIsPartOfHtmlTag(
    wholeString: string,
    substringStartIndex: number,
    substringEndIndex: number,
  ): boolean {
    const beforeMatch = wholeString.substring(0, substringStartIndex);
    const afterMatch = wholeString.substring(substringEndIndex + 1, wholeString.length);
    const numberOfOpeningTagsBeforeMatch = (beforeMatch.match(/</g) || []).length;
    const numberOfClosingTagsBeforeMatch = (beforeMatch.match(/>/g) || []).length;
    const numberOfOpeningTagsAfterMatch = (afterMatch.match(/</g) || []).length;
    const numberOfClosingTagsAfterMatch = (afterMatch.match(/>/g) || []).length;
    return (
      numberOfOpeningTagsBeforeMatch !== numberOfClosingTagsBeforeMatch ||
      numberOfOpeningTagsAfterMatch !== numberOfClosingTagsAfterMatch
    );
  }

  private initializeSearchService(): void {
    this.searchService.initializeSearch(this.changelog, {
      threshold: 0.2,
      includeMatches: true,
      shouldSort: false,
      ignoreLocation: true,
      keys: [{ name: 'changelog.changes', weight: 1 }],
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
      elvisChangelogEntry.changelog.forEach((version: typeof elvisChangelogEntry.changelog[number]) => {
        const components = 'components' in version ? version['components'] : undefined;
        if (!components) return;
        components.some(({ displayName }) => {
          if (
            displayName.toLowerCase() === elvisComponentToFilter.toLowerCase() &&
            !filteredElvisChangelog.includes(elvisChangelogEntry)
          ) {
            wasSkipped = false;
            if (filteredElvisChangelog.length !== 0 && numberOfReleasesSkipped > 0) {
              filteredElvisChangelog.push({ skipped: numberOfReleasesSkipped });
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
