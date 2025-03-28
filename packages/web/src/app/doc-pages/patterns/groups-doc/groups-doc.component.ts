import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { GroupAccordionExampleCegComponent } from './group-accordion-example-ceg/group-accordion-example-ceg.component';
import { GroupActionExampleCegComponent } from './group-action-example-ceg/group-action-example-ceg.component';
import { GroupLinkExampleCegComponent } from './group-link-example-ceg/group-link-example-ceg.component';
import { GroupTextExampleCegComponent } from './group-text-example-ceg/group-text-example-ceg.component';
import { StaticCegComponent } from 'src/app/shared/component-documentation/ceg';
import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';

const docPage = getDocPage('groups');
@Component({
  selector: 'app-groups-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    GroupAccordionExampleCegComponent,
    GroupActionExampleCegComponent,
    GroupLinkExampleCegComponent,
    GroupTextExampleCegComponent,
    RouterLink,
    StaticCegComponent,
  ],
  templateUrl: './groups-doc.component.html',
})
export class GroupsDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
