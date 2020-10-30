import { Component } from '@angular/core';
import { Popover } from '@elvia/popover/web_component';
import { Checkbox } from '@elvia/checkbox/web_component';

Popover;
Checkbox;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular';

  checkBoxVal = true;
}
