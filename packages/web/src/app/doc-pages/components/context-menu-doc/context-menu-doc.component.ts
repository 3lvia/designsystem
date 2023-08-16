import { Component } from '@angular/core';
import { contextMenuData } from './context-menu-data';

@Component({
  selector: 'app-context-menu-doc',
  templateUrl: './context-menu-doc.component.html',
  styleUrls: ['./context-menu-doc.component.scss'],
})
export class ContextMenuDocComponent {
  componentData = contextMenuData;

  does = ['Help user perform actions when space is limited'];
  donts = ['When the actions are crucial to complete a workflow'];
}
