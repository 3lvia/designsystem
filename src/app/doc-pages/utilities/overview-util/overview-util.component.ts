import { Component, OnInit } from '@angular/core';
import { eUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview-util',
  templateUrl: './overview-util.component.html',
  styleUrls: ['./overview-util.component.scss']
})
export class OverviewUtilComponent implements OnInit {

  overviewTitle = 'Utilities';
  pages = eUtilities;

  constructor() { }

  ngOnInit() {
  }

}
