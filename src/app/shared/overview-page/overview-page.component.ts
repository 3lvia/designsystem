import { Component, Input, OnInit } from '@angular/core';
import { EItems } from '../e-items.interface';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss'],
})
export class OverviewPageComponent implements OnInit {
  @Input() overviewTitle: string;
  @Input() pages: EItems[];
  filteredPages: EItems[];

  ngOnInit(): void {
    this.filteredPages = this.pages.filter((page) => {
      return page.status !== 'Coming';
    });
  }
}
