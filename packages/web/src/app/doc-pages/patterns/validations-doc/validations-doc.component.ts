import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('validations');
@Component({
  selector: 'app-validations-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, ComponentSubsectionComponent, RouterLink],
  templateUrl: './validations-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ValidationsDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
