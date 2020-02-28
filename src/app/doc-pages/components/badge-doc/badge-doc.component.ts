import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/e-items';

@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  styleUrls: ['./badge-doc.component.scss']
})
export class BadgeDocComponent implements OnInit {

  componentStatus = getComponent('badge-doc').status;
  componentClasses = ['e-badge'];

  example1 = `<span class="e-badge">101001</span>
`;

  example2 = `<span class="e-badge">101001</span>
<span class="e-badge e-bg-green-lime">101001</span>
<span class="e-badge e-bg-orange-peel">101001</span>
<span class="e-badge e-bg-yellow">101001</span>
`;

  constructor() { }

  ngOnInit() {
  }

}
