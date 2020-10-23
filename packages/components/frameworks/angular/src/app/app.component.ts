import { Component } from '@angular/core';
import { Popover } from '@elvia/popover/web_component';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor() {
    Popover();
  }
}
