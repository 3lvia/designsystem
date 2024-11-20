import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { HeaderCegComponent } from './header-ceg/header-ceg.component';
import { headerData } from './header-data';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    HeaderCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HeaderDocComponent {
  componentData = headerData;
}
