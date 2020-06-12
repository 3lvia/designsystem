import {Component} from '@angular/core';
import {getComponent} from 'src/app/shared/e-items';

@Component({
  selector: 'app-notification-dot-doc',
  templateUrl: './notification-dot-doc.component.html',
  styleUrls: ['./notification-dot-doc.component.scss'],
})
export class NotificationDotDocComponent {
  componentStatus = getComponent('notification-dot-doc').status;

  example1 = `<div class="example-margin">
  <i class="fal fa-cog"><span class="e-notification-dot"></span></i>
</div>
`;
  example2 = `<div class="example-margin">
  <i class="fal fa-cog"><span class="e-notification-dot"></span></i>
</div>
<div class="example-margin">
  <i class="fal fa-user"><span class="e-notification-dot"></span></i>
</div>
<div class="example-margin">
  <i class="fal fa-bars"><span class="e-notification-dot"></span></i>
</div>
`;
}
