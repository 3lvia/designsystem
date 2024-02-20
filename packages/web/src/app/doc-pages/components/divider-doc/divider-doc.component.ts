import { Component } from '@angular/core';
import { dividerData } from './divider-data';
import { RouterLink } from '@angular/router';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { DividerCegComponent } from './divider-ceg/divider-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
@Component({
  selector: 'app-divider-doc',
  templateUrl: './divider-doc.component.html',
  styleUrls: ['./divider-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    DividerCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
  ],
})
export class DividerDocComponent {
  componentData = dividerData;
}
