import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { dividerData } from './divider-data';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss'],
})
export class DividerDocComponent {
  title = getComponent('divider')?.title;
  componentData = dividerData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
