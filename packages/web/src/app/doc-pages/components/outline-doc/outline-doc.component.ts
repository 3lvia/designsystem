import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { outlineData } from './outline-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-outline-doc',
  templateUrl: './outline-doc.component.html',
  styleUrls: ['./outline-doc.component.scss'],
})
export class OutlineDocComponent {
  title = getComponent('outline')?.title;
  componentData = outlineData;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
