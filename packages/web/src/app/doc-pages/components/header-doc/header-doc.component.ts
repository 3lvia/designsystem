import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { headerData } from './header-data';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss'],
})
export class HeaderDocComponent {
  componentData = headerData;
  title = getComponent('header')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
