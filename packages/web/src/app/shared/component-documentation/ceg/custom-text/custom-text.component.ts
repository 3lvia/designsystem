import { Component, Input } from '@angular/core';
import { ComponentExample } from '../componentExample';

@Component({
  selector: 'app-custom-text',
  templateUrl: './custom-text.component.html',
  styleUrls: ['./custom-text.component.scss'],
})
export class CustomTextComponent {
  @Input() cegContent: ComponentExample;
  popoverIsOpen = false;

  resetText() {
    // TODO: Reset text
  }
}
