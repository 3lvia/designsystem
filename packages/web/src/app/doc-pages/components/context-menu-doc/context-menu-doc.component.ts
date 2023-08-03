import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { contextMenuData } from './context-menu-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-context-menu-doc',
  templateUrl: './context-menu-doc.component.html',
  styleUrls: ['./context-menu-doc.component.scss'],
})
export class ContextMenuDocComponent {
  componentData = contextMenuData;
  title = getComponent('context-menu')?.title;

  does = ['Help user perform actions when space is limited'];
  donts = ['When the actions are crucial to complete a workflow'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
