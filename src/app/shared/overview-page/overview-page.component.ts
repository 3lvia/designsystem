import { Component, OnInit, Input } from '@angular/core';
import { EItems } from '../e-items.interface';

@Component({
  selector: 'app-overview-page',
  templateUrl: './overview-page.component.html',
  styleUrls: ['./overview-page.component.scss']
})
export class OverviewPageComponent implements OnInit {

  @Input() overviewTitle: string;
  @Input() pages: EItems[];

  constructor() { }

  ngOnInit() {
  }

}
