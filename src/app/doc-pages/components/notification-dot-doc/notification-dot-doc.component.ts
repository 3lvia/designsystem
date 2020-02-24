import { Component, OnInit } from '@angular/core';
import { getComponent } from 'src/app/shared/elvis-items';

@Component({
  selector: 'app-notification-dot-doc',
  templateUrl: './notification-dot-doc.component.html',
  styleUrls: ['./notification-dot-doc.component.scss']
})
export class NotificationDotDocComponent implements OnInit {

  componentStatus = getComponent('notification-dot-doc').status;
  componentClasses = ['.elvis-notification-dot'];

  example1 = `<div class="example-margin">
  <i class="fal fa-cog"><span class="elvis-notification-dot"></span></i>
</div>
`;
  example2 = `<div class="example-margin">
  <i class="fal fa-cog"><span class="elvis-notification-dot"></span></i>
</div>
<div class="example-margin">
  <i class="fal fa-user"><span class="elvis-notification-dot"></span></i>
</div>
<div class="example-margin">
  <i class="fal fa-bars"><span class="elvis-notification-dot"></span></i>
</div>
`;

  constructor() { }

  ngOnInit() {
  }

}
