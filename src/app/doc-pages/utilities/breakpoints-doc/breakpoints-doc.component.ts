import { Component, OnInit } from '@angular/core';
import { getUtilities } from 'src/app/shared/e-items';

@Component({
  selector: 'app-breakpoints-doc',
  templateUrl: './breakpoints-doc.component.html',
  styleUrls: ['./breakpoints-doc.component.scss']
})
export class BreakpointsDocComponent implements OnInit {

  componentStatus = getUtilities('breakpoints-doc').status;
  externalUrl = getUtilities('breakpoints-doc').externalUrl;

  constructor() { }

  ngOnInit() {
  }

}
