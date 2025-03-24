import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('templates');
@Component({
  selector: 'app-templates-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent],
  templateUrl: './templates-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TemplatesDocComponent {
  title = docPage.title;
  description = docPage.description;
}
