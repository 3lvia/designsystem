import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { DividerCegComponent } from './divider-ceg/divider-ceg.component';
import { dividerData } from './divider-data';

@Component({
    selector: 'app-divider-doc',
    templateUrl: './divider-doc.component.html',
    styleUrls: ['./divider-doc.component.scss'],
    imports: [
        ComponentDocumentationComponent,
        CegComponent,
        DividerCegComponent,
        ComponentSectionComponent,
        ComponentSubsectionComponent,
        RouterLink,
    ]
})
export class DividerDocComponent {
  componentData = dividerData;
}
