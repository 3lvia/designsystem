import { Component, OnInit } from '@angular/core';
import { eComponents } from 'src/app/shared/e-items';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  components = eComponents;

  constructor() { }

  ngOnInit() {
  }
}
