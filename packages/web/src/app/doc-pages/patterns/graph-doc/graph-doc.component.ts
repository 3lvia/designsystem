import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ComponentHeaderComponent } from 'src/app/shared/component-documentation/component-structure/component-header/component-header.component';
import { ComponentSectionComponent } from 'src/app/shared/component-documentation/component-structure/component-section/component-section.component';
import { ComponentSubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsection/component-subsection.component';
import { ComponentSubsubsectionComponent } from 'src/app/shared/component-documentation/component-structure/component-subsubsection/component-subsubsection.component';
import { getDocPage } from 'src/app/shared/doc-pages';
import { WhenToUseComponent } from 'src/app/shared/when-to-use/when-to-use.component';

const docPage: any = getDocPage('graph');
@Component({
  selector: 'app-graph-doc',
  imports: [
    ComponentHeaderComponent,
    ComponentSectionComponent,
    ComponentSubsectionComponent,
    ComponentSubsubsectionComponent,
    WhenToUseComponent,
    RouterLink,
  ],
  templateUrl: './graph-doc.component.html',
})
export class GraphDocComponent {
  title = docPage.title;
  description = docPage.description;
  figmaUrl = docPage.figmaUrl;
}
