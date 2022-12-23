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
  @Input() componentToFilter: string;

  filteredChangelog = [];

  filterChangelog(componentToFilter) {
    this.changelog.forEach((elvisChangelogEntry) => {
      elvisChangelogEntry.changelog.forEach(({ components }) => {
        components?.forEach(({ displayName }) => {
          if (
            displayName.toLowerCase() === componentToFilter.toLowerCase() &&
            !this.filteredChangelog.includes(elvisChangelogEntry)
          ) {
            this.filteredChangelog.push(elvisChangelogEntry);
          }
        });
      });
    });
  }

  ngOnInit() {
    if (this.componentToFilter) {
      this.filterChangelog(this.componentToFilter);
      this.changelog = this.filteredChangelog;
    }
  }
}
