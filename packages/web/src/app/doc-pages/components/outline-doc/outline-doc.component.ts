import { Component } from '@angular/core';
import { outlineData } from './outline-data';
import { ComponentSectionComponent } from '../../../shared/component-documentation/component-structure/component-section/component-section.component';
import { OutlineCegComponent } from './outline-ceg/outline-ceg.component';
import { StaticCegComponent } from '../../../shared/component-documentation/ceg/static-ceg/static-ceg.component';
import { ComponentDocumentationComponent } from '../../../shared/component-documentation/component-documentation.component';

@Component({
    selector: 'app-outline-doc',
    templateUrl: './outline-doc.component.html',
    styleUrls: ['./outline-doc.component.scss'],
    standalone: true,
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
