import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss']
})
export class TooltipDocComponent implements OnInit {

  componentStatus = getComponent('tooltip-doc').status;
  componentClasses = ['.e-tooltip'];

  example1 = `<span class="e-tooltip">
  Hover Right
  <span class="e-tooltip_content is-right">Right tooltip </span>
</span>
<span class="e-tooltip">
  Hover Left
  <span class="e-tooltip_content is-left">Left tooltip</span>
</span>
<span class="e-tooltip">
  Hover bottom
  <span class="e-tooltip_content is-bottom">Bottom tooltip</span>
</span>
<span class="e-tooltip">
  Hover on top
  <span class="e-tooltip_content is-top">Top tooltip</span>
</span>
`;
  example2 = `<span class="e-tooltip is-light">
  Hover Right
  <span class="e-tooltip_content is-right">Right tooltip</span>
</span>
<span class="e-tooltip is-light">
  Hover Left
  <span class="e-tooltip_content is-left">Left tooltip</span>
</span>
<span class="e-tooltip is-light">
  Hover bottom
  <span class="e-tooltip_content is-bottom">Bottom tooltip</span>
</span>
<span class="e-tooltip is-light">
  Hover on top
  <span class="e-tooltip_content is-top">Top tooltip</span>
</span>
`;

  constructor() { }

  ngOnInit() {
  }

}
