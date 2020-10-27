import { Component } from '@angular/core';
import { Popover } from '@elvia/popover/web_component';

Popover;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  trigger = `<button>hello</button>`;
}
