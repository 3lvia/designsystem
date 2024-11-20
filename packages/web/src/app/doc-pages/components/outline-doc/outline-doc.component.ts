import { Component } from '@angular/core';

import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { OutlineCegComponent } from './outline-ceg/outline-ceg.component';
import { outlineData } from './outline-data';

@Component({
  selector: 'app-outline-doc',
  templateUrl: './outline-doc.component.html',
  styleUrls: ['./outline-doc.component.scss'],
  imports: [
    ComponentDocumentationComponent,
    StaticCegComponent,
    OutlineCegComponent,
    ComponentSectionComponent,
  ],
})
export class OutlineDocComponent {
  componentData = outlineData;
}
