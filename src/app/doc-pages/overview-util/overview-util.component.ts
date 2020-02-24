import { Component, OnInit } from '@angular/core';
import { elvisUtilities } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-overview-util',
  templateUrl: './overview-util.component.html',
  styleUrls: ['./overview-util.component.scss']
})
export class OverviewUtilComponent implements OnInit {

  utilities = elvisUtilities;

  constructor() { }

  ngOnInit() {
  }

}
