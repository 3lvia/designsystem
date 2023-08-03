import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-content-loader-doc',
  templateUrl: './content-loader-doc.component.html',
  styleUrls: ['./content-loader-doc.component.scss'],
})
export class ContentLoaderDocComponent {
  title = getComponent('content-loader')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
