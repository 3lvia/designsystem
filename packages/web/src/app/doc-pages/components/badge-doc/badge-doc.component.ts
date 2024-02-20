import { Component } from '@angular/core';
import { badgeData } from './badge-data';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ButtonBadgeCegComponent } from './button-badge-ceg/button-badge-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { BadgeCegComponent } from './badge-ceg/badge-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
@Component({
  selector: 'app-badge-doc',
  templateUrl: './badge-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    BadgeCegComponent,
    ComponentSectionComponent,
    StaticCegComponent,
    ButtonBadgeCegComponent,
    ComponentSubsectionComponent,
  ],
})
export class BadgeDocComponent {
  componentData = badgeData;
}
