import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent implements OnInit {

  componentStatus = getComponent('badge-doc').status;
  componentClasses = ['.elvis-badge'];

  constructor() { }

  ngOnInit() {
  }

  example1 = `<span class="elvis-badge">101001</span>
`;

  example2 = `<span class="elvis-badge">101001</span>
<span class="elvis-badge is-green">101001</span>
<span class="elvis-badge is-orange">101001</span>
<span class="elvis-badge is-yellow">101001</span>
`;
}
