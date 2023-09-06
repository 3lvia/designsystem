import { Component } from '@angular/core';
import { shortcuts } from '../keys';

@Component({
  selector: 'app-shortcut-modal-content',
  templateUrl: './shortcut-modal-content.component.html',
  styleUrls: ['./shortcut-modal-content.component.scss'],
})
export class ShortcutModalContentComponent {
  shortcuts = shortcuts;
}
