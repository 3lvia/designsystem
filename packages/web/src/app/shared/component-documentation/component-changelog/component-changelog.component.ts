import { Component, Input, OnInit } from '@angular/core';
import elvisChangelogJson from 'src/assets/changelogs/elvis/CHANGELOG.json';

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
})
export class ComponentChangelogComponent implements OnInit {
  @Input() changelog?;
  /**
   * If enabled the changelog-list will be in an accordion
   */
  @Input() hasAccordion = true;
  /**
   * Will hide all but first element
   */
  @Input() isFrontpage = false;
  /**
   * The Elvis component to filter for (only display changelog for this component).
   * When set, the component will automatically use the Elvis Changelog.
   * NOTE: Not intended for use with V2+ components.
   */
  @Input() elvisComponentToFilter?: string;

  filteredChangelog = [];

  /**
   * Filters the the Elvis changelog for a specific Elvis component.
   * Counts the number of releases between each mention of the component it filters
   */
  private filterChangelog(elvisComponentToFilter: string) {
    let numberOfReleasesSkipped = 0;
    this.changelog.forEach((elvisChangelogEntry) => {
      let wasSkipped = true;
      elvisChangelogEntry.changelog.forEach(({ components }) => {
        components?.forEach(({ displayName }) => {
          if (
            displayName.toLowerCase() === elvisComponentToFilter.toLowerCase() &&
            !this.filteredChangelog.includes(elvisChangelogEntry)
          ) {
            wasSkipped = false;
            this.filteredChangelog.push({ skipped: numberOfReleasesSkipped });
            this.filteredChangelog.push(elvisChangelogEntry);
            numberOfReleasesSkipped = 0;
          }
        });
      });
      if (wasSkipped) numberOfReleasesSkipped++;
    });
  }

  ngOnInit() {
    if (this.elvisComponentToFilter) {
      this.changelog = elvisChangelogJson.content;
      this.filterChangelog(this.elvisComponentToFilter);
      this.changelog = this.filteredChangelog;
    }
  }
}
