import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('personas');
@Component({
  selector: 'app-personas-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent],
  templateUrl: './personas-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PersonasDocComponent {
  title = docPage.title;
  description = docPage.description;
}
