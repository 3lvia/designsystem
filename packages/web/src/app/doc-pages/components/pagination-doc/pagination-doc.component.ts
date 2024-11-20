import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { WhenToUseComponent } from '../../../shared/when-to-use/when-to-use.component';
import { PaginationCegComponent } from './pagination-ceg/pagination-ceg.component';
import { paginationData } from './pagination-data';

@Component({
  selector: 'app-pagination-doc',
  templateUrl: './pagination-doc.component.html',
  styleUrls: ['./pagination-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    PaginationCegComponent,
    ComponentSectionComponent,
    WhenToUseComponent,
    ComponentSubsectionComponent,
  ],
})
export class PaginationDocComponent {
  componentData = paginationData;
  does = [
    'When there’s a lot of content to process and the user is looking for specific information. Often used in tables.',
  ];
}
