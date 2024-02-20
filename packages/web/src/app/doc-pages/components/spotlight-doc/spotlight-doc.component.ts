import { Component } from '@angular/core';
import { spotlightData } from './spotlight-data';
import { ComponentSubsubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { SpotlightCegComponent } from './spotlight-ceg/spotlight-ceg.component';
import { CegComponent } from '../../../shared/component-documentation/ceg/ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
  selector: 'app-spotlight-doc',
  templateUrl: './spotlight-doc.component.html',
  standalone: true,
  imports: [
    ComponentDocumentationComponent,
    CegComponent,
    SpotlightCegComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
  ],
})
export class SpotlightDocComponent {
  componentData = spotlightData;
}
