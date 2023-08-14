import { Component } from '@angular/core';

@Component({
  selector: 'app-checkbox-doc',
  templateUrl: './checkbox-doc.component.html',
  styleUrls: ['./checkbox-doc.component.scss'],
})
export class CheckboxDocComponent {
  does = ['When user can select multiple options from a list.', 'Toggle a single option on or off.'];
  donts = ['If the user only can select one option from a list - use radio buttons.'];
}
