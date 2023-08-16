import { Component } from '@angular/core';

@Component({
  selector: 'app-toggle-doc',
  templateUrl: './toggle-doc.component.html',
  styleUrls: ['./toggle-doc.component.scss'],
})
export class ToggleDocComponent {
  does = ['Single state that is either on or off.'];
  donts = ['Never use a switch in place of a button (actions).'];
}
