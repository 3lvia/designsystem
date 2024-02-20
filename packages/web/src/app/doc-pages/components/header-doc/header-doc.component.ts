import { Component } from '@angular/core';
import { headerData } from './header-data';
import { RouterLink } from '@angular/router';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { HeaderCegComponent } from './header-ceg/header-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-header-doc',
  templateUrl: './header-doc.component.html',
  styleUrls: ['./header-doc.component.scss'],
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    HeaderCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    RouterLink,
  ],
})
export class HeaderDocComponent {
  componentData = headerData;
}
