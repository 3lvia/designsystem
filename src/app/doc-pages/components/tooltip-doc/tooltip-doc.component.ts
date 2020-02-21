import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-tooltip-doc',
  templateUrl: './tooltip-doc.component.html',
  styleUrls: ['./tooltip-doc.component.scss']
})
export class TooltipDocComponent implements OnInit {

  componentStatus = getComponent('tooltip-doc').status;
  componentClasses = ['.elvis-tooltip'];

  example1 = `<span class="elvis-tooltip">
  Hover Right
  <span class="elvis-tooltip_content is-right">Right tooltip </span>
</span>
<span class="elvis-tooltip">
  Hover Left
  <span class="elvis-tooltip_content is-left">Left tooltip</span>
</span>
<span class="elvis-tooltip">
  Hover bottom
  <span class="elvis-tooltip_content is-bottom">Bottom tooltip</span>
</span>
<span class="elvis-tooltip">
  Hover on top
  <span class="elvis-tooltip_content is-top">Top tooltip</span>
</span>
`;
  example2 = `<span class="elvis-tooltip is-light">
  Hover Right
  <span class="elvis-tooltip_content is-right">Right tooltip</span>
</span>
<span class="elvis-tooltip is-light">
  Hover Left
  <span class="elvis-tooltip_content is-left">Left tooltip</span>
</span>
<span class="elvis-tooltip is-light">
  Hover bottom
  <span class="elvis-tooltip_content is-bottom">Bottom tooltip</span>
</span>
<span class="elvis-tooltip is-light">
  Hover on top
  <span class="elvis-tooltip_content is-top">Top tooltip</span>
</span>
`;

  constructor() { }

  ngOnInit() {
  }

}
