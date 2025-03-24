import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { DesignsystemSlackLinkComponent } from 'src/app/shared/designsystem-slack-link/designsystem-slack-link.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('user-feedback');
@Component({
  selector: 'app-user-feedback-doc',
  imports: [ComponentHeaderComponent, ComponentSectionComponent, DesignsystemSlackLinkComponent],
  templateUrl: './user-feedback-doc.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UserFeedbackDocComponent {
  title = docPage.title;
  description = docPage.description;
}
