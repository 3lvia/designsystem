import { Component } from '@angular/core';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { BadgeCegComponent } from './badge-ceg/badge-ceg.component';
import { badgeData } from './badge-data';
import { ButtonBadgeCegComponent } from './button-badge-ceg/button-badge-ceg.component';

@Component({
    selector: 'app-badge-doc',
    templateUrl: './badge-doc.component.html',
    styleUrl: './badge-doc.component.scss',
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        BadgeCegComponent,
        ComponentSectionComponent,
        StaticCegComponent,
        ButtonBadgeCegComponent,
        ComponentSubsectionComponent,
    ]
})
export class BadgeDocComponent {
  componentData = badgeData;
}
