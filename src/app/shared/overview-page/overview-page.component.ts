import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  @Input() overviewTitle: string;
  @Input() pages: string[];

  constructor() { }

  ngOnInit() {
  }

}
