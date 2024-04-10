import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ProgressbarCegComponent } from './progressbar-ceg/progressbar-ceg.component';
import { progressbarData } from './progressbar-data';

@Component({
  selector: 'app-progressbar-doc',
  templateUrl: './progressbar-doc.component.html',
  styleUrls: ['./progressbar-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    ProgressbarCegComponent,
    ComponentSectionComponent,
    RouterLink,
    ComponentSubsectionComponent,
  ],
})
export class ProgressbarDocComponent {
  componentData = progressbarData;
}
