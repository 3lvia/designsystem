import { Component } from '@angular/core';
import { paginationData } from './pagination-data';

@Component({
  selector: 'app-pagination-doc',
  templateUrl: './pagination-doc.component.html',
  styleUrls: ['./pagination-doc.component.scss'],
})
export class PaginationDocComponent {
  componentData = paginationData;
  does = [
    'When there’s a lot of content to process and the user is looking for specific information. Often used in tables.',
  ];
}
