import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-component-changelog',
  templateUrl: './component-changelog.component.html',
  styleUrls: ['./component-changelog.component.scss'],
})
export class ComponentChangelogComponent implements OnInit {
  @Input() changelog;
  /**
   * If enabled the changelog-list will be in an accordion
   */
  @Input() hasAccordion = true;
  /**
   * Will hide all but first element
   */
  @Input() isFrontpage = false;
  /**
   * The component to filter for (only display changelog for this component)
   */
  @Input() componentToFilter?: string;

  filteredChangelog = [];

  private filterChangelog(componentToFilter: string) {
    let numberOfReleasesSkipped = 0;
    // Loop through each entry in the changelog.
    this.changelog.forEach((elvisChangelogEntry) => {
      let wasSkipped = true;
      // Loop through each component mentioned in the changelog entry.
      elvisChangelogEntry.changelog.forEach(({ components }) => {
        // Loop through each component name in the entry.
        components?.forEach(({ displayName }) => {
          if (
            displayName.toLowerCase() === componentToFilter.toLowerCase() &&
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
    if (this.componentToFilter) {
      this.filterChangelog(this.componentToFilter);
      this.changelog = this.filteredChangelog;
    }
  }
}
