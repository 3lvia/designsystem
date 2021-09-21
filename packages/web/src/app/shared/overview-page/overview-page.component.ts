import { Component, Input, OnInit } from '@angular/core';
import { DocPage } from '../doc-pages.interface';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  @Input() overviewTitle: string;
  @Input() pages: DocPage[];
  filteredPages: DocPage[];

  ngOnInit(): void {
    this.filteredPages = this.pages.filter((page) => {
      return page.status !== 'Coming' && page.status !== 'Ignore';
    });
  }
}
