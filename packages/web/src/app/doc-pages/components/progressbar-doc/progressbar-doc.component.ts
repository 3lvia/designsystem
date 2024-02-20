import { Component } from '@angular/core';
import { progressbarData } from './progressbar-data';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { RouterLink } from '@angular/router';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ProgressbarCegComponent } from './progressbar-ceg/progressbar-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

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
