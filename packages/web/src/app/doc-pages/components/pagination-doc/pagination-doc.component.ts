import { Component } from '@angular/core';
import { paginationData } from './pagination-data';
import { getComponent } from 'src/app/shared/doc-pages';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pagination-doc',
  templateUrl: './pagination-doc.component.html',
  styleUrls: ['./pagination-doc.component.scss'],
})
export class PaginationDocComponent {
  componentData = paginationData;
  title = getComponent('pagination')?.title;
  does = [
    'When there’s a lot of content to process and the user is looking for specific information. Often used in tables.',
  ];

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title + ' | Elvia design system');
  }
}
