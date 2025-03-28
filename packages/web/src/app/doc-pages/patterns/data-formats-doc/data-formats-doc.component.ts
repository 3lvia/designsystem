import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ComponentSubsectionComponent } from '../../../shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { DoDontTextComponent } from 'src/app/shared/do-dont-text/do-dont-text.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('data-formats');
@Component({
  selector: 'app-data-formats-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    DoDontTextComponent,
  ],
  templateUrl: './data-formats-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  styles: `
    p {
      margin: 0;
    }
  `,
})
export class DataFormatsDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
