import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { contextMenuData } from './context-menu-data';
import { contextMenuDisabledCode } from './context-menu-disabled-code';
import { contextMenuHeadingsCode } from './context-menu-headings';
import { contextMenuIconsCode } from './context-menu-icons-code';
import { contextMenuSelectableCode } from './context-menu-selectable-code';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-context-menu-doc',
  templateUrl: './context-menu-doc.component.html',
  styleUrls: ['./context-menu-doc.component.scss'],
})
export class ContextMenuDocComponent {
  componentData = contextMenuData;
  contextMenuIconsCode = contextMenuIconsCode;
  contextMenuHeadingsCode = contextMenuHeadingsCode;
  contextMenuSelectableCode = contextMenuSelectableCode;
  contextMenuDisabledCode = contextMenuDisabledCode;
  loadedContextMenuStructure = false;
  figmaUrl = getComponent('context-menu')?.figmaUrl;
  description = getComponent('context-menu')?.description;
  title = getComponent('context-menu')?.title;

  does = ['Help user perform actions when space is limited'];
  donts = ['When the actions are crucial to complete a workflow'];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  hideContentLoader(evt: Event): void {
    if (evt && evt.target) {
      this.loadedContextMenuStructure = true;
    }
  }
}
