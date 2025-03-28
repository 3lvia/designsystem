import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { DesignsystemSlackLinkComponent } from 'src/app/shared/designsystem-slack-link/designsystem-slack-link.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('faq');
@Component({
  selector: 'app-faq',
  imports: [
    ComponentHeaderComponent,
    ComponentSubsectionComponent,
    DesignsystemSlackLinkComponent,
    RouterLink,
  ],
  templateUrl: './faq.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class FaqComponent {
  title = docPage.title;
  description = docPage.description;
}
