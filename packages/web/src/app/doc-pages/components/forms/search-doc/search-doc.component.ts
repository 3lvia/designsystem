import { Component } from '@angular/core';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-search-doc',
  templateUrl: './search-doc.component.html',
})
export class SearchDocComponent {
  title = getComponent('search')?.title;

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }

  does = [
    'Organize related information',
    'When you have a lot of content and the content is not important to always have available',
  ];
  donts = [
    'Don’t hide necessary and critical information to the user to complete their task in a accordion',
    'Don’t use it for navigation elements',
  ];
}
