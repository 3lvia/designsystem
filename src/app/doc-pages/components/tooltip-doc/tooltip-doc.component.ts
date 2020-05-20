import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss']
})
export class TooltipDocComponent implements OnInit {

  externalUrl = getComponent('tooltip-doc').externalUrl;
  componentStatus = getComponent('tooltip-doc').status;

  example1 = `<div style="display:flex;align-items: center;justify-content: space-around;height: 100px;width: 100%;">

  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--information-circle e-icon--sm"></i>
    <span class="e-tooltip__content">Above </span>
  </span>
  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--information-circle e-icon--lg"></i>
    <span class="e-tooltip__content">Above </span>
  </span>
  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--information-circle e-icon--xxl"></i>
    <span class="e-tooltip__content">Above </span>
  </span>

  <span class="e-tooltip" tabindex=0>
    <i class="e-icon e-icon--information-circle e-icon--sm"></i>
    <span class="e-tooltip__content e-tooltip__content--bottom">Below</span>
  </span>
  </div>



`;

constructor() { }

  ngOnInit() {
  }

}
