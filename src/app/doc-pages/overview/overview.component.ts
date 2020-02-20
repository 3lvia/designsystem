import { Component, OnInit } from '@angular/core';
import { elvisComponents } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  components = elvisComponents;

  constructor() { }

  ngOnInit() {
  }
}
